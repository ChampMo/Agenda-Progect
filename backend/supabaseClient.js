import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://fpvhqgksrqktucubhvte.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdmhxZ2tzcnFrdHVjdWJodnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTI5ODMsImV4cCI6MjAzMzIyODk4M30.g4LSUEsLnc9qOrZ873_t7WvSyr07ai4j0c7B-7uiFOA')






export async function upLoadPROFILE(buffer, userId, fileName) {
    const { data: existingFiles, error: existingError } = await supabase.storage
        .from('profile')
        .list(`public/${userId}`);

    if (existingError) {
        throw existingError;
    }

    if (existingFiles && existingFiles.length > 0) {
        const { error: removeError } = await supabase.storage
            .from('profile')
            .remove(`public/${userId}/${existingFiles[0].name}`);

        if (removeError) {
            throw removeError;
        }
    }

    const { data, error } = await supabase.storage
        .from('profile')
        .upload(`public/${userId}/${fileName}`, buffer);

    if (error) {
        throw error;
    }

    const { data:datapublicURL } = await supabase.storage
        .from("profile")
        .getPublicUrl(`public/${userId}/${fileName}`);

    return datapublicURL.publicUrl;

}