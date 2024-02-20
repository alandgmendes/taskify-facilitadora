"use server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function deleteBoard(id:string) {
    await db.board.delete({
        where: {
            id
        }
    });
    await db.$disconnect();
    revalidatePath("/organization/org_2c3mHvjARlRWrmonX6VAZ1tdHup");
}