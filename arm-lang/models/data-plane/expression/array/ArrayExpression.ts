import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ArrayValue } from '../../value/ArrayValue';
import { Expression } from '../Expression';

export class ArrayExpression extends Expression<ArrayValue> {
  constructor(public readonly arr: Expression[]) {
    super();
  }

  public evaluate(state: ExecutionState): ArrayValue {
    return new ArrayValue(this.arr.map((x) => x.evaluate(state)));
  }
}
