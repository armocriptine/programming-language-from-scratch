import { ArrayValue } from '../value/ArrayValue';
import { BooleanValue } from '../value/BooleanValue';
import { NullValue } from '../value/NullValue';
import { NumberValue } from '../value/NumberValue';
import { StringValue } from '../value/StringValue';
import { Value } from '../value/Value';

export const createValueFromNative = (
  value: string | number | boolean | null | undefined | void | any[],
): Value => {
  if (typeof value === 'string') {
    return new StringValue(value);
  } else if (typeof value === 'number') {
    return new NumberValue(value);
  } else if (typeof value === 'boolean') {
    return new BooleanValue(value);
  } else if (Array.isArray(value)) {
    return new ArrayValue(value.map((v) => createValueFromNative(v)));
  } else if (value == null) {
    return new NullValue();
  } else {
    throw new Error('native value not supported!');
  }
};

export const convertValueToNative = (
  value: Value,
): string | number | boolean | null | any[] => {
  if (value instanceof StringValue) {
    return value.content;
  } else if (value instanceof NumberValue) {
    return value.content;
  } else if (value instanceof BooleanValue) {
    return value.content;
  } else if (value instanceof NullValue) {
    return null;
  } else if (value instanceof ArrayValue) {
    return value.arr.map((v) => convertValueToNative(v));
  } else {
    throw new Error('native value not supported!');
  }
};
