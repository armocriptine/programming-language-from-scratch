import {
  BinaryBooleanOperation,
  BinaryBooleanOperator,
} from 'arm-lang/models/data-plane/expression/boolean/BinaryBooleanOperation';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import {
  NonterminalGrammarSymbol,
  RepeatingParseResult,
  RepeatingSymbol,
  ValueMapSymbol,
} from 'arm-lang/parsing/core';
import { NullableWhitespaceWrapperSymbol } from 'arm-lang/parsing/terminals/Whitespace';
import { RootBooleanExpressionSymbol } from './RootBooleanExpression';

export class FirstRankBinaryBooleanOperatorSymbol extends ValueMapSymbol<BinaryBooleanOperator> {
  constructor() {
    super(new Map([['หรือ', BinaryBooleanOperator.Or]]));
  }
}

export class SecondRankBinaryBooleanOperatorSymbol extends ValueMapSymbol<BinaryBooleanOperator> {
  constructor() {
    super(new Map([['และ', BinaryBooleanOperator.And]]));
  }
}

export class FirstRankBinaryBooleanOperationSymbol extends NonterminalGrammarSymbol<BinaryBooleanOperation> {
  public rule = [
    () =>
      new (class _FirstRankBinaryBooleanOperationSymbol extends RepeatingSymbol<
        Expression<BooleanValue>,
        unknown
      > {
        constructor() {
          super(
            () =>
              new NullableWhitespaceWrapperSymbol(
                () => new FirstRankBinaryBooleanOperatorSymbol(),
              ),
            () => new RootBooleanExpressionSymbol(),
          );
        }
      })(),
  ];

  protected _parse([{ contents: operands, delimiters: operators }]: [
    RepeatingParseResult<Expression<BooleanValue>, BinaryBooleanOperator>,
  ]): BinaryBooleanOperation {
    let leftmost: BinaryBooleanOperation | Expression<BooleanValue> =
      operands[0];
    for (const [index, op] of operators.entries()) {
      leftmost = new BinaryBooleanOperation(leftmost, operands[index + 1], op);
    }
    return leftmost as BinaryBooleanOperation;
  }
}

export class SecondRankBinaryBooleanOperationSymbol extends NonterminalGrammarSymbol<BinaryBooleanOperation> {
  public rule = [
    () =>
      new (class _SecondRankBinaryBooleanOperationSymbol extends RepeatingSymbol<
        Expression<BooleanValue>,
        unknown
      > {
        constructor() {
          super(
            () =>
              new NullableWhitespaceWrapperSymbol(
                () => new SecondRankBinaryBooleanOperatorSymbol(),
              ),
            () =>
              new RootBooleanExpressionSymbol().except([
                () => new FirstRankBinaryBooleanOperationSymbol(),
              ]),
          );
        }
      })(),
  ];

  protected _parse([{ contents: operands, delimiters: operators }]: [
    RepeatingParseResult<Expression<BooleanValue>, BinaryBooleanOperator>,
  ]): BinaryBooleanOperation {
    let leftmost: BinaryBooleanOperation | Expression<BooleanValue> =
      operands[0];
    for (const [index, op] of operators.entries()) {
      leftmost = new BinaryBooleanOperation(leftmost, operands[index + 1], op);
    }
    return leftmost as BinaryBooleanOperation;
  }
}
