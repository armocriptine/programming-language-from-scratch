import { Value } from './Value';

export class BooleanValue extends Value {
  constructor(public readonly content: boolean) {
    super();
  }

  public equals(second: Value): boolean {
    return second instanceof BooleanValue && this.content === second.content;
  }
}
