import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request){
    const {searchParams} = new URL(request.url);
    const category = searchParams.get("category");

    const products = await prisma.product.findMany({
        where : category ? {category : {slug: category}} : undefined,
        include: {category : true},
        orderBy: {name: "asc"},
    });
    return NextResponse.json(products);
}