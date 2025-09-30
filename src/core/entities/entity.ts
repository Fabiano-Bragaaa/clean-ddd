import { randomUUID } from "crypto";

export class Entity<T> {
  private _id: string;
  protected props: T;

  get id(): string {
    return this._id;
  }

  protected constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? randomUUID();
  }

}