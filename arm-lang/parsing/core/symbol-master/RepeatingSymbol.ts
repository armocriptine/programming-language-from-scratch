import { Acceptance } from '../Acceptance';
import { GrammarSymbol } from '../GrammarSymbol';
import { ParsingContext } from '../ParsingContext';
import { SyntaxTree, SyntaxTreeNode } from '../SyntaxTree';

export type RepeatingParseResult<T, U = unknown> = {
  contents: T[];
  delimiters: U[];
};

export abstract class RepeatingSymbol<
  TSymbol,
  TDelimiter = unknown,
> extends GrammarSymbol<RepeatingParseResult<TSymbol, TDelimiter>> {
  public trailing = false;
  constructor(
    public readonly delimiter: () => GrammarSymbol<TDelimiter>,
    public readonly subsymbol: () => GrammarSymbol<TSymbol>,
    public readonly distinct = false,
    public minCount: number | null = null,
    public maxCount: number | null = null,
  ) {
    super();
  }

  public parse(
    text: string,
    context = new ParsingContext([]),
  ): SyntaxTree<RepeatingParseResult<TSymbol, TDelimiter>> {
    let position = 0;
    const subsymbol = this.subsymbol();
    const delimiter = this.delimiter();
    let currentSymbol: GrammarSymbol<unknown> = subsymbol;

    const treeNodes: SyntaxTreeNode<TSymbol>[] = [];
    const contents: TSymbol[] = [];
    const delimiters: TDelimiter[] = [];
    const tokens: string[] = [];

    while (!this.maxCount || contents.length <= this.maxCount) {
      let parsed;
      if (position === 0) {
        parsed = currentSymbol.parse(
          text.substring(position),
          context.appendNonterminals([this]),
        );
      } else {
        parsed = currentSymbol.parse(text.substring(position));
      }
      treeNodes.push(parsed.addOffset(position) as SyntaxTreeNode<TSymbol>);
      if (parsed.accept) {
        const token = text.substring(
          position,
          position + parsed.accept.consumed,
        );
        if (currentSymbol === subsymbol) {
          if (tokens.includes(token) && this.distinct) {
            treeNodes.splice(treeNodes.length - 1);
            treeNodes.push(currentSymbol.parse('') as SyntaxTreeNode<TSymbol>);
            break;
          }
          tokens.push(token);
        }
        position += parsed.accept.consumed;

        if (currentSymbol === subsymbol) {
          contents.push(parsed.accept.result as TSymbol);
          currentSymbol = delimiter;
        } else {
          delimiters.push(parsed.accept.result as TDelimiter);
          currentSymbol = subsymbol;
        }
      } else {
        if (contents.length < (this.minCount ?? 0)) {
          treeNodes.push(parsed as SyntaxTreeNode<TSymbol>); // push rejected delimiter syntax tree
        }

        break;
      }
    }

    return new SyntaxTree(
      this,
      (currentSymbol === delimiter ||
        (currentSymbol === subsymbol && this.trailing)) &&
      contents.length >= (this.minCount ?? 0)
        ? new Acceptance(this, position, { contents, delimiters })
        : null,
      null,
      treeNodes.map((node) =>
        this.distinct ? node.removeCodesFromExpectations(tokens) : node,
      ),
    );
  }
}
