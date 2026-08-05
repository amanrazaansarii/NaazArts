import { NextResponse } from 'next/server';
import { createB2BInquiry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, companyName, email, phone, productType, estimatedQuantity, customizationDetails } = body;

    if (!name || !email || !productType || !estimatedQuantity) {
      return NextResponse.json(
        { success: false, error: 'Name, Email, Product Type, and Estimated Quantity are required fields.' },
        { status: 400 }
      );
    }

    const inquiry = createB2BInquiry({
      name,
      companyName,
      email,
      phone,
      productType,
      estimatedQuantity,
      customizationDetails
    });

    return NextResponse.json({
      success: true,
      message: 'B2B Wholesale Inquiry submitted successfully.',
      inquiry
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
