import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { StringValue } from 'arm-lang/models/data-plane/value/StringValue';
import { UnionGrammarSymbol } from 'arm-lang/parsing/core';
import { RootCommonExpressionSymbol } from '../common/RootCommonSymbol';
import { ExpressionGroupSymbol } from '../ExpressionGroup';
import { BinaryStringOperationSymbol } from './BinaryStringOperationSymbol';
import { StringLiteralSymbol } from './StringLiteral';

export class RootStringExpressionSymbol extends UnionGrammarSymbol<
  Expression<StringValue>
> {
  constructor() {
    super([
      () => new StringExpressionGroupSymbol(),
      () => new BinaryStringOperationSymbol(),
      () => new StringLiteralSymbol(),
      () => new RootCommonExpressionSymbol(),
    ]);
  }
}

export class StringExpressionGroupSymbol extends ExpressionGroupSymbol<
  Expression<StringValue>
> {
  constructor() {
    super(() => new RootStringExpressionSymbol());
  }
}
