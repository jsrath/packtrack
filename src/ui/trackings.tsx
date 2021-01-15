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

  function isDataValid(data: { id: string }[]): boolean {
    return data.length && !!data[0].id;
  }

  return isDataValid(data) ? (
    <Table
      data={data.map((tracking: Tracking) => ({
        Tracking: tracking.tracking_number,
        Courier: tracking.slug,
        Location: tracking.checkpoints[tracking.checkpoints.length - 1].city,
        Delivery: formatRelative(parseISO(tracking.expected_delivery ?? tracking.shipment_delivery_date), new Date()),
      }))}
    />
  ) : (
    <Text></Text>
  );
};

module.exports = Trackings;
export default Trackings;
