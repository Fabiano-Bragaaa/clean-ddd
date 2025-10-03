import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface CommentProps {
 authorId: UniqueEntityId
 content: string
 createdAt: Date
 updatedAt?: Date
}

export abstract class Comment<T extends CommentProps> extends Entity<T> {
  get content(): string {
    return this.props.content
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
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

}
