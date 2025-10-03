import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    return this.answers
      .filter(answer => answer.questionId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);
  }
  public answers: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find(answer => answer.id.toString() === id);
    if (!answer) {
      return null;
    }
    return answer;
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      answer => answer.id === answer.id
    );
    this.answers.splice(answerIndex, 1);
  }

  async save(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(
      answer => answer.id === answer.id
    );
    this.answers[answerIndex] = answer;
  }


}
