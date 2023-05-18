import {
  UnaryArrayOperation,
  UnaryArrayOperator,
} from 'arm-lang/models/data-plane/expression/array/UnaryArrayOperation';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ArrayValue } from 'arm-lang/models/data-plane/value/ArrayValue';
import { NonterminalGrammarSymbol, ValueMapSymbol } from 'arm-lang/parsing/core';
import { RootArrayExpressionSymbol } from '../array/RootArrayExpression';

export class UnaryArrayOperatorSymbol extends ValueMapSymbol<UnaryArrayOperator> {
  constructor() {
    super(new Map([['#', UnaryArrayOperator.Count]]));
  }
}

export class UnaryArrayOperationSymbol extends NonterminalGrammarSymbol<UnaryArrayOperation> {
  public rule = [
    () => new UnaryArrayOperatorSymbol(),
    () => new RootArrayExpressionSymbol(),
  ];
  protected _parse([operator, operand]: [
    UnaryArrayOperator,
    Expression<ArrayValue>,
  ]): UnaryArrayOperation {
    return new UnaryArrayOperation(operand, operator);
  }
}
