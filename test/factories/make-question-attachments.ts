import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";
import { faker } from "@faker-js/faker";


export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?: UniqueEntityId
) {
    const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId("1"),
      attachmentId: new UniqueEntityId("1"),
      ...override,
    },
    id
  );

  return questionAttachment;
}
