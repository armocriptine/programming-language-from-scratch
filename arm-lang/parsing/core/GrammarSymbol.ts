import { Acceptance } from './Acceptance';
import { ParsingContext } from './ParsingContext';
import {
  SyntaxLeaf,
  SyntaxTree,
  SyntaxTreeNode,
  UnionSyntaxTree,
} from './SyntaxTree';

export abstract class GrammarSymbol<ParsedType> {
  public abstract parse(
    text: string,
    context?: ParsingContext,
  ): SyntaxTreeNode<ParsedType>;

  public equals(second: GrammarSymbol<ParsedType>): boolean {
    return this.constructor.name === second.constructor.name;
  }
}

export abstract class TerminalGrammarSymbol<
  ParsedType,
> extends GrammarSymbol<ParsedType> {
  public abstract parse(text: string): SyntaxLeaf<ParsedType>;
}

export class NullableSymbol<
  ParsedType,
> extends TerminalGrammarSymbol<ParsedType | null> {
  constructor(public readonly subsymbol: () => GrammarSymbol<ParsedType>) {
    if (subsymbol instanceof NullableSymbol) {
      throw new Error('nullable symbol cannot be nested');
    }
    super();
  }

  public parse(
    text: string,
    context = new ParsingContext([]),
  ): SyntaxTreeNode<ParsedType | null> {
    const res = this.subsymbol().parse(text, context);
    if (res.accept === null) {
      return new SyntaxTree(this, new Acceptance(this, 0, null), null, [res]);
    }

    return new SyntaxTree(this, res.accept, null, [res]);
  }
}

export abstract class NonterminalGrammarSymbol<
  ParsedType,
> extends GrammarSymbol<ParsedType> {
  public readonly partial: boolean = false;

  public abstract readonly rule: (() => GrammarSymbol<unknown>)[];

  protected abstract _parse(parsedSubsymbols: unknown[]): ParsedType;

  protected _preparse(parsedSubsymbols: unknown[]): void {
    /* do nothing */
  }

  public parse(
    text: string,
    context = new ParsingContext([]),
  ): SyntaxTree<ParsedType> {
    const treeNodes: SyntaxTreeNode<unknown>[] = [];
    const parseds: unknown[] = [];
    let position = 0;

    if (context.isLeftTraversed(this)) {
      return new SyntaxTree(this, null, null, []);
    }

    for (const symbol of this.rule) {
      this._preparse(parseds);

      let parsed;
      if (position === 0) {
        parsed = symbol().parse(
          text.substring(position),
          context.appendNonterminals([this]),
        );
      } else {
        parsed = symbol().parse(text.substring(position));
      }
      treeNodes.push(parsed.addOffset(position));
      if (parsed.accept) {
        parseds.push(parsed.accept.result);
        position += parsed.accept.consumed;
      } else {
        if (this.partial) {
          break; // partial nonterminal can accept partial symbols
        }
        return new SyntaxTree(this, null, null, treeNodes);
      }
    }

    return new SyntaxTree(
      this,
      new Acceptance(this, position, this._parse(parseds)),
      null,
      treeNodes,
    );
  }

  public static create<ParsedType>(
    rule: (() => GrammarSymbol<unknown>)[],
    parse: (parsedSubsymbols: unknown[]) => ParsedType,
  ): NonterminalGrammarSymbol<ParsedType> {
    return new (class extends NonterminalGrammarSymbol<ParsedType> {
      public rule = rule;
      protected _parse(parsedSubsymbols: unknown[]): ParsedType {
        return parse(parsedSubsymbols);
      }
    })();
  }
}

export class UnionGrammarSymbol<T> extends GrammarSymbol<T> {
  constructor(
    public readonly symbols: (() => GrammarSymbol<unknown>)[],
    public readonly symbolsToSkip: (() => GrammarSymbol<unknown>)[] = [],
  ) {
    super();
  }

  public parse(text: string, context = new ParsingContext([])): SyntaxTree<T> {
    const treeNodes: SyntaxTreeNode<unknown>[] = [];
    for (const symbol of this.symbols) {
      const parsed = symbol().parse(
        text,
        context.appendNonterminals([...this.symbolsToSkip.map((s) => s())]),
      );
      treeNodes.push(parsed);
      if (
        parsed.accept &&
        !(parsed.accept.consumed === 0 && symbol instanceof NullableSymbol)
      ) {
        return new SyntaxTree(this, parsed.accept, null, [
          parsed,
        ]) as SyntaxTree<T>;
      }
    }

    return new UnionSyntaxTree(this, treeNodes) as SyntaxTree<T>;
  }

  public except(
    symbols: (() => GrammarSymbol<unknown>)[],
  ): UnionGrammarSymbol<T> {
    return new UnionGrammarSymbol(
      this.symbols.filter((sym) => !symbols.some((s) => s().equals(sym()))),
      symbols,
    );
  }
}
