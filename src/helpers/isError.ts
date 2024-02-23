export const isError = <T>(
  payload: T | { err: string },
): payload is { err: string } => {
  return (payload as { err?: string }).err !== undefined;
};
