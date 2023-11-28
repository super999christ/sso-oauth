'use client';

// import BackButton from '@components/Buttons/BackButton';
// import BackButtonLayout from '@components/Layouts/BackButtonLayout';
import { faEnvelope /* , faPhone */ } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TermsAndPolicy from '@lib/components/Footers/TermsAndPolicy';
import {
  usePostForgotPasswordRequestByEmail
  // usePostForgotPasswordSMSRequestBySMS
} from '@lib/hooks/forgot_password';
import { getSearchParamQuery } from '@lib/utils/url';
import { Button } from '@pickleballinc/react-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Background from '../Extra/Background';
// import HorizontalBar from '../Layouts/HorizontalBar';
import Spinner from '../Loadings/Spinner';

interface IFormProps {
  email: string;
}

export default function ChooseForgotPasswordForm(props: IFormProps) {
  const [isEmailLoading, setEmailLoading] = useState(false);
  // const [isSMSLoading, setSMSLoading] = useState(false);
  const router = useRouter();
  const postForgotPasswordRequestByEmail =
    usePostForgotPasswordRequestByEmail();
  // const postForgotPasswordRequestBySMS = usePostForgotPasswordSMSRequestBySMS();

  const onSendEmailConfirmation = async () => {
    try {
      setEmailLoading(true);
      await postForgotPasswordRequestByEmail({
        email: props.email,
        custom_url: `${window.location.origin}/forgot_password`
      });
      router.push(`/reset-verify/email/${props.email}`);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setEmailLoading(false);
    }
  };

  // const onSendSMSConfirmation = async () => {
  //   try {
  //     setSMSLoading(true);
  //     await postForgotPasswordRequestBySMS();
  //     router.push(`/reset-verify/sms/${props.email}`);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error('Something went wrong. Please try again later.');
  //   } finally {
  //     setSMSLoading(false);
  //   }
  // };

  const getBackUrl = () => {
    return `/${getSearchParamQuery()}`;
  };

  return (
    <>
      <Background />
      <div className="flex w-[100vw] flex-col items-center self-start pt-[104px] sm:pt-[60px]">
        <div className="box-border flex w-[440px] flex-col items-center rounded-[12px] bg-white px-10 pb-12 pt-8 sm:h-full sm:w-full sm:max-w-[420px] sm:px-4 sm:pb-4">
          <div className="flex justify-center gap-6">
            <img src="/icons/icon-shield.svg" width={64} height={64} />
          </div>
          <div className="mt-6 text-[30px] font-semibold leading-9 sm:text-[24px]">
            {/* Email or text message */}
            Email Message
          </div>
          <div className="mt-3 text-md font-normal text-gray-500 sm:mt-2">
            {/* Choose to verify your account via text message or email */}
            Click below to reset your password via email verification
          </div>
          <div className="mb-8 mt-5 w-full">
            <Button
              prefixIcon={
                isEmailLoading ? (
                  <Spinner />
                ) : (
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    width={20}
                    height={20}
                    className="pt-1"
                  />
                )
              }
              size="md"
              variant="secondary"
              className="btn-simple w-full"
              onClick={onSendEmailConfirmation}
              disabled={isEmailLoading /* || isSMSLoading */}
            >
              Reset via email
            </Button>
            {/* <div className="my-3 text-md font-normal text-gray-500">
              <HorizontalBar>OR</HorizontalBar>
            </div>
            <Button
              prefixIcon={
                isSMSLoading ? (
                  <Spinner />
                ) : (
                  <FontAwesomeIcon
                    icon={faPhone}
                    width={20}
                    height={20}
                    className="pt-1"
                  />
                )
              }
              size="md"
              variant="secondary"
              className="btn-simple w-full"
              onClick={onSendSMSConfirmation}
              disabled={isEmailLoading || isSMSLoading}
            >
              Verify via text message
            </Button> */}
          </div>
          <Link href={getBackUrl()} className="link-none">
            <Button variant="primary" className="btn-submit">
              Back to Log In
            </Button>
          </Link>
          <div className="mt-5">
            <TermsAndPolicy simple />
          </div>
        </div>
      </div>
    </>
  );
}
