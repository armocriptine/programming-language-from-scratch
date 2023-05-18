import { Continue } from 'arm-lang/models/control-plane/flow-controls/iterative/Continue';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';

class ContinueKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('เด้ง');
  }
}

export class ContinueSymbol extends NonterminalGrammarSymbol<Continue> {
  public rule = [() => new ContinueKeywordSymbol()];
  protected _parse(): Continue {
    return new Continue();
  }
}
