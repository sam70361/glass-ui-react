import { cn } from 'src/lib/utils';
import { Label } from 'src/components/ui/label';

/** 字段包裹：label + 控件 + 错误信息 */
export function Field({
  label,
  error,
  required,
  hint,
  children,
  className,
}: {
  label?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </Label>
      )}
      {children}
      {error ? (
        <p className="text-xs text-danger">{error}</p>
      ) : (
        hint && <p className="text-xs text-text-tertiary">{hint}</p>
      )}
    </div>
  );
}
