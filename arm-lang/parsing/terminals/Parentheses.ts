import { MarkerSymbol } from '../core';

export class OpenParenthesisSymbol extends MarkerSymbol {
  constructor() {
    super('(');
  }
}
export class CloseParenthesisSymbol extends MarkerSymbol {
  constructor() {
    super(')');
  }
}
