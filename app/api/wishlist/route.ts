
export default function GET() {
    const session = await auth();
     if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}