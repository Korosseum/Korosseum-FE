import { useState } from "react";

const useInput = ({
  initialValue,
  onChange: externalOnChange,
}: {
  initialValue: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(() => {
      const newValue = e.target.value;
      return newValue;
    });
    externalOnChange?.(e);
  };

  return { value, onChange };
};

export default useInput;
