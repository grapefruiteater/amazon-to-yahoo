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
  const [responseData, setResponseData] = React.useState('')
  const [feePercent, setfeePercent] = React.useState('')
  const [misExpense, setmisExpense] = React.useState('')
  const [shippingPrice, setshippingPrice] = React.useState('')
  const [lowestShippingFee, setlowestShippingFee] = React.useState('')

  const [amazonSellingPrice, setamazonSellingPrice] = React.useState<any>([''])
  const [profitRate, setprofitRate] = React.useState<any>([''])
  const [plusPrice, setplusPrice] = React.useState<any>([''])
  const [minusPrice, setminusPrice] = React.useState<any>([''])
  const [profitAmount, setprofitAmount] = React.useState<any>([''])
  
  var profitSetTable = amazonSellingPrice.map((item: any, index: any) => ({
    amazonSellingPrice: amazonSellingPrice[index],
    profitRate: profitRate[index],
    plusPrice: plusPrice[index],
    minusPrice: minusPrice[index],
    profitAmount: profitAmount[index],
  }))

  let ProfitParameterList = [
    feePercent,
    misExpense,
    shippingPrice,
    lowestShippingFee,
    amazonSellingPrice,
    profitRate,
    plusPrice,
    minusPrice,
    profitAmount,
  ]
  //console.log(ProfitParameterList)

  const handleInputChange = (index: any, list: any, setList: any, event: any) => {
    const newList = [...list];
    newList[index] = event.target.value;
    setList(newList);
  };

  const initialTask = async () => {
    await handleSubmission('get')
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  const handleSubmission = async (key: string) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    const body = { username: username, data: ProfitParameterList, key: key }

    try {
      const response = await axios.post(
        'https://ua2e3r30xh.execute-api.ap-northeast-1.amazonaws.com/default/Setting-Profit',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
      setResponseData(response.data)
      setfeePercent(response.data[0])
      setmisExpense(response.data[1])
      setshippingPrice(response.data[2])
      setlowestShippingFee(response.data[3])
      setamazonSellingPrice(response.data[4])
      setprofitRate(response.data[5])
      setplusPrice(response.data[6])
      setminusPrice(response.data[7])
      setprofitAmount(response.data[8])
      if (key !== 'get') {
        alert('正常に保存できました！');
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (amazonSellingPrice.length == 0) {
    return (
    <PageContainer title="利益計算設定" description="利益計算設定">
      <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
          <CircularProgress size={100}/>
      </Box>
    </PageContainer>
    )
  }

  return (
    <PageContainer title="利益計算設定" description="利益計算設定">
      <DashboardCard title="利益計算設定">
        <div>
          <BlankCard>
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>経費手数料</Typography>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>手数料(%)</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={feePercent} onChange={(event) => setfeePercent(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>諸経費(円)</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={misExpense} onChange={(event) => setmisExpense(event.target.value)} />
                </Grid>
              </Grid>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2} md={2.5}>
                  <Typography>送料単価（円(1KG)）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={shippingPrice} onChange={(event) => setshippingPrice(event.target.value)} />
                </Grid>
                <Grid item xs={2} md={2.5} sx={{ marginLeft: 10 }}>
                  <Typography>最低送料（円）</Typography>
                </Grid>
                <Grid item xs={2} md={2}>
                  <TextField type="number" size="small" id="outlined-basic" variant="outlined" margin="normal" sx={{ m: 1 }} value={lowestShippingFee} onChange={(event) => setlowestShippingFee(event.target.value)} />
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
            <CardContent sx={{marginBottom: 3}}>
              <Typography variant="h5" sx={{marginBottom: 3}}>利益率または利益額</Typography>
              ※利益率設定にする場合は利益額（円）に 1 を入れてください。

              <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <TableContainer sx={{border: '0px solid', borderColor: 'grey.500'}}>
                    <Table
                        aria-label="simple table"
                        sx={{
                            //tableLayout: 'auto',
                            //whiteSpace: 'wrap',
                            //overflow: 'auto',
                            //textOverflow: 'ellipsis',
                            mt: 0,
                            border: '0px solid',
                            //borderColor: 'grey.500',
                        }}
                    >
                        <TableHead sx={{bgcolor: '#eceff1', border: '1px solid', borderColor: 'grey.500'}}>
                            <TableRow>
                                <TableCell variant="head" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500'}}>
                                  Amazon販売価格
                                </TableCell>
                                <TableCell variant="head" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500'}}>
                                  利益率
                                </TableCell>
                                {/*
                                <TableCell variant="head" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500'}}>
                                  プラス金額(円)
                                </TableCell>
                                <TableCell variant="head" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500'}}>
                                  マイナス金額(円)
                                </TableCell>
                                */}
                                <TableCell variant="head" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500'}}>
                                  利益額(円)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {profitSetTable.map((item: any, index: any) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell variant="body" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500', '&:hover': {backgroundColor: '#f5f5f5', cursor: 'pointer'}}}>
                                      <TextField type="number" size="small" id="outlined-basic" variant="outlined" sx={{ m: -1, mr: -7, ml: -7 }} value={item.amazonSellingPrice} onChange={(event) => handleInputChange(index, amazonSellingPrice, setamazonSellingPrice, event)} />
                                    </TableCell>
                                    <TableCell variant="body" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500', '&:hover': {backgroundColor: '#f5f5f5', cursor: 'pointer'}}}>
                                      <TextField type="number" size="small" id="outlined-basic" variant="outlined" sx={{ m: -1, mr: -7, ml: -7 }} value={item.profitRate} onChange={(event) => handleInputChange(index, profitRate, setprofitRate, event)} />
                                    </TableCell>
                                    {/*
                                    <TableCell variant="body" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500', '&:hover': {backgroundColor: '#f5f5f5', cursor: 'pointer'}}}>
                                      <TextField type="number" size="small" id="outlined-basic" variant="outlined" sx={{ m: -1, mr: -7, ml: -7 }} value={item.plusPrice} onChange={(event) => handleInputChange(index, plusPrice, setplusPrice, event)} />
                                    </TableCell>
                                    <TableCell variant="body" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderColor: 'grey.500', '&:hover': {backgroundColor: '#f5f5f5', cursor: 'pointer'}}}>
                                      <TextField type="number" size="small" id="outlined-basic" variant="outlined" sx={{ m: -1, mr: -7, ml: -7 }} value={item.minusPrice} onChange={(event) => handleInputChange(index, minusPrice, setminusPrice, event)} />
                                    </TableCell>
                                    */}
                                    <TableCell variant="body" align="center" sx={{ flex: '1', borderLeft: '1px solid', borderRight: '1px solid', borderColor: 'grey.500', '&:hover': {backgroundColor: '#f5f5f5', cursor: 'pointer'}}}>
                                      <TextField type="number" size="small" id="outlined-basic" variant="outlined" sx={{ m: -1, mr: -7, ml: -7 }} value={item.profitAmount} onChange={(event) => handleInputChange(index, profitAmount, setprofitAmount, event)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

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

          <br />
          利益計算説明：<br />
          出品価格＝ (「※①or※②の高い方)」+諸経費+アマゾン発送重量(g)/1000*送料単価）/（1-手数料)<br />
          ※①（アマゾン価格＊(利益率/100)＋プラス金額ーマイナス金額）<br />
          ※②アマゾン価格＋利益額<br />
          ※利益額、諸経費、送料単価、手数料について、設定がなければ、無視されます。
        </div>
      </DashboardCard>
    </PageContainer>
  );
};

export default TypographyPage;
TypographyPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};