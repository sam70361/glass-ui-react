import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { PageHeader } from 'src/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from 'src/components/ui/card';
import { UserAvatar } from 'src/components/shared/user-avatar';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { Form, RHFTextField, RHFTextarea } from 'src/components/hook-form';
import { useAppStore, memberStats } from 'src/store';

const schema = z.object({
  name: z.string().min(1, '请输入姓名'),
  email: z.string().email('邮箱格式不正确'),
  role: z.string().min(1, '请输入职位'),
  bio: z.string().max(200, '简介不超过 200 字').optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ProfileView() {
  const user = useAppStore((s) => s.currentUser);
  const updateProfile = useAppStore((s) => s.updateProfile);
  const stats = memberStats(user.id);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: user.name, email: user.email, role: user.role, bio: user.bio ?? '' },
  });

  const onSubmit = methods.handleSubmit((data) => {
    updateProfile(data);
    toast.success('资料已保存');
  });

  return (
    <div className="animate-fade-up">
      <PageHeader title="个人中心" description="管理你的个人资料与偏好" />

      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-5">
          <UserAvatar user={user} size="xl" />
          <div className="flex-1">
            <h2 className="font-display text-xl font-bold">{user.name}</h2>
            <p className="text-text-tertiary">
              {user.title} · {user.department}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {(user.skills ?? []).map((s) => (
                <Badge key={s} variant="cyan">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-6">
            <Stat label="进行中" value={stats.active} />
            <Stat label="已完成" value={stats.completed} />
            <Stat label="总任务" value={stats.total} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">基本资料</TabsTrigger>
          <TabsTrigger value="about">关于我</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>编辑资料</CardTitle>
            </CardHeader>
            <CardContent>
              <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <RHFTextField name="name" label="姓名" />
                  <RHFTextField name="role" label="职位" />
                </div>
                <RHFTextField name="email" label="邮箱" type="email" />
                <RHFTextarea name="bio" label="个人简介" hint="不超过 200 字" />
                <div className="flex justify-end">
                  <Button type="submit" variant="primary">
                    保存修改
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="about">
          <Card>
            <CardContent className="space-y-2 text-text-secondary">
              <p>{user.bio}</p>
              <p className="text-sm text-text-tertiary">加入于 {user.joinDate}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="font-display text-2xl font-bold tabular-nums">{value}</p>
      <p className="text-xs text-text-tertiary">{label}</p>
    </div>
  );
}
