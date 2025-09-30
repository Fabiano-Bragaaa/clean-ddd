import { randomUUID } from "node:crypto";

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
}

export class Question {
  public title: string;
  public content: string;
  public authorId: string;
  public id: string;

  constructor(props: QuestionProps, id?: string) {
    this.id = id ?? randomUUID();
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
  }
}