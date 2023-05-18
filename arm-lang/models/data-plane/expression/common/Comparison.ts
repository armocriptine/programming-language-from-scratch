import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { BooleanValue } from '../../value/BooleanValue';
import { Expression } from '../Expression';

export enum Comparator {
  Equal,
}

export class Comparison extends Expression<BooleanValue> {
  constructor(
    public readonly leftOperand: Expression,
    public readonly rightOperand: Expression,
    public readonly comparator: Comparator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): BooleanValue {
    const a = this.leftOperand.evaluate(state);
    const b = this.rightOperand.evaluate(state);

    switch (this.comparator) {
      case Comparator.Equal:
        return new BooleanValue(a.equals(b));
    }
  }
}
