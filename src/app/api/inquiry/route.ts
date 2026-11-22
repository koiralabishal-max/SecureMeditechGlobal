import { NextRequest, NextResponse } from 'next/server';
import { validateInquiryPayload } from '@/lib/inquiry';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateInquiryPayload(body);

    if (!validation.valid || !validation.normalized) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Please check required inquiry fields.',
          fieldErrors: validation.errors,
        },
        { status: 400 }
      );
    }

    const record = validation.normalized;
    const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();

    if (webhookUrl && /^https?:\/\//i.test(webhookUrl)) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
          signal: AbortSignal.timeout(4500),
        });
      } catch (webhookErr) {
        console.warn('[api/inquiry] Webhook forwarding failed:', webhookErr);
      }
    }

    console.info('[api/inquiry] Received', {
      referenceId: record.referenceId,
      type: record.type,
      isOem: record.isOem,
      itemCount: record.items?.length || 0,
      totalUnits: record.totalUnits,
      country: record.country || 'unspecified',
    });

    return NextResponse.json({
      ok: true,
      referenceId: record.referenceId,
      type: record.type,
      isOem: record.isOem,
      totalUnits: record.totalUnits,
      receivedAt: record.receivedAt,
      slaHours: 12,
    });
  } catch (err) {
    console.error('[api/inquiry] Parse/server error:', err);
    return NextResponse.json(
      { ok: false, error: 'Unable to process inquiry submission. Please try again.' },
      { status: 400 }
    );
  }
}
