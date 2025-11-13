import { fruits } from "~~/server/database/schemas";

import { eq } from "drizzle-orm";

// Define the shape we expect
interface SessionUser {
  id: number;
}

export default defineEventHandler(async (event) => {
    
    const session = await requireUserSession(event) as unknown as { user: SessionUser };

    const allFruits = await db.select().from(fruits).where(eq(fruits.userId, session.user.id));

    return allFruits;

})