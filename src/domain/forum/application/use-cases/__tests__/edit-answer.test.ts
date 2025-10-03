import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-quyestions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from '../edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from '../edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })
  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: '1',
      content: 'New Content',
      authorId: '1',
    })

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'New Content',
    })
  })
  it('should not be able to edit a question from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(sut.execute({
      answerId: '1',
      content: 'New Content',
      authorId: '2',
    })).rejects.toThrow('Not authorized')
  })
})
