import { httpClient } from "../utils/httpclient";

export const getCustomers = async () => {
  try {
    const { data, status } = await httpClient.get("/api/customers");

    return (status === 200 && data) || null;
  } catch (error) {
    throw new Error();
  }
};

export const createCustomer = async (newCustomer: any) => {
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

export const updateCustomer = async (newCustomer: any) => {
  try {
    const { data, status } = await httpClient.put(
      "/api/customers",
      newCustomer
    );

    return (status === 200 && data) || null;
  } catch (error) {
    throw new Error();
  }
};

export const removeCustomer = async (id: any) => {
  try {
    const { data, status } = await httpClient.delete(
      `/api/customers?customer_id=${id}`
    );

    return (status === 200 && data) || null;
  } catch (error) {
    throw new Error();
  }
};
