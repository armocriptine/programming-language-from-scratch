import { VariableAccess } from "arm-lang/models/data-plane/expression/variable/VariableAccess";
import { NonterminalGrammarSymbol } from "arm-lang/parsing/core";
import { IdentifierSymbol } from "../identifier/Identifier";

export class VariableAccessSymbol extends NonterminalGrammarSymbol<VariableAccess> {
  public rule = [() => new IdentifierSymbol()];
  protected _parse([varName]: [string]): VariableAccess {
    return new VariableAccess(varName);
  }
}
