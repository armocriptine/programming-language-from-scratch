import { MarkerSymbol } from '../core';

export class OpenCurlyBracketSymbol extends MarkerSymbol {
  constructor() {
    super('{');
  }
}

export class CloseCurlyBracketSymbol extends MarkerSymbol {
  constructor() {
    super('}');
  }
}

export class OpenSquareBracketSymbol extends MarkerSymbol {
  constructor() {
    super('[');
  }
}

export class CloseSquareBracketSymbol extends MarkerSymbol {
  constructor() {
    super(']');
  }
}
