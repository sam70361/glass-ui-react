import * as React from 'react';
import { ArrowUp, ChevronDown } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { Button } from './button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './dropdown-menu';

/** 按钮组：相邻按钮拼接 */
export function ButtonGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center [&>*]:rounded-none [&>*:first-child]:rounded-s-full [&>*:last-child]:rounded-e-full [&>*:not(:first-child)]:-ms-px',
        className
      )}
    >
      {children}
    </div>
  );
}

/** 分裂按钮：主操作 + 下拉更多 */
export function SplitButton({
  children,
  onClick,
  menu,
  variant = 'primary',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  menu: React.ReactNode;
  variant?: React.ComponentProps<typeof Button>['variant'];
}) {
  return (
    <div className="inline-flex items-center">
      <Button variant={variant} className="rounded-e-none" onClick={onClick}>
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="icon" className="-ms-px rounded-s-none px-2">
            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

/** 浮动操作按钮 */
export function FloatingActionButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'fixed bottom-6 end-6 z-[var(--z-fab)] flex size-14 items-center justify-center rounded-full holographic-bg text-[var(--color-holo-foreground)] shadow-[var(--shadow-z16)] transition-transform hover:scale-105 active:scale-95 [&_svg]:size-6',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** 回到顶部：滚动容器超过阈值时浮现 */
export function BackToTop({ targetRef, threshold = 300 }: { targetRef?: React.RefObject<HTMLElement>; threshold?: number }) {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const el = targetRef?.current ?? window;
    const getTop = () => (targetRef?.current ? targetRef.current.scrollTop : window.scrollY);
    const onScroll = () => setShow(getTop() > threshold);
    el.addEventListener('scroll', onScroll as EventListener);
    return () => el.removeEventListener('scroll', onScroll as EventListener);
  }, [targetRef, threshold]);

  if (!show) return null;
  return (
    <button
      onClick={() => (targetRef?.current ?? window).scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 end-6 z-[var(--z-fab)] flex size-11 items-center justify-center rounded-full glass-overlay text-foreground transition-transform hover:-translate-y-0.5"
      aria-label="回到顶部"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
