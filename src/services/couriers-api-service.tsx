import { useEffect, useState } from "react";
import fetch, { Headers } from "node-fetch";
import { getEnvironmentVariables, COURIERS_URL } from "./config-service";
import { Courier } from "../models/model";

export function CouriersApiService(): Courier[][] {
  getEnvironmentVariables();
  const headers = new Headers({
    "aftership-api-key": `${process.env.API_KEY}`,
    "Content-Type": "application/json",
  });

  const [couriers, setCouriers] = useState<Courier[]>();

  useEffect(() => {
    async function fetchPackages() {
      const response = await fetch(COURIERS_URL, {
        method: "GET",
        headers,
      });
      const json = await response.json();
      setCouriers(json.data.couriers);
    }
    fetchPackages();
  }, []);

  return [couriers];
}
