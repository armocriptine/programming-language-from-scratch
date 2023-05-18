import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import {
  BinaryStringOperation,
  BinaryStringOperator,
} from 'arm-lang/models/data-plane/expression/string/BinaryStringOperation';
import { StringValue } from 'arm-lang/models/data-plane/value/StringValue';
import { NonterminalGrammarSymbol, ValueMapSymbol } from 'arm-lang/parsing/core';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootStringExpressionSymbol } from './RootStringExpressionSymbol';

class BinaryStringOperatorSymbol extends ValueMapSymbol<BinaryStringOperator> {
  constructor() {
    super(new Map([['--', BinaryStringOperator.Concat]]));
  }
}

export class BinaryStringOperationSymbol extends NonterminalGrammarSymbol<BinaryStringOperation> {
  public rule = [
    () => new RootStringExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new BinaryStringOperatorSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RootStringExpressionSymbol(),
  ];
  protected _parse([leftOperand, , operator, , rightOperand]: [
    Expression<StringValue>,
    ' ',
    BinaryStringOperator,
    ' ',
    Expression<StringValue>,
  ]): BinaryStringOperation {
    return new BinaryStringOperation(leftOperand, rightOperand, operator);
  }
}
