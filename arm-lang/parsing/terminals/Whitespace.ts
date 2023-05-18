import {
  Acceptance,
  Expectation,
  GrammarSymbol,
  NonterminalGrammarSymbol,
  NullableSymbol,
  SyntaxLeaf,
  TerminalGrammarSymbol,
} from '../core';

export class WhitespaceSymbol extends TerminalGrammarSymbol<null> {
  public parse(text: string): SyntaxLeaf<null> {
    const captured = /^\s+/.exec(text)?.[0];
    if (!captured) {
      return new SyntaxLeaf(
        this,
        null,
        new Expectation(this, 0, ['<whitespace>']),
        text,
      );
    }
    return new SyntaxLeaf(
      this,
      new Acceptance(this, captured?.length, null),
      null,
      captured,
    );
  }
}

export class NullableWhitespaceSymbol extends NonterminalGrammarSymbol<null> {
  public rule = [() => new NullableSymbol(() => new WhitespaceSymbol())];
  protected _parse(): null {
    return null;
  }
}

export class NullableWhitespaceWrapperSymbol<
  T,
> extends NonterminalGrammarSymbol<T> {
  public rule: (() => GrammarSymbol<unknown>)[];

  constructor(subsymbol: () => GrammarSymbol<T>) {
    super();
    this.rule = [
      () => new NullableWhitespaceSymbol(),
      subsymbol,
      () => new NullableWhitespaceSymbol(),
    ];
  }

  protected _parse([, parsed]: [' ', T, ' ']): T {
    return parsed;
  }
}
