import { Acceptance } from './Acceptance';
import { Expectation } from './Expectation';
import {
  GrammarSymbol,
  NullableSymbol,
  UnionGrammarSymbol,
} from './GrammarSymbol';

export abstract class SyntaxTreeNode<ParsedType> {
  public position = 0;

  constructor(
    public readonly symbol: GrammarSymbol<ParsedType>,
    public accept: Acceptance<ParsedType> | null,
    public expect: Expectation | null,
  ) {}

  public get accepted(): boolean {
    return this.accept != null;
  }

  public addOffset(offset: number): this {
    this.position += offset;
    return this;
  }

  public removeCodesFromExpectations(codes: string[]): this {
    if (this.expect) {
      this.expect = this.expect?.removeCodes(codes);
    }
    return this;
  }

  public abstract readonly raw: string;

  public getAllExpectations(): Expectation[] {
    const expect = this.expect?.addOffset(this.position);
    return expect ? [expect] : [];
  }
}

export class SyntaxTree<ParsedType> extends SyntaxTreeNode<ParsedType> {
  constructor(
    public override readonly symbol: GrammarSymbol<ParsedType>,
    public override accept: Acceptance<ParsedType> | null,
    public override expect: Expectation | null,
    public readonly children: SyntaxTreeNode<any>[],
  ) {
    super(symbol, accept, expect);
  }

  public override get accepted(): boolean {
    return super.accepted || this.children.every((child) => child.accepted);
  }

  public get raw(): string {
    if (this.symbol instanceof NullableSymbol && this.accept?.consumed === 0) {
      return '';
    }
    return this.children.map((child) => child.raw).join('');
  }

  public override getAllExpectations(): Expectation[] {
    const expect = super.getAllExpectations();
    return [
      ...expect,
      ...this.children.flatMap((child) =>
        child.getAllExpectations().map((exp) => exp.addOffset(this.position)),
      ),
    ];
  }

  public override removeCodesFromExpectations(codes: string[]): this {
    super.removeCodesFromExpectations(codes);
    for (const child of this.children) {
      child.removeCodesFromExpectations(codes);
    }
    return this;
  }
}

export class SyntaxLeaf<ParsedType> extends SyntaxTreeNode<ParsedType> {
  constructor(
    public override readonly symbol: GrammarSymbol<ParsedType>,
    public override accept: Acceptance<ParsedType> | null,
    public override expect: Expectation | null,
    public readonly raw: string,
  ) {
    super(symbol, accept, expect);
  }
}

export class UnionSyntaxTree<T> extends SyntaxTree<T> {
  constructor(
    public override readonly symbol: UnionGrammarSymbol<T>,
    public override readonly children: SyntaxTreeNode<unknown>[],
  ) {
    super(symbol, null, null, children);
  }

  public override get accepted(): boolean {
    return super.accepted || this.children.some((child) => child.accepted);
  }

  public override get raw(): string {
    return this.children[0].raw;
  }

  public override getAllExpectations(): Expectation[] {
    const expect = super.getAllExpectations();
    return [
      ...expect,
      ...this.children.flatMap((child) =>
        child.getAllExpectations().map((exp) => exp.addOffset(this.position)),
      ),
    ];
  }

  public override removeCodesFromExpectations(codes: string[]): this {
    super.removeCodesFromExpectations(codes);
    for (const child of this.children) {
      child.removeCodesFromExpectations(codes);
    }
    return this;
  }
}
