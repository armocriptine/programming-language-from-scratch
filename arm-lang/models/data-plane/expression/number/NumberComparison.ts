import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { BooleanValue } from '../../value/BooleanValue';
import { NumberValue } from '../../value/NumberValue';
import { Expression } from '../Expression';

export enum NumberComparator {
  GreaterThan,
  GreaterThanOrEqual,
  LessThan,
  LessThanOrEqual,
}

export class NumberComparison extends Expression<BooleanValue> {
  constructor(
    public readonly leftOperand: Expression<NumberValue>,
    public readonly rightOperand: Expression<NumberValue>,
    public readonly comparator: NumberComparator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): BooleanValue {
    const a = this.leftOperand.evaluate(state).content;
    const b = this.rightOperand.evaluate(state).content;

    switch (this.comparator) {
      case NumberComparator.GreaterThan:
        return new BooleanValue(a > b);
      case NumberComparator.GreaterThanOrEqual:
        return new BooleanValue(a >= b);
      case NumberComparator.LessThan:
        return new BooleanValue(a < b);
      case NumberComparator.LessThanOrEqual:
        return new BooleanValue(a <= b);
    }
  }
}
