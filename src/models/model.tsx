export interface TrackingOptions {
  add: boolean;
  remove: boolean;
  courier: string;
  trackingNumber: string;
}

export interface CourierOptions {
  searchTerm: string;
}

export interface ApiResponse {
  meta: Meta;
  data: Data;
}

export interface Meta {
  code: number;
  message?: string;
  type?: string;
}

export interface Data {
  slug: string;
  tag: string;
  tracking?: Tracking,
  trackings?: Tracking[];
}

export interface Tracking {
  id: string;
  tracking_number: string;
  slug: string;
  active: boolean;
  delivery_time: number;
  expected_delivery: string | null;
  shipment_delivery_date: string | null;
  tag: string;
  subtag: string;
  subtag_message: string;
  title: string;
  checkpoints: Checkpoint[];
  courier_tracking_link: string;
}

export interface Checkpoint {
  slug: string;
  city: string | null;
  location: string | null;
  message: string;
  tag: string;
}

export interface Courier {
  slug: string;
  name: string;
}
