import { toast } from 'src/components/ui/sonner';

/** 场景动作统一反馈（运行/保存/上传等按钮不再“点了没反应”） */
export const notify = {
  success: (msg: string, desc?: string) => toast.success(msg, desc ? { description: desc } : undefined),
  error: (msg: string, desc?: string) => toast.error(msg, desc ? { description: desc } : undefined),
  info: (msg: string, desc?: string) => toast(msg, desc ? { description: desc } : undefined),
  loading: (msg: string) => toast.loading(msg),
};
