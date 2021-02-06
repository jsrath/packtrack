import { useEffect, useState } from "react";
import fetch, { Headers } from "node-fetch";
import { getEnvironmentVariables, TRACKINGS_URL } from "./config-service";
import { ApiResponse, Tracking } from "../models/model";

export function TrackingsApiService(option: string, courier: string, trackingNumber: string): Tracking[][] | string[] {
  getEnvironmentVariables();
  const headers = new Headers({
    "aftership-api-key": process.env.API_KEY,
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
  const [apiError, setApiError] = useState<string>();

  function generateUrlWithSlug(): string {
    const slug = courier ? courier : getSlugFromApiData();
    return slug ? `${TRACKINGS_URL}/${slug}/${trackingNumber}` : undefined;
  }

  function getSlugFromApiData(): string | void {
    const tracking =
      apiData?.length && apiData.filter((tracking: Tracking) => tracking.tracking_number === trackingNumber)[0];
    return tracking ? tracking.slug : setApiError("Invalid courier or tracking number");
  }

  async function addPackage() {
    const response = await fetch(TRACKINGS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(tracking),
    });
    const json: ApiResponse = await response.json();
    if (json.meta.code !== 201) {
      setApiError(json.meta.message);
      return;
    }

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
    const json: ApiResponse = await response.json();
    if (json.meta.code !== 201) {
      setApiError(json.meta.message);
      return;
    }
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

  useEffect(() => {}, [apiError]);

  if (data.length) {
    return [data];
  }

  if (apiError) {
    return [apiError];
  }

  return [];
}
