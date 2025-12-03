import "@/lib/firebaseAdmin"; // Initialize Firebase Admin
import * as admin from "firebase-admin";

export async function getProducts(page: number = 1, pageSize: number = 5) {
  try {
    const db = admin.firestore();
    const productsCollection = db.collection("products").orderBy("id");

    // Calculate offset
    const offset = (page - 1) * pageSize;

    const totalSnapshot = await productsCollection.count().get();
    const totalItems = totalSnapshot.data().count;
    const totalPages = Math.ceil(totalItems / pageSize);

    // Get paginated docs
    const snapshot = await productsCollection
      .offset(offset)
      .limit(pageSize)
      .get();

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      products,
      totalItems,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
