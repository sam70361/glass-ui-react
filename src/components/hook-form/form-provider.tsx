import { FormProvider as RHFProvider, type UseFormReturn, type FieldValues } from 'react-hook-form';

export interface FormProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
}

/** RHF 表单容器 */
export function Form<T extends FieldValues>({ methods, onSubmit, children, className }: FormProps<T>) {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={onSubmit} className={className} noValidate>
        {children}
      </form>
    </RHFProvider>
  );
}
