import { ExecutionAtom } from 'arm-lang/models/control-plane/execution/ExecutionAtom';
import { UnionGrammarSymbol } from '../core';
import { IfSymbol } from './conditional-flow-control/If';
import { SwitchSymbol } from './conditional-flow-control/Switch';
import { FunctionCallExecSymbol } from './function/FunctionCall';
import { ReturnSymbol } from './function/Return';
import { BreakSymbol } from './iterative-flow-control/Break';
import { ContinueSymbol } from './iterative-flow-control/Continue';
import { ForSymbol } from './iterative-flow-control/For';
import { ForEachSymbol } from './iterative-flow-control/ForEach';
import { WhileSymbol } from './iterative-flow-control/While';
import { VariableAssignmentSymbol } from './variable/VariableAssignment';
import { VariableDeclarationSymbol } from './variable/VariableDeclaration';

export class RootExecutionAtomSymbol extends UnionGrammarSymbol<ExecutionAtom> {
  constructor() {
    super([
      () => new ReturnSymbol(),
      () => new BreakSymbol(),
      () => new ContinueSymbol(),
      () => new IfSymbol(),
      () => new SwitchSymbol(),
      () => new ForSymbol(),
      () => new ForEachSymbol(),
      () => new WhileSymbol(),
      () => new FunctionCallExecSymbol(),
      () => new VariableAssignmentSymbol(),
      () => new VariableDeclarationSymbol(),
    ]);
  }
}
