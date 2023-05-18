import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { UnionGrammarSymbol } from 'arm-lang/parsing/core';
import { ExpressionGroupSymbol } from '../ExpressionGroup';
import { ArrayIndexAccessSymbol } from './ArrayIndexAccess';
import { FunctionCallSymbol } from './FunctionCall';
import { UnaryArrayOperationSymbol } from './UnaryArrayOperation';
import { VariableAccessSymbol } from './VariableAccess';

export class RootCommonExpressionSymbol extends UnionGrammarSymbol<Expression> {
  constructor() {
    super([
      () => new CommonExpressionGroupSymbol(),
      () => new ArrayIndexAccessSymbol(),
      () => new FunctionCallSymbol(),
      () => new VariableAccessSymbol(),
      () => new UnaryArrayOperationSymbol(),
    ]);
  }
}

export class CommonExpressionGroupSymbol extends ExpressionGroupSymbol<Expression> {
  constructor() {
    super(() => new RootCommonExpressionSymbol());
  }
}
