import { VariableDeclaration } from 'arm-lang/models/control-plane/variable/VariableDeclaration';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { MarkerSymbol, NonterminalGrammarSymbol } from 'arm-lang/parsing/core';
import { IdentifierSymbol } from 'arm-lang/parsing/expression/identifier/Identifier';
import { RootExpressionSymbol } from 'arm-lang/parsing/expression/RootExpressionSymbol';
import { EqualSymbol } from 'arm-lang/parsing/terminals/EqualSign';
import { WhitespaceSymbol } from 'arm-lang/parsing/terminals/Whitespace';

export class DefKeywordSymbol extends MarkerSymbol {
  constructor() {
    super('ประกาศ');
  }
}

export class VariableDeclarationSymbol extends NonterminalGrammarSymbol<VariableDeclaration> {
  public rule = [
    () => new DefKeywordSymbol(),
    () => new WhitespaceSymbol(),
    () => new IdentifierSymbol(),
    () => new WhitespaceSymbol(),
    () => new EqualSymbol(),
    () => new WhitespaceSymbol(),
    () => new RootExpressionSymbol(),
  ];
  protected _parse([, , varName, , , , value]: [
    'def',
    ' ',
    string,
    ' ',
    '=',
    ' ',
    Expression,
  ]): VariableDeclaration {
    return new VariableDeclaration(varName, value);
  }
}
