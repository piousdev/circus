import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request, { fileId }: {fileId?: string}) {
    try {
        const user = await currentUser();
        let file;

        if (fileId) {
            file = await db.file.findUnique({
                where: { id: fileId },
            });
        } else if (user) {
            file = await db.file.findMany({
                where: { userId: user.id },
            });
        } else {
            return new NextResponse("File ID or User ID required", { status: 400 });
        }

        return NextResponse.json(file);
    } catch(error) {
        console.error('[FILEVERSION_GET]', error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}