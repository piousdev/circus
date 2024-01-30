import { db } from "@/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

const webhookSecret = process.env.SVIX_WEBHOOK_SECRET || "";

interface EmailAddress {
    email_address: string;
    verification: {
        status: string;
    };
}

interface WebhookEventData {
    id: string;
    email_addresses: EmailAddress[];
    first_name?: string;
    last_name?: string;
    [key: string]: any;
}

interface WebhookEvent {
    data: WebhookEventData;
    object: string;
    type: string;
}

async function handler(request: Request) {
    const payload = await request.json();
    const headersList = headers();
    const heads = {
        "svix-id": headersList.get("svix-id"),
        "svix-timestamp": headersList.get("svix-timestamp"),
        "svix-signature": headersList.get("svix-signature"),
    };
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent | null = null;

    try {
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as WebhookEvent;
    } catch (err) {
        console.error((err as Error).message);
        return NextResponse.json({}, { status: 400 });
    }

    if (!evt) {
        return NextResponse.json({}, { status: 400 });
    }

    const eventType = evt.type;
    if (eventType === "user.created" || eventType === "user.updated") {
        const { id, email_addresses, first_name, last_name } = evt.data;

        const verifiedEmail = email_addresses.find(email => email.verification.status === "verified")?.email_address;

        if (!verifiedEmail) {
            console.error('No verified email found');
            return NextResponse.json({ error: 'No verified email found' }, { status: 400 });
        }

        const name = first_name && last_name ? `${first_name} ${last_name}` : undefined;

        await db.user.upsert({
            where: { clerkId: id },
            create: {
                clerkId: id,
                email: verifiedEmail,
                name,
            },
            update: {
                email: verifiedEmail,
                name,
            },
        });
        return NextResponse.json({ message: 'User processed successfully' }, { status: 200 });
    } else {
        return NextResponse.json({ error: 'Unsupported event type' }, { status: 400 });
    }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;