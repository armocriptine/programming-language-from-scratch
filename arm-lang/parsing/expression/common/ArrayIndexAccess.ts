import { ArrayIndexAccess } from 'arm-lang/models/data-plane/expression/array/ArrayAccess';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ArrayValue } from 'arm-lang/models/data-plane/value/ArrayValue';
import { NumberValue } from 'arm-lang/models/data-plane/value/NumberValue';
import { NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import {
  CloseSquareBracketSymbol,
  OpenSquareBracketSymbol,
} from 'arm-lang/parsing/terminals/Brackets';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootArrayExpressionSymbol } from '../array/RootArrayExpression';
import { RootNumberExpressionSymbol } from '../number/RootNumberExpression';

export class ArrayIndexAccessSymbol extends NonterminalGrammarSymbol<ArrayIndexAccess> {
  public rule = [
    () => new RootArrayExpressionSymbol(),
    () => new OpenSquareBracketSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new RootNumberExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new CloseSquareBracketSymbol(),
  ];
  protected _parse([array, , , index]: [
    Expression<ArrayValue>,
    '[',
    ' ',
    Expression<NumberValue>,
    ' ',
    ']',
  ]): ArrayIndexAccess {
    return new ArrayIndexAccess(array, index);
  }
}
