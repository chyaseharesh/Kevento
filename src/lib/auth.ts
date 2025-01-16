
import { auth } from "../../auth";

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

interface User {
  role: string;
}

export function isAdmin(user: User) {
  return user?.role === "ADMIN"
} 

export { auth };
