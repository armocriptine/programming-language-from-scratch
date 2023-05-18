import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import { UnionGrammarSymbol } from 'arm-lang/parsing/core';
import { RootCommonExpressionSymbol } from '../common/RootCommonSymbol';
import { ExpressionGroupSymbol } from '../ExpressionGroup';
import {
  FirstRankBinaryBooleanOperationSymbol,
  SecondRankBinaryBooleanOperationSymbol,
} from './BinaryBooleanOperation';
import { BooleanLiteralSymbol } from './BooleanLiteral';
import { ComparisonSymbol } from './Comparison';
import { NumberComparisonSymbol } from './NumberComparison';
import { UnaryBooleanOperationSymbol } from './UnaryBooleanOperation';

export class RootBooleanExpressionSymbol extends UnionGrammarSymbol<
  Expression<BooleanValue>
> {
  constructor() {
    super([
      () => new GroupedBooleanExpression(),
      () => new BooleanLiteralSymbol(),
      () => new UnaryBooleanOperationSymbol(),
      () => new FirstRankBinaryBooleanOperationSymbol(),
      () => new SecondRankBinaryBooleanOperationSymbol(),
      () => new NumberComparisonSymbol(),
      () => new ComparisonSymbol(),
      () => new RootCommonExpressionSymbol(),
    ]);
  }
}

export class GroupedBooleanExpression extends ExpressionGroupSymbol<
  Expression<BooleanValue>
> {
  constructor() {
    super(() => new RootBooleanExpressionSymbol());
  }
}
