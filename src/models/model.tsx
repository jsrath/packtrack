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
  expected_delivery: null | string;
  shipment_delivery_date: null | string;
  tag: string;
  subtag: string;
  subtag_message: string;
  title: string;
  checkpoints: Checkpoint[];
  courier_tracking_link: string;
}

export interface Checkpoint {
  slug: string;
  city: null | string;
  location: null | string;
  message: string;
  tag: string;
}

export interface Courier {
  slug: string;
  name: string;
}
