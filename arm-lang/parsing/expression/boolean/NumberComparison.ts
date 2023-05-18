import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import {
  NumberComparator,
  NumberComparison,
} from 'arm-lang/models/data-plane/expression/number/NumberComparison';
import { NumberValue } from 'arm-lang/models/data-plane/value/NumberValue';
import { NonterminalGrammarSymbol, ValueMapSymbol } from 'arm-lang/parsing/core';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootNumberExpressionSymbol } from '../number/RootNumberExpression';

export class NumberComparatorSymbol extends ValueMapSymbol<NumberComparator> {
  constructor() {
    super(
      new Map([
        ['>', NumberComparator.GreaterThan],
        ['>=', NumberComparator.GreaterThanOrEqual],
        ['<', NumberComparator.LessThan],
        ['<=', NumberComparator.LessThanOrEqual],
      ]),
    );
  }
}

export class NumberComparisonSymbol extends NonterminalGrammarSymbol<NumberComparison> {
  public rule = [
    () => new RootNumberExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new NumberComparatorSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RootNumberExpressionSymbol(),
  ];
  protected _parse([leftOperand, , comparator, , rightOperand]: [
    Expression<NumberValue>,
    ' ',
    NumberComparator,
    ' ',
    Expression<NumberValue>,
  ]): NumberComparison {
    return new NumberComparison(leftOperand, rightOperand, comparator);
  }
}
