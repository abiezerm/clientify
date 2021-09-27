import type { NextApiRequest, NextApiResponse } from "next";
import {
  doc,
  query,
  addDoc,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../utils/getFirebaseDb";

const getCustomers = async () => {
  let customersList: any = [];

  let q = query(collection(db, "customers"), orderBy("firstName", "asc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    customersList.push({ ...doc.data(), key: doc.id });
  });

  return customersList;
};

const addNewCustomer = async (newCustomer: any) => {
  const docRef = await addDoc(collection(db, "customers"), newCustomer);
  return docRef.id;
};

const updateCustomer = async (customer: any) => {
  const customerRef = doc(db, "customers", customer.key);
  await updateDoc(customerRef, customer);
  return customer;
};

const removeCustomer = async (id: any) => {
  await deleteDoc(doc(db, "customers", id));
  return true;
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

    if (req.method == "PUT") {
      let updatedDoc = await updateCustomer(req.body);
      res.status(200).json(updatedDoc);
    }

    if (req.method == "DELETE") {
      await removeCustomer(req.query.customer_id);
      res.status(200).json(true);
    }
  } catch (error) {
    res.status(400).json(error);
  }
}
