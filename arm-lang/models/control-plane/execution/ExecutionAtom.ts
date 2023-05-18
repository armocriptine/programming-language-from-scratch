import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { ExecutionResult } from './result/ExecutionResult';

export abstract class ExecutionAtom {
  public abstract execute(state: ExecutionState): ExecutionResult;
}
