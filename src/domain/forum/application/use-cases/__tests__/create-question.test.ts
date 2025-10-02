import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-quyestions-repository'
import { CreateQuestionUseCase } from '../create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to answer a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Question',
      content: 'Question content',
    })

    expect(question.title).toEqual('Question')
  })
})
