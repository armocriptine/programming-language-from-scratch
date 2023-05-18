import { Acceptance } from '../Acceptance';
import { Expectation } from '../Expectation';
import { TerminalGrammarSymbol } from '../GrammarSymbol';
import { SyntaxLeaf } from '../SyntaxTree';

export class FreeTextSymbol extends TerminalGrammarSymbol<string> {
  constructor(public readonly ending: string) {
    super();
  }

  public display = '<any>';
  public parse(text: string): SyntaxLeaf<string> {
    const cropped = text.substring(0, text.indexOf(this.ending));
    if (cropped.length === 0) {
      return new SyntaxLeaf(
        this,
        null,
        new Expectation(this, 0, ['<free-text>']),
        cropped,
      );
    }

    return new SyntaxLeaf(
      this,
      new Acceptance(this, cropped.length, cropped),
      null,
      cropped,
    );
  }
}
