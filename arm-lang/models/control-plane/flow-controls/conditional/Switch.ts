import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionAtom } from '../../execution/ExecutionAtom';
import { ExecutionBlock } from '../../execution/ExecutionBlock';
import { ExecutionResult } from '../../execution/result/ExecutionResult';
import { FinishedExecutionResult } from '../../execution/result/NullExecutionResult';

export class Switch extends ExecutionAtom {
  constructor(
    public readonly caseMap: [Expression, ExecutionBlock][],
    public readonly defaultBlock: ExecutionBlock | null,
    public readonly condition: Expression,
  ) {
    super();
  }

  public execute(state: ExecutionState): ExecutionResult {
    const cond = this.condition.evaluate(state);

    for (const [value, exec] of this.caseMap) {
      if (value.evaluate(state).equals(cond)) {
        return exec.execute(state);
      }
    }

    if (this.defaultBlock) {
      return this.defaultBlock.execute(state);
    } else {
      return new FinishedExecutionResult();
    }
  }
}
