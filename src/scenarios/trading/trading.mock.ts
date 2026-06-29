export interface Ticker {
  id: string;
  sym: string;
  name: string;
  price: number;
  chg: number;
}

export const WATCH: Ticker[] = [
  { id: 'AURA', sym: 'AURA', name: '极光科技', price: 182.4, chg: 2.4 },
  { id: 'NEBU', sym: 'NEBU', name: '星云传媒', price: 64.1, chg: -1.2 },
  { id: 'LUNA', sym: 'LUNA', name: '月相零售', price: 28.9, chg: 0.8 },
  { id: 'COSM', sym: 'COSM', name: '寰宇系统', price: 410.6, chg: 3.1 },
  { id: 'STEL', sym: 'STEL', name: '恒星能源', price: 96.3, chg: -0.5 },
];

export const TREND = Array.from({ length: 24 }, (_, i) => ({
  label: `${i}:00`,
  value: 170 + Math.round(Math.sin(i / 3) * 12 + i * 0.6),
}));
