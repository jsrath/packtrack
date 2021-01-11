import React from 'react';
import Table from 'ink-table';
import { Text } from 'ink';
import { ApiService } from '../services/api-service';

const App = (cliOptions: CliOptions) => {
  const { trackingNumber } = cliOptions;
  const validOption = Object.keys(cliOptions).find((option) => cliOptions[option]);
  const [data] = ApiService(validOption, trackingNumber);

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

module.exports = App;
export default App;
