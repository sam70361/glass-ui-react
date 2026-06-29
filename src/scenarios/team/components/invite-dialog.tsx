import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Form, RHFTextField, RHFSelect } from 'src/components/hook-form';
import { useTeamQuery, useInviteMemberMutation } from 'src/api';

const schema = z.object({
  name: z.string().min(1, '请输入成员姓名'),
  email: z.string().email('邮箱格式不正确').or(z.literal('')),
  role: z.string().min(1, '请输入角色'),
  department: z.string().min(1, '请选择部门'),
});

type FormValues = z.infer<typeof schema>;

export function InviteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const team = useTeamQuery().data ?? [];
  const addMember = useInviteMemberMutation();
  const depts = [...new Set(team.map((m) => m.department).filter(Boolean) as string[])];

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', role: '', department: depts[0] ?? '' },
  });

  const onSubmit = methods.handleSubmit((data) => {
    addMember.mutate(
      { name: data.name, email: data.email, role: data.role, department: data.department },
      {
        onSuccess: () => {
          toast.success(`已邀请 ${data.name} 加入团队`);
          methods.reset();
          onOpenChange(false);
        },
      }
    );
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>邀请成员</DialogTitle>
        </DialogHeader>
        <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
          <RHFTextField name="name" label="姓名" placeholder="成员姓名" />
          <RHFTextField name="email" label="邮箱" placeholder="name@glassui.com" />
          <RHFTextField name="role" label="角色" placeholder="例如：UI 设计师" />
          <RHFSelect name="department" label="部门" options={depts.map((d) => ({ value: d, label: d }))} />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit" variant="primary">
              <UserPlus className="size-4" /> 发送邀请
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
