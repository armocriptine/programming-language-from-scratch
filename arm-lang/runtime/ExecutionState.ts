import { Value } from 'arm-lang/models/data-plane/value/Value';

export class ExecutionState {
  private _variables = new Map<string, Value>();

  constructor(public readonly previous: ExecutionState | null) {}

  public createVar(varName: string, value: Value): void {
    if (this._variables.has(varName)) {
      throw new Error('variable already exists.');
    }

    this._variables.set(varName, value);
  }

  public setVar(varName: string, value: Value): void {
    if (!this._variables.has(varName)) {
      if (this.previous) {
        this.previous.setVar(varName, value);
      } else {
        throw new Error('variable does not exist.');
      }
    } else {
      this._variables.set(varName, value);
    }
  }

  public getVar<T extends Value = Value>(varName: string): T | null {
    const val = this._variables.get(varName) as T;
    if (!val) {
      return this.previous?.getVar<T>(varName) ?? null;
    }
    return val;
  }

  public clone(): ExecutionState {
    const prev = this.previous?.clone() ?? null;
    const state = new ExecutionState(prev);
    state._variables = new Map(this._variables.entries());
    return state;
  }
}
