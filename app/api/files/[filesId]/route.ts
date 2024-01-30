import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
    request: Request,
    { filesId }: { filesId: string }
    ) {
    try {
        const body = await request.json();
        const user = await currentUser();
        const { name, description, content, language, starred, versions } = body;

        if (!user?.id || !user?.emailAddresses[0]?.emailAddress) {
        return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!user || user.id || !user.emailAddresses[0]?.emailAddress || !user.lastName || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!name || !description || !content || !language) {
        return new NextResponse("Missing fields required", { status: 400 });
        }

        const file = await db.file.update({
            where: {
                id: filesId,
                user: { id: user?.id }
            },
            data: {
                name,
                description,
                content,
                language,
                starred,
                versions,
                user: { connect: { id: user?.id } },
            },
        });

        return NextResponse.json(file);
    } catch (error) {
        console.error("[FILE_PATCH]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}