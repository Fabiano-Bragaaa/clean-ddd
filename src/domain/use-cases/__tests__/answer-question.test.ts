import { AnswerQuestionUseCase } from '../answer-question'
import { AnswersRepository } from '@/repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async () => {},
}

it('should be able to answer a question', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Answer to question',
  })

  expect(answer.content).toEqual('Answer to question')
})
