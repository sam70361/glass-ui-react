import { DATA_PALETTE } from 'src/theme/palette';

/**
 * 品牌 / 项目代号单一真相源。
 * 此前 Aurora / Nebula / Luna 等名称在 fixtures/core-data、fixtures/mail 等多处 copy-paste，
 * 现集中到此处，供 fixtures 与 MSW handlers 复用，避免散落与不一致。
 */
export const BRANDS = {
  aurora: { id: 'proj-1', name: 'Aurora 品牌重塑', short: 'Aurora', color: DATA_PALETTE.cyan },
  nebula: { id: 'proj-2', name: 'Nebula App 2.0', short: 'Nebula', color: DATA_PALETTE.magenta },
  luna: { id: 'proj-3', name: 'Luna 电商平台', short: 'Luna', color: DATA_PALETTE.amber },
  stellar: { id: 'proj-4', name: 'Stellar 官网设计', short: 'Stellar', color: DATA_PALETTE.emerald },
  cosmos: { id: 'proj-5', name: 'Cosmos 设计系统', short: 'Cosmos', color: DATA_PALETTE.violet },
} as const;

export type BrandKey = keyof typeof BRANDS;

export const BRAND_LIST = Object.values(BRANDS);

/** 项目 id → 展示名（关系字段联动统一从此派生） */
export function projectName(id: string | null | undefined): string | undefined {
  return BRAND_LIST.find((b) => b.id === id)?.name;
}
