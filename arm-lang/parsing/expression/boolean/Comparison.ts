import {
  Comparator,
  Comparison,
} from 'arm-lang/models/data-plane/expression/common/Comparison';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { NonterminalGrammarSymbol, ValueMapSymbol } from 'arm-lang/parsing/core';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootExpressionSymbol } from '../RootExpressionSymbol';

export class ComparatorSymbol extends ValueMapSymbol<Comparator> {
  constructor() {
    super(new Map([['==', Comparator.Equal]]));
  }
}

export class ComparisonSymbol extends NonterminalGrammarSymbol<Comparison> {
  public rule = [
    () => new RootExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new ComparatorSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RootExpressionSymbol(),
  ];
  protected _parse([leftOperand, , comparator, , rightOperand]: [
    Expression,
    ' ',
    Comparator,
    ' ',
    Expression,
  ]): Comparison {
    return new Comparison(leftOperand, rightOperand, comparator);
  }
}
