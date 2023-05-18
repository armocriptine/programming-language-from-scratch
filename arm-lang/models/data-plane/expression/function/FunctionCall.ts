import { ReturnExecutionResult } from 'arm-lang/models/control-plane/execution/result/ReturnExecutionResult';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { Func } from '../../value/Func';
import { NullValue } from '../../value/NullValue';
import { Value } from '../../value/Value';
import { Expression } from '../Expression';

export class FunctionCall extends Expression {
  constructor(
    public readonly func: Expression<Func>,
    public readonly args: Expression[],
  ) {
    super();
  }

  public evaluate(prevState: ExecutionState): Value {
    const func = this.func.evaluate(prevState);
    const state = new ExecutionState(prevState);

    for (const [index, paramName] of func.paramList.entries()) {
      state.createVar(paramName, this.args[index].evaluate(prevState));
    }

    const res = func.executionBlock.execute(state);
    if (res instanceof ReturnExecutionResult) {
      return res.returnValue;
    } else {
      return new NullValue();
    }
  }
}
