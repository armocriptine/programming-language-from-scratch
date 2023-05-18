import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import { If } from 'arm-lang/models/control-plane/flow-controls/conditional/If';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import {
  MarkerSymbol,
  NonterminalGrammarSymbol,
  NullableSymbol,
} from 'arm-lang/parsing/core';
import { RootBooleanExpressionSymbol } from 'arm-lang/parsing/expression/boolean/RootBooleanExpression';
import {
  NullableWhitespaceSymbol,
  WhitespaceSymbol,
} from 'arm-lang/parsing/terminals/Whitespace';
import { EnclosedExecutionBlockSymbol } from '../code-block/RootExecutionBlock';

export class IfKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ถ้า');
  }
}

export class ElseKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('มิฉะนั้น');
  }
}

export class IfSymbol extends NonterminalGrammarSymbol<If> {
  public rule = [
    () => new IfKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootBooleanExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
    () => new NullableSymbol(() => new ElseBlockSymbol()),
  ];
  protected _parse([, , condition, , thenBlock, elseBlock]: [
    'if',
    ' ',
    Expression<BooleanValue>,
    ' ',
    ExecutionBlock,
    ExecutionBlock | null,
  ]): If {
    return new If(thenBlock, elseBlock, condition);
  }
}

class ElseBlockSymbol extends NonterminalGrammarSymbol<ExecutionBlock> {
  public rule = [
    () => new NullableWhitespaceSymbol(),
    () => new ElseKeywordSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
  ];
  protected _parse([, , , block]: [
    ' ',
    'else',
    ' ',
    ExecutionBlock,
  ]): ExecutionBlock {
    return block;
  }
}
