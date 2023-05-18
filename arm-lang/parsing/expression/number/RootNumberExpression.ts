import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { NumberValue } from 'arm-lang/models/data-plane/value/NumberValue';
import { UnionGrammarSymbol } from 'arm-lang/parsing/core';
import { RootCommonExpressionSymbol } from '../common/RootCommonSymbol';
import { ExpressionGroupSymbol } from '../ExpressionGroup';
import {
  FirstRankBinaryArithmeticOperationSymbol,
  SecondRankBinaryArithmeticOperationSymbol,
} from './BinaryArithmeticOperation';
import { NumberLiteralSymbol } from './NumberLiteral';
import { UnaryArithmeticOperationSymbol } from './UnaryArithmeticOperation';

export class RootNumberExpressionSymbol extends UnionGrammarSymbol<
  Expression<NumberValue>
> {
  constructor() {
    super([
      () => new GroupedNumberExpression(),
      () => new FirstRankBinaryArithmeticOperationSymbol(),
      () => new SecondRankBinaryArithmeticOperationSymbol(),
      () => new UnaryArithmeticOperationSymbol(),
      () => new NumberLiteralSymbol(),
      () => new RootCommonExpressionSymbol(),
    ]);
  }
}

export class GroupedNumberExpression extends ExpressionGroupSymbol<
  Expression<NumberValue>
> {
  constructor() {
    super(() => new RootNumberExpressionSymbol());
  }
}
