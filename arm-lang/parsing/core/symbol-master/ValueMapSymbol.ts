import { Acceptance } from '../Acceptance';
import { Expectation } from '../Expectation';
import { TerminalGrammarSymbol } from '../GrammarSymbol';
import { SyntaxLeaf } from '../SyntaxTree';

export class ValueMapSymbol<
  ParsedType,
> extends TerminalGrammarSymbol<ParsedType> {
  constructor(public readonly valueMap: Map<string, ParsedType>) {
    super();
  }

  public parse(text: string): SyntaxLeaf<ParsedType> {
    // sort เอา key ที่ยาวที่สุดขึ้นก่อน (greedy algorithm)
    const keys = Array.from(this.valueMap.keys()).sort(
      (a, b) => b.length - a.length,
    );
    for (const key of keys) {
      if (text.toLowerCase().startsWith(key.toLowerCase())) {
        const parsed = this.valueMap.get(key);
        if (parsed != null) {
          return new SyntaxLeaf(
            this,
            new Acceptance(this, key.length, parsed),
            null,
            key,
          );
        }
      }
    }

    return new SyntaxLeaf(this, null, new Expectation(this, 0, keys), text);
  }
}
