import { useEffect, useRef } from 'react';
import InputMask from 'inputmask';

const useCurrencyMask = (register, options) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current && !register) return

    InputMask({
      ...options,
      alias: 'currency',
      numericInput: true,
    }).mask(ref.current);

    register(ref.current)
  },[register, options]);

  return ref;
}

export default useCurrencyMask;