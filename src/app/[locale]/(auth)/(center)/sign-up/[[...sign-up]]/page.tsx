import { getI18nPath } from '@/utils/Helpers';
import { SignUp } from '@clerk/nextjs';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export function generateStaticParams() {
  return [
    { 'locale': 'en', 'sign-up': [] },
    { 'locale': 'en', 'sign-up': ['sign-up'] },
    { 'locale': 'en', 'sign-up': ['sso'] },
    { 'locale': 'en', 'sign-up': ['continue'] },
    { 'locale': 'en', 'sign-up': ['verify'] },
    { 'locale': 'en', 'sign-up': ['verify-email'] },
    { 'locale': 'en', 'sign-up': ['verify-phone'] },
  ];
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <SignUp path={getI18nPath('/sign-up', locale)} />
  );
};
