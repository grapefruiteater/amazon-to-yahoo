import type { ReactElement, ReactNode, Component } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import { baselightTheme } from "../src/theme/DefaultColors";
import { Amplify, API, Auth, Hub } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import {
  withAuthenticator,
  Authenticator,
  Theme,
  useTheme,
  View,
  Text,
  Image,
  Heading,
} from '@aws-amplify/ui-react'

Amplify.configure({
  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_SZdTQdPop',
    userPoolWebClientId: '92vu8n5h5n71750ooqolc1ngh',
    identityPoolId: 'ap-northeast-1:baf34f71-f82c-42fb-9f52-e06ef1bcabb0',
    oauth: {
      domain: 'login-certification.auth.ap-northeast-1.amazoncognito.com',
      scope: ['openid'],
      redirectSignIn: 'https://non-stock-sales-1993.com/',
      redirectSignOut: 'https://non-stock-sales-1993.com/',
      responseType: 'code',
    },
  },
})

const AuthenticatorFormFields = {
  signIn: {
    username: {
      label: 'メールアドレス *',
      labelHidden: false,
      placeholder: 'メールアドレスを入力',
      isRequired: true,
    },
    password: {
      label: 'パスワード *',
      labelHidden: false,
      placeholder: 'パスワードを入力',
      isRequired: true,
    },
  },
  signUp: {
    username: {
      label: 'メールアドレス *',
      labelHidden: false,
      placeholder: 'メールアドレスを入力',
      isRequired: true,
    },
    password: {
      label: 'パスワード *',
      labelHidden: false,
      placeholder: 'パスワードを入力',
      isRequired: true,
    },
    confirm_password: {
      label: '確認用パスワード *',
      labelHidden: false,
      placeholder: '確認のためパスワードを入力',
      isRequired: false,
    },
  },
  resetPassword: {
    username: {
      label: 'メールアドレス',
      labelHidden: false,
      placeholder: 'メールアドレスを入力',
      isRequired: true,
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      label: 'コード',
      labelHidden: false,
      placeholder: '確認コードを入力してください',
      isRequired: false,
    },
    password: {
      label: '新しいパスワード',
      labelHidden: false,
      placeholder: '新しいパスワードを入力してください',
      isRequired: false,
    },
    confirm_password: {
      label: 'パスワードを認証する',
      labelHidden: false,
      placeholder: '新しいパスワードをもう一度入力してください',
      isRequired: false,
    },
  },
  forceNewPassword: {
    password: {
      label: '新しいパスワード',
      labelHidden: false,
      placeholder: '新しいパスワードを入力してください',
      isRequired: false,
    },
    confirm_password: {
      label: 'パスワードを認証する',
      labelHidden: false,
      placeholder: '新しいパスワードをもう一度入力してください',
      isRequired: false,
    },
  },
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  signOut: () => void;
  user: string;
}

const MyApp = (props: MyAppProps,) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const theme = baselightTheme;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Authenticator formFields={AuthenticatorFormFields} hideSignUp={true}>{/* hideSignUp={true}*/}
      {({ signOut, user }) => (
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <title>Amazon-Yahoo 無在庫販売管理システム</title>
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
    )}
    </Authenticator>
  );
};

export default MyApp;