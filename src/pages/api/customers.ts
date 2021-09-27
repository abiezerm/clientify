import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/getFirebaseDb";

interface Response {
  key: string;
  firstName: string;
  lastName: string;
  addresses: any[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let customersList: any = [];
  const querySnapshot = await getDocs(collection(db, "customers"));
  querySnapshot.forEach((doc) => {
    customersList.push({ ...doc.data(), key: doc.id });
  });

  res.status(200).json(customersList);
}
