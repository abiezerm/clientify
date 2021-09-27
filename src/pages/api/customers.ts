import type { NextApiRequest, NextApiResponse } from "next";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../utils/getFirebaseDb";

const getCustomers = async () => {
  let customersList: any = [];
  const querySnapshot = await getDocs(collection(db, "customers"));
  querySnapshot.forEach((doc) => {
    customersList.push({ ...doc.data(), key: doc.id });
  });

  return customersList;
};

const addNewCustomer = async (newCustomer: any) => {
  const docRef = await addDoc(collection(db, "customers"), newCustomer);
  return docRef.id;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method == "GET") {
      res.status(200).json(await getCustomers());
    }

    if (req.method == "POST") {
      let newDoc = await addNewCustomer(req.body);
      res.status(200).json(newDoc);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
