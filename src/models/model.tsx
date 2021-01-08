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

interface CliOptions {
  add: boolean;
  remove: boolean;
  trackingNumber: string;
}

interface Data {
  data: {}
}

interface Tracking {
  id: string;
  tracking_number: string;
  expected_delivery: string;
  shipment_delivery_date: string;
  slug: string;
  [property: string]: string | boolean | null;
}
