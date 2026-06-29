import { Controller, useFormContext } from 'react-hook-form';

import { Field } from './field';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { Checkbox } from 'src/components/ui/checkbox';
import { Switch } from 'src/components/ui/switch';
import { Slider } from 'src/components/ui/slider';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { Label } from 'src/components/ui/label';

interface BaseProps {
  name: string;
  label?: string;
  hint?: string;
}

function useError(name: string) {
  const {
    formState: { errors },
  } = useFormContext();
  return errors[name]?.message as string | undefined;
}

export function RHFTextField({ name, label, hint, ...props }: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const { register } = useFormContext();
  const error = useError(name);
  return (
    <Field label={label} hint={hint} error={error}>
      <Input {...register(name)} status={error ? 'error' : undefined} aria-invalid={!!error} {...props} />
    </Field>
  );
}

export function RHFTextarea({
  name,
  label,
  hint,
  ...props
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { register } = useFormContext();
  const error = useError(name);
  return (
    <Field label={label} hint={hint} error={error}>
      <Textarea {...register(name)} status={error ? 'error' : undefined} aria-invalid={!!error} {...props} />
    </Field>
  );
}

export function RHFSelect({
  name,
  label,
  hint,
  placeholder,
  options,
}: BaseProps & { placeholder?: string; options: { value: string; label: string }[] }) {
  const { control } = useFormContext();
  const error = useError(name);
  return (
    <Field label={label} hint={hint} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger status={error ? 'error' : undefined} aria-invalid={!!error}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );
}

export function RHFCheckbox({ name, label }: BaseProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="flex cursor-pointer items-center gap-2.5">
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          {label && <span className="text-sm">{label}</span>}
        </label>
      )}
    />
  );
}

export function RHFSwitch({ name, label, hint }: BaseProps) {
  const { control } = useFormContext();
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        {label && <Label>{label}</Label>}
        {hint && <p className="text-xs text-text-tertiary">{hint}</p>}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
      />
    </div>
  );
}

export function RHFRadioGroup({
  name,
  label,
  options,
}: BaseProps & { options: { value: string; label: string }[] }) {
  const { control } = useFormContext();
  return (
    <Field label={label} error={useError(name)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange}>
            {options.map((o) => (
              <label key={o.value} className="flex cursor-pointer items-center gap-2.5 text-sm">
                <RadioGroupItem value={o.value} />
                {o.label}
              </label>
            ))}
          </RadioGroup>
        )}
      />
    </Field>
  );
}

export function RHFSlider({
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
}: BaseProps & { min?: number; max?: number; step?: number }) {
  const { control } = useFormContext();
  return (
    <Field label={label} error={useError(name)}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Slider
            value={[field.value ?? min]}
            min={min}
            max={max}
            step={step}
            onValueChange={(v) => field.onChange(v[0])}
          />
        )}
      />
    </Field>
  );
}
