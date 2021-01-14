import { useEffect, useState } from 'react';
import fetch, { Headers } from 'node-fetch';
import { getEnvironmentVariables } from './config-service';

export function TrackingsApiService(option: string, courier: string, trackingNumber: string): [Tracking[]] {
  getEnvironmentVariables();

  const url = `${process.env.TRACKINGS_URL}`;
  const headers = new Headers({
    'aftership-api-key': `${process.env.API_KEY}`,
    'Content-Type': 'application/json',
  });

  const tracking = {
    tracking: {
      tracking_number: trackingNumber,
      slug: courier
    },
  };

  const [data, setData] = useState<Tracking[]>([]);
  const [apiData, setApiData] = useState<Tracking[]>();

  function generateUrlWithSlug(): string {
    const slug = courier ? courier : getSlugFromApiData(); 
    return slug ? `${url}/${slug}/${trackingNumber}` : undefined;
  }

  function getSlugFromApiData(): string | undefined {
    return apiData?.length && apiData.filter((tracking: any) => tracking.tracking_number === trackingNumber)[0].slug;
  }

  async function addPackage() {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(tracking),
    });
    const json = await response.json();
    setData([json.data.tracking]);
  }

  async function getOrRemovePackage(isGetRequest: boolean) {
    const fetchUrl = generateUrlWithSlug();
    if (!fetchUrl) {
      return;
    }
    const response = await fetch(fetchUrl, {
      method: isGetRequest ? 'GET' : 'DELETE',
      headers,
    });
    const json = await response.json();
    setData([json.data.tracking]);
  }

  function returnAllPackages() {
    if (!apiData) {
      return;
    }
    setData(apiData);
  }

  useEffect(() => {
    async function fetchPackages() {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      const json = await response.json();
      setApiData(json.data.trackings);
    }
    fetchPackages();
  }, []);

  useEffect(() => {
    switch (option) {
      case 'add':
        addPackage();
        break;

      case 'remove':
        getOrRemovePackage(false);
        break;

      case 'trackingNumber':
        getOrRemovePackage(true);
        break;

      default:
        returnAllPackages();
        break;
    }
  }, [apiData]);

  return [data];
}
