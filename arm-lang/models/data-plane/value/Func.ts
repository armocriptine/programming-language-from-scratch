import { ExecutionBlock } from '../../control-plane/execution/ExecutionBlock';
import { Value } from './Value';

export class Func extends Value {
  constructor(
    public readonly paramList: string[],
    public readonly executionBlock: ExecutionBlock,
  ) {
    super();
  }

  public equals(): boolean {
    return false;
  }
}
