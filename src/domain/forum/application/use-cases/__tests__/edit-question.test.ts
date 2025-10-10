import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeQuestion } from "test/factories/make-question";
import { EditQuestionUseCase } from "../edit-question";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAllowedError } from "../errors/not-allowed-error";
import { InMemoryQuestionsAttachmentsRepository } from "test/repositories/in-memory-questions-attachments-repository";
import { makeQuestionAttachment } from "test/factories/make-question-attachments";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionsAttachmentsRepository;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionsAttachmentsRepository();
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsAttachmentsRepository
    );
  });
  it("should be able to edit a question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("1"),
      },
      new UniqueEntityId("1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);
    inMemoryQuestionsAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId("2"),
      })
    );

    await sut.execute({
      questionId: "1",
      title: "New Title",
      content: "New Content",
      authorId: "1",
      attachmentsIds: ["1", "3"],
    });

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: "New Title",
      content: "New Content",
    });
    expect(inMemoryQuestionsRepository.questions[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionsRepository.questions[0].attachments.currentItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ attachmentId: new UniqueEntityId("1") }),
        expect.objectContaining({ attachmentId: new UniqueEntityId("3") }),
      ])
    );
  });
  it("should not be able to edit a question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId("1"),
      },
      new UniqueEntityId("1")
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      questionId: "1",
      title: "New Title",
      content: "New Content",
      authorId: "2",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
