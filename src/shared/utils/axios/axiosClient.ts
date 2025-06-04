import axios from 'axios';

// Axios 인스턴스 생성
export const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1',
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
    },
});
