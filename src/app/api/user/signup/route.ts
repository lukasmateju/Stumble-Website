import prisma from '@/app/prismadb'
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt";
import { randomUUID} from 'crypto'
import {z} from 'zod'
import { SignUpSchema } from '@/ZodSchema/UserSchema'

type SignUpSchema = z.infer<typeof SignUpSchema>

export async function POST (request: Request) { 
    const body: SignUpSchema = await request.json()
    console.log(SignUpSchema.parse(body))
    
    return NextResponse.json('ok')
}
