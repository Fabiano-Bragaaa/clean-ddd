import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }

  async findById(id: string): Promise<QuestionComment | null> {
    return this.items.find(item => item.id.toString() === id) || null;
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    this.items = this.items.filter(item => item.id.toString() !== questionComment.id.toString());
  }
}