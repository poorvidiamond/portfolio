// Temporary script to upload videos to Supabase Storage
// Run with: node scripts/upload-videos.mjs

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://odknhfmeyrzlgdnfjudo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ka25oZm1leXJ6bGdkbmZqdWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NDI1NzcsImV4cCI6MjA4NzIxODU3N30.BBhWyZ68qC4d_RB1k-OZOCgrOpgvnQk7xQx9Hrj6RFI';

const supabase = createClient(supabaseUrl, supabaseKey);

const BUCKET = 'videos';
const videosDir = path.join(process.cwd(), 'public', 'videos');

async function main() {
    // Create bucket (if it doesn't exist)
    console.log('Creating bucket...');
    const { error: bucketError } = await supabase.storage.createBucket(BUCKET, {
        public: true,
        allowedMimeTypes: ['video/mp4'],
        fileSizeLimit: 200 * 1024 * 1024, // 200MB
    });
    if (bucketError && !bucketError.message.includes('already exists')) {
        console.error('Bucket error:', bucketError.message);
        // The anon key might not have permission to create buckets.
        // User may need to create the bucket manually in Supabase dashboard.
        console.log('\n⚠️  If you see a permission error, create the bucket manually:');
        console.log('   1. Go to Supabase Dashboard → Storage');
        console.log('   2. Click "New Bucket" → Name: "videos" → Toggle "Public" ON → Create');
        console.log('   3. Re-run this script\n');
        return;
    }
    console.log('✓ Bucket ready');

    const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));

    for (const file of files) {
        const filePath = path.join(videosDir, file);
        const fileBuffer = fs.readFileSync(filePath);
        const sizeMB = (fileBuffer.length / 1024 / 1024).toFixed(1);

        console.log(`Uploading ${file} (${sizeMB} MB)...`);

        const { error } = await supabase.storage
            .from(BUCKET)
            .upload(file, fileBuffer, {
                contentType: 'video/mp4',
                upsert: true,
            });

        if (error) {
            console.error(`  ✗ Failed: ${error.message}`);
        } else {
            const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(file);
            console.log(`  ✓ Uploaded → ${urlData.publicUrl}`);
        }
    }

    console.log('\nDone! Update experience.json with the public URLs above.');
}

main().catch(console.error);
