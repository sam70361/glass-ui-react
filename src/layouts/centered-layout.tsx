import { AmbientBackground } from 'src/components/system/ambient-background';

/** 居中容器布局（用于空白页、错误页、轻量内容） */
export function CenteredLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </>
  );
}
