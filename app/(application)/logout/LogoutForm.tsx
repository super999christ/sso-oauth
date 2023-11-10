'use client';

import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Background from '@lib/components/Extra/Background';
import apiClient from '@lib/server/axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const LogoutForm = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      const response = await apiClient.get('/api/logout');
      if (response.data.status === 'OK') {
        router.replace('/');
      }
    };

    logout();
  }, [router]);

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 py-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex gap-4">
            <FontAwesomeIcon icon={faSpinnerThird} spin size="lg" />
            You are being logged out, please wait...
          </div>
        </div>
      </div>
    </>
  );
};
