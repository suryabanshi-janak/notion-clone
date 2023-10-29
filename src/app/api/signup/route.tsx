import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import { db } from '@/lib/db';
import { SignupValidator } from '@/lib/validators/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, password } = SignupValidator.parse(body);

    const existingEmail = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: 'User with the email address alreay exists!' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
