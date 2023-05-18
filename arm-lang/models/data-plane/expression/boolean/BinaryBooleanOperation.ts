import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { BooleanValue } from '../../value/BooleanValue';
import { Expression } from '../Expression';

export enum BinaryBooleanOperator {
  And,
  Or,
  Xor,
}

export class BinaryBooleanOperation extends Expression<BooleanValue> {
  constructor(
    public readonly leftOperand: Expression<BooleanValue>,
    public readonly rightOperand: Expression<BooleanValue>,
    public readonly operator: BinaryBooleanOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): BooleanValue {
    const a = this.leftOperand.evaluate(state).content;
    const b = this.rightOperand.evaluate(state).content;

    switch (this.operator) {
      case BinaryBooleanOperator.And:
        return new BooleanValue(a && b);
      case BinaryBooleanOperator.Or:
        return new BooleanValue(a || b);
      case BinaryBooleanOperator.Xor:
        return new BooleanValue((a || b) && a !== b);
    }
  }
}
