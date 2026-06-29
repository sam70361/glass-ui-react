import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldSizes, fieldStatus, fieldFocus, type FieldStatus } from 'src/theme/mixins';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './command';

export interface ComboboxOption {
  value: string;
  label: string;
}

/** 搜索单选下拉（cmdk + Popover） */
export function Combobox({
  options,
  value,
  onChange,
  placeholder = '请选择…',
  searchPlaceholder = '搜索…',
  status,
  className,
}: {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  status?: FieldStatus;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex w-full items-center justify-between gap-2 transition-colors hover:bg-[var(--color-glass-bg-hover)]',
            fieldVariants.glass,
            fieldSizes.md,
            fieldFocus,
            status && fieldStatus[status],
            className
          )}
        >
          <span className={cn('truncate', !selected && 'text-text-muted')}>{selected?.label ?? placeholder}</span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>无匹配项</CommandEmpty>
            {options.map((o) => (
              <CommandItem
                key={o.value}
                value={o.label}
                onSelect={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                <Check className={cn('size-4', value === o.value ? 'opacity-100 text-cyan' : 'opacity-0')} />
                {o.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
