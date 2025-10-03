import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-quyestions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from '../edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: '1',
      title: 'New Title',
      content: 'New Content',
      authorId: '1',
    })

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'New Title',
      content: 'New Content',
    })
  })
  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(sut.execute({
      questionId: '1',
      title: 'New Title',
      content: 'New Content',
      authorId: '2',
    })).rejects.toThrow('Not authorized')
  })
})
