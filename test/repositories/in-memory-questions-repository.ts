import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository {
  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    return this.questions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);
  }

  public questions: Question[] = [];

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      question => question.slug.value === slug
    );

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      question => question.id === question.id
    );
    this.questions.splice(questionIndex, 1);
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(
      question => question.id.toString() === id
    );
    if (!question) {
      return null;
    }
    return question;
  }

  async save(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(
      question => question.id === question.id
    );
    this.questions[questionIndex] = question;
  }
}
