import {
  BinaryArrayOperation,
  BinaryArrayOperator,
} from 'arm-lang/models/data-plane/expression/array/BinaryArrayOperation';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ArrayValue } from 'arm-lang/models/data-plane/value/ArrayValue';
import { NonterminalGrammarSymbol, ValueMapSymbol } from 'arm-lang/parsing/core';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootArrayExpressionSymbol } from './RootArrayExpression';

export class BinaryArrayOperatorSymbol extends ValueMapSymbol<BinaryArrayOperator> {
  constructor() {
    super(new Map([['..', BinaryArrayOperator.Append]]));
  }
}

export class BinaryArrayOperationSymbol extends NonterminalGrammarSymbol<BinaryArrayOperation> {
  public rule = [
    () => new RootArrayExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new BinaryArrayOperatorSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RootArrayExpressionSymbol(),
  ];
  protected _parse([leftOperand, , operator, , rightOperand]: [
    Expression<ArrayValue>,
    ' ',
    BinaryArrayOperator,
    ' ',
    Expression<ArrayValue>,
  ]): BinaryArrayOperation {
    return new BinaryArrayOperation(leftOperand, rightOperand, operator);
  }
}
