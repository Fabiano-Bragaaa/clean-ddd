import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-quyestions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from '../delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerUseCase } from '../delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: '1',
      authorId: '1',
    })

    expect(inMemoryAnswersRepository.answers).toHaveLength(0)
  })
  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(sut.execute({
      answerId: '1',
      authorId: '2',
    })).rejects.toThrow('Not authorized')
  })
})
