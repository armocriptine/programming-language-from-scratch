import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import { For } from 'arm-lang/models/control-plane/flow-controls/iterative/For';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { NumberValue } from 'arm-lang/models/data-plane/value/NumberValue';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { IdentifierSymbol } from 'arm-lang/parsing/expression/identifier/Identifier';
import { RootNumberExpressionSymbol } from 'arm-lang/parsing/expression/number/RootNumberExpression';
import {
  NullableWhitespaceSymbol,
  WhitespaceSymbol,
} from 'arm-lang/parsing/terminals/Whitespace';
import { EnclosedExecutionBlockSymbol } from '../code-block/RootExecutionBlock';

class ForKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('วน');
  }
}

class FromKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ตั้งแต่');
  }
}

class ToKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ถึง');
  }
}

class StepKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ทีละ');
  }
}

export class ForSymbol extends NonterminalGrammarSymbol<For> {
  public rule = [
    () => new ForKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new IdentifierSymbol(),
    () => new WhitespaceSymbol(),
    () => new FromKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootNumberExpressionSymbol(),
    () => new WhitespaceSymbol(),
    () => new ToKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootNumberExpressionSymbol(),
    () => new WhitespaceSymbol(),
    () => new StepKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootNumberExpressionSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
  ];
  protected _parse([, , varName, , , , from, , , , to, , , , step, , block]: [
    'for',
    ' ',
    string,
    ' ',
    'from',
    ' ',
    Expression<NumberValue>,
    ' ',
    'to',
    ' ',
    Expression<NumberValue>,
    ' ',
    'step',
    ' ',
    Expression<NumberValue>,
    ' ',
    ExecutionBlock,
  ]): For {
    return new For(block, varName, from, step, to);
  }
}
