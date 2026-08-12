import { auth } from "@/auth";

async function checkAdmin() {
    const session = await auth();
    return session?.user?.role === "admin" ? session : null;
}

export async function PATCH(
    request: Request,
    {params}: {params: Promise<{id: string}>}
){
    
}