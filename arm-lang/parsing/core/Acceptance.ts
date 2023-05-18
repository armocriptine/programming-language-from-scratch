import { GrammarSymbol } from './GrammarSymbol';

export class Acceptance<T> {
  constructor(
    public readonly symbol: GrammarSymbol<T>,
    public readonly consumed: number,
    public readonly result: T,
  ) {}

  public addOffset(offset: number): Acceptance<T> {
    return new Acceptance(this.symbol, this.consumed + offset, this.result);
  }
}
