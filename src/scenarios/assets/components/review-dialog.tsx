import { useState } from 'react';
import { Check, History, MessageSquarePlus, X } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { useFormat } from 'src/lib/format';
import { useAppStore, useMember } from 'src/store';
import { useAssetsQuery, useAddAssetAnnotationMutation, useSetAssetReviewMutation } from 'src/api';
import type { Asset } from 'src/types';

/** 设计评审：图上标注 + 版本历史 + 通过/打回 */
export function ReviewDialog({ asset, onClose }: { asset: Asset | null; onClose: () => void }) {
  const { data: assets = [] } = useAssetsQuery();
  const live = assets.find((a) => a.id === asset?.id);
  const setReview = useSetAssetReviewMutation();
  const addAnnotation = useAddAssetAnnotationMutation();
  const currentUser = useAppStore((s) => s.currentUser);
  const [note, setNote] = useState('');
  const [pending, setPending] = useState<{ x: number; y: number } | null>(null);
  const fmt = useFormat();

  if (!asset || !live) return null;

  return (
    <Dialog open={!!asset} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>{live.name}</DialogTitle>
            {live.reviewStatus && (
              <Badge variant={live.reviewStatus === 'approved' ? 'success' : live.reviewStatus === 'rejected' ? 'danger' : 'amber'}>
                {live.reviewStatus === 'approved' ? '已通过' : live.reviewStatus === 'rejected' ? '已打回' : '待评审'}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="grid gap-5 md:grid-cols-[1fr_240px]">
          <div
            className="holographic-bg relative aspect-[4/3] cursor-crosshair overflow-hidden rounded-[var(--radius-lg)]"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setPending({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
          >
            {(live.annotations ?? []).map((an) => (
              <SimpleTooltip key={an.id} content={an.text}>
                <span
                  className="absolute flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-surface-solid)] text-xs font-bold text-[var(--color-holo-foreground)] shadow"
                  style={{ left: `${an.x}%`, top: `${an.y}%` }}
                >
                  !
                </span>
              </SimpleTooltip>
            ))}
            {pending && (
              <span className="absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--color-surface-solid)]" style={{ left: `${pending.x}%`, top: `${pending.y}%` }} />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <MessageSquarePlus className="size-4" /> 标注 {pending ? '（点击图片已选点）' : '（点击图片添加）'}
              </p>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!note.trim() || !pending) return;
                  addAnnotation.mutate({ id: live.id, annotation: { x: pending.x, y: pending.y, by: currentUser.id, text: note } });
                  setNote('');
                  setPending(null);
                }}
              >
                <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="批注内容…" />
                <Button type="submit" variant="primary" size="icon" disabled={!pending}>
                  <Check className="size-4" />
                </Button>
              </form>
              <div className="mt-3 space-y-2">
                {(live.annotations ?? []).map((an) => (
                  <Annotation key={an.id} by={an.by} text={an.text} />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <History className="size-4" /> 版本历史
              </p>
              <div className="space-y-1.5">
                {(live.versions ?? []).map((v) => (
                  <div key={v.v} className="flex items-center justify-between text-xs">
                    <Badge variant="cyan">{v.v}</Badge>
                    <span className="text-text-tertiary">{fmt.date(v.at)}</span>
                  </div>
                ))}
                {(live.versions ?? []).length === 0 && <p className="text-xs text-text-tertiary">暂无历史版本</p>}
              </div>
            </div>

            <div className="flex gap-2 border-t border-[var(--color-glass-border)] pt-4">
              <Button variant="primary" className="flex-1" onClick={() => setReview.mutate({ id: live.id, status: 'approved' })}>
                <Check className="size-4" /> 通过
              </Button>
              <Button variant="danger" className="flex-1" onClick={() => setReview.mutate({ id: live.id, status: 'rejected' })}>
                <X className="size-4" /> 打回
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Annotation({ by, text }: { by: string; text: string }) {
  const user = useMember(by);
  return (
    <div className="rounded-[var(--radius-sm)] bg-[var(--color-glass-bg)] px-2.5 py-1.5 text-xs">
      <span className="font-medium">{user?.name ?? '成员'}</span>
      <span className="text-text-secondary">：{text}</span>
    </div>
  );
}
