import { useEffect, useState } from "react";

/**
 * Hook để trì hoãn giá trị đầu vào, giảm tần suất gọi API khi người dùng nhập liệu.
 * @param value Giá trị cần debounce
 * @param delay Thời gian trì hoãn (ms), mặc định 500ms
 * @returns Giá trị đã debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
