import React from 'react';
import Table from 'ink-table';
import { Text } from 'ink';
import { ApiService } from '../services/api-service';

const App = (cliOptions: CliOptions) => {
  const { trackingNumber } = cliOptions;
  const validOption = Object.keys(cliOptions).find((option) => cliOptions[option]);
  const [data] = ApiService(validOption, trackingNumber);

  return data?.data?.trackings?.length ? (
    <Table
      data={data!.data?.trackings.map((tracking: any) => ({
        tracking: tracking.tracking_number,
        delivery: tracking.expected_delivery ?? tracking.shipment_delivery_date,
      }))}
    />
  ) : (
    <Text>Loading...</Text>
  );
};

module.exports = App;
export default App;
