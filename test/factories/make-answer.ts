import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { faker } from "@faker-js/faker";
import {
  Answer,
  AnswerProps,
} from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId
) {
  const answer = Answer.create(
    {
      content: faker.lorem.text(),
      authorId: new UniqueEntityId("1"),
      questionId: new UniqueEntityId("1"),
      ...override,
    },
    id
  );

  return answer;
}
