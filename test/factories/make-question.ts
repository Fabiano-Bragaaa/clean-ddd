import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Question',
    content: 'Question content',
    authorId: new UniqueEntityId('1'),
    ...override,
  })

  return question
}
