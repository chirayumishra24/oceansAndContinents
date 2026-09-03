import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import { StartScreen } from './components/screens/StartScreen';
import { RaceScreen } from './components/screens/RaceScreen';
import { VictoryScreen } from './components/screens/VictoryScreen';
import { InstructionsModal } from './components/screens/InstructionsModal';

export const App: React.FC = () => {
  const game = useGame();
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen w-full font-nautical">
      {/* 1. START SCREEN */}
      {game.screen === 'start' && (
        <StartScreen
          onStart={() => setIsInstructionsOpen(true)}
          onOpenInstructions={() => setIsInstructionsOpen(true)}
          soundEnabled={game.soundEnabled}
          onToggleSound={game.toggleSound}
        />
      )}

      {/* 2. MAIN RACE SCREEN */}
      {game.screen === 'race' && (
        <RaceScreen game={game} />
      )}

      {/* 3. VICTORY SCREEN */}
      {game.screen === 'victory' && game.winner && (
        <VictoryScreen
          winner={game.winner}
          stats={game.stats}
          onPlayAgain={game.resetGame}
          onHome={game.returnToHome}
        />
      )}

      {/* INSTRUCTIONS MODAL (can be opened before race or during game) */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        showStartButton={game.screen === 'start'}
        onStartRace={() => {
          setIsInstructionsOpen(false);
          game.startRace();
        }}
      />
    </div>
  );
};

export default App;
