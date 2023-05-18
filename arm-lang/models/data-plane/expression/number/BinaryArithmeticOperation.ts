import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { NumberValue } from '../../value/NumberValue';
import { Expression } from '../Expression';

export enum BinaryArithmeticOperator {
  Add,
  Subtract,
  Multiply,
  Divide,
  Modulo,
}

export class BinaryArithmeticOperation extends Expression<NumberValue> {
  constructor(
    public readonly leftOperand: Expression<NumberValue>,
    public readonly rightOperand: Expression<NumberValue>,
    public readonly operator: BinaryArithmeticOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): NumberValue {
    const a = this.leftOperand.evaluate(state).content;
    const b = this.rightOperand.evaluate(state).content;

    switch (this.operator) {
      case BinaryArithmeticOperator.Add:
        return new NumberValue(a + b);
      case BinaryArithmeticOperator.Subtract:
        return new NumberValue(a - b);
      case BinaryArithmeticOperator.Multiply:
        return new NumberValue(a * b);
      case BinaryArithmeticOperator.Divide:
        return new NumberValue(a / b);
      case BinaryArithmeticOperator.Modulo:
        return new NumberValue(a % b);
    }
  }
}
