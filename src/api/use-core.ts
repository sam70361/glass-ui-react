import { useQuery } from '@tanstack/react-query';

import type {
  Activity,
  Asset,
  Project,
  Task,
  User,
} from 'src/types';
import { fetcher } from './fetcher';
import { queryKeys } from './query-keys';

/** 项目列表 */
export function useProjectsQuery() {
  return useQuery({ queryKey: queryKeys.projects, queryFn: () => fetcher.get<Project[]>('/projects') });
}

/** 任务列表 */
export function useTasksQuery() {
  return useQuery({ queryKey: queryKeys.tasks, queryFn: () => fetcher.get<Task[]>('/tasks') });
}

/** 团队成员 */
export function useTeamQuery() {
  return useQuery({ queryKey: queryKeys.team, queryFn: () => fetcher.get<User[]>('/team') });
}

/** 素材 */
export function useAssetsQuery() {
  return useQuery({ queryKey: queryKeys.assets, queryFn: () => fetcher.get<Asset[]>('/assets') });
}

/** 活动流 */
export function useActivitiesQuery() {
  return useQuery({ queryKey: queryKeys.activities, queryFn: () => fetcher.get<Activity[]>('/activities') });
}
