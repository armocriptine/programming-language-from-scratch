import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionAtom } from '../../execution/ExecutionAtom';
import { ExecutionBlock } from '../../execution/ExecutionBlock';
import { ExecutionResult } from '../../execution/result/ExecutionResult';
import { FinishedExecutionResult } from '../../execution/result/NullExecutionResult';

export class If extends ExecutionAtom {
  constructor(
    public readonly thenBlock: ExecutionBlock,
    public readonly elseBlock: ExecutionBlock | null,
    public readonly condition: Expression<BooleanValue>,
  ) {
    super();
  }

  public execute(state: ExecutionState): ExecutionResult {
    const cond = this.condition.evaluate(state).content;
    if (cond) {
      return this.thenBlock.execute(state);
    } else {
      if (this.elseBlock) {
        return this.elseBlock.execute(state);
      } else {
        return new FinishedExecutionResult();
      }
    }
  }
}
