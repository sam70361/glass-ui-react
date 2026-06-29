import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from 'src/components/ui/avatar';

interface UserLike {
  name?: string;
  avatar?: string;
}

export interface UserAvatarProps extends Omit<AvatarProps, 'children'> {
  user?: UserLike | null;
  /** 兜底文案（默认取 name 首字 / 系统） */
  fallback?: string;
}

/**
 * 统一头像：优先展示真人照片（user.avatar），加载失败或离线自动回退到姓名首字。
 * 这就是“在线头像 + 兜底”的实现，全站复用。
 */
export function UserAvatar({ user, fallback, ...props }: UserAvatarProps) {
  const name = user?.name ?? '';
  const initial = fallback ?? (name ? name.slice(0, 1) : '系');
  return (
    <Avatar {...props}>
      {user?.avatar && <AvatarImage src={user.avatar} alt={name} />}
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
}
