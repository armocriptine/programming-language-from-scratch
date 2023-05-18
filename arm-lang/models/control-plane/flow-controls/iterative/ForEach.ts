import { Expression } from "arm-lang/models/data-plane/expression/Expression";
import { ArrayValue } from "arm-lang/models/data-plane/value/ArrayValue";
import { ExecutionState } from "arm-lang/runtime/ExecutionState";
import { ExecutionAtom } from "../../execution/ExecutionAtom";
import { ExecutionBlock } from "../../execution/ExecutionBlock";
import { BreakExecutionResult } from "../../execution/result/BreakExecutionResult";
import { ContinueExecutionResult } from "../../execution/result/ContinueExecutionResult";
import { ExecutionResult } from "../../execution/result/ExecutionResult";
import { FinishedExecutionResult } from "../../execution/result/NullExecutionResult";
import { ShortCircuitExecutionResult } from "../../execution/result/ShortCircuitExecutionResult";

export class ForEach extends ExecutionAtom {
  constructor(
    public readonly array: Expression<ArrayValue>,
    public readonly varName: string,
    public readonly block: ExecutionBlock
  ) {
    super();
  }

  public execute(prevState: ExecutionState): ExecutionResult {
    const array = this.array.evaluate(prevState).arr;

    for (const x of array) {
      const state = new ExecutionState(prevState);
      state.createVar(this.varName, x);
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
