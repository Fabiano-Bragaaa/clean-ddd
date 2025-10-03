import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}
  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
  

    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error("Answer not found")
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error("Not authorized")
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {}
   
  }
}
