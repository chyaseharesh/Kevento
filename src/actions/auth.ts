'use server';
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function changeUserRole(role: string, idsss: string) {
    console.log(idsss);
    try {
        const session = await auth();
        if (!session?.user) {
            return { success: false, status: 401, message: "You are not Authorized to change the role." };
        }
        if (session.user.role !== "SUPER_ADMIN") {
            return { success: false, status: 403, message: "Only Superadmin can change the role." };
        }
        // Update user in the database
        await prisma.user.update({
            where: { id: idsss },
            data: {
                role: role
            }
        });
        return { success: true, status: 200, message: "Role Changed Successfully" };
    } catch (error) {
        const errorDetails =
            error instanceof Error ? { message: error.message, stack: error.stack } : error;
        console.error("Error updating user:", errorDetails);
        return { error: "Internal server error", status: 500, success: false, message: "Failed to change role" };
    }
}

// block the user
export async function blockUser(idsss: string) {
    try{
        const session = await auth();
        if (!session?.user) {
            return { success: false, status: 401, message: "You are not Authorized to block the user." };
        }
        if (session.user.role!== "SUPER_ADMIN") {
            return { success: false, status: 403, message: "Only Superadmin can block the user." };
        }
        if (session.user.id === idsss) {
            return { success: false, status: 403, message: "You can't block yourself." };
        }
        // Update user in the database
        await prisma.user.update({
            where: { id: idsss },
            data: {
                isBlocked: true
            }
        });
        return { success: true, status: 200, message: "User Blocked Successfully" };
    }
    catch (error) {
        const errorDetails =
            error instanceof Error? { message: error.message, stack: error.stack } : error;
        console.error("Error updating user:", errorDetails);
        return { error: "Internal server error", status: 500, success: false, message: "Failed to block the user" };
    }
}
