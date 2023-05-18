import { ConstantExpression } from 'arm-lang/models/data-plane/expression/common/Constant';
import { Expression } from 'arm-lang/models/data-plane/expression/Expression';
import { BooleanValue } from 'arm-lang/models/data-plane/value/BooleanValue';
import { ValueMapSymbol } from '../../core';

export class BooleanLiteralSymbol extends ValueMapSymbol<
  Expression<BooleanValue>
> {
  constructor() {
    super(
      new Map([
        ['<จริง>', new ConstantExpression(new BooleanValue(true))],
        ['<เท็จ>', new ConstantExpression(new BooleanValue(false))],
      ]),
    );
  }
}
