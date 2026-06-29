import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

/** 底部抽屉：移动端常用，基于 Sheet(side=bottom) + 顶部把手 */
export function BottomDrawer({
  open,
  onOpenChange,
  title,
  trigger,
  children,
}: {
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
  title?: React.ReactNode;
  trigger?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side="bottom" hideClose className="max-h-[80vh] rounded-t-[var(--radius-2xl)]">
        <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-[var(--color-glass-border)]" />
        {title && (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
        )}
        <SheetBody>{children}</SheetBody>
      </SheetContent>
    </Sheet>
  );
}
