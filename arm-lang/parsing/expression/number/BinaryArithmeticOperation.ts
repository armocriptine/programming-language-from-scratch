import { Expression } from "arm-lang/models/data-plane/expression/Expression";
import {
  BinaryArithmeticOperation,
  BinaryArithmeticOperator,
} from "arm-lang/models/data-plane/expression/number/BinaryArithmeticOperation";
import { NumberValue } from "arm-lang/models/data-plane/value/NumberValue";
import {
  NonterminalGrammarSymbol,
  RepeatingParseResult,
  RepeatingSymbol,
  ValueMapSymbol,
} from "arm-lang/parsing/core";
import { NullableWhitespaceWrapperSymbol } from "arm-lang/parsing/terminals/Whitespace";
import { RootNumberExpressionSymbol } from "./RootNumberExpression";

class FirstRankBinaryArithmeticOperatorSymbol extends ValueMapSymbol<BinaryArithmeticOperator> {
  constructor() {
    super(
      new Map([
        ["+", BinaryArithmeticOperator.Add],
        ["-", BinaryArithmeticOperator.Subtract],
        ["%", BinaryArithmeticOperator.Modulo],
      ])
    );
  }
}

class SecondRankBinaryArithmeticOperatorSymbol extends ValueMapSymbol<BinaryArithmeticOperator> {
  constructor() {
    super(
      new Map([
        ["*", BinaryArithmeticOperator.Multiply],
        ["/", BinaryArithmeticOperator.Divide],
      ])
    );
  }
}

export class FirstRankBinaryArithmeticOperationSymbol extends NonterminalGrammarSymbol<BinaryArithmeticOperation> {
  public rule = [
    () =>
      new (class _FirstRankBinaryArithmeticOperationSymbol extends RepeatingSymbol<
        Expression<NumberValue>
      > {
        constructor() {
          super(
            () =>
              new NullableWhitespaceWrapperSymbol(
                () => new FirstRankBinaryArithmeticOperatorSymbol()
              ),
            () => new RootNumberExpressionSymbol(),
            false,
            2
          );
        }
      })(),
  ];
  protected _parse([{ contents: operands, delimiters: operators }]: [
    RepeatingParseResult<Expression<NumberValue>, BinaryArithmeticOperator>
  ]): BinaryArithmeticOperation {
    let leftmost: BinaryArithmeticOperation | Expression<NumberValue> =
      operands[0];
    for (const [index, op] of operators.entries()) {
      leftmost = new BinaryArithmeticOperation(
        leftmost,
        operands[index + 1],
        op
      );
    }
    return leftmost as BinaryArithmeticOperation;
  }
}

export class SecondRankBinaryArithmeticOperationSymbol extends NonterminalGrammarSymbol<BinaryArithmeticOperation> {
  public rule = [
    () =>
      new (class _SecondRankBinaryArithmeticOperationSymbol extends RepeatingSymbol<
        Expression<NumberValue>,
        unknown
      > {
        constructor() {
          super(
            () =>
              new NullableWhitespaceWrapperSymbol(
                () => new SecondRankBinaryArithmeticOperatorSymbol()
              ),
            () =>
              new RootNumberExpressionSymbol().except([
                () => new FirstRankBinaryArithmeticOperationSymbol(),
              ]),
            false,
            2
          );
        }
      })(),
  ];
  protected _parse([{ contents: operands, delimiters: operators }]: [
    RepeatingParseResult<Expression<NumberValue>, BinaryArithmeticOperator>
  ]): BinaryArithmeticOperation {
    let leftmost: BinaryArithmeticOperation | Expression<NumberValue> =
      operands[0];
    for (const [index, op] of operators.entries()) {
      leftmost = new BinaryArithmeticOperation(
        leftmost,
        operands[index + 1],
        op
      );
    }
    return leftmost as BinaryArithmeticOperation;
  }
}
