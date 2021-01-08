import React from 'react';
import Table from 'ink-table';
import { Text } from 'ink';
import { ApiService } from '../services/api-service';
import { env } from 'process';

const App = (cliOptions: CliOptions) => {
  const { trackingNumber } = cliOptions;
  const validOption = Object.keys(cliOptions).find((option) => cliOptions[option]);
  const [data] = ApiService(validOption, trackingNumber);

  if (Array.isArray(data)) {
    return data?.length ? (
      <Table
        data={data.map((tracking: any) => ({
          tracking: tracking.tracking_number,
          delivery: tracking.expected_delivery ?? tracking.shipment_delivery_date,
        }))}
      />
    ) : (
      <Text>Error, please add a package</Text>
    );
  } else {
    return <Text>Loading...</Text>
  }
};

module.exports = App;
export default App;
