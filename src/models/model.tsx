interface ApiResponse {
  data: {trackings?: {}[]};
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
