import { useState } from 'react';

export const useSelectedRows = (defaultSelection?: string[]) => {
  const [selected, setSelected] = useState(defaultSelection ?? []);

  const updateRowSelection = (ids: string | string[]) => {
    if (Array.isArray(ids)) {
      setSelected(ids);
      return;
    }

    const selectedIndex = selected.indexOf(ids);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, ids);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const checkIfSelected = (id: string) => selected.includes(id);

  return { selected, updateRowSelection, checkIfSelected };
};
