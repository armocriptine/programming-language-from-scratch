import { FunctionCallAtom } from 'arm-lang/models/control-plane/flow-controls/functional/FunctionCall';
import { FunctionCall } from 'arm-lang/models/data-plane/expression/function/FunctionCall';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { FunctionCallSymbol } from 'arm-lang/parsing/expression/common/FunctionCall';

class CallKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('เรียก');
  }
}

export class FunctionCallExecSymbol extends NonterminalGrammarSymbol<FunctionCallAtom> {
  public rule = [() => new FunctionCallSymbol()];
  protected _parse([funcCall]: [FunctionCall]): FunctionCallAtom {
    return new FunctionCallAtom(funcCall);
  }
}
