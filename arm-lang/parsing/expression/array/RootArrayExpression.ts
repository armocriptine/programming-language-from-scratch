import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ArrayValue } from 'arm-lang/models/data-plane/value/ArrayValue';
import { UnionGrammarSymbol } from 'arm-lang/parsing/core';
import { RootCommonExpressionSymbol } from '../common/RootCommonSymbol';
import { ExpressionGroupSymbol } from '../ExpressionGroup';
import { ArrayLiteralSymbol } from './ArrayLiteral';
import { BinaryArrayOperationSymbol } from './BinaryArrayOperation';

export class RootArrayExpressionSymbol extends UnionGrammarSymbol<
  Expression<ArrayValue>
> {
  constructor() {
    super([
      () => new ArrayExpressionGroupSymbol(),
      () => new BinaryArrayOperationSymbol(),
      () => new ArrayLiteralSymbol(),
      () => new RootCommonExpressionSymbol(),
    ]);
  }
}

export class ArrayExpressionGroupSymbol extends ExpressionGroupSymbol<
  Expression<ArrayValue>
> {
  constructor() {
    super(() => new RootArrayExpressionSymbol());
  }
}
