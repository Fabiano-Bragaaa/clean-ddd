import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public questions: Question[] = []

  async create(question: Question): Promise<void> {
    this.questions.push(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(
      (question) => question.slug.value === slug,
    )

    if (!question) {
      return null
    }

    return question
  }
}
