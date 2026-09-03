import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Question, 
  TeamId, 
  ScreenState, 
  GameStats, 
  SimultaneousRoundStatus,
  WinnerType,
  FeedbackState
} from '../types/game';
import { QuestionManager } from '../utils/questionManager';
import { soundManager } from '../utils/soundManager';
import { triggerVictoryConfetti, triggerMilestoneBurst } from '../utils/confetti';

export const MAX_CHECKPOINTS = 10;
export const TOTAL_ROUNDS = 10;

export interface RoundEvaluation {
  redCorrect: boolean | null;
  blueCorrect: boolean | null;
  redSteps: number;
  blueSteps: number;
  redMessage: string;
  blueMessage: string;
}

export function useGame() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Question bank manager
  const [qm] = useState<QuestionManager>(() => new QuestionManager());

  // Round tracking (1 to 10)
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [roundStatus, setRoundStatus] = useState<SimultaneousRoundStatus>('answering');

  // Dual simultaneous questions
  const [redQuestion, setRedQuestion] = useState<Question | null>(null);
  const [blueQuestion, setBlueQuestion] = useState<Question | null>(null);

  // Selections
  const [redSelected, setRedSelected] = useState<number | null>(null);
  const [blueSelected, setBlueSelected] = useState<number | null>(null);

  // Evaluation outcome for current round
  const [evaluation, setEvaluation] = useState<RoundEvaluation | null>(null);

  // Active step floater feedback for race animation
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  // Ship positions (0 to MAX_CHECKPOINTS)
  const [redPosition, setRedPosition] = useState<number>(0);
  const [bluePosition, setBluePosition] = useState<number>(0);

  // Winner
  const [winner, setWinner] = useState<WinnerType>(null);

  // Skips
  const [redSkips, setRedSkips] = useState<number>(1);
  const [blueSkips, setBlueSkips] = useState<number>(1);

  // Stats
  const [stats, setStats] = useState<GameStats>({
    questionsPlayed: 0,
    redSteps: 0,
    blueSteps: 0,
    redCorrect: 0,
    blueCorrect: 0,
    redSkipsUsed: 0,
    blueSkipsUsed: 0,
  });

  const evaluateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextRoundTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleSound = useCallback(() => {
    const newState = soundManager.toggle();
    setSoundEnabled(newState);
  }, []);

  // Draw 2 distinct questions for the new round
  const loadNextRound = useCallback((round: number) => {
    const qRed = qm.getNextQuestion();
    const qBlue = qm.getNextQuestion();

    if (!qRed || !qBlue) {
      // Determine winner based on positions
      let finalWinner: WinnerType = 'tie';
      if (redPosition > bluePosition) finalWinner = 'red';
      else if (bluePosition > redPosition) finalWinner = 'blue';

      setWinner(finalWinner);
      setScreen('victory');
      soundManager.playVictorySound();
      triggerVictoryConfetti();
      return;
    }

    setRedQuestion(qRed);
    setBlueQuestion(qBlue);
    setRedSelected(null);
    setBlueSelected(null);
    setEvaluation(null);
    setFeedback(null);
    setRoundStatus('answering');
  }, [qm, redPosition, bluePosition]);

  // Start complete race
  const startRace = useCallback(() => {
    soundManager.playStartSound();
    qm.reset();
    setRoundNumber(1);
    setRedPosition(0);
    setBluePosition(0);
    setRedSkips(1);
    setBlueSkips(1);
    setWinner(null);
    setEvaluation(null);
    setFeedback(null);

    setStats({
      questionsPlayed: 0,
      redSteps: 0,
      blueSteps: 0,
      redCorrect: 0,
      blueCorrect: 0,
      redSkipsUsed: 0,
      blueSkipsUsed: 0,
    });

    const qRed = qm.getNextQuestion();
    const qBlue = qm.getNextQuestion();

    setRedQuestion(qRed);
    setBlueQuestion(qBlue);
    setRedSelected(null);
    setBlueSelected(null);
    setRoundStatus('answering');
    setScreen('race');
  }, [qm]);

  // Evaluate the answers submitted by both teams
  const evaluateAnswers = useCallback((
    selectedRed: number | null, 
    selectedBlue: number | null
  ) => {
    if (roundStatus !== 'answering') return;
    if (!redQuestion || !blueQuestion) return;

    setRoundStatus('evaluating');

    const isRedCorrect = selectedRed !== null && selectedRed === redQuestion.correctAnswer;
    const isBlueCorrect = selectedBlue !== null && selectedBlue === blueQuestion.correctAnswer;

    const redStepValue = redQuestion.difficulty === 'hard' ? 2 : 1;
    const blueStepValue = blueQuestion.difficulty === 'hard' ? 2 : 1;

    const redStepsEarned = isRedCorrect ? redStepValue : 0;
    const blueStepsEarned = isBlueCorrect ? blueStepValue : 0;

    // Play appropriate sounds
    if (isRedCorrect || isBlueCorrect) {
      soundManager.playCorrectSound();
      setTimeout(() => soundManager.playShipMoveSound(), 300);

      if (isRedCorrect) triggerMilestoneBurst(0.3, 0.4);
      if (isBlueCorrect) triggerMilestoneBurst(0.7, 0.4);
    } else {
      soundManager.playWrongSound();
    }

    // Prepare evaluation messages
    const evalData: RoundEvaluation = {
      redCorrect: isRedCorrect,
      blueCorrect: isBlueCorrect,
      redSteps: redStepsEarned,
      blueSteps: blueStepsEarned,
      redMessage: isRedCorrect 
        ? `Correct! +${redStepsEarned} Step${redStepsEarned > 1 ? 's' : ''}!` 
        : (selectedRed === null ? "Time's up!" : "Incorrect!"),
      blueMessage: isBlueCorrect 
        ? `Correct! +${blueStepsEarned} Step${blueStepsEarned > 1 ? 's' : ''}!` 
        : (selectedBlue === null ? "Time's up!" : "Incorrect!"),
    };

    setEvaluation(evalData);

    // Update positions
    const newRedPos = Math.min(MAX_CHECKPOINTS, redPosition + redStepsEarned);
    const newBluePos = Math.min(MAX_CHECKPOINTS, bluePosition + blueStepsEarned);

    setRedPosition(newRedPos);
    setBluePosition(newBluePos);

    // Provide feedback state for track animations
    if (isRedCorrect && !isBlueCorrect) {
      setFeedback({
        type: 'correct',
        team: 'red',
        stepsAdded: redStepsEarned,
        message: `Team Red moves forward +${redStepsEarned}!`
      });
    } else if (isBlueCorrect && !isRedCorrect) {
      setFeedback({
        type: 'correct',
        team: 'blue',
        stepsAdded: blueStepsEarned,
        message: `Team Blue moves forward +${blueStepsEarned}!`
      });
    } else if (isRedCorrect && isBlueCorrect) {
      setFeedback({
        type: 'correct',
        team: 'red',
        stepsAdded: redStepsEarned,
        message: `Both teams got it right and surge forward!`
      });
    }

    // Update stats
    setStats(prev => ({
      ...prev,
      questionsPlayed: prev.questionsPlayed + 2, // 2 simultaneous questions
      redSteps: prev.redSteps + redStepsEarned,
      blueSteps: prev.blueSteps + blueStepsEarned,
      redCorrect: prev.redCorrect + (isRedCorrect ? 1 : 0),
      blueCorrect: prev.blueCorrect + (isBlueCorrect ? 1 : 0),
    }));

    // Check if someone reached the finish line (at least 1 team reaches MAX_CHECKPOINTS)
    const isGameFinished = (newRedPos >= MAX_CHECKPOINTS) || (newBluePos >= MAX_CHECKPOINTS);

    if (isGameFinished) {
      evaluateTimeoutRef.current = setTimeout(() => {
        let finalWinner: WinnerType = 'tie';
        if (newRedPos > newBluePos) finalWinner = 'red';
        else if (newBluePos > newRedPos) finalWinner = 'blue';
        else finalWinner = 'tie';

        setWinner(finalWinner);
        setScreen('victory');
        soundManager.playVictorySound();
        triggerVictoryConfetti();
      }, 2500);
      return;
    }

    // Otherwise, advance to next round after feedback period
    nextRoundTimeoutRef.current = setTimeout(() => {
      const nextR = roundNumber + 1;
      setRoundNumber(nextR);
      loadNextRound(nextR);
    }, 3800);

  }, [
    roundStatus, 
    redQuestion, 
    blueQuestion, 
    redPosition, 
    bluePosition, 
    roundNumber, 
    loadNextRound
  ]);

  // Handle Team Red answer submission
  const handleRedAnswer = useCallback((index: number) => {
    if (roundStatus !== 'answering' || redSelected !== null) return;
    soundManager.playClickSound();
    setRedSelected(index);

    // If Team Blue already answered, evaluate immediately!
    if (blueSelected !== null) {
      evaluateAnswers(index, blueSelected);
    }
  }, [roundStatus, redSelected, blueSelected, evaluateAnswers]);

  // Handle Team Blue answer submission
  const handleBlueAnswer = useCallback((index: number) => {
    if (roundStatus !== 'answering' || blueSelected !== null) return;
    soundManager.playClickSound();
    setBlueSelected(index);

    // If Team Red already answered, evaluate immediately!
    if (redSelected !== null) {
      evaluateAnswers(redSelected, index);
    }
  }, [roundStatus, blueSelected, redSelected, evaluateAnswers]);

  // Handle round timer expiration (15s)
  const handleRoundTimeout = useCallback(() => {
    if (roundStatus !== 'answering') return;
    evaluateAnswers(redSelected, blueSelected);
  }, [roundStatus, redSelected, blueSelected, evaluateAnswers]);

  // Team Red Skip
  const handleRedSkip = useCallback(() => {
    if (roundStatus !== 'answering' || redSkips <= 0 || redSelected !== null) return;
    soundManager.playClickSound();
    setRedSkips(prev => prev - 1);
    const newQ = qm.getNextQuestion();
    if (newQ) {
      setRedQuestion(newQ);
    }
    setStats(prev => ({ ...prev, redSkipsUsed: prev.redSkipsUsed + 1 }));
  }, [roundStatus, redSkips, redSelected, qm]);

  // Team Blue Skip
  const handleBlueSkip = useCallback(() => {
    if (roundStatus !== 'answering' || blueSkips <= 0 || blueSelected !== null) return;
    soundManager.playClickSound();
    setBlueSkips(prev => prev - 1);
    const newQ = qm.getNextQuestion();
    if (newQ) {
      setBlueQuestion(newQ);
    }
    setStats(prev => ({ ...prev, blueSkipsUsed: prev.blueSkipsUsed + 1 }));
  }, [roundStatus, blueSkips, blueSelected, qm]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (evaluateTimeoutRef.current) clearTimeout(evaluateTimeoutRef.current);
      if (nextRoundTimeoutRef.current) clearTimeout(nextRoundTimeoutRef.current);
    };
  }, []);

  return {
    screen,
    setScreen,
    soundEnabled,
    toggleSound,
    roundNumber,
    totalRounds: TOTAL_ROUNDS,
    roundStatus,
    redQuestion,
    blueQuestion,
    redSelected,
    blueSelected,
    evaluation,
    feedback,
    redPosition,
    bluePosition,
    redSkips,
    blueSkips,
    winner,
    stats,
    maxCheckpoints: MAX_CHECKPOINTS,
    startRace,
    handleRedAnswer,
    handleBlueAnswer,
    handleRoundTimeout,
    handleRedSkip,
    handleBlueSkip,
    resetGame: startRace,
    returnToHome: () => {
      soundManager.playClickSound();
      setScreen('start');
    }
  };
}
