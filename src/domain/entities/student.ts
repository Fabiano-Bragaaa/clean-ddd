import { randomUUID } from "node:crypto";

interface StudentProps {
  name: string;
}

export class Student {
  public name: string;
  public id: string;

  constructor(props: StudentProps, id?: string) {
    this.id = id ?? randomUUID();
    this.name = props.name;
  }
}