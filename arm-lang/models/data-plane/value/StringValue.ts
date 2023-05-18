import { Value } from './Value';

export class StringValue extends Value {
  constructor(public readonly content: string) {
    super();
  }

  public equals(second: Value): boolean {
    return second instanceof StringValue && this.content === second.content;
  }
}
