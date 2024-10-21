import { useState } from 'react';

// TODO: 여러 개의 타입을 받을 수 있도록 제네릭 수정 필요
export const useAccordions = <T = string>(initialOpenIds: T[] = []) => {
  const [openIds, setOpenIds] = useState<Set<T>>(new Set(initialOpenIds));

  const toggle = (id: T) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  };

  const isOpen = (id: T) => {
    return openIds.has(id);
  };

  return {
    toggle,
    isOpen,
  };
};
