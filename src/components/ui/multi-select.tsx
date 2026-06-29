import { useState } from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { fieldVariants, fieldFocus } from 'src/theme/mixins';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from './command';
import { Badge } from './badge';

export interface Option {
  value: string;
  label: string;
}

/** 多选下拉（带已选标签） */
export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = '请选择…',
  className,
}: {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const toggle = (v: string) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            'flex min-h-10 w-full items-center justify-between gap-2 px-2.5 py-1.5 text-sm transition-colors hover:bg-[var(--color-glass-bg-hover)]',
            fieldVariants.glass,
            fieldFocus,
            className
          )}
        >
          <span className="flex flex-wrap gap-1">
            {value.length === 0 && <span className="px-1 text-text-muted">{placeholder}</span>}
            {value.map((v) => {
              const o = options.find((x) => x.value === v);
              return (
                <Badge key={v} variant="cyan" className="gap-1">
                  {o?.label ?? v}
                  <X
                    className="size-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(v);
                    }}
                  />
                </Badge>
              );
            })}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="搜索…" />
          <CommandList>
            <CommandEmpty>无匹配项</CommandEmpty>
            {options.map((o) => (
              <CommandItem key={o.value} value={o.label} onSelect={() => toggle(o.value)}>
                <Check className={cn('size-4', value.includes(o.value) ? 'opacity-100 text-cyan' : 'opacity-0')} />
                {o.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
