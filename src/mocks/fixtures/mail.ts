import type { MailLabel, MailThread } from 'src/types';
import { currentUser } from './core-data';
import { DATA_PALETTE } from 'src/theme/palette';
import { BRANDS } from 'src/mocks/fixtures/brand';

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600000).toISOString();
const daysAgo = (d: number) => new Date(now - d * 86400000).toISOString();

/** 当前用户 id（发件人为自己时用 'me'，渲染时映射到 currentUser） */
export const MAIL_ME = 'me';
export { currentUser as mailCurrentUser };

export const mailLabels: MailLabel[] = [
  { id: 'work', name: '工作', color: DATA_PALETTE.cyan },
  { id: 'important', name: '重要', color: DATA_PALETTE.red },
  { id: 'project', name: '项目', color: DATA_PALETTE.violet },
  { id: 'finance', name: '财务', color: DATA_PALETTE.amber },
  { id: 'personal', name: '个人', color: DATA_PALETTE.emerald },
];

/**
 * 邮件线程 mock。folder 为存储位置；starred 为派生视图。
 * 发件人 fromId 为 team 成员 id 或 'me'。
 */
export const mailThreads: MailThread[] = [
  {
    id: 'm-1',
    subject: `${BRANDS.aurora.name} · Hero 区视觉方向确认`,
    folder: 'inbox',
    participantIds: ['user-2', 'user-1'],
    read: false,
    starred: true,
    labelIds: ['project', 'important'],
    hasAttachments: true,
    updatedAt: hoursAgo(1),
    snippet: '溪月，三个方向的高保真我都放在附件里了，方向二的全息渐变我个人最看好…',
    messages: [
      {
        id: 'm-1-1',
        fromId: 'user-2',
        toIds: ['user-1'],
        sentAt: hoursAgo(5),
        body: '溪月好，\n\nHero 区我探索了三个方向：极简留白、全息渐变、深空粒子。初稿已上传到素材库，你方便时先过一眼方向。\n\n陈星辰',
      },
      {
        id: 'm-1-2',
        fromId: 'user-1',
        toIds: ['user-2'],
        sentAt: hoursAgo(3),
        body: '收到～方向二的渐变质感很对，能否把高保真导出给我，我同步给客户看下。',
      },
      {
        id: 'm-1-3',
        fromId: 'user-2',
        toIds: ['user-1'],
        sentAt: hoursAgo(1),
        body: '溪月，三个方向的高保真我都放在附件里了，方向二的全息渐变我个人最看好。也附了一份动效说明，麻烦评审时一起看。',
        attachments: [
          { id: 'a-1', name: 'Aurora-Hero-方向二.fig', size: '8.2MB', kind: 'doc' },
          { id: 'a-2', name: 'Hero-高保真预览.png', size: '3.1MB', kind: 'image' },
          { id: 'a-3', name: '动效说明.pdf', size: '1.4MB', kind: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 'm-2',
    subject: '新任务分配：设计首页 Hero 区域视觉方案',
    folder: 'inbox',
    participantIds: ['user-6', 'user-1'],
    read: false,
    starred: false,
    labelIds: ['work'],
    hasAttachments: false,
    updatedAt: hoursAgo(2),
    snippet: '已在看板为你创建任务「设计首页 Hero 区域视觉方案」，截止本周五，优先级高。',
    messages: [
      {
        id: 'm-2-1',
        fromId: 'user-6',
        toIds: ['user-1'],
        sentAt: hoursAgo(2),
        body: '溪月，\n\n已在看板为你创建任务「设计首页 Hero 区域视觉方案」，截止本周五，优先级高。需求文档在项目空间，有问题随时找我。\n\n沈清辞',
      },
    ],
  },
  {
    id: 'm-3',
    subject: '组件库按钮交互验收',
    folder: 'inbox',
    participantIds: ['user-3', 'user-1'],
    read: false,
    starred: false,
    labelIds: ['project'],
    hasAttachments: false,
    updatedAt: hoursAgo(6),
    snippet: '按钮组件的全部交互状态已开发完成，预览地址见正文，麻烦验收一下。',
    messages: [
      {
        id: 'm-3-1',
        fromId: 'user-3',
        toIds: ['user-1'],
        sentAt: hoursAgo(6),
        body: '溪月，按钮组件的全部交互状态（hover / active / disabled / loading）已开发完成，预览地址：preview.glassui.dev/buttons，麻烦验收一下。\n\n苏墨言',
      },
    ],
  },
  {
    id: 'm-4',
    subject: '关于支付流程用户测试方案',
    folder: 'inbox',
    participantIds: ['user-4', 'user-1'],
    read: true,
    starred: true,
    labelIds: ['work', 'important'],
    hasAttachments: true,
    updatedAt: hoursAgo(20),
    snippet: '想和你对齐一下支付流程的可用性测试脚本，附件是初版任务清单与招募问卷。',
    messages: [
      {
        id: 'm-4-1',
        fromId: 'user-4',
        toIds: ['user-1'],
        sentAt: hoursAgo(20),
        body: '溪月，想和你对齐一下支付流程的可用性测试脚本，计划招募 8 名用户。附件是初版任务清单与招募问卷，看看有没有要补充的维度。\n\n白清寒',
        attachments: [
          { id: 'a-4', name: '可用性测试脚本-v1.docx', size: '420KB', kind: 'doc' },
          { id: 'a-5', name: '用户招募问卷.xlsx', size: '88KB', kind: 'sheet' },
        ],
      },
    ],
  },
  {
    id: 'm-5',
    subject: `项目进度提醒：${BRANDS.luna.name}距离截止还有 5 天`,
    folder: 'inbox',
    participantIds: ['user-1'],
    read: true,
    starred: false,
    labelIds: ['project'],
    hasAttachments: false,
    updatedAt: daysAgo(1),
    snippet: 'Luna 电商平台当前进度 92%，距离截止日期还有 5 天，仍有 3 个高优先级任务进行中。',
    messages: [
      {
        id: 'm-5-1',
        fromId: 'user-6',
        toIds: ['user-1'],
        sentAt: daysAgo(1),
        body: '系统提醒：\n\nLuna 电商平台当前进度 92%，距离截止日期还有 5 天，仍有 3 个高优先级任务进行中。建议今日同步风险点。',
      },
    ],
  },
  {
    id: 'm-6',
    subject: '六月设计部门工具订阅发票',
    folder: 'inbox',
    participantIds: ['user-1'],
    read: true,
    starred: false,
    labelIds: ['finance'],
    hasAttachments: true,
    updatedAt: daysAgo(2),
    snippet: '本月 Figma / Adobe CC / 字体授权的发票已生成，合计 ¥4,820，请查收附件。',
    messages: [
      {
        id: 'm-6-1',
        fromId: 'user-6',
        toIds: ['user-1'],
        sentAt: daysAgo(2),
        body: '财务通知：本月 Figma / Adobe CC / 字体授权的发票已生成，合计 ¥4,820，请查收附件并于本周内确认。',
        attachments: [{ id: 'a-6', name: '202606-设计部门发票.pdf', size: '256KB', kind: 'pdf' }],
      },
    ],
  },
  {
    id: 'm-7',
    subject: '欢迎新成员沈清辞加入 Glass UI',
    folder: 'inbox',
    participantIds: ['user-1'],
    read: true,
    starred: false,
    labelIds: ['personal'],
    hasAttachments: false,
    updatedAt: daysAgo(3),
    snippet: '我们很高兴地宣布产品经理沈清辞正式加入团队，欢迎大家在协作中多多交流。',
    messages: [
      {
        id: 'm-7-1',
        fromId: 'user-2',
        toIds: ['user-1', 'user-3', 'user-4', 'user-5'],
        sentAt: daysAgo(3),
        body: '各位，\n\n我们很高兴地宣布产品经理沈清辞正式加入团队，负责 Nebula 与 Cosmos 两条线，欢迎大家在协作中多多交流。',
      },
    ],
  },
  {
    id: 'm-8',
    subject: '极光渐变背景：光晕处理建议',
    folder: 'inbox',
    participantIds: ['user-5', 'user-1'],
    read: true,
    starred: false,
    labelIds: ['project'],
    hasAttachments: true,
    updatedAt: daysAgo(2),
    snippet: '我在素材里标注了两处，光晕可以更柔和、对比度再强一点，调整稿见附件。',
    messages: [
      {
        id: 'm-8-1',
        fromId: 'user-5',
        toIds: ['user-1'],
        sentAt: daysAgo(2),
        body: '溪月，我在素材里标注了两处：左上角光晕可以更柔和、中部对比度再强一点。调整稿见附件。\n\n顾南笙',
        attachments: [{ id: 'a-7', name: '极光渐变-调整稿.png', size: '2.8MB', kind: 'image' }],
      },
    ],
  },
  {
    id: 'm-9',
    subject: `${BRANDS.cosmos.name}协作邀请`,
    folder: 'inbox',
    participantIds: ['user-6', 'user-1'],
    read: false,
    starred: false,
    labelIds: ['project'],
    hasAttachments: false,
    updatedAt: hoursAgo(9),
    snippet: '邀请你加入「Cosmos 设计系统」协作空间，作为设计负责人统筹组件规范。',
    messages: [
      {
        id: 'm-9-1',
        fromId: 'user-6',
        toIds: ['user-1'],
        sentAt: hoursAgo(9),
        body: '溪月，邀请你加入「Cosmos 设计系统」协作空间，作为设计负责人统筹组件规范，点击接受即可开始。',
      },
    ],
  },
  {
    id: 'm-10',
    subject: '周报：本周设计交付与下周计划',
    folder: 'inbox',
    participantIds: ['user-3', 'user-1'],
    read: true,
    starred: false,
    labelIds: ['work'],
    hasAttachments: false,
    updatedAt: daysAgo(4),
    snippet: '本周完成登录页动效、按钮组件重构；下周聚焦详情页与无障碍审查。',
    messages: [
      {
        id: 'm-10-1',
        fromId: 'user-3',
        toIds: ['user-1'],
        sentAt: daysAgo(4),
        body: '本周完成：登录页动效、按钮组件重构、API 文档整理。\n下周计划：产品详情页开发、无障碍审查。\n\n苏墨言',
      },
    ],
  },

  // 已发送
  {
    id: 'm-11',
    subject: `Re: ${BRANDS.aurora.name} · Hero 区视觉方向确认`,
    folder: 'sent',
    participantIds: ['me', 'user-2'],
    read: true,
    starred: false,
    labelIds: ['project'],
    hasAttachments: false,
    updatedAt: hoursAgo(3),
    snippet: '收到～方向二的渐变质感很对，能否把高保真导出给我，我同步给客户看下。',
    messages: [
      {
        id: 'm-11-1',
        fromId: 'me',
        toIds: ['user-2'],
        sentAt: hoursAgo(3),
        body: '收到～方向二的渐变质感很对，能否把高保真导出给我，我同步给客户看下。',
      },
    ],
  },
  {
    id: 'm-12',
    subject: '设计评审会议纪要',
    folder: 'sent',
    participantIds: ['me', 'user-2', 'user-5', 'user-6'],
    read: true,
    starred: false,
    labelIds: ['work'],
    hasAttachments: true,
    updatedAt: daysAgo(1),
    snippet: '附上今天设计评审的纪要与待办分工，请相关同学本周内推进。',
    messages: [
      {
        id: 'm-12-1',
        fromId: 'me',
        toIds: ['user-2', 'user-5', 'user-6'],
        sentAt: daysAgo(1),
        body: '各位，附上今天设计评审的纪要与待办分工，请相关同学本周内推进。有异议随时回复。',
        attachments: [{ id: 'a-8', name: '设计评审纪要-0625.pdf', size: '180KB', kind: 'pdf' }],
      },
    ],
  },

  // 草稿
  {
    id: 'm-13',
    subject: '关于下季度设计资源规划的几点想法',
    folder: 'drafts',
    participantIds: ['me', 'user-6'],
    read: true,
    starred: false,
    labelIds: [],
    hasAttachments: false,
    updatedAt: hoursAgo(8),
    snippet: '（草稿）清辞，关于下季度的设计资源，我初步梳理了三个方向…',
    messages: [
      {
        id: 'm-13-1',
        fromId: 'me',
        toIds: ['user-6'],
        sentAt: hoursAgo(8),
        body: '清辞，关于下季度的设计资源，我初步梳理了三个方向：\n1. 设计系统沉淀\n2. 动效规范\n3. ',
      },
    ],
  },

  // 归档
  {
    id: 'm-14',
    subject: '五月项目复盘与数据总结',
    folder: 'archive',
    participantIds: ['user-6', 'user-1'],
    read: true,
    starred: false,
    labelIds: ['work'],
    hasAttachments: true,
    updatedAt: daysAgo(20),
    snippet: '五月共交付 3 个里程碑，整体满意度 4.6/5，详细数据见附件。',
    messages: [
      {
        id: 'm-14-1',
        fromId: 'user-6',
        toIds: ['user-1'],
        sentAt: daysAgo(20),
        body: '五月共交付 3 个里程碑，整体满意度 4.6/5，详细数据见附件。',
        attachments: [{ id: 'a-9', name: '五月复盘.xlsx', size: '120KB', kind: 'sheet' }],
      },
    ],
  },

  // 垃圾
  {
    id: 'm-15',
    subject: '【限时】你的设计工具授权即将到期，立即续费 8 折',
    folder: 'trash',
    participantIds: ['user-1'],
    read: true,
    starred: false,
    labelIds: [],
    hasAttachments: false,
    updatedAt: daysAgo(6),
    snippet: '尊敬的用户，您的授权将在 3 天后到期，点击立即续费享受 8 折优惠…',
    messages: [
      {
        id: 'm-15-1',
        fromId: 'user-3',
        toIds: ['user-1'],
        sentAt: daysAgo(6),
        body: '尊敬的用户，您的授权将在 3 天后到期，点击立即续费享受 8 折优惠……（疑似垃圾邮件）',
      },
    ],
  },
];
