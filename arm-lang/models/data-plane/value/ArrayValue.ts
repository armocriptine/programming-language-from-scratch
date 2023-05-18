import { Value } from './Value';

export class ArrayValue extends Value {
  constructor(public readonly arr: Value[]) {
    super();
  }

  public equals(second: Value): boolean {
    return (
      second instanceof ArrayValue &&
      this.arr.every((x, i) => x.equals(second.arr[i]))
    );
  }
}
