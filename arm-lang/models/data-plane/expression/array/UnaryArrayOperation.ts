import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ArrayValue } from '../../value/ArrayValue';
import { NumberValue } from '../../value/NumberValue';
import { Value } from '../../value/Value';
import { Expression } from '../Expression';

export enum UnaryArrayOperator {
  Count,
}

export class UnaryArrayOperation extends Expression {
  constructor(
    public readonly operand: Expression<ArrayValue>,
    public readonly operator: UnaryArrayOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): Value {
    const a = this.operand.evaluate(state).arr;

    switch (this.operator) {
      case UnaryArrayOperator.Count:
        return new NumberValue(a.length);
    }
  }
}
