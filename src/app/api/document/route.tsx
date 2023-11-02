import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth-option';
import { DocumentValidator } from '@/lib/validators/document';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const {
      title,
      isArchived,
      isPublished,
      content,
      coverImage,
      parentDocument,
    } = DocumentValidator.parse(body);

    await db.document.create({
      data: {
        title,
        isArchived,
        isPublished,
        content,
        coverImage,
        parentDocument,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: 'New note created!' }, { status: 201 });
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
