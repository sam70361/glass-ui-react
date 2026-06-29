export interface Rule {
  rule: string;
  hit: boolean;
  weight: number;
}

export const RULES: Rule[] = [
  { rule: '夜间大额交易', hit: true, weight: 30 },
  { rule: '异地登录', hit: true, weight: 20 },
  { rule: '新设备', hit: false, weight: 10 },
  { rule: '黑名单命中', hit: false, weight: 40 },
  { rule: '频繁失败尝试', hit: true, weight: 15 },
];

export const TXN_DETAIL = [
  { label: '交易号', value: 'TXN-20260627-7781' },
  { label: '金额', value: '¥86,400' },
  { label: '账户', value: '****8821' },
  { label: '地点', value: '新加坡（异地）' },
  { label: '设备', value: 'iPhone · 已知' },
  { label: '时间', value: '02:14 AM' },
];
