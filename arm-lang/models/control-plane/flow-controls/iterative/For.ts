import { Expression } from "arm-lang/models/data-plane/expression/Expression";
import { NumberValue } from "arm-lang/models/data-plane/value/NumberValue";
import { ExecutionState } from "arm-lang/runtime/ExecutionState";
import { ExecutionAtom } from "../../execution/ExecutionAtom";
import { ExecutionBlock } from "../../execution/ExecutionBlock";
import { BreakExecutionResult } from "../../execution/result/BreakExecutionResult";
import { ContinueExecutionResult } from "../../execution/result/ContinueExecutionResult";
import { ExecutionResult } from "../../execution/result/ExecutionResult";
import { FinishedExecutionResult } from "../../execution/result/NullExecutionResult";
import { ShortCircuitExecutionResult } from "../../execution/result/ShortCircuitExecutionResult";

export class For extends ExecutionAtom {
  constructor(
    public readonly block: ExecutionBlock,
    public readonly varName: string,
    public readonly start: Expression<NumberValue>,
    public readonly step: Expression<NumberValue>,
    public readonly stop: Expression<NumberValue>
  ) {
    super();
  }

  public execute(prevState: ExecutionState): ExecutionResult {
    const start = this.start.evaluate(prevState);
    const stop = this.stop.evaluate(prevState);
    const step = this.step.evaluate(prevState);

    let i = start.content;

    while (i <= stop.content) {
      const state = new ExecutionState(prevState);
      state.createVar(this.varName, new NumberValue(i));
      const res = this.block.execute(state);
      i += step.content;
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
