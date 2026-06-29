/** 邮件文件夹（trash/archive/sent/drafts/inbox 为存储位置，starred 为派生视图） */
export type MailFolderId = 'inbox' | 'sent' | 'drafts' | 'archive' | 'trash';
/** 收件箱左栏可选视图：含派生的 starred */
export type MailViewId = MailFolderId | 'starred';

export type MailAttachmentKind = 'image' | 'doc' | 'pdf' | 'sheet' | 'zip' | 'other';

export interface MailLabel {
  id: string;
  name: string;
  color: string;
}

export interface MailAttachment {
  id: string;
  name: string;
  size: string;
  kind: MailAttachmentKind;
}

export interface MailMessage {
  id: string;
  /** 发件人：team 成员 id，或 'me' 表示当前用户 */
  fromId: string;
  toIds: string[];
  body: string;
  sentAt: string;
  attachments?: MailAttachment[];
}

export interface MailThread {
  id: string;
  subject: string;
  /** 存储位置 */
  folder: MailFolderId;
  participantIds: string[];
  messages: MailMessage[];
  /** 最新一条的预览 */
  snippet: string;
  read: boolean;
  starred: boolean;
  labelIds: string[];
  hasAttachments: boolean;
  /** 最新消息时间，用于排序 */
  updatedAt: string;
}
