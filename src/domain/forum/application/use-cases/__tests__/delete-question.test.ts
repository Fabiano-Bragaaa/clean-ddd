import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from '../delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: '1',
      authorId: '1',
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })
  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(sut.execute({
      questionId: '1',
      authorId: '2',
    })).rejects.toThrow('Not authorized')
  })
})
