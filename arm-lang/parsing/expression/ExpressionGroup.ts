import { GrammarSymbol, NonterminalGrammarSymbol } from '../core';
import {
  CloseParenthesisSymbol,
  OpenParenthesisSymbol,
} from '../terminals/Parentheses';
import { NullableWhitespaceSymbol } from '../terminals/Whitespace';

export abstract class ExpressionGroupSymbol<
  T,
> extends NonterminalGrammarSymbol<T> {
  public rule: (() => GrammarSymbol<unknown>)[];

  constructor(public readonly subsymbol: () => GrammarSymbol<T>) {
    super();
    this.rule = [
      () => new OpenParenthesisSymbol(),
      () => new NullableWhitespaceSymbol(),
      subsymbol,
      () => new NullableWhitespaceSymbol(),
      () => new CloseParenthesisSymbol(),
    ];
  }

  protected _parse([, , parsed]: ['(', ' ', T, ' ', ')']): T {
    return parsed;
  }
}
