export type Line = { type: 'ctx' | 'add' | 'del'; text: string };
export interface DiffFile { path: string; add: number; del: number; diff: Line[] }
export type ReviewState = 'pending' | 'approved' | 'changes';

export const FILES: DiffFile[] = [
  {
    path: 'src/components/ui/button.tsx',
    add: 12,
    del: 4,
    diff: [
      { type: 'ctx', text: 'export function Button({ variant, size }: Props) {' },
      { type: 'del', text: "  const cls = 'btn ' + variant;" },
      { type: 'add', text: '  const cls = buttonVariants({ variant, size });' },
      { type: 'add', text: '  return <Comp className={cls} />;' },
      { type: 'ctx', text: '}' },
    ],
  },
  {
    path: 'src/theme/mixins.ts',
    add: 6,
    del: 2,
    diff: [
      { type: 'ctx', text: 'export const surfaceVariants = {' },
      { type: 'add', text: "  glass: 'glass-card'," },
      { type: 'add', text: "  solid: 'bg-[var(--color-surface-solid)]'," },
      { type: 'del', text: '  // TODO: define variants' },
      { type: 'ctx', text: '};' },
    ],
  },
];

export const CHECKS = [
  { label: 'CI 构建', ok: true },
  { label: '单元测试 (128)', ok: true },
  { label: '类型检查', ok: true },
  { label: '覆盖率 +0.4%', ok: true },
];
