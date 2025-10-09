export class Left<L, R> {
  readonly value: any;

  constructor(value: any) {
    this.value = value;
  }
}

export class Right<L, R> {
  readonly value: any;

  constructor(value: any) {
    this.value = value;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value);
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
}