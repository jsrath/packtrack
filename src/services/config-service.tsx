import { config } from "dotenv";
import * as path from "path";

export const getEnvironmentVariables = () => {
  config({ path: path.join(__dirname, "../../.env") });
};

export const TRACKINGS_URL = "https://api.aftership.com/v4/trackings";
export const COURIERS_URL = "https://api.aftership.com/v4/couriers/all";
