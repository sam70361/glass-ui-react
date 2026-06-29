import { Spinner } from 'src/components/ui/spinner';
import { Logo } from 'src/components/shared/logo';

/** 路由懒加载/全屏等待时的占位 */
export function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <Logo showText={false} className="animate-pulse" />
      <Spinner className="size-6" />
    </div>
  );
}
