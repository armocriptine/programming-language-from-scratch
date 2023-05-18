import { ConstantExpression } from 'arm-lang/models/data-plane/expression/common/Constant';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { StringValue } from 'arm-lang/models/data-plane/value/StringValue';
import { SingleQuoteSymbol } from 'arm-lang/parsing/terminals/Quotes';
import { FreeTextSymbol, NonterminalGrammarSymbol } from '../../core';

export class StringLiteralSymbol extends NonterminalGrammarSymbol<
  Expression<StringValue>
> {
  public rule = [
    () => new SingleQuoteSymbol(),
    () => new FreeTextSymbol("'"),
    () => new SingleQuoteSymbol(),
  ];
  protected _parse([, str]: ["'", string, "'"]): Expression<StringValue> {
    return new ConstantExpression(new StringValue(str));
  }
}
