import { useCallback, useState } from 'react';

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [on, setOn] = useState(initialValue);

  const toggle = useCallback(() => {
    setOn((prev) => !prev);
  }, []);

  return [on, toggle];
};
