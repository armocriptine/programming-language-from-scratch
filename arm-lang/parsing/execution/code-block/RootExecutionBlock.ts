import { ExecutionAtom } from 'arm-lang/models/control-plane/execution/ExecutionAtom';
import { ExecutionBlock } from 'arm-lang/models/control-plane/execution/ExecutionBlock';
import {
  NonterminalGrammarSymbol,
  RepeatingParseResult,
  RepeatingSymbol,
} from 'arm-lang/parsing/core';
import { SemicolonSeparatorSymbol } from 'arm-lang/parsing/separators/CommaSeparator';
import {
  CloseCurlyBracketSymbol,
  OpenCurlyBracketSymbol,
} from 'arm-lang/parsing/terminals/Brackets';
import { NullableWhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootExecutionAtomSymbol } from '../RootExecutionAtom';

export class ExecutionBlockSymbol extends NonterminalGrammarSymbol<ExecutionBlock> {
  public rule = [
    () =>
      new (class _RootExecutionBlockSymbol extends RepeatingSymbol<ExecutionAtom> {
        public trailing = true;
        constructor() {
          super(
            () => new SemicolonSeparatorSymbol(),
            () => new RootExecutionAtomSymbol(),
          );
        }
      })(),
  ];
  protected _parse([{ contents }]: [
    RepeatingParseResult<ExecutionAtom>,
  ]): ExecutionBlock {
    return new ExecutionBlock(contents);
  }
}

export class EnclosedExecutionBlockSymbol extends NonterminalGrammarSymbol<ExecutionBlock> {
  public rule = [
    () => new OpenCurlyBracketSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new ExecutionBlockSymbol(),
    () => new NullableWhitespaceSymbol(),
    () => new CloseCurlyBracketSymbol(),
  ];
  protected _parse([, , block]: [
    '{',
    ' ',
    ExecutionBlock,
    ' ',
    '}',
  ]): ExecutionBlock {
    return block;
  }
}
