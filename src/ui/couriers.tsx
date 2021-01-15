import React from "react";
import Table from "ink-table";
import { Text } from "ink";
import { CouriersApiService } from "../services/couriers-api-service";
import { Courier, CourierOptions } from "../models/model";

const Couriers = (courierOptions: CourierOptions) => {
  const [data] = CouriersApiService();
  const { searchTerm } = courierOptions;

  function isDataValid(data: Courier[]): boolean {
    return data?.length && !!data[0].slug;
  }

  function filterCouriers(data: Courier[]): Courier[] {
    if (!searchTerm) {
      return data;
    }

    return data.filter((courier: Courier) => courier.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

  return isDataValid(data) ? (
    <Table
      data={filterCouriers(data).map((courier: Courier) => ({
        Name: courier.name,
        Use: courier.slug,
      }))}
    />
  ) : (
    <Text></Text>
  );
};

module.exports = Couriers;
export default Couriers;
