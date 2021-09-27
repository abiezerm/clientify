import { httpClient } from "../utils/httpclient";

export const getCustomers = async () => {
  try {
    const { data, status } = await httpClient.get("/api/customers");

    return (status === 200 && data) || null;
  } catch (error) {
    throw new Error();
  }
};
