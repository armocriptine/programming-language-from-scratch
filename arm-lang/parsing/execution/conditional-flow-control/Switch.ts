import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import { Switch } from 'arm-lang/models/control-plane/flow-controls/conditional/Switch';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import {
  MarkerSymbol,
  NonterminalGrammarSymbol,
  NullableSymbol,
  RepeatingSymbol,
} from 'arm-lang/parsing/core';
import { RootExpressionSymbol } from 'arm-lang/parsing/expression/RootExpressionSymbol';
import { SemicolonSeparatorSymbol } from 'arm-lang/parsing/separators/CommaSeparator';
import {
  CloseCurlyBracketSymbol,
  OpenCurlyBracketSymbol,
} from 'arm-lang/parsing/terminals/Brackets';
import { EnclosedExecutionBlockSymbol } from '../code-block/RootExecutionBlock';

type Case = {
  cond: Expression;
  block: ExecutionBlock;
};

class SwitchKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('เลือก');
  }
}

class CaseKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('กรณี');
  }
}

class DefaultKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ไม่เข้าพวก');
  }
}

export class SwitchSymbol extends NonterminalGrammarSymbol<Switch> {
  public rule = [
    () => new SwitchKeywordSymbol(),
    () => new RootExpressionSymbol(),
    () => new OpenCurlyBracketSymbol(),
    () => new CaseListSymbol(),
    () => new CloseCurlyBracketSymbol(),
    () => new NullableSymbol(() => new DefaultCaseSymbol()),
  ];
  protected _parse([, exp, , cases, def]: [
    'switch',
    Expression,
    '{',
    Case[],
    ExecutionBlock | null,
    '}',
  ]): Switch {
    return new Switch(
      cases.map(({ cond, block }) => [cond, block]),
      def,
      exp,
    );
  }
}

class CaseListSymbol extends RepeatingSymbol<Case> {
  constructor() {
    super(
      () => new SemicolonSeparatorSymbol(),
      () => new CaseSymbol(),
    );
  }
}

class CaseSymbol extends NonterminalGrammarSymbol<Case> {
  public rule = [
    () => new CaseKeywordSymbol(),
    () => new RootExpressionSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
  ];
  protected _parse([, cond, block]: ['case', Expression, ExecutionBlock]): {
    cond: Expression;
    block: ExecutionBlock;
  } {
    return { cond, block };
  }
}

class DefaultCaseSymbol extends NonterminalGrammarSymbol<ExecutionBlock> {
  public rule = [
    () => new DefaultKeywordSymbol(),
    () => new EnclosedExecutionBlockSymbol(),
  ];

  protected _parse([, block]: ['default', ExecutionBlock]): ExecutionBlock {
    return block;
  }
}
