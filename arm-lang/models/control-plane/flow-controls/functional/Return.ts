import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { BreakingAtom } from '../../execution/BreakingAtom';
import { ReturnExecutionResult } from '../../execution/result/ReturnExecutionResult';

export class Return extends BreakingAtom {
  constructor(public readonly expression: Expression) {
    super();
  }

  public execute(state: ExecutionState): ReturnExecutionResult {
    return new ReturnExecutionResult(this.expression.evaluate(state));
  }
}
