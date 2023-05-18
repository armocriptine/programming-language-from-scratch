import { GrammarSymbol } from './GrammarSymbol';

export class ParsingContext {
  constructor(public readonly leftTraversedSymbol: GrammarSymbol<unknown>[]) {}

  public appendNonterminals(nt: GrammarSymbol<unknown>[]): ParsingContext {
    return new ParsingContext([...this.leftTraversedSymbol, ...nt]);
  }

  public isLeftTraversed(symbol: GrammarSymbol<unknown>): boolean {
    return this.leftTraversedSymbol.some((x) => x.equals(symbol));
  }
}
