// 'use client';

// import Image from 'next/image';
// // import { createClient } from '@/src/shared/utils/supabase/client';
// export const KakaoLoginButton = () => {
//     // const supabase = createClient();

//     const handleKakaoLogin = async () => {
//         // const { data, error } = await supabase.auth.signInWithOAuth({
//         //     provider: 'kakao',
//         //     options: {
//         //         // redirectTo: `${window.location.origin}/api/auth/callback`,
//         //         redirectTo: 'http://localhost:3000/api/auth/callback',
//         //     },
//         // });
//         // console.log(data, error);
//     };
//     return (
//         <div>
//             <Image src="/kakao.png" alt="kakao" width={200} height={200} onClick={handleKakaoLogin} />
//         </div>
//     );
// };

'use client';

import React from 'react';

export const KakaoLoginButton = () => {
    const handleClick = () => {
        console.log('clicked');
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center justify-center w-full py-3 px-5 bg-[#FEE500] rounded-md hover:bg-[#FEE500]/90 transition-colors"
            style={{ minHeight: '48px' }}
        >
            <div className="flex items-center">
                <svg
                    width="24"
                    height="22"
                    viewBox="0 0 24 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                >
                    <path
                        d="M12 0C5.3847 0 0 4.2268 0 9.44c0 3.151 2.0883 5.922 5.2318 7.502-.2303.8737-.833 3.1513-1.0094 3.6399-.1254.618.2282.6088.4797.4425.1971-.125 3.1275-2.1024 4.3904-2.9604 1.0118.1461 2.0539.2768 3.1075.2768C18.6156 18.8806 24 14.6535 24 9.44 24 4.2266 18.6156 0 12 0Z"
                        fill="black"
                    />
                </svg>
                <span className="text-black text-[14px] font-medium">카카오로 시작하기</span>
            </div>
        </button>
    );
};

export default KakaoLoginButton;
