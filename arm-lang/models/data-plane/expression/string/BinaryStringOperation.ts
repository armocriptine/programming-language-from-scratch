import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { StringValue } from '../../value/StringValue';
import { Expression } from '../Expression';

export enum BinaryStringOperator {
  Concat,
}

export class BinaryStringOperation extends Expression<StringValue> {
  constructor(
    public readonly leftOperand: Expression<StringValue>,
    public readonly rightOperand: Expression<StringValue>,
    public readonly operator: BinaryStringOperator,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): StringValue {
    const a = this.leftOperand.evaluate(state).content;
    const b = this.rightOperand.evaluate(state).content;

    switch (this.operator) {
      case BinaryStringOperator.Concat:
        return new StringValue(a + b);
    }
  }
}
