import { QuestionRepository } from '../../repositories/question-repository'
import { CreateQuestionUseCase } from '../create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async () => {},
}

it('should be able to answer a question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    title: 'Question',
    content: 'Question content',
  })

  expect(question.title).toEqual('Question')
})
