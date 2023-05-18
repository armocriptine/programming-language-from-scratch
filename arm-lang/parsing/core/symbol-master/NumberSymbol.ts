import { Acceptance } from '../Acceptance';
import { Expectation } from '../Expectation';
import {
  NonterminalGrammarSymbol,
  TerminalGrammarSymbol,
} from '../GrammarSymbol';
import { SyntaxLeaf } from '../SyntaxTree';
import { MarkerSymbol } from './MarkerSymbol';

export class NumberSymbol extends TerminalGrammarSymbol<number> {
  public display = '<number>';
  public parse(text: string): SyntaxLeaf<number> {
    const str = Array.from(
      /^[0-9]+(\.[0-9]+)?/.exec(text)?.values() ?? [''],
    )[0];
    const number = parseFloat(str);
    if (Number.isFinite(number) && !Number.isNaN(number)) {
      return new SyntaxLeaf(
        this,
        new Acceptance(this, str.length, number),
        null,
        str,
      );
    }

    return new SyntaxLeaf(
      this,
      null,
      new Expectation(this, 0, ['<number>']),
      text,
    );
  }
}

export class IntegerSymbol extends TerminalGrammarSymbol<number> {
  public display = '<integer>';
  public parse(text: string): SyntaxLeaf<number> {
    const str = Array.from(/^[0-9]+/.exec(text)?.values() ?? [''])[0];
    const number = parseInt(str);
    if (
      Number.isFinite(number) &&
      !Number.isNaN(number) &&
      Number.isInteger(number)
    ) {
      return new SyntaxLeaf(
        this,
        new Acceptance(this, str.length, number),
        null,
        str,
      );
    }

    return new SyntaxLeaf(
      this,
      null,
      new Expectation(this, 0, ['<number>']),
      text,
    );
  }
}

export class IntegerRangeSymbol extends NonterminalGrammarSymbol<
  [number, number]
> {
  public rule = [
    () => new IntegerSymbol(),
    () => new MarkerSymbol('-'),
    () => new IntegerSymbol(),
  ];
  protected _parse([value1, , value2]: [number, '-', number]): [
    number,
    number,
  ] {
    return [value1, value2];
  }
}
