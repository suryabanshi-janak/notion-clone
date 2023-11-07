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

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get('documentId');

    if (documentId) {
      const document = await db.document.findFirst({
        where: {
          id: documentId,
        },
      });

      if (!document) {
        return NextResponse.json(
          { message: 'No document with the given document id found' },
          { status: 400 }
        );
      }

      return NextResponse.json({ document }, { status: 200 });
    }

    const documents = await db.document.findMany({
      where: {
        userId: session.user.id,
        isArchived: false,
      },
    });

    return NextResponse.json({ documents }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { documentId, ...data } = body;

    if (!documentId) {
      return NextResponse.json(
        { message: 'No document id provided' },
        { status: 400 }
      );
    }

    const document = await db.document.update({
      where: {
        id: documentId,
        userId: session.user.id,
      },
      data,
    });

    return NextResponse.json(
      { message: 'Document updated sucessfully!', document },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
