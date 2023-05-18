import { NativeExecutionBlock } from "./models/control-plane/execution/ExecutionBlock";
import { convertValueToNative } from "./models/data-plane/interop/Interop";
import { Func } from "./models/data-plane/value/Func";
import { ExecutionBlockSymbol } from "./parsing/execution/code-block/RootExecutionBlock";
import { ExecutionState } from "./runtime/ExecutionState";

const parser = new ExecutionBlockSymbol();

export const runArmLang = (
  sourceCode: string,
  onOutput: (data: string | number | boolean | null | any[]) => void
): boolean => {
  const result = parser.parse(sourceCode.trim());
  const exec = result.accept?.result;
  const state = new ExecutionState(null);
  state.createVar(
    "แสดง",
    new Func(
      ["input"],
      new NativeExecutionBlock((state) => {
        const value = state.getVar("input");
        onOutput(value ? convertValueToNative(value) : null);
      })
    )
  );

  exec?.execute(state);

  return !!exec && exec.atoms.length > 0;
};
