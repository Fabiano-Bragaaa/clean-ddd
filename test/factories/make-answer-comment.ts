import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerComment, AnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { faker } from "@faker-js/faker";


export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId
) {
    const answerComment = AnswerComment.create(
    {
      content: faker.lorem.text(),
      authorId: new UniqueEntityId("1"),
      answerId: new UniqueEntityId("1"),
      ...override,
    },
    id
  );

  return answerComment;
}
