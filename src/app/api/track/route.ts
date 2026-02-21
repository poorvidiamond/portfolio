import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getSupabase() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { path, referrer } = body;

        // Get visitor info from headers
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
        const userAgent = request.headers.get('user-agent') || '';

        const supabase = getSupabase();

        // Record page view
        await supabase
            .from('page_views')
            .insert({ path, referrer, user_agent: userAgent });

        // Upsert visitor — increment visit count on repeat visits
        const { data: existingVisitor } = await supabase
            .from('visitors')
            .select('id, visit_count')
            .eq('ip_address', ip)
            .single();

        if (existingVisitor) {
            await supabase
                .from('visitors')
                .update({
                    last_visit: new Date().toISOString(),
                    visit_count: existingVisitor.visit_count + 1,
                })
                .eq('id', existingVisitor.id);
        } else {
            await supabase
                .from('visitors')
                .insert({ ip_address: ip });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: 'Tracking failed' },
            { status: 500 }
        );
    }
}
