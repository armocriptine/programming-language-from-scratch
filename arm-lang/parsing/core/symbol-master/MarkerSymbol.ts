import { Acceptance } from '../Acceptance';
import { Expectation } from '../Expectation';
import { TerminalGrammarSymbol } from '../GrammarSymbol';
import { SyntaxLeaf } from '../SyntaxTree';

export class MarkerSymbol extends TerminalGrammarSymbol<string> {
  public parse(text: string): SyntaxLeaf<string> {
    if (text.toLowerCase().startsWith(this.text.toLowerCase())) {
      return new SyntaxLeaf(
        this,
        new Acceptance(this, this.text.length, this.text),
        null,
        text.substring(0, this.text.length),
      );
    } else {
      return new SyntaxLeaf(
        this,
        null,
        new Expectation(this, 0, [this.text]),
        text.substring(0, this.text.length),
      );
    }
  }

  constructor(public readonly text: string) {
    super();
  }
}

export class SpaceSymbol extends MarkerSymbol {
  constructor() {
    super(' ');
  }
}
