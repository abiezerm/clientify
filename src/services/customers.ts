import { httpClient } from "../utils/httpclient";

export const getCustomers = async () => {
  try {
    const { data, status } = await httpClient.get("/api/customers");

    return (status === 200 && data) || null;
  } catch (error) {
    throw new Error();
  }
};

export const addNewCustomer = async (newCustomer: any) => {
  newCustomer.addresses = newCustomer.addresses.map((item: any) => {
    delete item.key;
    return item;
  });

  try {
    const { data, status } = await httpClient.post(
      "/api/customers",
      newCustomer
    );

    return (status === 200 && data) || null;
  } catch (error) {
    throw new Error();
  }
};
