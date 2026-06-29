export interface Sku {
  id: string;
  sku: string;
  name: string;
  stock: number;
  cap: number;
  status: 'low' | 'ok' | 'out';
}

export const SKUS: Sku[] = [
  { id: 'AUR-TEE-01', sku: 'AUR-TEE-01', name: '极光主题 T 恤', stock: 12, cap: 200, status: 'low' },
  { id: 'NEB-CUP-02', sku: 'NEB-CUP-02', name: 'Nebula 马克杯', stock: 156, cap: 300, status: 'ok' },
  { id: 'LUN-BAG-03', sku: 'LUN-BAG-03', name: 'Luna 帆布包', stock: 0, cap: 150, status: 'out' },
  { id: 'COS-CAP-04', sku: 'COS-CAP-04', name: 'Cosmos 棒球帽', stock: 88, cap: 120, status: 'ok' },
  { id: 'STE-PIN-05', sku: 'STE-PIN-05', name: 'Stellar 徽章', stock: 24, cap: 500, status: 'low' },
];
