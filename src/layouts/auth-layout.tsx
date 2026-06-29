import { AmbientBackground } from 'src/components/system/ambient-background';
import { Logo } from 'src/components/shared/logo';

/** 认证布局：左侧品牌氛围 + 右侧表单（演示骨架） */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        <div className="hidden flex-col justify-between p-12 lg:flex">
          <Logo />
          <div className="space-y-3">
            <h1 className="font-display text-4xl font-bold leading-tight">
              让创意
              <br />
              <span className="holographic-text">在此汇聚成光</span>
            </h1>
            <p className="max-w-sm text-text-tertiary">
              Glass UI 帮助创意团队从灵感到交付，统一协作、素材与评审。
            </p>
          </div>
          <p className="text-xs text-text-muted">© 2026 Glass UI</p>
        </div>
        <div className="flex items-center justify-center p-6">
          <div className="glass-panel w-full max-w-sm p-8">{children}</div>
        </div>
      </div>
    </>
  );
}
