import { useSelectedRows } from '.';
import { renderHook, act } from '@testing-library/react-hooks';

describe('Testing the selected rows hook', () => {
  test('with individual selections', () => {
    const { result } = renderHook(() => useSelectedRows());

    expect(result.current.selected).toEqual([]);
    expect(result.current.checkIfSelected('1')).toBe(false);

    act(() => {
      result.current.updateRowSelection('1');
    });

    expect(result.current.selected).toEqual(['1']);
    expect(result.current.checkIfSelected('1')).toBe(true);

    act(() => {
      result.current.updateRowSelection('1');
    });

    expect(result.current.selected).toEqual([]);
    expect(result.current.checkIfSelected('1')).toBe(false);
  });

  test('with multiple ids being updated', () => {
    const { result } = renderHook(() => useSelectedRows());

    expect(result.current.selected).toEqual([]);
    expect(result.current.checkIfSelected('1')).toBe(false);

    act(() => {
      result.current.updateRowSelection(['1', '2', '3', '4', '5']);
    });

    expect(result.current.selected).toEqual(['1', '2', '3', '4', '5']);
    expect(result.current.checkIfSelected('1')).toBe(true);
    expect(result.current.checkIfSelected('4')).toBe(true);

    act(() => {
      result.current.updateRowSelection([]);
    });

    expect(result.current.selected).toEqual([]);
    expect(result.current.checkIfSelected('1')).toBe(false);
    expect(result.current.checkIfSelected('4')).toBe(false);
  });
});
