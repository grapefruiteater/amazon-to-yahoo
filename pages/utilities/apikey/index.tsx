import type { ReactElement } from 'react';
import React from 'react';
import axios from 'axios'
import { Auth } from 'aws-amplify'
import { Grid, CardContent, TextField, InputLabel, Button, Typography } from '@mui/material';

import {
  IconUpload,
} from '@tabler/icons-react';

import FullLayout from '../../../src/layouts/full/FullLayout';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import BlankCard from '../../../src/components/shared/BlankCard';

const ApiKeyPage = () => {
  const [responseData, setResponseData] = React.useState('')
  const [AWSAccesskey, setAWSAccesskey] = React.useState('')
  const [AWSSecretKey, setAWSSecretKey] = React.useState('')
  const [AWSIAMARN, setAWSIAMARN] = React.useState('')
  const [ClientID, setClientID] = React.useState('')
  const [ClientSecret, setClientSecret] = React.useState('')
  const [RefreshToken, setRefreshToken] = React.useState('')
  const [YahooClientID, setYahooClientID] = React.useState('')
  const [YahooSecretKey, setYahooSecretKey] = React.useState('')
  const [YahooSellerID, setYahooSellerID] = React.useState('')
  const [YahooAuthCode, setYahooAuthCode] = React.useState('')
  const [YahooAccesskey, setYahooAccesskey] = React.useState('')
  const [YahooRefreshToken, setYahooRefreshToken] = React.useState('')
  const [AWSAccesskey2, setAWSAccesskey2] = React.useState('')
  const [AWSSecretKey2, setAWSSecretKey2] = React.useState('')
  const [AWSIAMARN2, setAWSIAMARN2] = React.useState('')
  const [ClientID2, setClientID2] = React.useState('')
  const [ClientSecret2, setClientSecret2] = React.useState('')
  const [RefreshToken2, setRefreshToken2] = React.useState('')
  const [AWSAccesskey3, setAWSAccesskey3] = React.useState('')
  const [AWSSecretKey3, setAWSSecretKey3] = React.useState('')
  const [AWSIAMARN3, setAWSIAMARN3] = React.useState('')
  const [ClientID3, setClientID3] = React.useState('')
  const [ClientSecret3, setClientSecret3] = React.useState('')
  const [RefreshToken3, setRefreshToken3] = React.useState('')
  const [AWSAccesskey4, setAWSAccesskey4] = React.useState('')
  const [AWSSecretKey4, setAWSSecretKey4] = React.useState('')
  const [AWSIAMARN4, setAWSIAMARN4] = React.useState('')
  const [ClientID4, setClientID4] = React.useState('')
  const [ClientSecret4, setClientSecret4] = React.useState('')
  const [RefreshToken4, setRefreshToken4] = React.useState('')
  const [id, setId] = React.useState<string>('');
  const [APIUpdateDate, setAPIUpdateDate] = React.useState('')

  const [AutoAWSAccesskey, setAutoAWSAccesskey] = React.useState('')
  const [AutoAWSSecretKey, setAutoAWSSecretKey] = React.useState('')
  const [AutoAWSIAMARN, setAutoAWSIAMARN] = React.useState('')
  const [AutoClientID, setAutoClientID] = React.useState('')
  const [AutoClientSecret, setAutoClientSecret] = React.useState('')
  const [AutoRefreshToken, setAutoRefreshToken] = React.useState('')
  const [AutoAWSAccesskey2, setAutoAWSAccesskey2] = React.useState('')
  const [AutoAWSSecretKey2, setAutoAWSSecretKey2] = React.useState('')
  const [AutoAWSIAMARN2, setAutoAWSIAMARN2] = React.useState('')
  const [AutoClientID2, setAutoClientID2] = React.useState('')
  const [AutoClientSecret2, setAutoClientSecret2] = React.useState('')
  const [AutoRefreshToken2, setAutoRefreshToken2] = React.useState('')
  const [AutoAWSAccesskey3, setAutoAWSAccesskey3] = React.useState('')
  const [AutoAWSSecretKey3, setAutoAWSSecretKey3] = React.useState('')
  const [AutoAWSIAMARN3, setAutoAWSIAMARN3] = React.useState('')
  const [AutoClientID3, setAutoClientID3] = React.useState('')
  const [AutoClientSecret3, setAutoClientSecret3] = React.useState('')
  const [AutoRefreshToken3, setAutoRefreshToken3] = React.useState('')
  const [AutoAWSAccesskey4, setAutoAWSAccesskey4] = React.useState('')
  const [AutoAWSSecretKey4, setAutoAWSSecretKey4] = React.useState('')
  const [AutoAWSIAMARN4, setAutoAWSIAMARN4] = React.useState('')
  const [AutoClientID4, setAutoClientID4] = React.useState('')
  const [AutoClientSecret4, setAutoClientSecret4] = React.useState('')
  const [AutoRefreshToken4, setAutoRefreshToken4] = React.useState('')

  const [KeepaAPI, setKeepaAPI] = React.useState('')

  let APIKeyList = [
    AWSAccesskey,
    AWSSecretKey,
    AWSIAMARN,
    ClientID,
    ClientSecret,
    RefreshToken,
    YahooClientID,
    YahooSecretKey,
    YahooSellerID,
    YahooAuthCode,
    YahooAccesskey,
    YahooRefreshToken,
    AWSAccesskey2,
    AWSSecretKey2,
    AWSIAMARN2,
    ClientID2,
    ClientSecret2,
    RefreshToken2,
    AWSAccesskey3,
    AWSSecretKey3,
    AWSIAMARN3,
    ClientID3,
    ClientSecret3,
    RefreshToken3,
    AWSAccesskey4,
    AWSSecretKey4,
    AWSIAMARN4,
    ClientID4,
    ClientSecret4,
    RefreshToken4,
    APIUpdateDate,
    AutoAWSAccesskey,
    AutoAWSSecretKey,
    AutoAWSIAMARN,
    AutoClientID,
    AutoClientSecret,
    AutoRefreshToken,
    AutoAWSAccesskey2,
    AutoAWSSecretKey2,
    AutoAWSIAMARN2,
    AutoClientID2,
    AutoClientSecret2,
    AutoRefreshToken2,
    AutoAWSAccesskey3,
    AutoAWSSecretKey3,
    AutoAWSIAMARN3,
    AutoClientID3,
    AutoClientSecret3,
    AutoRefreshToken3,
    AutoAWSAccesskey4,
    AutoAWSSecretKey4,
    AutoAWSIAMARN4,
    AutoClientID4,
    AutoClientSecret4,
    AutoRefreshToken4,
    KeepaAPI,
  ]

  const initialTask = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramId = urlParams.get('code');
    setId(paramId || '');
    await handleSubmission('get', APIKeyList)
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  const handleSubmission = async (key: string, event: any) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    const body = { username: username, data: event, key: key }

    try {
      const response = await axios.post(
        'https://lmzq2quaj3.execute-api.ap-northeast-1.amazonaws.com/default/Setting-APIKey',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
      setResponseData(response.data)
      setAWSAccesskey(response.data[0])
      setAWSSecretKey(response.data[1])
      setAWSIAMARN(response.data[2])
      setClientID(response.data[3])
      setClientSecret(response.data[4])
      setRefreshToken(response.data[5])
      setYahooClientID(response.data[6])
      setYahooSecretKey(response.data[7])
      setYahooSellerID(response.data[8])
      setYahooAuthCode(response.data[9])
      setYahooAccesskey(response.data[10])
      setYahooRefreshToken(response.data[11])
      setAWSAccesskey2(response.data[12])
      setAWSSecretKey2(response.data[13])
      setAWSIAMARN2(response.data[14])
      setClientID2(response.data[15])
      setClientSecret2(response.data[16])
      setRefreshToken2(response.data[17])
      setAWSAccesskey3(response.data[18])
      setAWSSecretKey3(response.data[19])
      setAWSIAMARN3(response.data[20])
      setClientID3(response.data[21])
      setClientSecret3(response.data[22])
      setRefreshToken3(response.data[23])
      setAWSAccesskey4(response.data[24])
      setAWSSecretKey4(response.data[25])
      setAWSIAMARN4(response.data[26])
      setClientID4(response.data[27])
      setClientSecret4(response.data[28])
      setRefreshToken4(response.data[29])
      setAPIUpdateDate(response.data[30])
      setAutoAWSAccesskey(response.data[31])
      setAutoAWSSecretKey(response.data[32])
      setAutoAWSIAMARN(response.data[33])
      setAutoClientID(response.data[34])
      setAutoClientSecret(response.data[35])
      setAutoRefreshToken(response.data[36])
      setAutoAWSAccesskey2(response.data[37])
      setAutoAWSSecretKey2(response.data[38])
      setAutoAWSIAMARN2(response.data[39])
      setAutoClientID2(response.data[40])
      setAutoClientSecret2(response.data[41])
      setAutoRefreshToken2(response.data[42])
      setAutoAWSAccesskey3(response.data[43])
      setAutoAWSSecretKey3(response.data[44])
      setAutoAWSIAMARN3(response.data[45])
      setAutoClientID3(response.data[46])
      setAutoClientSecret3(response.data[47])
      setAutoRefreshToken3(response.data[48])
      setAutoAWSAccesskey4(response.data[49])
      setAutoAWSSecretKey4(response.data[50])
      setAutoAWSIAMARN4(response.data[51])
      setAutoClientID4(response.data[52])
      setAutoClientSecret4(response.data[53])
      setAutoRefreshToken4(response.data[54])
      setKeepaAPI(response.data[55])
      if (key === 'delete' || key === 'add' || key === 'save') {
        alert('正常に保存できました！');
      }
    } catch (err) {
      console.error(err);
    }
  }

  const authenticationURL = `https://auth.login.yahoo.co.jp/yconnect/v2/authorization?response_type=code&client_id=${YahooClientID}&redirect_uri=https://www.yahoo.co.jp/&scope=openid`

  return (
    <PageContainer title="APIキー設定" description="APIキー設定">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="新規出品(マニュアル)用APIキー設定">
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ textAlign: 'right' }}>
                <TextField type="date" id="outlined-basic" label="更新日(ユーザー入力)" variant="outlined" value={APIUpdateDate} onChange={(event) => setAPIUpdateDate(event.target.value)} style={{ width: '180px' }} />
              </Grid>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ①</Typography>
                    {/*<InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AWSAccesskey} onChange={(event) => setAWSAccesskey(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AWSSecretKey} onChange={(event) => setAWSSecretKey(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AWSIAMARN} onChange={(event) => setAWSIAMARN(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={ClientID} onChange={(event) => setClientID(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={ClientSecret} onChange={(event) => setClientSecret(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={RefreshToken} onChange={(event) => setRefreshToken(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ②</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AWSAccesskey2} onChange={(event) => setAWSAccesskey2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AWSSecretKey2} onChange={(event) => setAWSSecretKey2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AWSIAMARN2} onChange={(event) => setAWSIAMARN2(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={ClientID2} onChange={(event) => setClientID2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={ClientSecret2} onChange={(event) => setClientSecret2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={RefreshToken2} onChange={(event) => setRefreshToken2(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ③</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AWSAccesskey3} onChange={(event) => setAWSAccesskey3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AWSSecretKey3} onChange={(event) => setAWSSecretKey3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AWSIAMARN3} onChange={(event) => setAWSIAMARN3(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={ClientID3} onChange={(event) => setClientID3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={ClientSecret3} onChange={(event) => setClientSecret3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={RefreshToken3} onChange={(event) => setRefreshToken3(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ④</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AWSAccesskey4} onChange={(event) => setAWSAccesskey4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AWSSecretKey4} onChange={(event) => setAWSSecretKey4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AWSIAMARN4} onChange={(event) => setAWSIAMARN4(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={ClientID4} onChange={(event) => setClientID4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={ClientSecret4} onChange={(event) => setClientSecret4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={RefreshToken4} onChange={(event) => setRefreshToken4(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
        <Grid item sm={12}>
          <DashboardCard title="Yahoo API Key設定">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <InputLabel htmlFor="component-simple">Yahoo クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={YahooClientID} onChange={(event) => setYahooClientID(event.target.value)} />
                    <InputLabel htmlFor="component-simple">Yahoo シークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Secret Key" variant="outlined" margin="normal" value={YahooSecretKey} onChange={(event) => setYahooSecretKey(event.target.value)} />
                    <InputLabel htmlFor="component-simple">Yahoo ストアアカウント</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Seller ID" variant="outlined" margin="normal" value={YahooSellerID} onChange={(event) => setYahooSellerID(event.target.value)} />
                    <InputLabel htmlFor="component-simple">Yahoo 認可code</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Auth Code" variant="outlined" margin="normal" value={YahooAuthCode} onChange={(event) => setYahooAuthCode(event.target.value)} />
                    <InputLabel htmlFor="component-simple">Yahoo アクセストークン</InputLabel>
                    <TextField error={YahooRefreshToken === ""} fullWidth id="outlined-basic" label="保存ボタンを押すと、自動的に入力されます。" variant="outlined" margin="normal" value={YahooAccesskey} onChange={(event) => setYahooAccesskey(event.target.value)} disabled />
                    <InputLabel htmlFor="component-simple">Yahoo リフレッシュトークン</InputLabel>
                    <TextField error={YahooRefreshToken === ""} fullWidth id="outlined-basic" label="保存ボタンを押すと、自動的に入力されます。" variant="outlined" margin="normal" value={YahooRefreshToken} onChange={(event) => setYahooRefreshToken(event.target.value)} disabled />
                    ※Yahoo アクセストークンとYahoo リフレッシュトークンが入力されていないと、在庫情報の取得や出品ができません。
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                      href={authenticationURL}
                      target="_blank" 
                    >
                      Yahoo認証キー取得
                    </Button>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>

        <p></p>

        <Grid item sm={12}>
          <DashboardCard title="自動価格改定用APIキー設定">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ①</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AutoAWSAccesskey} onChange={(event) => setAutoAWSAccesskey(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AutoAWSSecretKey} onChange={(event) => setAutoAWSSecretKey(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AutoAWSIAMARN} onChange={(event) => setAutoAWSIAMARN(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={AutoClientID} onChange={(event) => setAutoClientID(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={AutoClientSecret} onChange={(event) => setAutoClientSecret(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={AutoRefreshToken} onChange={(event) => setAutoRefreshToken(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ②</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AutoAWSAccesskey2} onChange={(event) => setAutoAWSAccesskey2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AutoAWSSecretKey2} onChange={(event) => setAutoAWSSecretKey2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AutoAWSIAMARN2} onChange={(event) => setAutoAWSIAMARN2(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={AutoClientID2} onChange={(event) => setAutoClientID2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={AutoClientSecret2} onChange={(event) => setAutoClientSecret2(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={AutoRefreshToken2} onChange={(event) => setAutoRefreshToken2(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ③</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AutoAWSAccesskey3} onChange={(event) => setAutoAWSAccesskey3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AutoAWSSecretKey3} onChange={(event) => setAutoAWSSecretKey3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AutoAWSIAMARN3} onChange={(event) => setAutoAWSIAMARN3(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={AutoClientID3} onChange={(event) => setAutoClientID3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={AutoClientSecret3} onChange={(event) => setAutoClientSecret3(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={AutoRefreshToken3} onChange={(event) => setAutoRefreshToken3(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>SP-API Key設定 ④</Typography>
                    {/*
                    <InputLabel htmlFor="component-simple">AWSアクセスキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Access key" variant="outlined" margin="normal" value={AutoAWSAccesskey4} onChange={(event) => setAutoAWSAccesskey4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWSシークレットキー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS Secret Key" variant="outlined" margin="normal" value={AutoAWSSecretKey4} onChange={(event) => setAutoAWSSecretKey4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">AWS IAM ARN</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="AWS IAM ARN" variant="outlined" margin="normal" value={AutoAWSIAMARN4} onChange={(event) => setAutoAWSIAMARN4(event.target.value)} />
                    */}
                    <InputLabel htmlFor="component-simple">SP-API クライアントID</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client ID" variant="outlined" margin="normal" value={AutoClientID4} onChange={(event) => setAutoClientID4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API クライアント機密情報</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Client Secret" variant="outlined" margin="normal" value={AutoClientSecret4} onChange={(event) => setAutoClientSecret4(event.target.value)} />
                    <InputLabel htmlFor="component-simple">SP-API リフレッシュトークン</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="Refresh Token" variant="outlined" margin="normal" value={AutoRefreshToken4} onChange={(event) => setAutoRefreshToken4(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>

                <p></p>

                <BlankCard>
                  <CardContent>
                    <Typography variant="h5" sx={{marginBottom: 3}}>Keepa Key設定</Typography>
                    <InputLabel htmlFor="component-simple">Keepa API キー</InputLabel>
                    <TextField required fullWidth id="outlined-basic" label="KeepaAPI" variant="outlined" margin="normal" value={KeepaAPI} onChange={(event) => setKeepaAPI(event.target.value)} />
                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSubmission('save', APIKeyList);
                      }}
                    >
                      Save
                    </Button>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>

      </Grid >
    </PageContainer>
  );
};

export default ApiKeyPage;
ApiKeyPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};