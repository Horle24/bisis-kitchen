import { NextResponse } from "next/server";
import { getMenuItems } from "../../lib/sheets";

export async function GET() {
    try {
        const items = await getMenuItems();
        return NextResponse.json(items, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        console.error("API menu fetch failed:", error);
        return NextResponse.json([], {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}