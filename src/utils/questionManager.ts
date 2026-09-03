import { Question } from '../types/game';
import { QUESTIONS_BANK } from '../data/questions';

export class QuestionManager {
  private usedIds: Set<string> = new Set();
  private questions: Question[];

  constructor(customQuestions: Question[] = QUESTIONS_BANK) {
    this.questions = [...customQuestions];
  }

  /**
   * Reset tracking for a new game
   */
  public reset(): void {
    this.usedIds.clear();
  }

  /**
   * Mark a question as used (e.g. if answered or skipped)
   */
  public markAsUsed(id: string): void {
    this.usedIds.add(id);
  }

  /**
   * Get all unused questions
   */
  public getAvailableQuestions(): Question[] {
    return this.questions.filter(q => !this.usedIds.has(q.id));
  }

  /**
   * Draw the next random question without repetition
   */
  public getNextQuestion(): Question | null {
    const available = this.getAvailableQuestions();
    if (available.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex];
    this.markAsUsed(selected.id);
    return selected;
  }

  /**
   * Get count of questions played/used so far
   */
  public getUsedCount(): number {
    return this.usedIds.size;
  }

  /**
   * Get total pool size
   */
  public getTotalCount(): number {
    return this.questions.length;
  }

  /**
   * Check if a specific question ID has been used
   */
  public hasBeenUsed(id: string): boolean {
    return this.usedIds.has(id);
  }
}

export const defaultQuestionManager = new QuestionManager();
