import { config } from 'dotenv';
import { useEffect, useState } from 'react';
import fetch, { Headers } from 'node-fetch';
import * as path from 'path';

export function ApiService(option: string, trackingNumber: string): [Tracking[]] | [string] {
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
  const [data, setData] = useState<Tracking[]>([]);
  const [apiData, setApiData] = useState<Tracking[]>(undefined);
  const [error, setError] = useState<string>();

  async function fetchPackages() {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const json = await response.json();
    setApiData(json.data.trackings);

    if (apiData && !apiData?.length && option !== "add") {
      setError("Please add a package");
    }
  }

  async function fetchSinglePackage(method: string, hasBody: boolean) {
    const slug = apiData?.length && apiData.filter((tracking: any) => tracking.tracking_number === trackingNumber).map((tracking) => tracking.slug);

    const fetchUrl = slug ?  `${url}/${slug}/${trackingNumber}` : url;

    const response = await fetch(fetchUrl, {
      method,
      headers,
      ...(hasBody && { body: JSON.stringify(tracking) }),
    });

    console.log("CALLED SINGLE", await response.json())

    //setData(await response.json());
  }

  function returnAllPackages() {
    if(!apiData) {
      return;
    }
    setData(apiData);
  }

  fetchPackages();

  useEffect(() => {

    switch (option) {
      case 'add':
        fetchSinglePackage('POST', true);
        break;

      case 'remove':
        fetchSinglePackage('DELETE', false);
        break;

      case 'trackingNumber':
        console.log('CALLED WITH NUMBER');
        fetchSinglePackage('GET', false);
        break;

      default:
        console.log('CALLED WITH NOTHING');
        returnAllPackages();
        break;
    }
  }, [apiData]);
  return [error] || [data];
}
