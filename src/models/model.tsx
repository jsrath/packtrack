interface ApiResponse {
  data: { trackings?: Tracking[] };
  meta: object | undefined;
}

interface PostRequestBody {
  tracking: TrackingNumber;
}

interface TrackingNumber {
  tracking_number: string;
}

interface TrackingOptions {
  add: boolean;
  remove: boolean;
  courier: string;
  trackingNumber: string;
}

interface CourierOptions {
  searchTerm: string; 
}

interface Data {
  data: {};
}

interface Tracking {
  id: string;
  tracking_number: string;
  expected_delivery: string;
  shipment_delivery_date: string;
  slug: string;
  [property: string]: string | boolean | null;
}

interface Courier {
  slug: string;
  name: string;
  [property: string]: string;
}
