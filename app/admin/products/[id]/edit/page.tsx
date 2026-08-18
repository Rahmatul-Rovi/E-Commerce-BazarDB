import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
    params,
}:{
     params: Promise<{ id: string }>;
}){
    const id = await params;
    const product = await prisma.product.findUnique({where: {id}});
}