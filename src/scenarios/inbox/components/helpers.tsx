import { useAppStore } from 'src/store';
import { UserAvatar } from 'src/components/shared/user-avatar';
import type { AvatarProps } from 'src/components/ui/avatar';

/** 解析邮件中的用户：'me' / 当前用户 id → 当前用户，否则查 team */
export function useMailUser(id: string) {
  const currentUser = useAppStore((s) => s.currentUser);
  const team = useAppStore((s) => s.team);
  if (id === 'me' || id === currentUser.id) return currentUser;
  return team.find((m) => m.id === id);
}

export function SenderAvatar({ id, ...props }: { id: string } & Omit<AvatarProps, 'children'>) {
  const user = useMailUser(id);
  return <UserAvatar user={user} {...props} />;
}

export function senderLabel(user: { name?: string } | undefined, isMe: boolean) {
  if (isMe) return '我';
  return user?.name ?? '系统';
}
