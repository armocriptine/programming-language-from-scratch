import {
  Acceptance,
  Expectation,
  SyntaxLeaf,
  TerminalGrammarSymbol,
} from "arm-lang/parsing/core";

export class IdentifierSymbol extends TerminalGrammarSymbol<string> {
  public parse(text: string): SyntaxLeaf<string> {
    const captured = /^[A-Za-zก-๙_][0-9A-Za-zก-๙_]*/.exec(text)?.[0];
    if (captured == null) {
      return new SyntaxLeaf(
        this,
        null,
        new Expectation(this, 0, ["<identifier>"]),
        text
      );
    }

    return new SyntaxLeaf(
      this,
      new Acceptance(this, captured.length, captured),
      null,
      captured
    );
  }
}
