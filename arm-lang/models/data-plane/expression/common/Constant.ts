import { Value } from '../../value/Value';
import { Expression } from '../Expression';

export class ConstantExpression<
  TValue extends Value,
> extends Expression<TValue> {
  constructor(public readonly value: TValue) {
    super();
  }

  public evaluate(): TValue {
    return this.value;
  }
}
