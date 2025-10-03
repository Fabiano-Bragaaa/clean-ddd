import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
  

    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error("Question not found")
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Not authorized")
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {}
   
  }
}
