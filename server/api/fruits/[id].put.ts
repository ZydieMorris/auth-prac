import { eq } from "drizzle-orm";
import { fruits } from "~~/server/database/schemas";

export default defineEventHandler(async (event) => {

  const id = Number(event.context.params?.id);

  const body = await readBody(event);

    await db.update(fruits).set({fruitName: body.fruitName}).where(eq(fruits.id, id));

  return { message: "Fruit updated successfully" };
});


