
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteAnswerCommentUseCase } from '../delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { NotAllowedError } from '../errors/not-allowed-error'
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })
  it('should be able to delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    await sut.execute({
      answerCommentId: '1',
      authorId: '1',
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answer comment from another user', async () => {
    const newAnswerComment = makeAnswerComment({
      authorId: new UniqueEntityId('1'),
    }, new UniqueEntityId('1'))

    await inMemoryAnswerCommentsRepository.create(newAnswerComment)

    const result = await sut.execute({
      answerCommentId: '1',
      authorId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
