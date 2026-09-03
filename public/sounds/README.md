# Custom Sound Files (Optional)

OCEAN RACERS has a built-in procedural **Web Audio API** sound engine that works 100% offline out of the box with zero external audio files.

If you wish to provide your own custom MP3 sound files, you can place them here:
- `correct.mp3` - Correct answer sound effect
- `wrong.mp3` - Incorrect answer / foghorn sound effect
- `splash.mp3` - Ship movement and water splash
- `tick.mp3` - Sonar timer countdown tick
- `victory.mp3` - Victory fanfare
- `start.mp3` - Race start horn

These can be hooked directly in `src/utils/soundManager.ts`.
