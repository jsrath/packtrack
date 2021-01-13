import { config } from 'dotenv';
import { useEffect, useState } from 'react';
import fetch, { Headers } from 'node-fetch';
import * as path from 'path';

export function CouriersApiService(): [Courier[]] {
  config({ path: path.join(__dirname, '../../.env') });

  const url = `${process.env.COURIERS_URL}`;
  const headers = new Headers({
    'aftership-api-key': `${process.env.API_KEY}`,
    'Content-Type': 'application/json',
  });

  const [couriers, setCouriers] = useState<Courier[]>();

  useEffect(() => {
    async function fetchPackages() {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const json = await response.json();
      setCouriers(json.data.couriers);
    }
    fetchPackages();
  }, []);

  return [couriers];
}
