import { Paperclip, Send } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { TagsInput } from 'src/components/ui/tags-input';
import { AutosizeTextarea } from 'src/components/ui/autosize-textarea';
import { toast } from 'src/components/ui/sonner';
import { useMailStore } from 'src/store';
import { useSendThreadMutation } from 'src/api';

export function ComposeDialog() {
  const open = useMailStore((s) => s.composeOpen);
  const draft = useMailStore((s) => s.draft);
  const setDraft = useMailStore((s) => s.setDraft);
  const closeCompose = useMailStore((s) => s.closeCompose);
  const send = useSendThreadMutation();

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeCompose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>撰写邮件</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <TagsInput value={draft.to} onChange={(to) => setDraft({ to })} placeholder="收件人（回车添加）…" />
          <Input value={draft.subject} onChange={(e) => setDraft({ subject: e.target.value })} placeholder="主题" />
          <AutosizeTextarea
            value={draft.body}
            onChange={(e) => setDraft({ body: e.target.value })}
            placeholder="正文…"
            className="min-h-40"
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <Button variant="ghost" size="sm"><Paperclip className="size-4" /> 附件</Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => { closeCompose(); toast.success('草稿已保存'); }}
            >
              存草稿
            </Button>
            <Button
              variant="primary"
              disabled={draft.to.length === 0 || !draft.body.trim()}
              onClick={() => { send.mutate(draft); closeCompose(); toast.success('邮件已发送'); }}
            >
              <Send className="size-4" /> 发送
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
