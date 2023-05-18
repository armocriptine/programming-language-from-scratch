import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { NumberValue } from '../../value/NumberValue';
import { Expression } from '../Expression';

export enum UnaryArithmeticOperator {
  Negate,
}

export class UnaryArithmeticOperation extends Expression<NumberValue> {
  constructor(
    public readonly operand: Expression<NumberValue>,
    public readonly operator: UnaryArithmeticOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): NumberValue {
    const a = this.operand.evaluate(state).content;

    switch (this.operator) {
      case UnaryArithmeticOperator.Negate:
        return new NumberValue(-a);
    }
  }
}
