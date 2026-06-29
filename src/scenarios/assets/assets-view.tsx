import { useMemo, useState } from 'react';
import {
  Box,
  ClipboardCheck,
  Download,
  FileText,
  Heart,
  Image as ImageIcon,
  Library,
  Music,
  Palette,
  Star,
  Upload as UploadIcon,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { SearchInput } from 'src/components/shared/search-input';
import { Lightbox } from 'src/components/overlays/lightbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'src/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'src/components/ui/select';
import { SimpleTooltip } from 'src/components/ui/tooltip';
import { Upload } from 'src/components/shared/upload';
import { EmptyState } from 'src/components/ui/empty-state';
import { Skeleton } from 'src/components/ui/skeleton';
import { toast } from 'sonner';
import { useAssetsQuery, useProjectsQuery, useToggleAssetFavoriteMutation, useUploadAssetMutation } from 'src/api';
import type { Asset, AssetType } from 'src/types';
import { ReviewDialog } from './components/review-dialog';
import { DATA_PALETTE, CATEGORICAL } from 'src/theme/palette';

const EXT_TYPE: Record<string, AssetType> = {
  mp4: 'video', mov: 'video', webm: 'video',
  mp3: 'audio', wav: 'audio',
  glb: '3d', gltf: '3d', obj: '3d',
  pdf: 'doc', doc: 'doc', docx: 'doc', md: 'doc', txt: 'doc',
  png: 'image', jpg: 'image', jpeg: 'image', gif: 'image', webp: 'image', svg: 'image',
};
const inferType = (name: string): AssetType => EXT_TYPE[name.split('.').pop()?.toLowerCase() ?? ''] ?? 'image';

const TYPE_CATS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'all', label: '全部素材', icon: Library },
  { id: 'image', label: '图片', icon: ImageIcon },
  { id: 'video', label: '视频', icon: Video },
  { id: '3d', label: '3D模型', icon: Box },
  { id: 'audio', label: '音频', icon: Music },
  { id: 'doc', label: '文档', icon: FileText },
  { id: 'palette', label: '色板', icon: Palette },
  { id: 'favorites', label: '我的收藏', icon: Star },
];

const TYPE_ICONS: Record<AssetType, LucideIcon> = {
  image: ImageIcon,
  video: Video,
  '3d': Box,
  audio: Music,
  doc: FileText,
  palette: Palette,
};

const COLORS = CATEGORICAL;

function parseSize(s: string) {
  const n = parseFloat(s);
  if (/GB/i.test(s)) return n * 1024 * 1024;
  if (/MB/i.test(s)) return n * 1024;
  if (/KB/i.test(s)) return n;
  return n;
}

export default function AssetsView() {
  const assetsQ = useAssetsQuery();
  const assets = assetsQ.data ?? [];
  const projects = useProjectsQuery().data ?? [];
  const toggleFavorite = useToggleAssetFavoriteMutation();
  const uploadAsset = useUploadAssetMutation();
  const [type, setType] = useState('all');
  const [projectId, setProjectId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('all');
  const [sort, setSort] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [preview, setPreview] = useState<Asset | null>(null);
  const [review, setReview] = useState<Asset | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const matchType = (a: Asset) => type === 'all' || (type === 'favorites' ? a.favorite : a.type === type);
  const matchSearch = (a: Asset) =>
    !search ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

  const list = useMemo(() => {
    const filtered = assets.filter((a) => {
      if (!matchType(a)) return false;
      if (projectId && a.projectId !== projectId) return false;
      if (tag !== 'all' && !a.tags.includes(tag)) return false;
      return matchSearch(a);
    });
    return filtered.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name, 'zh');
      if (sort === 'size') return parseSize(b.size) - parseSize(a.size);
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assets, type, projectId, tag, sort, search]);

  const typeCount = (id: string) =>
    assets.filter((a) => {
      if (projectId && a.projectId !== projectId) return false;
      if (id === 'all') return true;
      if (id === 'favorites') return a.favorite;
      return a.type === id;
    }).length;

  const projectCount = (pid: string | null) =>
    assets.filter((a) => (pid ? a.projectId === pid : true) && matchType(a)).length;

  const allTags = [...new Set(assets.flatMap((a) => a.tags))];

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="素材库"
        description="管理所有设计素材和资源"
        actions={
          <Button variant="primary" onClick={() => setUploadOpen(true)}>
            <UploadIcon className="size-4" /> 上传素材
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* 左侧分类栏 */}
        <aside className="hidden space-y-6 lg:block">
          <div>
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">素材类型</p>
            <div className="space-y-0.5">
              {TYPE_CATS.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setType(c.id)}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-sm transition-colors',
                      type === c.id ? 'bg-[var(--color-glass-bg-active)] text-foreground' : 'text-text-secondary hover:bg-[var(--color-glass-bg)]'
                    )}
                  >
                    <Icon className={cn('size-4', type === c.id && 'text-cyan')} />
                    <span className="flex-1 text-left">{c.label}</span>
                    <span className="text-xs text-text-tertiary">{typeCount(c.id)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wide text-text-tertiary">项目筛选</p>
            <div className="space-y-0.5">
              <ProjectFilterItem color={DATA_PALETTE.cyan} label="全部项目" count={projectCount(null)} active={projectId === null} onClick={() => setProjectId(null)} />
              {projects.map((p) => (
                <ProjectFilterItem
                  key={p.id}
                  color={p.color}
                  label={p.name}
                  count={projectCount(p.id)}
                  active={projectId === p.id}
                  onClick={() => setProjectId(p.id)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* 内容区 */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <SearchInput value={search} onValueChange={setSearch} placeholder="搜索素材名称、标签…" className="w-full max-w-xs" />
            <div className="ms-auto flex items-center gap-2">
              <Select value={tag} onValueChange={setTag}>
                <SelectTrigger className="h-9 w-auto min-w-28 text-sm">
                  <SelectValue placeholder="标签" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部标签</SelectItem>
                  {allTags.map((t) => (
                    <SelectItem key={t} value={t}>
                      #{t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="h-9 w-auto min-w-28 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新上传</SelectItem>
                  <SelectItem value="name">按名称</SelectItem>
                  <SelectItem value="size">按大小</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 rounded-[var(--radius-md)] border border-[var(--color-glass-border)] bg-[var(--color-glass-bg)] p-1">
                <LayoutBtn active={layout === 'grid'} onClick={() => setLayout('grid')} label="网格">
                  <Library className="size-4" />
                </LayoutBtn>
                <LayoutBtn active={layout === 'list'} onClick={() => setLayout('list')} label="列表">
                  <FileText className="size-4" />
                </LayoutBtn>
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm">
            <span className="font-medium">{list.length} 个素材</span>
            <span className="text-text-tertiary">
              {type !== 'all' && TYPE_CATS.find((c) => c.id === type)?.label}
              {projectId && ` · ${projects.find((p) => p.id === projectId)?.name}`}
              {search && ` · 搜索: ${search}`}
            </span>
          </div>

          {assetsQ.isPending ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3]" />
              ))}
            </div>
          ) : list.length === 0 ? (
            <EmptyState icon={ImageIcon} title="未找到素材" description="尝试调整筛选条件或搜索关键词" />
          ) : layout === 'grid' ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {list.map((a, i) => (
                <AssetCardGrid key={a.id} asset={a} index={i} onPreview={() => setPreview(a)} onReview={() => setReview(a)} onFav={() => toggleFavorite.mutate(a.id)} />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {list.map((a, i) => (
                <AssetRow key={a.id} asset={a} index={i} onPreview={() => setPreview(a)} onReview={() => setReview(a)} onFav={() => toggleFavorite.mutate(a.id)} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Lightbox open={!!preview} onOpenChange={(o) => !o && setPreview(null)} caption={preview?.name} />
      <ReviewDialog asset={review} onClose={() => setReview(null)} />

      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>上传素材</DialogTitle>
          </DialogHeader>
          <Upload
            onFiles={(files) => {
              const pid = projectId ?? projects[0]?.id;
              if (!pid) return;
              files.forEach((f) => uploadAsset.mutate({ name: f.name, type: inferType(f.name), projectId: pid }));
              setUploadOpen(false);
              toast.success(files.length > 1 ? `已上传 ${files.length} 个素材` : '素材已上传');
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectFilterItem({ color, label, count, active, onClick }: { color: string; label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-sm transition-colors',
        active ? 'bg-[var(--color-glass-bg-active)] text-foreground' : 'text-text-secondary hover:bg-[var(--color-glass-bg)]'
      )}
    >
      <span className="size-2.5 rounded-full" style={{ background: color }} />
      <span className="flex-1 truncate text-left">{label}</span>
      <span className="text-xs text-text-tertiary">{count}</span>
    </button>
  );
}

function LayoutBtn({ active, onClick, label, children }: { active: boolean; onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <SimpleTooltip content={label}>
      <button
        onClick={onClick}
        className={cn('flex size-7 items-center justify-center rounded-[var(--radius-sm)] transition-colors', active ? 'bg-[var(--color-glass-bg-active)] text-cyan' : 'text-text-tertiary hover:text-foreground')}
        aria-label={label}
      >
        {children}
      </button>
    </SimpleTooltip>
  );
}

function ReviewBadge({ asset }: { asset: Asset }) {
  if (!asset.reviewStatus) return null;
  const map = { approved: ['success', '已通过'], rejected: ['danger', '已打回'], pending: ['amber', '待评审'] } as const;
  const [variant, label] = map[asset.reviewStatus];
  return <Badge variant={variant}>{label}</Badge>;
}

function AssetCardGrid({ asset, index, onPreview, onReview, onFav }: { asset: Asset; index: number; onPreview: () => void; onReview: () => void; onFav: () => void }) {
  const Icon = TYPE_ICONS[asset.type];
  return (
    <Card interactive className="group overflow-hidden p-0">
      <button onClick={onPreview} className="relative block aspect-[4/3] w-full overflow-hidden">
        <div className="size-full opacity-80 transition-transform duration-300 group-hover:scale-105" style={{ background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}, ${COLORS[(index + 2) % COLORS.length]})` }} />
        <span className="absolute start-2 top-2 flex size-7 items-center justify-center rounded-full bg-[var(--color-scrim)] text-foreground backdrop-blur-[var(--blur-sm)]">
          <Icon className="size-3.5" />
        </span>
        <span className="absolute end-2 top-2">
          <ReviewBadge asset={asset} />
        </span>
      </button>
      <div className="flex items-center justify-between gap-2 p-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{asset.name}</p>
          <p className="text-xs text-text-tertiary">{asset.size}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {asset.type === 'image' && (
            <button onClick={onReview} aria-label="评审" className="text-text-tertiary transition-colors hover:text-cyan">
              <ClipboardCheck className="size-4" />
            </button>
          )}
          <button onClick={onFav} aria-label="收藏" className="text-text-tertiary transition-colors hover:text-magenta">
            {asset.favorite ? <Heart className="size-4 fill-magenta text-magenta" /> : <Star className="size-4" />}
          </button>
        </div>
      </div>
    </Card>
  );
}

function AssetRow({ asset, index, onPreview, onReview, onFav }: { asset: Asset; index: number; onPreview: () => void; onReview: () => void; onFav: () => void }) {
  const Icon = TYPE_ICONS[asset.type];
  return (
    <Card interactive className="flex items-center gap-3 p-2.5">
      <button onClick={onPreview} className="relative size-12 shrink-0 overflow-hidden rounded-[var(--radius-md)]">
        <span className="block size-full" style={{ background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}, ${COLORS[(index + 2) % COLORS.length]})` }} />
        <span className="absolute inset-0 flex items-center justify-center text-foreground">
          <Icon className="size-4" />
        </span>
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{asset.name}</p>
        <p className="text-xs text-text-tertiary">
          {asset.size}
          {asset.dimensions ? ` · ${asset.dimensions}` : ''}
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {asset.tags.slice(0, 2).map((t) => (
          <Badge key={t}>#{t}</Badge>
        ))}
      </div>
      <ReviewBadge asset={asset} />
      <div className="flex shrink-0 items-center gap-1">
        <button onClick={onPreview} aria-label="下载" className="text-text-tertiary transition-colors hover:text-foreground">
          <Download className="size-4" />
        </button>
        {asset.type === 'image' && (
          <button onClick={onReview} aria-label="评审" className="text-text-tertiary transition-colors hover:text-cyan">
            <ClipboardCheck className="size-4" />
          </button>
        )}
        <button onClick={onFav} aria-label="收藏" className="text-text-tertiary transition-colors hover:text-magenta">
          {asset.favorite ? <Heart className="size-4 fill-magenta text-magenta" /> : <Star className="size-4" />}
        </button>
      </div>
    </Card>
  );
}
