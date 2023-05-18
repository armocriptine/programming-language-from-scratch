import { Break } from 'arm-lang/models/control-plane/flow-controls/iterative/Break';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';

class BreakKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('หยุด');
  }
}

export class BreakSymbol extends NonterminalGrammarSymbol<Break> {
  public rule = [() => new BreakKeywordSymbol()];
  protected _parse(): Break {
    return new Break();
  }
}
