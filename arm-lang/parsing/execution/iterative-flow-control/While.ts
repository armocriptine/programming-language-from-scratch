import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import { While } from 'arm-lang/models/control-plane/flow-controls/iterative/While';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { RootBooleanExpressionSymbol } from 'arm-lang/parsing/expression/boolean/RootBooleanExpression';
import {
  NullableWhitespaceSymbol,
  WhitespaceSymbol,
} from 'arm-lang/parsing/terminals/Whitespace';
import { EnclosedExecutionBlockSymbol } from '../code-block/RootExecutionBlock';

export class WhileKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ตราบเท่าที่');
  }
}

export class WhileSymbol extends NonterminalGrammarSymbol<While> {
  public rule = [
    () => new WhileKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootBooleanExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
  ];
  protected _parse([, , condition, , block]: [
    'while',
    ' ',
    Expression<BooleanValue>,
    ' ',
    ExecutionBlock,
  ]): While {
    return new While(block, condition);
  }
}
