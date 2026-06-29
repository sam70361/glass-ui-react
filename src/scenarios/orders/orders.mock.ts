export interface Customer {
  id: string;
  name: string;
  tier: 'vip' | 'regular';
}

export interface OrderLine {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  /** 关系派生：客户名（由 customerId 关联 CUSTOMERS） */
  customer: string;
  amount: number;
  items: number;
  status: 'paid' | 'shipped' | 'pending' | 'refund';
  /** 下单时间（ISO，时间序列字段） */
  placedAt: string;
  /** 展示用短日期 */
  date: string;
  /** 嵌套明细行 */
  lines: OrderLine[];
}

export const STATUS: Record<Order['status'], { v: 'success' | 'cyan' | 'amber' | 'danger'; t: string }> = {
  paid: { v: 'success', t: '已付款' },
  shipped: { v: 'cyan', t: '已发货' },
  pending: { v: 'amber', t: '待付款' },
  refund: { v: 'danger', t: '退款中' },
};

export const CUSTOMERS: Customer[] = [
  { id: 'c-1', name: '张三', tier: 'vip' },
  { id: 'c-2', name: '李四', tier: 'regular' },
  { id: 'c-3', name: '王敏', tier: 'regular' },
  { id: 'c-4', name: '赵磊', tier: 'vip' },
  { id: 'c-5', name: '周妍', tier: 'regular' },
  { id: 'c-6', name: '陈刚', tier: 'regular' },
];

const SKUS = [
  { sku: 'SKU-A1', name: '极光主题礼盒', price: 268 },
  { sku: 'SKU-B2', name: '星云保温杯', price: 128 },
  { sku: 'SKU-C3', name: '深空帆布包', price: 199 },
  { sku: 'SKU-D4', name: '全息贴纸套装', price: 39 },
  { sku: 'SKU-E5', name: '设计师笔记本', price: 88 },
];

const now = Date.now();

export const ORDERS: Order[] = Array.from({ length: 24 }, (_, i) => {
  const customer = CUSTOMERS[i % CUSTOMERS.length];
  const lineCount = 1 + (i % 5);
  const lines: OrderLine[] = Array.from({ length: lineCount }, (_, j) => {
    const s = SKUS[(i + j) % SKUS.length];
    return { sku: s.sku, name: s.name, qty: 1 + ((i + j) % 3), price: s.price };
  });
  const amount = lines.reduce((n, l) => n + l.qty * l.price, 0);
  const placedAt = new Date(now - i * 5 * 3600000).toISOString();
  return {
    id: `SO-${2048 - i}`,
    customerId: customer.id,
    customer: customer.name,
    amount,
    items: lines.reduce((n, l) => n + l.qty, 0),
    status: (['paid', 'shipped', 'pending', 'refund'] as const)[i % 4],
    placedAt,
    date: placedAt.slice(5, 10).replace('-', '-'),
    lines,
  };
});
