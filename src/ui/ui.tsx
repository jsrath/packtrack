import React from 'react';
import Table from 'ink-table';
import { Text } from 'ink';
import { ApiService } from '../services/api-service';


const App = () => {
  const [data] = ApiService("get", "398865169653");
  
  return data?.data?.trackings?.length ? (
    <Table
      data={data!.data?.trackings.map((tracking: any) => ({
        id: tracking.id,
        active: tracking.active,
      }))}
    />
  ) : (
    <Text>Loading...</Text>
  );
};

module.exports = App;
export default App;
