import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

interface UseFormProps<T extends FormValues> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
}

interface UseFormReturn<T extends FormValues> {
  formValues: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => Promise<void>;
  resetForm: () => void;
}

export const useForm = <T extends FormValues>({ initialValues, onSubmit }: UseFormProps<T>): UseFormReturn<T> => {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await onSubmit(values);
  };

  const resetForm = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  return {
    formValues: values,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
