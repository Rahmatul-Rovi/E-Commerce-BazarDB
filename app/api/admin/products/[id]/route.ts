import { auth } from "@/auth";

async function checkAdmin() {
    const session = await auth();
    return session?.user?.role === "admin" ? session : null;
}