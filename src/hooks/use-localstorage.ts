export const useLocalStorage = <DataType extends Record<string, unknown>>(
  key: string,
  defaultValue: DataType
): {
  getValue: () => DataType;
  setValue: (value: unknown) => void;
} => {
  const getValue = (): DataType => {
    const storageValue = localStorage.getItem(key);
    try {
      return JSON.parse(storageValue || '{}');
    } catch (e) {
      return defaultValue;
    }
  };

  const setValue = (value: unknown) => {
    const newValue = JSON.stringify(value);
    localStorage.setItem(key, newValue);
  };

  return { getValue, setValue };
};
