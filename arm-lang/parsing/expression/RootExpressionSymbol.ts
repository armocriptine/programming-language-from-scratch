import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { UnionGrammarSymbol } from '../core';
import { RootArrayExpressionSymbol } from './array/RootArrayExpression';
import { RootBooleanExpressionSymbol } from './boolean/RootBooleanExpression';
import { RootCommonExpressionSymbol } from './common/RootCommonSymbol';
import { RootFunctionExpressionSymbol } from './function/RootFunctionSymbol';
import { NullExpressionSymbol } from './null/NullExpressionSymbol';
import { RootNumberExpressionSymbol } from './number/RootNumberExpression';
import { RootStringExpressionSymbol } from './string/RootStringExpressionSymbol';

export class RootExpressionSymbol extends UnionGrammarSymbol<Expression> {
  constructor() {
    super([
      () => new RootFunctionExpressionSymbol(),
      () => new RootNumberExpressionSymbol(),
      () => new RootBooleanExpressionSymbol(),
      () => new RootStringExpressionSymbol(),
      () => new RootArrayExpressionSymbol(),
      () => new NullExpressionSymbol(),
      () => new RootCommonExpressionSymbol(),
    ]);
  }
}
