import { BreakingAtom } from '../../execution/BreakingAtom';
import { BreakExecutionResult } from '../../execution/result/BreakExecutionResult';

export class Break extends BreakingAtom {
  constructor() {
    super();
  }

  public execute(): BreakExecutionResult {
    return new BreakExecutionResult();
  }
}
