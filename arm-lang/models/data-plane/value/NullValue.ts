import { Value } from './Value';

export class NullValue extends Value {
  public equals(second: Value): boolean {
    return second instanceof NullValue;
  }
}
