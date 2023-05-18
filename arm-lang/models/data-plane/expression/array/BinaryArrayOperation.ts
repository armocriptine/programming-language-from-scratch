import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ArrayValue } from '../../value/ArrayValue';
import { Value } from '../../value/Value';
import { Expression } from '../Expression';

export enum BinaryArrayOperator {
  Append,
}

export class BinaryArrayOperation extends Expression {
  constructor(
    public readonly leftOperand: Expression<ArrayValue>,
    public readonly rightOperand: Expression<ArrayValue>,
    public readonly operator: BinaryArrayOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): Value {
    const a = this.leftOperand.evaluate(state).arr;
    const b = this.rightOperand.evaluate(state).arr;

    switch (this.operator) {
      case BinaryArrayOperator.Append:
        return new ArrayValue([...a, ...b]);
    }
  }
}
