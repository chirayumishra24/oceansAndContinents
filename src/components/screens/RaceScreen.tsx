import React, { useState } from 'react';
import { Header } from '../layout/Header';
import { RaceTrack } from '../race/RaceTrack';
import { DualQuestionCards } from '../quiz/DualQuestionCards';
import { InstructionsModal } from './InstructionsModal';
import { useGame } from '../../hooks/useGame';
import { useTimer } from '../../hooks/useTimer';

interface RaceScreenProps {
  game: ReturnType<typeof useGame>;
}

export const RaceScreen: React.FC<RaceScreenProps> = ({ game }) => {
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  // Hook 15s timer for the simultaneous round
  const isTimerRunning = game.roundStatus === 'answering';
  const { timeLeft, resetTimer, isUrgent } = useTimer({
    initialSeconds: 15,
    isRunning: isTimerRunning,
    onTimeout: game.handleRoundTimeout,
  });

  // Reset timer on new round or question
  React.useEffect(() => {
    if (game.roundStatus === 'answering') {
      resetTimer(15);
    }
  }, [game.roundStatus, game.roundNumber, resetTimer]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-sky-200 via-sky-100 to-sky-300">
      
      {/* Top Header */}
      <Header
        questionNumber={game.roundNumber}
        maxQuestions={game.totalRounds}
        soundEnabled={game.soundEnabled}
        onToggleSound={game.toggleSound}
        onHome={game.returnToHome}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
      />

      {/* Main Content Area: Expanded Width Race Track & 2 Team Cards */}
      <main className="flex-1 w-full max-w-[98vw] 2xl:max-w-[1700px] mx-auto p-2 sm:p-4 flex flex-col gap-4">
        
        {/* Dual Lane Race Track */}
        <RaceTrack
          redPosition={game.redPosition}
          bluePosition={game.bluePosition}
          maxCheckpoints={game.maxCheckpoints}
          feedback={game.feedback}
          currentTeam="red"
        />

        {/* Dual Question Cards for Team Red and Team Blue */}
        {game.redQuestion && game.blueQuestion ? (
          <DualQuestionCards
            roundNumber={game.roundNumber}
            totalRounds={game.totalRounds}
            timeLeft={timeLeft}
            isUrgent={isUrgent}
            roundStatus={game.roundStatus}
            redQuestion={game.redQuestion}
            blueQuestion={game.blueQuestion}
            redSelected={game.redSelected}
            blueSelected={game.blueSelected}
            redSkips={game.redSkips}
            blueSkips={game.blueSkips}
            evaluation={game.evaluation}
            onRedAnswer={game.handleRedAnswer}
            onBlueAnswer={game.handleBlueAnswer}
            onRedSkip={game.handleRedSkip}
            onBlueSkip={game.handleBlueSkip}
          />
        ) : (
          <div className="p-8 rounded-2xl bg-slate-900 text-white text-center font-bold">
            Preparing next simultaneous challenge...
          </div>
        )}

        {/* Bottom tip */}
        <div className="text-center text-xs font-semibold text-sky-900/80 select-none py-1">
          ⚡ Both teams answer their own questions simultaneously! Correct answers move ships forward.
        </div>

      </main>

      {/* Help / Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />

    </div>
  );
};
