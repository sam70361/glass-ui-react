export const TABLES = ['users', 'orders', 'events', 'sessions', 'daily_active'];

export const SAMPLE = `SELECT date_trunc('day', created_at) AS day,
       count(*) AS orders,
       sum(amount) AS revenue
FROM public.orders
WHERE status = 'paid'
GROUP BY 1
ORDER BY 1 DESC
LIMIT 5;`;

export interface Row {
  day: string;
  orders: number;
  revenue: number;
}

export const RESULT: Row[] = [
  { day: '2026-06-27', orders: 128, revenue: 48200 },
  { day: '2026-06-26', orders: 110, revenue: 41600 },
  { day: '2026-06-25', orders: 142, revenue: 53800 },
  { day: '2026-06-24', orders: 96, revenue: 36100 },
  { day: '2026-06-23', orders: 134, revenue: 50200 },
];

export type State = 'idle' | 'running' | 'done' | 'empty' | 'error';
