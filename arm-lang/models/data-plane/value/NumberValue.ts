import { Value } from './Value';

export class NumberValue extends Value {
  constructor(public readonly content: number) {
    super();
  }

  public equals(second: Value): boolean {
    return second instanceof NumberValue && this.content === second.content;
  }
}
