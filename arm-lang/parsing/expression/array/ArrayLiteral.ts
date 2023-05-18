import { ArrayExpression } from 'arm-lang/models/data-plane/expression/array/ArrayExpression';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import {
  NonterminalGrammarSymbol,
  RepeatingParseResult,
  RepeatingSymbol,
} from 'arm-lang/parsing/core';
import { CommaSeparatorSymbol } from 'arm-lang/parsing/separators/CommaSeparator';
import {
  CloseSquareBracketSymbol,
  OpenSquareBracketSymbol,
} from 'arm-lang/parsing/terminals/Brackets';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootExpressionSymbol } from '../RootExpressionSymbol';

export class ArrayMemberListSymbol extends RepeatingSymbol<Expression> {
  constructor() {
    super(
      () => new CommaSeparatorSymbol(),
      () => new RootExpressionSymbol(),
    );
  }
}

export class ArrayLiteralSymbol extends NonterminalGrammarSymbol<ArrayExpression> {
  public rule = [
    () => new OpenSquareBracketSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new ArrayMemberListSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new CloseSquareBracketSymbol(),
  ];
  protected _parse([, , { contents: members }]: [
    '[',
    ' ',
    RepeatingParseResult<Expression>,
    ' ',
    ']',
  ]): ArrayExpression {
    return new ArrayExpression(members);
  }
}
