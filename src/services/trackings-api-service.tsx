import { useEffect, useState } from "react";
import fetch, { Headers } from "node-fetch";
import { getEnvironmentVariables, TRACKINGS_URL } from "./config-service";
import { Tracking } from "../models/model";

export function TrackingsApiService(option: string, courier: string, trackingNumber: string): Tracking[][] {
  getEnvironmentVariables();
  const headers = new Headers({
    "aftership-api-key": `${process.env.API_KEY}`,
    "Content-Type": "application/json",
  });

  const tracking = {
    tracking: {
      tracking_number: trackingNumber,
      slug: courier,
    },
  };

  const [data, setData] = useState<Tracking[]>([]);
  const [apiData, setApiData] = useState<Tracking[]>();

  function generateUrlWithSlug(): string {
    const slug = courier ? courier : getSlugFromApiData();
    return slug ? `${TRACKINGS_URL}/${slug}/${trackingNumber}` : undefined;
  }

  function getSlugFromApiData(): string | undefined {
    return apiData?.length && apiData.filter((tracking: Tracking) => tracking.tracking_number === trackingNumber)[0].slug;
  }

  async function addPackage() {
    const response = await fetch(TRACKINGS_URL, {
      method: "POST",
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
      method: isGetRequest ? "GET" : "DELETE",
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

    apiData.forEach((data) => data.checkpoints[data.checkpoints.length - 1]);
  }

  useEffect(() => {
    async function fetchPackages() {
      const response = await fetch(TRACKINGS_URL, {
        method: "GET",
        headers,
      });
      const json = await response.json();
      setApiData(json.data.trackings);
    }
    fetchPackages();
  }, []);

  useEffect(() => {
    switch (option) {
      case "add":
        addPackage();
        break;

      case "remove":
        getOrRemovePackage(false);
        break;

      case "trackingNumber":
        getOrRemovePackage(true);
        break;

      default:
        returnAllPackages();
        break;
    }
  }, [apiData]);

  return [data];
}
