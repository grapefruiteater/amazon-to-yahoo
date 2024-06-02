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
  Chip,
  Select,
  SelectChangeEvent,
  FormControl,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
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
  //const [UsersLimitList, setUsersLimitList] = React.useState<any>([{id: 'aaa', value: '100'},{id: 'bbb', value: '200'}])
  const [UsersLimitList, setUsersLimitList] = React.useState<any>([''])
  const [TitleList, setTitleList] = React.useState<any>([''])
  const [ASINList, setASINList] = React.useState<any>([''])
  const [BrandList, setBrandList] = React.useState<any>([''])
  const [DescriptionList, setDescriptionList] = React.useState<any>([''])
  const [CategoryList, setCategoryList] = React.useState<any>([''])
  const [SellerIDList, setSellerIDList] = React.useState<any>([''])
  const [useremail, setUsername] = React.useState('');

  const TitleStr = TitleList.join('\n');
  const ASINStr = ASINList.join('\n');
  const BrandStr = BrandList.join('\n');
  const DescriptionStr = DescriptionList.join('\n');
  const CategoryStr = CategoryList.join('\n');
  const SellerIDStr = SellerIDList.join('\n');

  let ParameterList = [
    UsersLimitList,
    TitleList,
    ASINList,
    BrandList,
    DescriptionList,
    CategoryList,
    SellerIDList,
  ]
  console.log(UsersLimitList)
  
  const handleInputChange = (index: any, list: any, setList: any, event: any) => {
    const newList = [...list];
    newList[index] = {id: newList[index].id, value: event.target.value, username: newList[index].username, description: newList[index].description, check1: newList[index].check1, check2: newList[index].check2, check3: newList[index].check3, check4: newList[index].check4, check5: newList[index].check5, check6: newList[index].check6}
    setList(newList);
  };

  const handleDescriptionChange = (index: any, list: any, setList: any, event: any) => {
    const newList = [...list];
    newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: event.target.value, check1: newList[index].check1, check2: newList[index].check2, check3: newList[index].check3, check4: newList[index].check4, check5: newList[index].check5, check6: newList[index].check6}
    setList(newList);
  };

  const handleFillteringChange = (index: any, list: any, setList: any, event: any, idx: any) => {
    const newList = [...list];
    if (idx === 1) {
      newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: newList[index].description, check1: event.target.checked ? 'on' : 'off', check2: newList[index].check2, check3: newList[index].check3, check4: newList[index].check4, check5: newList[index].check5, check6: newList[index].check6}
    } else if (idx === 2) {
      newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: newList[index].description, check1: newList[index].check1, check2: event.target.checked ? 'on' : 'off', check3: newList[index].check3, check4: newList[index].check4, check5: newList[index].check5, check6: newList[index].check6}
    } else if (idx === 3) {
      newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: newList[index].description, check1: newList[index].check1, check2: newList[index].check2, check3: event.target.checked ? 'on' : 'off', check4: newList[index].check4, check5: newList[index].check5, check6: newList[index].check6}
    } else if (idx === 4) {
      newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: newList[index].description, check1: newList[index].check1, check2: newList[index].check2, check3: newList[index].check3, check4: event.target.checked ? 'on' : 'off', check5: newList[index].check5, check6: newList[index].check6}
    } else if (idx === 5) {
      newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: newList[index].description, check1: newList[index].check1, check2: newList[index].check2, check3: newList[index].check3, check4: newList[index].check4, check5: event.target.checked ? 'on' : 'off', check6: newList[index].check6}
    } else if (idx === 6) {
      newList[index] = {id: newList[index].id, value: newList[index].value, username: newList[index].username, description: newList[index].description, check1: newList[index].check1, check2: newList[index].check2, check3: newList[index].check3, check4: newList[index].check4, check5: newList[index].check5, check6: event.target.checked ? 'on' : 'off'}
    }
    setList(newList);
  };

  React.useEffect(() => {
    initialTask()
  }, [])

  const initialTask = async () => {
    await handleSubmission('get')
  }

  const handleSubmission = async (key: string) => {
    const users = await Auth.currentAuthenticatedUser()
    setUsername(users.attributes.email)
    const body = { data: ParameterList }

    try {
      const response = await axios.post(
        'https://eqlamae31i.execute-api.ap-northeast-1.amazonaws.com/default/Setting-Admin',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
      setUsersLimitList(response.data[0])
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

  if (UsersLimitList.length == 1) {
    return (
    <PageContainer title="管理者設定" description="管理者設定">
      <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
          <CircularProgress size={100}/>
      </Box>
    </PageContainer>
    )
  } else if (useremail !== 'keita.220.284@gmail.com' && useremail !== 'y.ryota0819@gmail.com') {
    return (
      <PageContainer title="管理者設定" description="管理者設定">
        <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
            管理者しか表示できません。
        </Box>
      </PageContainer>
      )
  }

  return (
    <PageContainer title="管理者設定" description="管理者設定">
      <DashboardCard title="管理者設定">
        <div>
          <BlankCard>
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>ユーザー毎の管理商品上限設定</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} md={3.5}>
                  <Typography sx={{ m: 1 }}>ユーザー名</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Typography sx={{ m: 1 }}>管理商品上限(件数)</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Typography sx={{ m: 1 }}>メモ</Typography>
                </Grid>
              </Grid>

              <p></p>

              {UsersLimitList.map((item: any, index: any) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                  <Grid item xs={2} md={3.5}>
                    <Typography>{item.id}</Typography>
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={item.value} onChange={(event) => handleInputChange(index, UsersLimitList, setUsersLimitList, event)} />
                  </Grid>
                  <Grid item xs={2} md={2}>
                    <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1, width: 500 }} value={item.description} onChange={(event) => handleDescriptionChange(index, UsersLimitList, setUsersLimitList, event)} />
                  </Grid>
                </Grid>
              ))}

              <Button
                variant="outlined"
                size="medium"
                startIcon={<IconUpload />}
                style={{ float: 'right' }}
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                onClick={() => {
                  handleSubmission('save');
                }}
              >
                Save
              </Button>
            </CardContent>
          </BlankCard>

          <p></p>

          <BlankCard>
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>固定除外設定</Typography>
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
          
          <p></p>

          <BlankCard>
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>ユーザー毎の使用サーバーの選択</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} md={3.5}>
                  <Typography sx={{ m: 1 }}>ユーザー名</Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography sx={{ m: 1 }}>Server1</Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography sx={{ m: 1 }}>Server2</Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography sx={{ m: 1 }}>Server3</Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography sx={{ m: 1 }}>Server4</Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography sx={{ m: 1 }}>Server5</Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                  <Typography sx={{ m: 1 }}>Server6</Typography>
                </Grid>
              </Grid>

              <p></p>

              {UsersLimitList.map((item: any, index: any) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                  <Grid item xs={2} md={3.5}>
                    <Typography>{item.id}</Typography>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Checkbox checked={item.check1 === 'on'} onChange={(event) => handleFillteringChange(index, UsersLimitList, setUsersLimitList, event, 1)} inputProps={{ 'aria-label': 'controlled' }}/>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Checkbox checked={item.check2 === 'on'} onChange={(event) => handleFillteringChange(index, UsersLimitList, setUsersLimitList, event, 2)} inputProps={{ 'aria-label': 'controlled' }}/>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Checkbox checked={item.check3 === 'on'} onChange={(event) => handleFillteringChange(index, UsersLimitList, setUsersLimitList, event, 3)} inputProps={{ 'aria-label': 'controlled' }}/>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Checkbox checked={item.check4 === 'on'} onChange={(event) => handleFillteringChange(index, UsersLimitList, setUsersLimitList, event, 4)} inputProps={{ 'aria-label': 'controlled' }}/>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Checkbox checked={item.check5 === 'on'} onChange={(event) => handleFillteringChange(index, UsersLimitList, setUsersLimitList, event, 5)} inputProps={{ 'aria-label': 'controlled' }}/>
                  </Grid>
                  <Grid item xs={1} md={1}>
                    <Checkbox checked={item.check6 === 'on'} onChange={(event) => handleFillteringChange(index, UsersLimitList, setUsersLimitList, event, 6)} inputProps={{ 'aria-label': 'controlled' }}/>
                  </Grid>
                </Grid>
              ))}

              <Button
                variant="outlined"
                size="medium"
                startIcon={<IconUpload />}
                style={{ float: 'right' }}
                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                onClick={() => {
                  handleSubmission('save');
                }}
              >
                Save
              </Button>
            </CardContent>
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