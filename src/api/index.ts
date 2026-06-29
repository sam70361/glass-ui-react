/** 数据访问层统一出口。 */

// 核心域只读 hooks
export {
  useProjectsQuery,
  useTasksQuery,
  useTeamQuery,
  useAssetsQuery,
  useActivitiesQuery,
} from './use-core';

// 邮件
export {
  useMailThreadsQuery,
  useUpdateThreadsMutation,
  useToggleThreadLabelMutation,
  useDeleteThreadsMutation,
  useReplyThreadMutation,
  useSendThreadMutation,
} from './use-mail';

// 场景
export {
  useScenarioData,
  useRagQuery,
  useUploadRagDocMutation,
} from './use-scenarios';

// 写操作 mutations
export {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useAddCommentMutation,
  useToggleSubtaskMutation,
} from './use-task-mutations';
export {
  useInviteMemberMutation,
  useRemoveMemberMutation,
} from './use-team-mutations';
export {
  useUploadAssetMutation,
  useDeleteAssetMutation,
  useToggleAssetFavoriteMutation,
  useSetAssetReviewMutation,
  useAddAssetAnnotationMutation,
} from './use-asset-mutations';
export { useCreateProjectMutation } from './use-project-mutations';
