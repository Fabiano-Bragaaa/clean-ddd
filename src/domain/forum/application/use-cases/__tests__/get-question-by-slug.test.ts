import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-quyestions-repository'
import { GetQuestionBySlugUseCase } from '../get-question-by-slug'
import { CreateQuestionUseCase } from '../create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let createQuestion: CreateQuestionUseCase
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    createQuestion = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })
  it('should be able to get a question by slug', async () => {
    createQuestion.execute({
      authorId: '1',
      title: 'Question Slug',
      content: 'Question content',
    })

    const { question } = await sut.execute({
      slug: 'question-slug',
    })

    expect(question.slug.value).toEqual('question-slug')
  })
})
