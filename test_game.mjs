// Node.js test script to validate question bank and game rules
import { QUESTIONS_BANK } from './src/data/questions.ts';
import { QuestionManager } from './src/utils/questionManager.ts';

console.log('Testing Ocean Racers Question Bank...');
console.log(`Total questions: ${QUESTIONS_BANK.length}`);

if (QUESTIONS_BANK.length < 40) {
  console.error('FAIL: Question bank has fewer than 40 questions!');
  process.exit(1);
}

// 1. Validate each question structure
const ids = new Set();
for (const q of QUESTIONS_BANK) {
  if (!q.id || ids.has(q.id)) {
    console.error(`FAIL: Duplicate or missing ID: ${q.id}`);
    process.exit(1);
  }
  ids.add(q.id);

  if (!q.question || q.question.trim().length === 0) {
    console.error(`FAIL: Empty question text in ${q.id}`);
    process.exit(1);
  }

  if (!Array.isArray(q.options) || q.options.length < 2) {
    console.error(`FAIL: Invalid options array in ${q.id}`);
    process.exit(1);
  }

  if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
    console.error(`FAIL: Invalid correctAnswer index ${q.correctAnswer} in ${q.id} (options: ${q.options.length})`);
    process.exit(1);
  }

  if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
    console.error(`FAIL: Invalid difficulty ${q.difficulty} in ${q.id}`);
    process.exit(1);
  }

  if (!q.explanation || q.explanation.trim().length === 0) {
    console.error(`FAIL: Missing explanation in ${q.id}`);
    process.exit(1);
  }
}
console.log('✓ All questions have valid IDs, options, answer indices, difficulties, and explanations.');

// 2. Validate QuestionManager with Zero Repetition
const qm = new QuestionManager(QUESTIONS_BANK);
const drawnIds = new Set();
for (let i = 0; i < QUESTIONS_BANK.length; i++) {
  const q = qm.getNextQuestion();
  if (!q) {
    console.error(`FAIL: Ran out of questions prematurely at index ${i}`);
    process.exit(1);
  }
  if (drawnIds.has(q.id)) {
    console.error(`FAIL: Question repeated! ID: ${q.id}`);
    process.exit(1);
  }
  drawnIds.add(q.id);
}

// Verify pool exhaustion returns null gracefully
const exhausted = qm.getNextQuestion();
if (exhausted !== null) {
  console.error('FAIL: Expected null when exhausted, received question');
  process.exit(1);
}
console.log(`✓ Successfully verified 0 repetition across all ${drawnIds.size} questions!`);

// Reset and verify available again
qm.reset();
if (qm.getAvailableQuestions().length !== QUESTIONS_BANK.length) {
  console.error('FAIL: Reset did not restore all questions');
  process.exit(1);
}
console.log('✓ Reset successfully restores full question pool.');
console.log('ALL TESTS PASSED SUCCESSFULLY! 🌊🚢🏁');
