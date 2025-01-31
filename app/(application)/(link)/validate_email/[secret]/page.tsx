import ErrorInvalidLinkForm from '@lib/components/PageForms/error/ErrorInvalidLinkForm';
import SuccessEmailValidateForm from '@lib/components/PageForms/success/SuccessEmailValidateForm';
import { validateEmailSecret } from '@lib/server/api';

interface IPageProps {
  params: {
    secret: string;
  };
}

export default async function ValidateEmailPage({ params }: IPageProps) {
  const secret = decodeURIComponent(params.secret);
  const user = await validateEmailSecret(secret);
  return user ? (
    <SuccessEmailValidateForm user={user as any} />
  ) : (
    <ErrorInvalidLinkForm />
  );
}
