import { Value } from 'arm-lang/models/data-plane/value/Value';
import { ShortCircuitExecutionResult } from './ShortCircuitExecutionResult';

export class ReturnExecutionResult extends ShortCircuitExecutionResult {
  constructor(public readonly returnValue: Value) {
    super();
  }
}
