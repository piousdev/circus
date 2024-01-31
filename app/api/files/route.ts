import { FileService } from '@/services/file-service';
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log('[FILE_POST] Handler - Start');

    try {
        const body = await request.json();
        console.log('[FILE_POST] Handler - Request body:', body);
        const { name, description, content, language, starred } = body;

        console.log('[FILE_POST] Handler - Fetching current user');
        const user = await currentUser();
        console.log('[FILE_POST] Handler - Current user:', user);

        if (!user?.id) {
            console.log('[FILE_POST] Handler - User not authenticated or missing ID');
            return new NextResponse("Unauthorized", { status: 401 });
        };

        // if (![name, description, content, language].every(Boolean)) {
        //     console.log('[FILE_POST] Handler - Missing required fields');
        //     return new NextResponse("Missing fields", { status: 400 });
        // }

        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!description) missingFields.push('description');
        if (!content) missingFields.push('content');
        if (!language) missingFields.push('language');

        if (missingFields.length > 0) {
            console.log(`[FILE_POST] Handler - Missing required fields: ${missingFields.join(', ')}`);
            return new NextResponse(`Missing fields: ${missingFields.join(', ')}`, { status: 400 });
        }

        console.log('[FILE_POST] Handler - Creating file with FileService');
        const file = await FileService.createFile(user.id, name, description, content, language, starred);
        console.log('[FILE_POST] Handler - File created:', file);

        return NextResponse.json(file);
    } catch (error) {
        console.error('[FILE_POST] Handler - Error:', error);
        return new NextResponse("Internal server error", { status: 500 });
    } finally {
        console.log('[FILE_POST] Handler - End');
    }
}