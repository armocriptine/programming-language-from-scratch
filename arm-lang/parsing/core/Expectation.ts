import { GrammarSymbol } from './GrammarSymbol';

export class Expectation {
  constructor(
    public readonly symbol: GrammarSymbol<unknown>,
    public readonly position: number,
    public readonly codes: string[],
  ) {}

  public addOffset(offset: number): Expectation {
    return new Expectation(this.symbol, this.position + offset, this.codes);
  }

  public removeCodes(codes: string[]): Expectation {
    return new Expectation(
      this.symbol,
      this.position,
      this.codes.filter(
        (code) =>
          !codes.map((c) => c.toLowerCase()).includes(code.toLowerCase()),
      ),
    );
  }
}
