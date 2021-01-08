import { config } from 'dotenv';
import { useEffect, useState } from 'react';
import fetch, { Headers } from 'node-fetch';
import * as path from 'path';

export function ApiService(option: string, trackingNumber: string): [ApiResponse] {
  config({ path: path.join(__dirname, '../../.env') });
  const url = `${process.env.BASE_URL}`;
  const headers = new Headers({
    'aftership-api-key': `${process.env.API_KEY}`,
    'Content-Type': 'application/json',
  });

  const tracking = {
    tracking: {
      tracking_number: trackingNumber,
    },
  };

  const [data, setData] = useState<ApiResponse>({
    meta: {},
    data: {},
  });

  async function fetchPackages() {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    setData(await response.json());
  }

  async function addNewPackage() {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(tracking),
    });
    setData(await response.json());
  }

  async function removePackage() {
    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });
    setData(await response.json());
  }

  useEffect(() => {
    switch (option) {
      case 'add':
        addNewPackage();
        break;

      case 'remove':
        removePackage();
        break;

      case 'trackingNumber':
        fetchPackages();
        break;

      default:
        break;
    }
  }, []);
  return [data];
}
