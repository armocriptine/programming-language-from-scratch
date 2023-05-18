import { NonterminalGrammarSymbol, NullableSymbol } from '../core';
import { CommaSymbol, SemicolonSymbol } from '../terminals/Comma';
import { WhitespaceSymbol } from '../terminals/Whitespace';

export class CommaSeparatorSymbol extends NonterminalGrammarSymbol<null> {
  public rule = [
    () => new NullableSymbol(() => new WhitespaceSymbol()),
    () => new CommaSymbol(),
    () => new NullableSymbol(() => new WhitespaceSymbol()),
  ];
  protected _parse(): null {
    return null;
  }
}

export class SemicolonSeparatorSymbol extends NonterminalGrammarSymbol<null> {
  public rule = [
    () => new NullableSymbol(() => new WhitespaceSymbol()),
    () => new SemicolonSymbol(),
    () => new NullableSymbol(() => new WhitespaceSymbol()),
  ];
  protected _parse(): null {
    return null;
  }
}
