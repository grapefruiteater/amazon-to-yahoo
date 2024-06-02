import type { ReactElement } from 'react';
import React from 'react';
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
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
  Box,
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
  const [FullfillmentChannel, setFullfillmentChannel] = React.useState('')
  const [ShippingTime, setShippingTime] = React.useState('')
  const [SellerFeeback, setSellerFeeback] = React.useState('')
  const [highEvaluationRate, sethighEvaluationRate] = React.useState('')
  const [sellerDeletion, setsellerDeletion] = React.useState('')
  const [AsinRank, setAsinRank] = React.useState('')
  const [sellingPriceLowerLimit, setsellingPriceLowerLimit] = React.useState('')
  const [sellingPriceHigherLimit, setsellingPriceHigherLimit] = React.useState('')
  const [weightMax, setweightMax] = React.useState('')
  const [excludeIfsizeNot, setexcludeIfsizeNot] = React.useState('')
  const [side3LengthMax, setside3LengthMax] = React.useState('')
  const [longSideLengthMax, setlongSideLengthMax] = React.useState('')

  const [productCodeName, setproductCodeName] = React.useState('')
  const [stockQuantity, setstockQuantity] = React.useState('')
  const [productNameBefore, setproductNameBefore] = React.useState('')
  const [productNameAfter, setproductNameAfter] = React.useState('')
  const [productHeader, setproductHeader] = React.useState('')
  const [productFooter, setproductFooter] = React.useState('')

  const [deliveryManagement, setdeliveryManagement] = React.useState('')
  const [delivery, setdelivery] = React.useState('')
  const [deliveryManagementStockout, setdeliveryManagementStockout] = React.useState('')
  const [deliveryGroup, setdeliveryGroup] = React.useState('')
  const [StoreCategory, setStoreCategory] = React.useState('')
  const [Autolisting, setAutolisting] = React.useState('')

  const [additionalImage, setadditionalImage] = React.useState('')

  let ParameterList = [
    FullfillmentChannel,
    ShippingTime,
    SellerFeeback,
    highEvaluationRate,
    sellerDeletion,
    AsinRank,
    sellingPriceLowerLimit,
    sellingPriceHigherLimit,
    weightMax,
    excludeIfsizeNot,
    side3LengthMax,
    longSideLengthMax,
    productCodeName,
    stockQuantity,
    productNameBefore,
    productNameAfter,
    productHeader,
    productFooter,
    deliveryManagement,
    delivery,
    deliveryManagementStockout,
    deliveryGroup,
    StoreCategory,
    Autolisting,
    additionalImage,
  ]
  //console.log(ParameterList)

  const initialTask = async () => {
    await handleSubmission('get')
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  const handleSubmission = async (key: string) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    const body = { username: username, data: ParameterList, key: key }

    try {
      const response = await axios.post(
        'https://0u8pplzlyf.execute-api.ap-northeast-1.amazonaws.com/default/Setting-Exhibit',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
      setResponseData(response.data)
      setFullfillmentChannel(response.data[0])
      setShippingTime(response.data[1])
      setSellerFeeback(response.data[2])
      sethighEvaluationRate(response.data[3])
      setsellerDeletion(response.data[4])
      setAsinRank(response.data[5])
      setsellingPriceLowerLimit(response.data[6])
      setsellingPriceHigherLimit(response.data[7])
      setweightMax(response.data[8])
      setexcludeIfsizeNot(response.data[9])
      setside3LengthMax(response.data[10])
      setlongSideLengthMax(response.data[11])
      setproductCodeName(response.data[12])
      setstockQuantity(response.data[13])
      setproductNameBefore(response.data[14])
      setproductNameAfter(response.data[15])
      setproductHeader(response.data[16])
      setproductFooter(response.data[17])
      setdeliveryManagement(response.data[18])
      setdelivery(response.data[19])
      setdeliveryManagementStockout(response.data[20])
      setdeliveryGroup(response.data[21])
      setStoreCategory(response.data[22])
      setadditionalImage(response.data[24])
      if (key !== 'get') {
        alert('正常に保存できました！');
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (FullfillmentChannel.length == 0) {
    return (
    <PageContainer title="出品設定" description="出品設定">
      <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
          <CircularProgress size={100}/>
      </Box>
    </PageContainer>
    )
  }

  return (
    <PageContainer title="出品設定" description="出品設定">
      <DashboardCard title="出品設定">
        <div>
          <BlankCard>
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>(Amazon JP/US)価格 取得条件</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>FullfillmentChannel</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <FormControl sx={{ minWidth: 170 }} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={FullfillmentChannel}
                      sx={{ m: 1 }}
                      onChange={(event) => setFullfillmentChannel(event.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Merchant">Merchant</MenuItem>
                      <MenuItem value="FBA">FBA</MenuItem>
                      <MenuItem value="FBA優先">FBA優先</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>ShippingTime</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <FormControl sx={{ minWidth: 170 }} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={ShippingTime}
                      sx={{ m: 1 }}
                      onChange={(event) => setShippingTime(event.target.value)}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="2日以内">2日以内</MenuItem>
                      <MenuItem value="3-7日">3-7日</MenuItem>
                      <MenuItem value="13日以上">13日以上</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>Seller Feeback</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={SellerFeeback} onChange={(event) => setSellerFeeback(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>高評価率（%）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={highEvaluationRate} onChange={(event) => sethighEvaluationRate(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>出品者数（人）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" inputProps={{ min: 1}} size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={sellerDeletion} onChange={(event) => setsellerDeletion(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>ASINランキング （以内）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={AsinRank} onChange={(event) => setAsinRank(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>販売価格下限（円）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={sellingPriceLowerLimit} onChange={(event) => setsellingPriceLowerLimit(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>販売価格上限（円）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={sellingPriceHigherLimit} onChange={(event) => setsellingPriceHigherLimit(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>出品商品重量上限（g） </Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={weightMax} onChange={(event) => setweightMax(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>サイズ情報取得不可の場合除外する</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Checkbox checked={excludeIfsizeNot === 'on'} onChange={(event) => setexcludeIfsizeNot(event.target.checked ? 'on' : 'off')} inputProps={{ 'aria-label': 'controlled' }}/>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>出品商品3辺の長さ上限（cm）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={side3LengthMax} onChange={(event) => setside3LengthMax(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>出品商品長辺の長さ上限（cm）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={longSideLengthMax} onChange={(event) => setlongSideLengthMax(event.target.value)} />
                </Grid>
              </Grid>

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
            <CardContent>
              <Typography variant="h5" sx={{marginBottom: 3}}>出品設定(共通)</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>商品コード命名(半角英数字)</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={productCodeName} onChange={(event) => setproductCodeName(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>在庫数</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={stockQuantity} onChange={(event) => setstockQuantity(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>商品名の前につける文字</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={productNameBefore} onChange={(event) => setproductNameBefore(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>商品名の後ろにつける文字</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={productNameAfter} onChange={(event) => setproductNameAfter(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>商品ヘッダー部</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={productHeader} onChange={(event) => setproductHeader(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>商品フッター部  </Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={productFooter} onChange={(event) => setproductFooter(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>追加画像枚数</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" inputProps={{ min: 0}} size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={additionalImage} onChange={(event) => setadditionalImage(event.target.value)} />
                </Grid>
              </Grid>

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
            <CardContent>
              <Typography variant="h5" sx={{marginBottom: 3}}>出品設定(yahoo)</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>発送日情報管理番号</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={deliveryManagement} onChange={(event) => setdeliveryManagement(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>デリバリー</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                <FormControl sx={{ minWidth: 170 }} size="small">
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={delivery}
                      sx={{ m: 1 }}
                      onChange={(event) => setdelivery(event.target.value)}
                    >
                      <MenuItem value="なし">なし(送料がかかる場合)</MenuItem>
                      <MenuItem value="無料">無料</MenuItem>
                      <MenuItem value="条件付送料無料">条件付送料無料</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>発送日情報管理番号(在庫切れ時)</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={deliveryManagementStockout} onChange={(event) => setdeliveryManagementStockout(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>配送グループ(半角数字のみ)</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={deliveryGroup} onChange={(event) => setdeliveryGroup(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>ストアカテゴリ</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={StoreCategory} onChange={(event) => setStoreCategory(event.target.value)} />
                </Grid>
              </Grid>

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