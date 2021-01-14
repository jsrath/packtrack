import React from 'react';
import Table from 'ink-table';
import { Text } from 'ink';
import { TrackingsApiService } from '../services/trackings-api-service';

const Trackings = (trackingOptions: TrackingOptions) => {
  const { courier, trackingNumber } = trackingOptions;
  const validOption = Object.keys(trackingOptions).find((option) => trackingOptions[option]);
  const [data] = TrackingsApiService(validOption, courier, trackingNumber);

  function isDataValid(data: { id: string }[]): boolean {
    return data.length && !!data[0].id;
  }

  return isDataValid(data) ? (
    <Table
      data={data.map((tracking: any) => ({
        tracking: tracking.tracking_number,
        delivery: tracking.expected_delivery ?? tracking.shipment_delivery_date,
      }))}
    />
  ) : (
    <Text></Text>
  );
};

module.exports = Trackings;
export default Trackings;
