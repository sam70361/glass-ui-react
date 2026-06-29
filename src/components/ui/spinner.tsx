import { Loader2 } from 'lucide-react';

import { cn } from 'src/lib/utils';

export function Spinner({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return <Loader2 className={cn('size-5 animate-spin text-cyan', className)} {...props} />;
}
