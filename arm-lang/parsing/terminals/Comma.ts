import { MarkerSymbol } from '../core';

export class CommaSymbol extends MarkerSymbol {
  constructor() {
    super(',');
  }
}

export class SemicolonSymbol extends MarkerSymbol {
  constructor() {
    super(';');
  }
}
