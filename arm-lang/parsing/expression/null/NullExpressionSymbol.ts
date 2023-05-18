import { ConstantExpression } from 'arm-lang/models/data-plane/expression/common/Constant';
import { NullValue } from 'arm-lang/models/data-plane/value/NullValue';
import { ValueMapSymbol } from 'arm-lang/parsing/core';

export class NullExpressionSymbol extends ValueMapSymbol<
  ConstantExpression<NullValue>
> {
  constructor() {
    super(new Map([['<ไม่มี>', new ConstantExpression(new NullValue())]]));
  }
}
