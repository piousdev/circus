import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(request: Request, { fileId }: { fileId?: string, userId?: string }) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

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
    } catch (error) {
        console.error('[FILE_GET]', error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

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

export async function DELETE(request: Request, { filesId }: { filesId: string }) {
    try {
        const { user } = auth();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const file = await db.file.delete({
            where: {
                id: filesId,
                user: { id: user.id }
            },
        });

        return NextResponse.json(file);
    } catch (error) {
        console.error("[FILE_DELETE]", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}