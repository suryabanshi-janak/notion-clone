import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth-option';

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { documentId } = body;

    if (!documentId) {
      return NextResponse.json(
        { message: 'No document id provided' },
        { status: 400 }
      );
    }

    const existingDocument = await db.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (!existingDocument) {
      return NextResponse.json(
        { message: 'No document with the provided id is found' },
        { status: 400 }
      );
    }

    const document = await db.document.update({
      where: {
        id: documentId,
        userId: session.user.id,
      },
      data: {
        icon: null,
      },
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
