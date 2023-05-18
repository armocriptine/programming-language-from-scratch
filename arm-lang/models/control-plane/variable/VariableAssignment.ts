import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionAtom } from '../execution/ExecutionAtom';
import { FinishedExecutionResult } from '../execution/result/NullExecutionResult';

export class VariableAssignment extends ExecutionAtom {
  constructor(
    public readonly variableName: string,
    public readonly expression: Expression,
  ) {
    super();
  }

  public execute(state: ExecutionState): FinishedExecutionResult {
    state.setVar(this.variableName, this.expression.evaluate(state));
    return new FinishedExecutionResult();
  }
}
