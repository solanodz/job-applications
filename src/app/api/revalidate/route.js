import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
    revalidateTag("jobs");

    return Response.json({ revalidated: true });
}