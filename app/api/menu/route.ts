import { NextResponse } from "next/server";
import { getMenuItems } from "../../lib/sheets";

export async function GET() {
    try {
        const items = await getMenuItems();
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        console.error("API menu fetch failed:", error);
        return NextResponse.json([], { status: 500 });
    }

}
