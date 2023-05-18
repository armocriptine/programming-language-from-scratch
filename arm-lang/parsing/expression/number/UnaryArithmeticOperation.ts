import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import {
  UnaryArithmeticOperation,
  UnaryArithmeticOperator,
} from 'arm-lang/models/data-plane/expression/number/UnaryArithmeticOperation';
import { NumberValue } from 'arm-lang/models/data-plane/value/NumberValue';
import { NonterminalGrammarSymbol, ValueMapSymbol } from '../../core';
import { RootNumberExpressionSymbol } from './RootNumberExpression';

class UnaryArithmeticOperatorSymbol extends ValueMapSymbol<UnaryArithmeticOperator> {
  constructor() {
    super(new Map([['-', UnaryArithmeticOperator.Negate]]));
  }
}

export class UnaryArithmeticOperationSymbol extends NonterminalGrammarSymbol<UnaryArithmeticOperation> {
  public rule = [
    () => new UnaryArithmeticOperatorSymbol(),
    () => new RootNumberExpressionSymbol(),
  ];
  protected _parse([operator, operand]: [
    UnaryArithmeticOperator,
    Expression<NumberValue>,
  ]): UnaryArithmeticOperation {
    return new UnaryArithmeticOperation(operand, operator);
  }
}
