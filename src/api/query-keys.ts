/**
 * 规范化 queryKey 工厂（单一真相源）。
 * 约定：`[域, 子资源?, 参数?]`，便于按域失效。
 */
export const queryKeys = {
  projects: ['projects'] as const,
  tasks: ['tasks'] as const,
  team: ['team'] as const,
  assets: ['assets'] as const,
  activities: ['activities'] as const,
  mail: {
    threads: ['mail', 'threads'] as const,
  },
  scenarios: {
    rag: ['scenarios', 'rag'] as const,
    data: (id: string) => ['scenarios', 'data', id] as const,
  },
} as const;
