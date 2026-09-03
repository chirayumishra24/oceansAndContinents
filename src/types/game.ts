export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category = 
  | 'Oceans' 
  | 'Continents' 
  | 'Countries & Continents' 
  | 'World Geography' 
  | 'Geographic Features' 
  | 'Ocean Facts';

export type QuestionType = 
  | 'multiple-choice' 
  | 'true-false' 
  | 'identify-continent' 
  | 'identify-ocean';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  difficulty: Difficulty;
  category: Category;
  explanation: string;
  type?: QuestionType;
}

export type TeamId = 'red' | 'blue';

export interface TeamInfo {
  id: TeamId;
  name: string;
  title: string;
  shipName: string;
  primaryColor: string;
  secondaryColor: string;
  badgeBg: string;
}

export type ScreenState = 'start' | 'instructions' | 'race' | 'victory';

export type TurnStatus = 
  | 'idle'
  | 'answering'
  | 'feedback'
  | 'rebound_turn'; // When the first team got it wrong, opponent has their chance

export type SimultaneousRoundStatus = 'answering' | 'evaluating' | 'completed';
export type WinnerType = 'red' | 'blue' | 'tie' | null;

export interface FeedbackState {
  type: 'correct' | 'incorrect' | 'timeout' | 'skip';
  team: TeamId;
  stepsAdded: number;
  message: string;
  selectedOption?: number;
  correctOption?: number;
}

export interface GameStats {
  questionsPlayed: number;
  redSteps: number;
  blueSteps: number;
  redCorrect: number;
  blueCorrect: number;
  redSkipsUsed: number;
  blueSkipsUsed: number;
}
