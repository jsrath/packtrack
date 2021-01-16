import React from "react";
import Table from "ink-table";
import { Text } from "ink";
import { formatRelative, parseISO } from "date-fns";
import { TrackingsApiService } from "../services/trackings-api-service";
import { Tracking, TrackingOptions } from "../models/model";

const Trackings = (trackingOptions: TrackingOptions) => {
  const { courier, trackingNumber } = trackingOptions;
  const validOption = Object.keys(trackingOptions).find((option) => trackingOptions[option]);
  const [data] = TrackingsApiService(validOption, courier, trackingNumber);
  const errorMessage = typeof data === "string" && data;
  const tracking = Array.isArray(data) && data;
    
  function isDataValid(data: Tracking[] | string): boolean {
    if (typeof data === "string") {
      return false;
    }
    return !!(data.length && data[0]?.id);
  }

  const CustomCell = ({ children }: React.PropsWithChildren<{}>) => <Text wrap="end">{children}</Text>;
  const CustomSkeleton = ({ children }: React.PropsWithChildren<{}>) => <Text color="green">{children}</Text>;

  return isDataValid(tracking) ? (
    <Table
      cell={CustomCell}
      skeleton={CustomSkeleton}
      data={tracking.map((tracking: Tracking) => ({
        Tracking: tracking.tracking_number,
        Courier: tracking.slug,
        Location: tracking.checkpoints[tracking.checkpoints.length - 1]?.location ?? "",
        Status: tracking.checkpoints[tracking.checkpoints.length - 1]?.message ?? "",
        Delivery: formatRelative(parseISO(tracking.expected_delivery ?? tracking.shipment_delivery_date), new Date()),
      }))}
    />
  ) : (
    <Text>{errorMessage}</Text>
  );
};

module.exports = Trackings;
export default Trackings;
