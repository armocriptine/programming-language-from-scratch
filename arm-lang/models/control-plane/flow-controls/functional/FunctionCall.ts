import { FunctionCall } from 'arm-lang/models/data-plane/expression/function/FunctionCall';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionAtom } from '../../execution/ExecutionAtom';
import { ExecutionResult } from '../../execution/result/ExecutionResult';
import { FinishedExecutionResult } from '../../execution/result/NullExecutionResult';

export class FunctionCallAtom extends ExecutionAtom {
  constructor(public readonly expression: FunctionCall) {
    super();
  }

  public execute(state: ExecutionState): ExecutionResult {
    this.expression.evaluate(state);
    return new FinishedExecutionResult();
  }
}
