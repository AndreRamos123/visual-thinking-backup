import { NextRequest } from "next/server";
import "@/lib/firebaseAdmin"; // Initialize Firebase Admin
import * as admin from "firebase-admin";

export async function verifyToken(request: NextRequest) {
  try {
    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        valid: false,
        error: "Missing or invalid authorization header",
        uid: null,
      };
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    try {
      // Verify token with Firebase Admin
      const decodedToken = await admin.auth().verifyIdToken(token);

      return {
        valid: true,
        uid: decodedToken.uid,
        email: decodedToken.email,
        error: null,
      };
    } catch (verifyError: any) {
      console.error("Token verification error:", verifyError.message);
      return {
        valid: false,
        error: `Token verification failed: ${verifyError.message}`,
        uid: null,
      };
    }
  } catch (error: any) {
    console.error("Auth error:", error.message);
    return {
      valid: false,
      error: error.message,
      uid: null,
    };
  }
}
