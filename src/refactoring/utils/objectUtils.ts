export const updateObject = <T extends object>(obj: T, updates: Partial<T>): T => {
  return {
    ...obj,
    ...updates,
  };
};
