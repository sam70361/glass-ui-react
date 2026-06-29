export type AssetType = 'image' | 'video' | '3d' | 'audio' | 'doc' | 'palette';
export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface AssetVersion {
  v: string;
  by: string;
  at: string;
}

export interface AssetAnnotation {
  id: string;
  x: number;
  y: number;
  by: string;
  text: string;
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  url: string;
  thumbnail?: string;
  projectId: string;
  tags: string[];
  uploadedById: string;
  uploadedAt: string;
  size: string;
  dimensions?: string;
  favorite: boolean;
  reviewStatus?: ReviewStatus;
  versions?: AssetVersion[];
  annotations?: AssetAnnotation[];
}
