import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { FunctionCall } from 'arm-lang/models/data-plane/expression/function/FunctionCall';
import { Func } from 'arm-lang/models/data-plane/value/Func';
import {
  NonterminalGrammarSymbol,
  NullableSymbol,
  RepeatingParseResult,
  RepeatingSymbol,
} from 'arm-lang/parsing/core';
import { CommaSeparatorSymbol } from 'arm-lang/parsing/separators/CommaSeparator';
import {
  CloseParenthesisSymbol,
  OpenParenthesisSymbol,
} from 'arm-lang/parsing/terminals/Parentheses';
import { RootFunctionExpressionSymbol } from '../function/RootFunctionSymbol';
import { RootExpressionSymbol } from '../RootExpressionSymbol';

export class FunctionArgListSymbol extends RepeatingSymbol<Expression> {
  constructor() {
    super(
      () => new CommaSeparatorSymbol(),
      () => new RootExpressionSymbol(),
    );
  }
}

export class FunctionCallSymbol extends NonterminalGrammarSymbol<FunctionCall> {
  public rule = [
    () => new RootFunctionExpressionSymbol(),
    () => new OpenParenthesisSymbol(),
    () => new NullableSymbol(() => new FunctionArgListSymbol()),
    () => new CloseParenthesisSymbol(),
  ];
  protected _parse([func, , argList]: [
    Expression<Func>,
    '(',
    RepeatingParseResult<Expression> | null,
    ')',
  ]): FunctionCall {
    return new FunctionCall(func, argList?.contents ?? []);
  }
}
