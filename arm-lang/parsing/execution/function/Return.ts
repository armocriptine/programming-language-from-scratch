import { Return } from 'arm-lang/models/control-plane/flow-controls/functional/Return';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { RootExpressionSymbol } from 'arm-lang/parsing/expression/RootExpressionSymbol';
import { WhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';

class ReturnKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('คืน');
  }
}

export class ReturnSymbol extends NonterminalGrammarSymbol<Return> {
  public rule = [
    () => new ReturnKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootExpressionSymbol(),
  ];
  protected _parse([, , exp]: ['return', ' ', Expression]): Return {
    return new Return(exp);
  }
}
