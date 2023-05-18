import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import { ForEach } from 'arm-lang/models/control-plane/flow-controls/iterative/ForEach';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { ArrayValue } from 'arm-lang/models/data-plane/value/ArrayValue';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { RootArrayExpressionSymbol } from 'arm-lang/parsing/expression/array/RootArrayExpression';
import { IdentifierSymbol } from 'arm-lang/parsing/expression/identifier/Identifier';
import {
  NullableWhitespaceSymbol,
  WhitespaceSymbol,
} from 'arm-lang/parsing/terminals/Whitespace';
import { EnclosedExecutionBlockSymbol } from '../code-block/RootExecutionBlock';

class ForEachKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('วนแต่ละ');
  }
}

class InKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ใน');
  }
}

export class ForEachSymbol extends NonterminalGrammarSymbol<ForEach> {
  public rule = [
    () => new ForEachKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new IdentifierSymbol(),
    () => new WhitespaceSymbol(),
    () => new InKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootArrayExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
  ];
  protected _parse([, , varName, , , , array, , block]: [
    'foreach',
    ' ',
    string,
    ' ',
    'in',
    ' ',
    Expression<ArrayValue>,
    ' ',
    ExecutionBlock,
  ]): ForEach {
    return new ForEach(array, varName, block);
  }
}
