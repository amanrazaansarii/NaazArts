import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';
import { updateInquirySchema } from '@/lib/validators';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const validated = updateInquirySchema.safeParse(body);

    if (!validated.success) {
      const msg = validated.error.issues?.[0]?.message || 'Invalid status data';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: {
        status: validated.data.status,
        adminNotes: validated.data.adminNotes !== undefined ? validated.data.adminNotes : undefined,
      },
    });

    return NextResponse.json({ success: true, submission: updated });
  } catch (error: any) {
    console.error('[API] Admin update inquiry error:', error);
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.contactSubmission.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error: any) {
    console.error('[API] Admin delete inquiry error:', error);
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
