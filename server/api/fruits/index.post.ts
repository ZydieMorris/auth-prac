import { fruits } from "~~/server/database/schemas";
import { z } from "zod";

const fruitSchema = z.object({
  fruitName: z.string().max(255),
});

// Define the shape we expect
interface SessionUser {
  id: number;
  username?: string;
  email?: string;
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, fruitSchema.parse);

  if(body.fruitName.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Enter a fruit name",
    });
  }

  // Cast session safely
  const session = await requireUserSession(event) as unknown as { user: SessionUser };

  const userId = session.user.id;

  await db.insert(fruits).values({
    fruitName: body.fruitName,
    userId,
  });

  return { message: "Fruit added successfully" };
});
