import {
  UnaryBooleanOperation,
  UnaryBooleanOperator,
} from 'arm-lang/models/data-plane/expression/boolean/UnaryBooleanOperator';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import { NonterminalGrammarSymbol, ValueMapSymbol } from 'arm-lang/parsing/core';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootBooleanExpressionSymbol } from './RootBooleanExpression';

export class UnaryBooleanOperatorSymbol extends ValueMapSymbol<UnaryBooleanOperator> {
  constructor() {
    super(new Map([['ไม่', UnaryBooleanOperator.Negate]]));
  }
}

export class UnaryBooleanOperationSymbol extends NonterminalGrammarSymbol<UnaryBooleanOperation> {
  public rule = [
    () => new UnaryBooleanOperatorSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RootBooleanExpressionSymbol(),
  ];
  protected _parse([operator, , operand]: [
    UnaryBooleanOperator,
    ' ',
    Expression<BooleanValue>,
  ]): UnaryBooleanOperation {
    return new UnaryBooleanOperation(operand, operator);
  }
}
