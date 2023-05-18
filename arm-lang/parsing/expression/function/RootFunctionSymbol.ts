import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { Func } from 'arm-lang/models/data-plane/value/Func';
import { UnionGrammarSymbol } from 'arm-lang/parsing/core';
import { RootCommonExpressionSymbol } from '../common/RootCommonSymbol';
import { ExpressionGroupSymbol } from '../ExpressionGroup';
import { FunctionLiteralSymbol } from './FunctionLiteral';

export class RootFunctionExpressionSymbol extends UnionGrammarSymbol<
  Expression<Func>
> {
  constructor() {
    super([
      () => new FunctionLiteralSymbol(),
      () => new FunctionExpressionGroupSymbol(),
      () => new RootCommonExpressionSymbol(),
    ]);
  }
}

export class FunctionExpressionGroupSymbol extends ExpressionGroupSymbol<
  Expression<Func>
> {
  constructor() {
    super(() => new RootFunctionExpressionSymbol());
  }
}
