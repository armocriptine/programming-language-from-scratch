import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ArrayValue } from '../../value/ArrayValue';
import { NumberValue } from '../../value/NumberValue';
import { Value } from '../../value/Value';
import { Expression } from '../Expression';

export class ArrayIndexAccess extends Expression {
  constructor(
    public readonly arr: Expression<ArrayValue>,
    public readonly index: Expression<NumberValue>,
  ) {
    super();
  }

  public evaluate(state: ExecutionState): Value {
    return this.arr.evaluate(state).arr[this.index.evaluate(state).content];
  }
}
