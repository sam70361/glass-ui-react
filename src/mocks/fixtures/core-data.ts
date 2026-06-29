import type {
  Activity,
  AppNotification,
  Asset,
  Automation,
  CalendarEvent,
  Moodboard,
  MoodboardElement,
  Priority,
  Project,
  Task,
  TaskStatus,
  User,
} from 'src/types';
import { DATA_PALETTE } from 'src/theme/palette';
import { BRANDS } from 'src/mocks/fixtures/brand';

const now = Date.now();
export const daysAgo = (n: number) => new Date(now - n * 86400000).toISOString();
export const daysFromNow = (n: number) => new Date(now + n * 86400000).toISOString();

/** 头像池：用于新增成员循环取值 */
export const AVATAR_POOL = Array.from({ length: 16 }, (_, i) => `/avatars/user-${i + 1}.jpg`);

export const currentUser: User = {
  id: 'user-1',
  name: '小鱼儿',
  email: 'linxiyue@glassui.com',
  avatar: '/avatars/user-1.jpg',
  role: '创意总监',
  title: 'Creative Director',
  status: 'online',
  department: '创意部',
  skills: ['UI设计', '品牌策略', '用户研究'],
  bio: '10年+创意行业经验，专注于数字产品设计与品牌体验',
  joinDate: '2023-03-15',
  tasksAssigned: 3,
  tasksCompleted: 12,
};

export const team: User[] = [
  { ...currentUser },
  { id: 'user-2', name: '陈星辰', email: 'chenxingchen@glassui.com', avatar: '/avatars/user-2.jpg', role: '高级UI设计师', title: 'Senior UI Designer', status: 'online', department: '设计部', skills: ['Figma', '视觉设计', '动效'], tasksAssigned: 5, tasksCompleted: 18 },
  { id: 'user-3', name: '苏墨言', email: 'sumoyan@glassui.com', avatar: '/avatars/user-3.jpg', role: '前端开发', title: 'Frontend Developer', status: 'away', department: '技术部', skills: ['React', 'Vue', 'CSS'], tasksAssigned: 4, tasksCompleted: 9 },
  { id: 'user-4', name: '白清寒', email: 'baiqinghan@glassui.com', avatar: '/avatars/user-4.jpg', role: 'UX研究员', title: 'UX Researcher', status: 'offline', department: '研究部', skills: ['用户访谈', '数据洞察', '原型'], tasksAssigned: 2, tasksCompleted: 7 },
  { id: 'user-5', name: '顾南笙', email: 'gunansheng@glassui.com', avatar: '/avatars/user-5.jpg', role: '插画师', title: 'Illustrator', status: 'online', department: '设计部', skills: ['插画', '3D', '手绘'], tasksAssigned: 3, tasksCompleted: 11 },
  { id: 'user-6', name: '沈清辞', email: 'shenqingci@glassui.com', avatar: '/avatars/user-6.jpg', role: '产品经理', title: 'Product Manager', status: 'away', department: '产品部', skills: ['产品规划', '需求分析', '敏捷管理'], tasksAssigned: 2, tasksCompleted: 15 },
];

export const projects: Project[] = [
  { id: BRANDS.aurora.id, name: BRANDS.aurora.name, description: `为 ${BRANDS.aurora.short} 打造全新品牌视觉系统与官网体验`, color: BRANDS.aurora.color, progress: 78, status: 'active', health: 'good', startDate: daysAgo(30), dueDate: daysFromNow(12), memberIds: ['user-1', 'user-2', 'user-5'], taskCount: 24 },
  { id: BRANDS.nebula.id, name: BRANDS.nebula.name, description: '移动端产品改版，提升核心流程转化与体验', color: BRANDS.nebula.color, progress: 45, status: 'active', health: 'risk', startDate: daysAgo(20), dueDate: daysFromNow(28), memberIds: ['user-1', 'user-2', 'user-3', 'user-6'], taskCount: 38 },
  { id: BRANDS.luna.id, name: BRANDS.luna.name, description: '电商平台从设计到上线的全链路交付', color: BRANDS.luna.color, progress: 92, status: 'active', health: 'good', startDate: daysAgo(60), dueDate: daysFromNow(5), memberIds: ['user-1', 'user-3', 'user-4'], taskCount: 56 },
  { id: BRANDS.stellar.id, name: BRANDS.stellar.name, description: '企业官网品牌升级与响应式实现', color: BRANDS.stellar.color, progress: 30, status: 'active', health: 'warning', startDate: daysAgo(10), dueDate: daysFromNow(45), memberIds: ['user-2', 'user-5'], taskCount: 18 },
  { id: BRANDS.cosmos.id, name: BRANDS.cosmos.name, description: '统一的组件库与设计规范，沉淀团队资产', color: BRANDS.cosmos.color, progress: 60, status: 'active', health: 'good', startDate: daysAgo(45), dueDate: daysFromNow(20), memberIds: ['user-1', 'user-2', 'user-3'], taskCount: 42 },
];

const baseTasks: Task[] = [
  { id: 'task-1', title: '设计首页Hero区域视觉方案', description: '探索3种不同风格的Hero区域设计方向，包含动效提案', status: 'in-progress', priority: 'high', projectId: 'proj-1', assigneeId: 'user-2', dueDate: daysFromNow(1), tags: ['design', 'urgent'], attachments: 3, comments: 5, subtasks: [{ id: 'sub-1', title: '收集竞品 Hero 参考', done: true }, { id: 'sub-2', title: '产出 3 个方向草图', done: true }, { id: 'sub-3', title: '完成高保真视觉稿', done: false }, { id: 'sub-4', title: '制作动效演示', done: false }], commentList: [{ id: 'c-1', userId: 'user-1', text: '方向二的渐变很有质感，可以深入。', time: daysAgo(1) }, { id: 'c-2', userId: 'user-2', text: '收到，我今天出高保真。', time: daysAgo(0) }] },
  { id: 'task-2', title: '完成用户调研报告', description: '整理20份用户访谈记录，输出洞察报告', status: 'review', priority: 'high', projectId: 'proj-2', assigneeId: 'user-4', dueDate: daysFromNow(2), tags: ['research'], attachments: 1, comments: 2 },
  { id: 'task-3', title: '组件库按钮样式重构', description: '统一按钮组件的尺寸、状态和交互规范', status: 'todo', priority: 'medium', projectId: 'proj-5', assigneeId: 'user-2', dueDate: daysFromNow(5), tags: ['design', 'development'], attachments: 0, comments: 8 },
  { id: 'task-4', title: '产品详情页开发', description: '根据设计稿实现响应式产品详情页', status: 'in-progress', priority: 'medium', projectId: 'proj-3', assigneeId: 'user-3', dueDate: daysFromNow(3), tags: ['development'], attachments: 2, comments: 3 },
  { id: 'task-5', title: '品牌插画系列创作', description: '为Aurora品牌创作5幅主题插画', status: 'todo', priority: 'low', projectId: 'proj-1', assigneeId: 'user-5', dueDate: daysFromNow(10), tags: ['design'], attachments: 0, comments: 1 },
  { id: 'task-6', title: 'Sprint回顾会议', description: '本周迭代回顾与下周计划', status: 'done', priority: 'low', projectId: 'proj-2', assigneeId: 'user-6', dueDate: daysAgo(1), tags: ['meeting'], attachments: 0, comments: 0 },
  { id: 'task-7', title: '支付流程用户测试', description: '招募8名用户进行支付流程可用性测试', status: 'todo', priority: 'high', projectId: 'proj-3', assigneeId: 'user-4', dueDate: daysFromNow(4), tags: ['research', 'urgent'], attachments: 1, comments: 4 },
  { id: 'task-8', title: '登录页面动效设计', description: '设计登录页面的微交互动效', status: 'review', priority: 'medium', projectId: 'proj-4', assigneeId: 'user-2', dueDate: daysFromNow(6), tags: ['design'], attachments: 4, comments: 6 },
  { id: 'task-9', title: 'API接口文档整理', description: '整理所有后端API接口文档', status: 'in-progress', priority: 'low', projectId: 'proj-3', assigneeId: 'user-3', dueDate: daysFromNow(8), tags: ['development'], attachments: 0, comments: 2 },
  { id: 'task-10', title: '竞品分析报告', description: '分析5个主要竞品的功能与设计特点', status: 'done', priority: 'medium', projectId: 'proj-2', assigneeId: 'user-6', dueDate: daysAgo(3), tags: ['research'], attachments: 2, comments: 3 },
  { id: 'task-11', title: 'App图标设计方案', description: '提交3个App图标设计方案供评审', status: 'todo', priority: 'medium', projectId: 'proj-2', assigneeId: 'user-5', dueDate: daysFromNow(7), tags: ['design'], attachments: 0, comments: 0 },
  { id: 'task-12', title: '设计规范文档更新', description: '更新色彩、字体、间距等设计规范', status: 'done', priority: 'low', projectId: 'proj-5', assigneeId: 'user-1', dueDate: daysAgo(2), tags: ['design'], attachments: 5, comments: 2 },
];

// 批量补充任务，使各项目任务数更丰富（单一数据源）
function buildTasks(): Task[] {
  const titlePool = ['梳理信息架构', '输出交互原型', '高保真视觉走查', '组件库对齐', '可用性测试脚本', '埋点方案评审', '动效规范定义', '图标系统补全', '响应式断点适配', '深色模式适配', '文案与微交互打磨', '性能优化排查', '无障碍审查', '设计令牌整理', '竞品体验拆解', '用户旅程地图', '落地页 A/B 方案', '插画风格探索', '3D 资产优化', '品牌色板扩展', '运营 Banner 设计', '帮助中心改版', '表单校验体验', '空状态插画', '新手引导设计', '数据看板设计', '通知体系梳理', '搜索结果体验', '会员体系视觉', '结算流程优化', '社区模块设计', '消息中心改版', '设置页重构', '权限矩阵梳理', '多语言适配'];
  const userIds = ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6'];
  const statuses: TaskStatus[] = ['todo', 'todo', 'in-progress', 'in-progress', 'review', 'done', 'done', 'done'];
  const priorities: Priority[] = ['high', 'medium', 'medium', 'low'];
  const tagSets = [['design'], ['development'], ['research'], ['design', 'urgent'], ['meeting'], ['development', 'design']];
  const dues = [1, 2, 3, 5, 7, 9, 12, 16, 20];
  const extraPerProject: Record<string, number> = { 'proj-1': 7, 'proj-2': 6, 'proj-3': 9, 'proj-4': 4, 'proj-5': 7 };

  const tasks = [...baseTasks];
  let n = tasks.length;
  Object.keys(extraPerProject).forEach((pid, pi) => {
    for (let i = 0; i < extraPerProject[pid]; i++) {
      const k = pi * 7 + i;
      const status = statuses[k % statuses.length];
      tasks.push({
        id: `task-${++n}`,
        title: titlePool[k % titlePool.length],
        description: '协作推进中的工作项。',
        status,
        priority: priorities[k % priorities.length],
        projectId: pid,
        assigneeId: userIds[k % userIds.length],
        dueDate: status === 'done' ? daysAgo((k % 6) + 1) : daysFromNow(dues[k % dues.length]),
        tags: tagSets[k % tagSets.length],
        attachments: k % 4,
        comments: k % 5,
      });
    }
  });
  return tasks;
}

export const tasks: Task[] = buildTasks();

export const assets: Asset[] = [
  { id: 'asset-1', name: '极光渐变背景', type: 'image', url: '#', projectId: 'proj-1', tags: ['背景', '渐变'], uploadedById: 'user-2', uploadedAt: daysAgo(2), size: '2.4MB', dimensions: '1920 × 1080', favorite: true, reviewStatus: 'pending', versions: [{ v: 'v3', by: 'user-2', at: daysAgo(2) }, { v: 'v2', by: 'user-2', at: daysAgo(5) }, { v: 'v1', by: 'user-5', at: daysAgo(8) }], annotations: [{ id: 'an-1', x: 32, y: 28, by: 'user-1', text: '这里的光晕可以更柔和' }, { id: 'an-2', x: 68, y: 64, by: 'user-4', text: '对比度再强一点' }] },
  { id: 'asset-2', name: '产品展示Mockup', type: 'image', url: '#', projectId: 'proj-2', tags: ['Mockup', '产品'], uploadedById: 'user-2', uploadedAt: daysAgo(1), size: '3.1MB', favorite: false },
  { id: 'asset-3', name: '品牌Logo方案', type: 'image', url: '#', projectId: 'proj-1', tags: ['Logo', '品牌'], uploadedById: 'user-5', uploadedAt: daysAgo(5), size: '856KB', dimensions: '2400 × 2400', favorite: true, reviewStatus: 'approved', versions: [{ v: 'v2', by: 'user-5', at: daysAgo(5) }, { v: 'v1', by: 'user-5', at: daysAgo(9) }], annotations: [] },
  { id: 'asset-4', name: '用户旅程地图', type: 'image', url: '#', projectId: 'proj-2', tags: ['UX', '研究'], uploadedById: 'user-4', uploadedAt: daysAgo(3), size: '1.8MB', favorite: false },
  { id: 'asset-5', name: '产品演示视频', type: 'video', url: '#', projectId: 'proj-3', tags: ['演示', '视频'], uploadedById: 'user-3', uploadedAt: daysAgo(1), size: '24MB', favorite: false },
  { id: 'asset-6', name: '色彩系统定义', type: 'doc', url: '#', projectId: 'proj-5', tags: ['规范', '色彩'], uploadedById: 'user-1', uploadedAt: daysAgo(7), size: '1.2MB', favorite: true },
  { id: 'asset-7', name: '星空主题纹理', type: 'image', url: '#', projectId: 'proj-4', tags: ['纹理', '背景'], uploadedById: 'user-5', uploadedAt: daysAgo(4), size: '4.2MB', favorite: false },
  { id: 'asset-8', name: '图标集-基础版', type: 'image', url: '#', projectId: 'proj-5', tags: ['图标', '组件'], uploadedById: 'user-2', uploadedAt: daysAgo(6), size: '560KB', favorite: false },
  { id: 'asset-9', name: '电商页面截图', type: 'image', url: '#', projectId: 'proj-3', tags: ['截图', '参考'], uploadedById: 'user-3', uploadedAt: daysAgo(2), size: '1.5MB', favorite: true },
  { id: 'asset-10', name: '3D场景元素', type: '3d', url: '#', projectId: 'proj-2', tags: ['3D', '元素'], uploadedById: 'user-5', uploadedAt: daysAgo(1), size: '5.8MB', favorite: false },
  { id: 'asset-11', name: '线框图初稿', type: 'doc', url: '#', projectId: 'proj-4', tags: ['线框图', 'UX'], uploadedById: 'user-4', uploadedAt: daysAgo(8), size: '2.1MB', favorite: false },
  { id: 'asset-12', name: '品牌字体包', type: 'doc', url: '#', projectId: 'proj-1', tags: ['字体', '品牌'], uploadedById: 'user-1', uploadedAt: daysAgo(10), size: '12MB', favorite: true },
  { id: 'asset-13', name: '按钮点击音效', type: 'audio', url: '#', projectId: 'proj-5', tags: ['音效', '交互'], uploadedById: 'user-3', uploadedAt: daysAgo(3), size: '320KB', favorite: false },
  { id: 'asset-14', name: '品牌主色板', type: 'palette', url: '#', projectId: 'proj-1', tags: ['色彩', '品牌'], uploadedById: 'user-1', uploadedAt: daysAgo(6), size: '45KB', favorite: true },
  { id: 'asset-15', name: 'Nebula品牌视频', type: 'video', url: '#', projectId: 'proj-2', tags: ['品牌', '视频'], uploadedById: 'user-5', uploadedAt: daysAgo(5), size: '48MB', favorite: false },
  { id: 'asset-16', name: '3D头像模型', type: '3d', url: '#', projectId: 'proj-2', tags: ['3D', '头像'], uploadedById: 'user-5', uploadedAt: daysAgo(2), size: '12MB', favorite: false },
];

export const notifications: AppNotification[] = [
  { id: 'notif-1', type: 'mention', title: '陈星辰 在评论中提到了你', content: '溪月，你觉得这个Hero区域的配色方案怎么样？', fromUserId: 'user-2', read: false, createdAt: daysAgo(0), project: BRANDS.aurora.name, link: '/board' },
  { id: 'notif-2', type: 'assign', title: '新任务分配', content: '你被分配了新任务「设计首页Hero区域视觉方案」', fromUserId: 'user-6', read: false, createdAt: daysAgo(0), project: BRANDS.aurora.name, link: '/board' },
  { id: 'notif-3', type: 'comment', title: '苏墨言 评论了任务', content: '按钮组件的交互状态已经开发完成，可以验收了', fromUserId: 'user-3', read: false, createdAt: daysAgo(0), project: BRANDS.cosmos.name, link: '/board' },
  { id: 'notif-4', type: 'system', title: '顾南笙 上传了新素材', content: '品牌插画系列-第三版', fromUserId: 'user-5', read: true, createdAt: daysAgo(1), project: BRANDS.aurora.name, link: '/assets' },
  { id: 'notif-5', type: 'system', title: '项目进度提醒', content: `${BRANDS.luna.name} 距离截止日期还有 5 天`, fromUserId: null, read: true, createdAt: daysAgo(1), project: BRANDS.luna.name, link: '/board' },
  { id: 'notif-6', type: 'mention', title: '白清寒 在评论中提到了你', content: '关于支付流程的用户测试方案想和你对齐一下', fromUserId: 'user-4', read: true, createdAt: daysAgo(1), project: BRANDS.luna.name, link: '/board' },
  { id: 'notif-7', type: 'assign', title: '任务已完成', content: '「竞品分析报告」已被沈清辞标记为完成', fromUserId: 'user-6', read: true, createdAt: daysAgo(2), project: BRANDS.nebula.name, link: '/board' },
  { id: 'notif-8', type: 'system', title: '团队更新', content: '欢迎新成员沈清辞加入Glass UI！', fromUserId: null, read: true, createdAt: daysAgo(3), link: '/team' },
  { id: 'notif-9', type: 'comment', title: '陈星辰 评论了设计稿', content: '登录页的动效时间线已经更新，请查看最新版本', fromUserId: 'user-2', read: true, createdAt: daysAgo(2), project: BRANDS.stellar.name, link: '/board' },
  { id: 'notif-10', type: 'deadline', title: '任务即将到期', content: '「设计首页Hero区域视觉方案」将在 1 天后到期', fromUserId: null, read: false, createdAt: daysAgo(0), project: BRANDS.aurora.name, link: '/board' },
  { id: 'notif-11', type: 'invite', title: '项目邀请', content: `沈清辞 邀请你加入「${BRANDS.cosmos.name}」协作`, fromUserId: 'user-6', read: false, createdAt: daysAgo(0), project: BRANDS.cosmos.name, link: '/team' },
  { id: 'notif-12', type: 'comment', title: '白清寒 在素材中标注了你', content: '极光渐变背景：这里的光晕可以更柔和', fromUserId: 'user-4', read: true, createdAt: daysAgo(1), project: BRANDS.aurora.name, link: '/assets' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'evt-1', title: '项目晨会', date: daysFromNow(0), time: '09:30', duration: 30, color: 'cyan', projectId: 'proj-1' },
  { id: 'evt-2', title: '设计评审', date: daysFromNow(0), time: '14:00', duration: 60, color: 'magenta', projectId: 'proj-2' },
  { id: 'evt-3', title: '用户访谈', date: daysFromNow(1), time: '10:00', duration: 90, color: 'amber', projectId: 'proj-3' },
  { id: 'evt-4', title: 'Sprint计划', date: daysFromNow(2), time: '15:00', duration: 60, color: 'cyan', projectId: 'proj-2' },
  { id: 'evt-5', title: 'Aurora项目截止', date: daysFromNow(12), time: '18:00', duration: 0, color: 'magenta', projectId: 'proj-1' },
  { id: 'evt-6', title: 'Luna上线', date: daysFromNow(5), time: '10:00', duration: 0, color: 'amber', projectId: 'proj-3' },
  { id: 'evt-7', title: '团队周会', date: daysFromNow(3), time: '11:00', duration: 45, color: 'cyan', projectId: null },
  { id: 'evt-8', title: '1对1沟通', date: daysFromNow(1), time: '16:00', duration: 30, color: 'magenta', projectId: null },
];

export const moodboards: Moodboard[] = [
  { id: 'mb-board-1', name: 'Aurora 视觉探索' },
  { id: 'mb-board-2', name: 'Nebula 配色实验' },
];

export const moodboardElements: MoodboardElement[] = [
  { id: 'mb-1', boardId: 'mb-board-1', type: 'image', content: DATA_PALETTE.cyan, x: 50, y: 50, width: 260, height: 180, rotation: -2 },
  { id: 'mb-2', boardId: 'mb-board-1', type: 'note', content: '灵感：探索极光与流体渐变的结合', x: 350, y: 80, width: 200, height: 120, rotation: 1, color: DATA_PALETTE.amber },
  { id: 'mb-3', boardId: 'mb-board-1', type: 'image', content: DATA_PALETTE.magenta, x: 60, y: 260, width: 200, height: 200, rotation: 3 },
  { id: 'mb-4', boardId: 'mb-board-1', type: 'image', content: DATA_PALETTE.violet, x: 300, y: 240, width: 220, height: 160, rotation: -1 },
  { id: 'mb-5', boardId: 'mb-board-1', type: 'note', content: '配色方向：青紫+品红的全息感', x: 550, y: 50, width: 180, height: 100, rotation: -3, color: DATA_PALETTE.cyan },
  { id: 'mb-6', boardId: 'mb-board-2', type: 'image', content: DATA_PALETTE.amber, x: 80, y: 70, width: 240, height: 170, rotation: 2 },
  { id: 'mb-7', boardId: 'mb-board-2', type: 'note', content: 'Nebula 主色：品红 + 深空蓝', x: 360, y: 120, width: 190, height: 110, rotation: -2, color: DATA_PALETTE.magenta },
];

export const automations: Automation[] = [
  { id: 'auto-1', name: '完成即通知负责人', trigger: 'task.done', action: 'notify', enabled: true, runs: 18, description: '当任务移动到「已完成」时，通知相关成员' },
  { id: 'auto-2', name: '高优先级自动加急标签', trigger: 'task.high', action: 'tag', enabled: true, runs: 7, description: '当任务被设为高优先级时，自动添加「紧急」标签' },
  { id: 'auto-3', name: '逾期任务提醒', trigger: 'task.overdue', action: 'notify', enabled: false, runs: 0, description: '当任务超过截止日期未完成时，发送提醒' },
  { id: 'auto-4', name: '素材通过后归档', trigger: 'asset.approved', action: 'archive', enabled: false, runs: 2, description: '当素材评审通过时，自动归档到项目资料' },
];

export const activities: Activity[] = [
  { id: 'act-1', userId: 'user-2', action: '完成了任务', target: '登录页面动效设计', time: daysAgo(0), type: 'success', kind: 'task', projectId: 'proj-4' },
  { id: 'act-2', userId: 'user-5', action: '上传了素材', target: '3D场景元素.png', time: daysAgo(0), type: 'cyan', kind: 'asset', projectId: 'proj-2' },
  { id: 'act-3', userId: 'user-3', action: '评论了', target: '组件库按钮样式重构', time: daysAgo(0), type: 'cyan', kind: 'comment', projectId: 'proj-5' },
  { id: 'act-4', userId: 'user-6', action: '创建了新任务', target: '竞品分析报告', time: daysAgo(1), type: 'amber', kind: 'task', projectId: 'proj-2' },
  { id: 'act-5', userId: 'user-4', action: '提交了审核', target: '用户调研报告', time: daysAgo(1), type: 'magenta', kind: 'task', projectId: 'proj-2' },
  { id: 'act-6', userId: 'user-1', action: '更新了项目', target: 'Cosmos设计系统', time: daysAgo(2), type: 'cyan', kind: 'project', projectId: 'proj-5' },
  { id: 'act-7', userId: 'user-2', action: '完成了任务', target: '品牌视觉初稿', time: daysAgo(2), type: 'success', kind: 'task', projectId: 'proj-1' },
  { id: 'act-8', userId: 'user-5', action: '在素材中标注了', target: '极光渐变背景', time: daysAgo(1), type: 'magenta', kind: 'asset', projectId: 'proj-1' },
  { id: 'act-9', userId: 'user-6', action: '邀请了成员加入', target: 'Cosmos 设计系统', time: daysAgo(3), type: 'amber', kind: 'member', projectId: 'proj-5' },
  { id: 'act-10', userId: 'user-3', action: '移动了任务到完成', target: 'API接口文档整理', time: daysAgo(0), type: 'success', kind: 'task', projectId: 'proj-3' },
];

export const weeklyData = [
  { day: '周一', completed: 8, created: 5 },
  { day: '周二', completed: 12, created: 7 },
  { day: '周三', completed: 6, created: 9 },
  { day: '周四', completed: 10, created: 4 },
  { day: '周五', completed: 15, created: 8 },
  { day: '周六', completed: 3, created: 1 },
  { day: '周日', completed: 2, created: 0 },
];

export const hoursThisWeek = [
  { day: '周一', hours: 7.5 },
  { day: '周二', hours: 8.2 },
  { day: '周三', hours: 6.8 },
  { day: '周四', hours: 9.0 },
  { day: '周五', hours: 7.2 },
];
