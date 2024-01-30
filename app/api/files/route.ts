import { db } from '@/lib/db';
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, content, language, starred, versions } = body;

        const user = await currentUser();

        if (!user?.id || !user?.emailAddresses[0]?.emailAddress) {
            return new NextResponse("Unauthorized", { status: 401 });
        };

        if (![name, description, content, language].every(Boolean)) {
            return new NextResponse("Missing fields", { status: 400 });
        }

        const file = await db.file.create({
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
        console.error('[FILE_POST]', error);
        return new NextResponse("Internal server error", { status: 500 });
    };
};