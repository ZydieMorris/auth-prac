import { users } from "~~/server/database/schemas"
import {eq} from "drizzle-orm"
import { verifyPassword } from "#imports";

export default defineEventHandler(async(event)=>{

    const body = await readBody(event)

    // check if user exists
    const user = await db.select().from(users).where(eq(users.email, body.email)).limit(1);

    if(user.length ===0){
        throw createError({ statusCode:404, statusMessage:'Invalid email or password' })
    }

    const userFound = user[0]
    // check password
    const isPasswordValid = await verifyPassword(userFound.password, body.password);

    if(!isPasswordValid){
        throw createError({statusCode: 404, statusMessage:' Invalid email or Password'})
    }

    const {password,...rest} = userFound;

    await setUserSession (event, {

        user:rest   
    })

    return {message:'Login successful'}




})