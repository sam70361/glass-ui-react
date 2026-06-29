export type ShipmentStatus = 'transit' | 'delivered' | 'pickup';

export interface Shipment {
  id: string;
  to: string;
  status: ShipmentStatus;
  eta: string;
}

export const SHIPMENTS: Shipment[] = [
  { id: 'SF-7781', to: '上海市浦东新区', status: 'transit', eta: '今天 18:00' },
  { id: 'SF-7782', to: '北京市朝阳区', status: 'delivered', eta: '已签收' },
  { id: 'SF-7783', to: '深圳市南山区', status: 'pickup', eta: '明天 12:00' },
  { id: 'SF-7784', to: '杭州市西湖区', status: 'transit', eta: '今天 21:30' },
];

export const STATUS_BADGE: Record<ShipmentStatus, { variant: 'success' | 'cyan' | 'amber'; label: string }> = {
  delivered: { variant: 'success', label: '已签收' },
  transit: { variant: 'cyan', label: '运输中' },
  pickup: { variant: 'amber', label: '待揽收' },
};
