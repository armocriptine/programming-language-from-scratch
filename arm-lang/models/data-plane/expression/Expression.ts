import { ExecutionState } from 'arm-lang/runtime/ExecutionState';
import { Value } from '../value/Value';

export abstract class Expression<TValue extends Value = Value> {
  public abstract evaluate(state: ExecutionState): TValue;
}
