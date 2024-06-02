import type { ReactElement } from 'react';
import React from 'react';
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  Box,  
  Grid,
  CardContent,
  TextField,
  InputLabel,
  Button,
  Typography,
  Select,
  SelectChangeEvent,
  MenuItem,
  FormControl,
  Checkbox,
  CircularProgress,
} from '@mui/material';
import {
  IconUpload,
} from '@tabler/icons-react';

import FullLayout from '../../../src/layouts/full/FullLayout';

import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import BlankCard from '../../../src/components/shared/BlankCard';


const TypographyPage = () => {
  const [responseData, setResponseData] = React.useState('')
  const [whiteList, setwhiteList] = React.useState<any>([''])
  const [TitleList, setTitleList] = React.useState<any>([''])
  const [ASINList, setASINList] = React.useState<any>([''])
  const [BrandList, setBrandList] = React.useState<any>([''])
  const [DescriptionList, setDescriptionList] = React.useState<any>([''])
  const [CategoryList, setCategoryList] = React.useState<any>([''])
  const [SellerIDList, setSellerIDList] = React.useState<any>([''])

  const whiteStr = whiteList.join('\n');
  const TitleStr = TitleList.join('\n');
  const ASINStr = ASINList.join('\n');
  const BrandStr = BrandList.join('\n');
  const DescriptionStr = DescriptionList.join('\n');
  const CategoryStr = CategoryList.join('\n');
  const SellerIDStr = SellerIDList.join('\n');
  
  let FilteringParameterList = [
    whiteList,
    TitleList,
    ASINList,
    BrandList,
    DescriptionList,
    CategoryList,
    SellerIDList,
  ]
  //console.log(FilteringParameterList)

  const initialTask = async () => {
    await handleSubmission('get')
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  const handleSubmission = async (key: string) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    const body = { username: username, data: FilteringParameterList, key: key }

    try {
      const response = await axios.post(
        'https://40ppy5gvj0.execute-api.ap-northeast-1.amazonaws.com/default/Setting-Filtering',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
      setResponseData(response.data)
      setwhiteList(response.data[0])
      setTitleList(response.data[1])
      setASINList(response.data[2])
      setBrandList(response.data[3])
      setDescriptionList(response.data[4])
      setCategoryList(response.data[5])
      setSellerIDList(response.data[6])
      if (key !== 'get') {
        alert('正常に保存できました！');
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (whiteList.length == 0) {
    return (
    <PageContainer title="除外設定" description="除外設定">
      <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
          <CircularProgress size={100}/>
      </Box>
    </PageContainer>
    )
  }

  return (
    <PageContainer title="除外設定" description="除外設定">
      <DashboardCard title="除外設定">
        <div>
          {/*<p>
            ・システムの初期除外設定:(内容非公開)
            <br />
            &ensp;&ensp;除外 : キーワード（2689件） 除外 : ASIN（110420件） 除外 : ブランド（3501件） 除外 : カテゴリ（26件）
            <br /><br />
            ・ヤフー初期除外設定:
            <br />
            &ensp;&ensp;除外 : ブランド（310件）<a href="https://www.one-sell.net/Data/yahooNGlist/yahooNGList.txt">ヤフー初期除外ブランド</a>
            <br />
          </p>*/}
          <br />
          <BlankCard>
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>Amazon 商品除外設定</Typography>
                <TextField
                  label="ホワイトリスト(ASIN)"
                  multiline
                  rows={20}
                  sx={{ m: 1, width: 160 }}
                  value={whiteStr}
                  onChange={(event) => setwhiteList(event.target.value.split('\n'))} 
                />
                <TextField
                  label="商品名"
                  multiline
                  rows={20}
                  sx={{ m: 1, width: 160 }}
                  value={TitleStr}
                  onChange={(event) => setTitleList(event.target.value.split('\n'))} 
                />
                <TextField
                  label="ASIN"
                  multiline
                  rows={20}
                  sx={{ m: 1, width: 160 }}
                  value={ASINStr}
                  onChange={(event) => setASINList(event.target.value.split('\n'))} 
                />
                <TextField
                  label="ブランド"
                  multiline
                  rows={20}
                  sx={{ m: 1, width: 160 }}
                  value={BrandStr}
                  onChange={(event) => setBrandList(event.target.value.split('\n'))} 
                />
                <TextField
                  label="商品説明"
                  multiline
                  rows={20}
                  sx={{ m: 1, width: 160 }}
                  value={DescriptionStr}
                  onChange={(event) => setDescriptionList(event.target.value.split('\n'))} 
                />
                <TextField
                  label="カテゴリ"
                  multiline
                  rows={20}
                  sx={{ m: 1, width: 160 }}
                  value={CategoryStr}
                  onChange={(event) => setCategoryList(event.target.value.split('\n'))} 
                />
            </CardContent>
            <CardContent sx={{marginBottom: 3}}>
              <TextField
                label="セラーID"
                multiline
                rows={20}
                sx={{ m: 1, width: 160 }}
                value={SellerIDStr}
                onChange={(event) => setSellerIDList(event.target.value.split('\n'))} 
              />
            </CardContent>
            <Button
              variant="outlined"
              size="medium"
              startIcon={<IconUpload />}
              style={{ float: 'right' }}
              sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '2rem' }}
              onClick={() => {
                handleSubmission('save');
              }}
            >
              Save
            </Button>
          </BlankCard>
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default TypographyPage;
TypographyPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};