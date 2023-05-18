import { BreakingAtom } from '../../execution/BreakingAtom';
import { ContinueExecutionResult } from '../../execution/result/ContinueExecutionResult';

export class Continue extends BreakingAtom {
  constructor() {
    super();
  }

  public execute(): ContinueExecutionResult {
    return new ContinueExecutionResult();
  }
}
