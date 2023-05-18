import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { BooleanValue } from '../../value/BooleanValue';
import { Expression } from '../Expression';

export enum UnaryBooleanOperator {
  Negate,
}

export class UnaryBooleanOperation extends Expression<BooleanValue> {
  constructor(
    public readonly operand: Expression<BooleanValue>,
    public readonly operator: UnaryBooleanOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): BooleanValue {
    const a = this.operand.evaluate(state).content;

    switch (this.operator) {
      case UnaryBooleanOperator.Negate:
        return new BooleanValue(!a);
    }
  }
}
