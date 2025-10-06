import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from '../comment-on-question'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository)
  })
  it('should be able to comment on a question', async () => {

    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const { questionComment } = await sut.execute({
      authorId: newQuestion.authorId.toString(),
      questionId: newQuestion.id.toString(),
      content: 'Question content',
    })

    expect(questionComment.content).toEqual('Question content')
  })
})
