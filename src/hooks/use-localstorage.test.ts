import { renderHook } from '@testing-library/react';
import { useLocalStorage } from './use-localstorage';
import { act } from 'react';

describe('useLocalStorage', () => {
  const TEST_KEY = 'test-key';

  it('초기 상태에서 빈 객체를 반환해야 합니다', () => {
    // useLocalStorage 훅 호출
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}));

    // getValue 함수 호출
    const value = result.current.getValue();

    // 초기값 확인
    expect(value).toEqual({});
  });

  it('localStorage에 값을 저장하고 불러올 수 있어야 합니다', () => {
    // useLocalStorage 훅 호출
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}));

    // 저장할 값
    const testData = { name: 'Test', age: 30 };

    // setValue 호출
    act(() => {
      result.current.setValue(testData);
    });

    // localStorage에 값이 올바르게 저장되었는지 확인
    const storedValue = JSON.parse(localStorage.getItem(TEST_KEY) || '{}');
    expect(storedValue).toEqual(testData);

    // getValue 호출로 값을 다시 가져오기
    const retrievedValue = result.current.getValue();
    expect(retrievedValue).toEqual(testData);
  });

  it('JSON 형식이 아닌 잘못된 값이 localStorage에 저장된 경우 기본값을 반환해야 합니다', () => {
    // localStorage에 잘못된 값 저장
    localStorage.setItem(TEST_KEY, 'Invalid JSON');

    // useLocalStorage 훅 호출
    const { result } = renderHook(() => useLocalStorage(TEST_KEY, {}));

    // getValue 호출 시 빈 객체 반환 여부 확인
    const value = result.current.getValue();
    expect(value).toEqual({});
  });
});
