import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface QuestionCommentProps {
 authorId: UniqueEntityId
 answerId: UniqueEntityId
 content: string
 createdAt: Date
 updatedAt?: Date
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  get content(): string {
    return this.props.content
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get answerId(): UniqueEntityId {
    return this.props.answerId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  set content(value: string) {
    this.props.content = value
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
