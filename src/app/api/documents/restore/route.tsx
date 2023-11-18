import { getAuthSession } from '@/lib/auth-option';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

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
        { message: 'No document with the given ID found' },
        { status: 400 }
      );
    }

    await db.document.update({
      where: {
        id: documentId,
        userId: session.user.id,
      },
      data: {
        isArchived: false,
      },
    });

    return NextResponse.json(
      { message: 'Document restored successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
