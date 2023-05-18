import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { Value } from '../../value/Value';
import { Expression } from '../Expression';

export class VariableAccess extends Expression {
  constructor(public readonly varName: string) {
    super();
  }

  public evaluate(state: ExecutionState): Value {
    return state.getVar(this.varName)!;
  }
}
