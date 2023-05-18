import { VariableAssignment } from 'arm-lang/models/control-plane/variable/VariableAssignment';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { IdentifierSymbol } from 'arm-lang/parsing/expression/identifier/Identifier';
import { RootExpressionSymbol } from 'arm-lang/parsing/expression/RootExpressionSymbol';
import { EqualSymbol } from 'arm-lang/parsing/terminals/EqualSign';
import { WhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';

export class SetKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('กำหนด');
  }
}

export class VariableAssignmentSymbol extends NonterminalGrammarSymbol<VariableAssignment> {
  public rule = [
    () => new SetKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new IdentifierSymbol(),
    () => new WhitespaceSymbol(),
    () => new EqualSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootExpressionSymbol(),
  ];
  protected _parse([, , varName, , , , value]: [
    'set',
    ' ',
    string,
    ' ',
    '=',
    ' ',
    Expression,
  ]): VariableAssignment {
    return new VariableAssignment(varName, value);
  }
}
