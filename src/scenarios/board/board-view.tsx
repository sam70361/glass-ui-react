import { useMemo, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { AlertTriangle, ChevronDown, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from 'src/lib/utils';
import { PageHeader } from 'src/components/shared/page-header';
import { TaskCard } from 'src/components/shared/task-card';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { SkeletonCard } from 'src/components/ui/skeleton';
import { TASK_STATUSES, PRIORITIES } from 'src/config/constants';
import { useAppStore } from 'src/store';
import { useProjectsQuery, useTasksQuery, useTeamQuery, useCreateTaskMutation, useUpdateTaskMutation } from 'src/api';
import type { Task, TaskStatus } from 'src/types';
import { TaskDetailDialog } from './components/task-detail-dialog';
import { BoardToolbar, type BoardFilters, type BoardView as ViewMode } from './components/board-toolbar';
import { TaskTable } from './components/task-table';
import { NewProjectWizard } from 'src/components/overlays/new-project-wizard';

const WIP_LIMITS: Partial<Record<TaskStatus, number>> = { 'in-progress': 4, review: 3 };

export default function BoardView() {
  const tasksQ = useTasksQuery();
  const projectsQ = useProjectsQuery();
  const teamQ = useTeamQuery();
  const tasks = tasksQ.data ?? [];
  const projects = projectsQ.data ?? [];
  const team = teamQ.data ?? [];
  // activeProjectId / currentUser 为 UI/身份态，保留在 store
  const activeProjectId = useAppStore((s) => s.activeProjectId);
  const currentUser = useAppStore((s) => s.currentUser);
  const updateTask = useUpdateTaskMutation();
  const createTask = useCreateTaskMutation();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openTask, setOpenTask] = useState<Task | null>(null);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [view, setView] = useState<ViewMode>('board');
  const [filters, setFilters] = useState<BoardFilters>({
    search: '',
    assignee: 'all',
    priority: 'all',
    tag: 'all',
    groupBy: 'none',
  });

  const project = projects.find((p) => p.id === activeProjectId);
  const loading = tasksQ.isPending;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const addTask = (status: TaskStatus) =>
    createTask.mutate(
      { title: '新任务', projectId: activeProjectId, assigneeId: currentUser.id, priority: 'medium', status },
      { onSuccess: () => toast.success('已新建任务') }
    );

  const projectTasks = useMemo(() => {
    const q = filters.search.toLowerCase();
    return tasks.filter((t) => {
      if (t.projectId !== activeProjectId) return false;
      if (filters.assignee !== 'all' && t.assigneeId !== filters.assignee) return false;
      if (filters.priority !== 'all' && t.priority !== filters.priority) return false;
      if (filters.tag !== 'all' && !t.tags.includes(filters.tag)) return false;
      if (q && !t.title.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tasks, activeProjectId, filters]);

  const activeTask = projectTasks.find((t) => t.id === activeId);

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }
  function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const overId = e.over?.id as TaskStatus | undefined;
    const id = String(e.active.id);
    const prev = tasks.find((t) => t.id === id)?.status;
    if (overId && TASK_STATUSES.some((s) => s.id === overId) && prev !== overId) {
      updateTask.mutate({ id, patch: { status: overId } });
      toast.success('任务状态已更新', {
        action: { label: '撤销', onClick: () => prev && updateTask.mutate({ id, patch: { status: prev } }) },
      });
    }
  }

  const lanes = useMemo(() => {
    if (filters.groupBy === 'assignee') {
      const ids = [...new Set(projectTasks.map((t) => t.assigneeId))];
      return ids.map((id) => ({
        key: id,
        label: team.find((m) => m.id === id)?.name ?? '未分配',
        tasks: projectTasks.filter((t) => t.assigneeId === id),
      }));
    }
    if (filters.groupBy === 'priority') {
      return PRIORITIES.map((p) => ({
        key: p.id,
        label: p.label,
        tasks: projectTasks.filter((t) => t.priority === p.id),
      })).filter((l) => l.tasks.length);
    }
    return [{ key: 'all', label: '', tasks: projectTasks }];
  }, [projectTasks, filters.groupBy, team]);

  return (
    <div className="flex h-full flex-col animate-fade-up">
      <PageHeader
        title={`${project?.name ?? '项目'} · 看板`}
        description="拖拽卡片以更新任务状态"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="default" onClick={() => setWizardOpen(true)}>
              <Plus className="size-4" /> 新建项目
            </Button>
            <Button variant="primary" onClick={() => addTask('todo')} disabled={createTask.isPending}>
              <Plus className="size-4" /> 新建任务
            </Button>
          </div>
        }
      />

      <BoardToolbar
        count={projectTasks.length}
        view={view}
        onViewChange={setView}
        filters={filters}
        onFilter={(patch) => setFilters((f) => ({ ...f, ...patch }))}
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : view === 'table' ? (
        <TaskTable tasks={projectTasks} onOpen={setOpenTask} />
      ) : (
        <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <div className="flex-1 space-y-5 overflow-x-auto pb-2">
            {lanes.map((lane) => (
              <div key={lane.key}>
                {lane.label && (
                  <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-text-secondary">
                    <ChevronDown className="size-4" />
                    {lane.label}
                    <Badge className="px-1.5">{lane.tasks.length}</Badge>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {TASK_STATUSES.map((col) => {
                    const colTasks = lane.tasks.filter((t) => t.status === col.id);
                    return (
                      <Column
                        key={col.id}
                        id={col.id}
                        label={col.label}
                        color={col.color}
                        count={colTasks.length}
                        limit={WIP_LIMITS[col.id]}
                        onAdd={() => addTask(col.id)}
                      >
                        {colTasks.map((t) => (
                          <DraggableCard key={t.id} task={t} onClick={() => setOpenTask(t)} />
                        ))}
                      </Column>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <DragOverlay>{activeTask ? <TaskCard task={activeTask} dragging /> : null}</DragOverlay>
        </DndContext>
      )}

      <TaskDetailDialog task={openTask} onClose={() => setOpenTask(null)} />
      <NewProjectWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </div>
  );
}

function Column({
  id,
  label,
  color,
  count,
  limit,
  onAdd,
  children,
}: {
  id: string;
  label: string;
  color: string;
  count: number;
  limit?: number;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const over = limit !== undefined && count > limit;
  return (
    <div className="flex min-w-[240px] flex-col">
      <div className={cn('mb-3 flex items-center gap-2 px-1', over && 'text-danger')}>
        <span className="size-2.5 rounded-full" style={{ background: color }} />
        <h3 className="text-sm font-semibold">{label}</h3>
        <Badge variant={over ? 'danger' : 'default'} className="px-1.5">
          {count}
          {limit ? ` / ${limit}` : ''}
        </Badge>
        {over && <AlertTriangle className="size-3.5" />}
        <button onClick={onAdd} className="ms-auto text-text-tertiary transition-colors hover:text-foreground" aria-label="新建任务">
          <Plus className="size-4" />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'flex flex-1 flex-col gap-2.5 rounded-[var(--radius-lg)] border border-dashed border-transparent p-2 transition-colors',
          isOver && 'border-[rgba(var(--color-accent-cyan-rgb),0.4)] bg-[rgba(var(--color-accent-cyan-rgb),0.04)]'
        )}
      >
        {children}
        {count === 0 && (
          <div className="flex flex-col items-center gap-1 py-6 text-text-muted">
            <Plus className="size-5 opacity-40" />
            <span className="text-xs">暂无任务</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DraggableCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} className={cn(isDragging && 'opacity-30')} style={{ touchAction: 'none' }}>
      <TaskCard task={task} onClick={onClick} />
    </div>
  );
}
