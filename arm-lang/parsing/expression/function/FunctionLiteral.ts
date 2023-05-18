import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import { Return } from 'arm-lang/models/control-plane/flow-controls/functional/Return';
import { ConstantExpression } from 'arm-lang/models/data-plane/expression/common/Constant';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { Func } from 'arm-lang/models/data-plane/value/Func';
import {
  NonterminalGrammarSymbol,
  NullableSymbol,
  RepeatingParseResult,
  RepeatingSymbol,
  UnionGrammarSymbol,
} from 'arm-lang/parsing/core';
import { EnclosedExecutionBlockSymbol } from 'arm-lang/parsing/execution/code-block/RootExecutionBlock';
import { CommaSeparatorSymbol } from 'arm-lang/parsing/separators/CommaSeparator';
import { RightArrowSymbol } from 'arm-lang/parsing/terminals/Arrow';
import {
  CloseParenthesisSymbol,
  OpenParenthesisSymbol,
} from 'arm-lang/parsing/terminals/Parentheses';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { IdentifierSymbol } from '../identifier/Identifier';
import { RootExpressionSymbol } from '../RootExpressionSymbol';

class ParamListSymbol extends RepeatingSymbol<string, unknown> {
  constructor() {
    super(
      () => new CommaSeparatorSymbol(),
      () => new IdentifierSymbol(),
    );
  }
}

export class FunctionLiteralSymbol extends NonterminalGrammarSymbol<
  Expression<Func>
> {
  public rule = [
    () => new OpenParenthesisSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new NullableSymbol(() => new ParamListSymbol()),
    () => new NullableWhitespaceSymbol(),
    () => new CloseParenthesisSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RightArrowSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new FunctionImpl(),
  ];
  protected _parse([, , params, , , , , , impl]: [
    '(',
    ' ',
    RepeatingParseResult<string> | null,
    ' ',
    ')',
    ' ',
    '->',
    ' ',
    ExecutionBlock | Expression,
  ]): Expression<Func> {
    return new ConstantExpression(
      new Func(
        params?.contents ?? [],
        impl instanceof ExecutionBlock
          ? impl
          : new ExecutionBlock([new Return(impl)]),
      ),
    );
  }
}

class FunctionImpl extends UnionGrammarSymbol<ExecutionBlock | Expression> {
  constructor() {
    super([
      () => new EnclosedExecutionBlockSymbol(),
      () => new RootExpressionSymbol(),
    ]);
  }
}
