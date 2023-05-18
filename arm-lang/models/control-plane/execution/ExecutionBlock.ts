import { createValueFromNative } from 'arm-lang/models/data-plane/interop/Interop';
import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionAtom } from './ExecutionAtom';
import { ExecutionResult } from './result/ExecutionResult';
import { FinishedExecutionResult } from './result/NullExecutionResult';
import { ReturnExecutionResult } from './result/ReturnExecutionResult';
import { ShortCircuitExecutionResult } from './result/ShortCircuitExecutionResult';

export class ExecutionBlock extends ExecutionAtom {
  constructor(public readonly atoms: ExecutionAtom[]) {
    super();
  }

  public execute(state: ExecutionState): ExecutionResult {
    for (const atom of this.atoms) {
      const res = atom.execute(state);
      if (res instanceof ShortCircuitExecutionResult) {
        return res;
      }
    }

    return new FinishedExecutionResult();
  }
}

export class NativeExecutionBlock<
  T extends number | string | boolean | void | null | undefined,
> extends ExecutionBlock {
  constructor(public readonly func: (state: ExecutionState) => T) {
    super([]);
  }

  public execute(state: ExecutionState): ExecutionResult {
    return new ReturnExecutionResult(createValueFromNative(this.func(state)));
  }
}
