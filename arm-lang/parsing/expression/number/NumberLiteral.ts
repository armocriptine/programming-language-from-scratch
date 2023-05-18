import { ConstantExpression } from 'arm-lang/models/data-plane/expression/common/Constant';
import { NumberValue } from 'arm-lang/models/data-plane/value/NumberValue';
import {
  Acceptance,
  Expectation,
  SyntaxLeaf,
  TerminalGrammarSymbol,
} from '../../core';

export class NumberLiteralSymbol extends TerminalGrammarSymbol<
  ConstantExpression<NumberValue>
> {
  public parse(text: string): SyntaxLeaf<ConstantExpression<NumberValue>> {
    const str = Array.from(
      /^[0-9]+(\.[0-9]+)?/.exec(text)?.values() ?? [''],
    )[0];
    const number = parseFloat(str);
    if (Number.isFinite(number) && !Number.isNaN(number)) {
      return new SyntaxLeaf(
        this,
        new Acceptance(
          this,
          str.length,
          new ConstantExpression(new NumberValue(number)),
        ),
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
