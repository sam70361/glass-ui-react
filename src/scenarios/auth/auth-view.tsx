import { Lock, Mail, ShieldCheck } from 'lucide-react';

import { ScenarioFrame } from 'src/scenarios/_kit';
import { AuthLayout } from 'src/layouts/auth-layout';
import { CenteredLayout } from 'src/layouts/centered-layout';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Checkbox } from 'src/components/ui/checkbox';

/**
 * 复活 AuthLayout 与 CenteredLayout 两个全屏布局：
 * 由于二者均为 min-h-screen 全屏布局，这里用受限高度、可滚动的预览容器承载，
 * 使其在 Tab 中以真实 UI 形式被引用与展示。
 */
export default function AuthScenario() {
  return (
    <ScenarioFrame id="auth">
      <div className="space-y-6">
        {/* AuthLayout 预览：左品牌氛围 + 右登录表单 */}
        <div>
          <p className="mb-2 text-sm text-text-secondary">认证布局 · AuthLayout</p>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-glass-border)]">
            <div className="relative h-[520px] overflow-auto">
              <AuthLayout>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-1">
                    <h2 className="font-display text-2xl font-bold tracking-tight">欢迎回来</h2>
                    <p className="text-sm text-text-tertiary">登录以继续你的创作旅程</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auth-email">邮箱</Label>
                    <Input id="auth-email" type="email" placeholder="you@glassui.dev" prefix={<Mail />} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auth-password">密码</Label>
                    <Input id="auth-password" type="password" placeholder="请输入密码" prefix={<Lock />} />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                      <Checkbox defaultChecked /> 记住我
                    </label>
                    <button type="button" className="text-sm text-cyan transition-colors hover:underline">
                      忘记密码？
                    </button>
                  </div>

                  <Button type="submit" variant="primary" block>
                    登录
                  </Button>

                  <p className="text-center text-sm text-text-tertiary">
                    还没有账号？
                    <button type="button" className="ms-1 text-cyan transition-colors hover:underline">
                      立即注册
                    </button>
                  </p>
                </form>
              </AuthLayout>
            </div>
          </div>
        </div>

        {/* CenteredLayout 预览：居中卡片 + 重置密码表单 */}
        <div>
          <p className="mb-2 text-sm text-text-secondary">居中布局 · CenteredLayout</p>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-glass-border)]">
            <div className="relative h-[360px] overflow-auto">
              <CenteredLayout>
                <div className="glass-panel p-8">
                  <div className="mb-5 flex flex-col items-center gap-2 text-center">
                    <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-glass-bg)] text-cyan">
                      <ShieldCheck className="size-6" />
                    </span>
                    <h2 className="font-display text-xl font-bold tracking-tight">重置密码</h2>
                    <p className="text-sm text-text-tertiary">我们已向你的邮箱发送验证码</p>
                  </div>

                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <Label htmlFor="auth-code">验证码</Label>
                      <Input id="auth-code" inputMode="numeric" placeholder="6 位数字验证码" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="auth-newpass">新密码</Label>
                      <Input id="auth-newpass" type="password" placeholder="设置新密码" prefix={<Lock />} />
                    </div>
                    <Button type="submit" variant="primary" block>
                      确认重置
                    </Button>
                  </form>
                </div>
              </CenteredLayout>
            </div>
          </div>
        </div>
      </div>
    </ScenarioFrame>
  );
}
