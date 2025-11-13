import { eq } from "drizzle-orm";
import { fruits } from "~~/server/database/schemas";

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid fruit ID",
    });
  }

  await db.delete(fruits).where(eq(fruits.id, id));

  return { message: "Fruit deleted successfully" };
});
