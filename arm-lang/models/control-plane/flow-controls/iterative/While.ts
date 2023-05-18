import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionAtom } from '../../execution/ExecutionAtom';
import { ExecutionBlock } from '../../execution/ExecutionBlock';
import { BreakExecutionResult } from '../../execution/result/BreakExecutionResult';
import { ContinueExecutionResult } from '../../execution/result/ContinueExecutionResult';
import { ExecutionResult } from '../../execution/result/ExecutionResult';
import { FinishedExecutionResult } from '../../execution/result/NullExecutionResult';
import { ShortCircuitExecutionResult } from '../../execution/result/ShortCircuitExecutionResult';

export class While extends ExecutionAtom {
  constructor(
    public readonly block: ExecutionBlock,
    public readonly condition: Expression<BooleanValue>,
  ) {
    super();
  }

  public execute(prevState: ExecutionState): ExecutionResult {
    while (this.condition.evaluate(prevState).content) {
      const state = new ExecutionState(prevState);
      const res = this.block.execute(state);
      if (res instanceof BreakExecutionResult) {
        break;
      } else if (res instanceof ContinueExecutionResult) {
        continue;
      } else if (res instanceof ShortCircuitExecutionResult) {
        return res;
      }
    }

    return new FinishedExecutionResult();
  }
}
