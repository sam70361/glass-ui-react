import { useState } from 'react';
import { Star } from 'lucide-react';

import { cn } from 'src/lib/utils';

/** 星级评分 */
export function Rating({
  value,
  onChange,
  max = 5,
  readOnly,
  size = 18,
  className,
}: {
  value: number;
  onChange?: (v: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: number;
  className?: string;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className={cn('flex items-center gap-0.5', className)} onMouseLeave={() => setHover(0)}>
      {Array.from({ length: max }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            type="button"
            disabled={readOnly}
            onMouseEnter={() => !readOnly && setHover(n)}
            onClick={() => onChange?.(n)}
            className={cn('transition-transform', !readOnly && 'hover:scale-110', readOnly && 'cursor-default')}
            aria-label={`${n} 星`}
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(n <= shown ? 'fill-amber text-amber' : 'text-text-muted')}
            />
          </button>
        );
      })}
    </div>
  );
}
