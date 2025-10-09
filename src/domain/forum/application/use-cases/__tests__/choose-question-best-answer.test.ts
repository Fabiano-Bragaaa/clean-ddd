import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "../answer-question";
import { ChooseQuestionBestAnswerUseCase } from "../choose-question-best-answer";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeQuestion } from "test/factories/make-question";
import { NotAllowedError } from "../errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseQuestionBestAnswerUseCase;

describe("Choose Question Best Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryQuestionsRepository
    );
  });
  it("should be able to choose a question best answer", async () => {
    const newQuestion = makeQuestion();
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    });

    await inMemoryAnswersRepository.create(newAnswer);
    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.questions[0].bestAnswerId).toEqual(newAnswer.id);
  });
  it("should not be able to choose a question best answer from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("2"),
    });
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    });
    
    await inMemoryAnswersRepository.create(newAnswer);
    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: '4',
    });

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
