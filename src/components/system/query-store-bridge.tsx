import { useEffect } from 'react';

import { useAppStore } from 'src/store';
import { useAssetsQuery, useProjectsQuery, useTasksQuery, useTeamQuery } from 'src/api';

/** 将 react-query 缓存镜像进 Zustand，使未使用 query 的消费方读到最新数据。 */
export function QueryStoreBridge() {
  const { data: tasks } = useTasksQuery();
  const { data: team } = useTeamQuery();
  const { data: assets } = useAssetsQuery();
  const { data: projects } = useProjectsQuery();

  useEffect(() => {
    if (tasks) useAppStore.setState({ tasks });
  }, [tasks]);
  useEffect(() => {
    if (team) useAppStore.setState({ team });
  }, [team]);
  useEffect(() => {
    if (assets) useAppStore.setState({ assets });
  }, [assets]);
  useEffect(() => {
    if (projects) useAppStore.setState({ projects });
  }, [projects]);

  return null;
}
