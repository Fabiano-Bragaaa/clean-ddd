import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from '../answer-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })
  it('should be able to answer a question', async () => {
    const result = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Answer to question',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answer.content).toEqual('Answer to question')
  })
})
