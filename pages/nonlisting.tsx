import type { ReactElement } from 'react';
import React from 'react';
import { useLocation, useParams } from "react-router-dom";
import AWS from 'aws-sdk';
import {
    Grid,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    TableContainer,
    TablePagination,
    Paper,
    Link as MuLink,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    FormControlLabel,
    Checkbox,
    Button,
    Alert,
    SnackbarContent,
    TextField,
    Switch,
    FormGroup,
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'
import { Auth } from 'aws-amplify'

import { IconArrowUpLeft, IconArrowDownRight, IconCurrencyDollar, IconUpload, IconTrash, IconArrowBarToDown } from '@tabler/icons-react';
import Search from "./Search_nonlisting";

import PageContainer from '../src/components/container/PageContainer';
import DashboardCard from '../src/components/shared/DashboardCard';
import FullLayout from '../src/layouts/full/FullLayout';

const CustomSnackbarContent1 = styled(SnackbarContent)`
  background-color: #80cbc4;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;

const CustomSnackbarContent2 = styled(SnackbarContent)`
  background-color: #e57373;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;

export default function Home() {
    const [selectedImages, setSelectedImages] = React.useState<any[]>([]);
    const [isLoadingUpload, setisLoadingUpload] = React.useState(false);
    const [id, setId] = React.useState<string>('');
    const [inititemData, setinititemData] = React.useState<any>([]);
    const [itemData, setitemData] = React.useState<any>([...inititemData]);
    const [res, setres] = React.useState(true);

    // ページ変更コンポーネント
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1000);
    const [datasize, setDatasize] = React.useState(0);
    //const [pagedatasize, setPagedatasize] = React.useState(0);
    const pagedatasize = React.useRef(0)

    const [filteredItemData, setfilteredItemData] = React.useState<any>([]);
    const [AllASINList, setAllASINList] = React.useState<any>([]);
    const [autoPrice, setautoPrice] = React.useState(false);

    // 読み込み時処理
    React.useEffect(() => {
      initialTask()
    }, []);

    const initialTask = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const paramId = urlParams.get('id');
        setId(paramId || '');
        await handleSubmission('get', '', 0)
        await handleAutoPriceSubmission('init', false)
    }

    const handleSubmission = async (key: string, ASINList: any, pagedatasize: any) => {
        setisLoadingUpload(true)
        const users = await Auth.currentAuthenticatedUser()
        const username = users.username
        const body = { username: username, key: key, ASINList: ASINList, pagedatasize: pagedatasize }

        try {
            const response = await axios.post(
                'https://fhidel67x7.execute-api.ap-northeast-1.amazonaws.com/default/Get-NonListing-Result',
                body,
                {
                    headers: {
                        'Content-type': 'text/plain',
                    },
                }
            );
            if (key != 'allget') {
              setinititemData(response.data['data'].map((item: any, index: any) => ({
                id: item[0].substr(1),
                jobid: item[1].substr(1),
                imagelink: item[2].substr(1),
                name: item[3].substr(1),
                //Brand: item['brand'],
              })))

              setDatasize(response.data['datasize'])

              if (key === 'delete') {
                alert('正常に削除できました！');
                setSelectedImages([])
              }
            } else if (key === 'allget') {
              const link = document.createElement('a');
              link.href = response.data;
              link.setAttribute('download', 'example.txt');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
        } catch (err) {
          if (key != 'get') {
            alert('処理エラー');
          }
            console.error(err);
        }
        setres(false)
        setisLoadingUpload(false)
    }

    const handleAutoPriceSubmission = async (key: string, event: any) => {
      const users = await Auth.currentAuthenticatedUser()
      const username = users.username
      const body = { username: username, autoPrice: event, key: key }
  
      try {
          const response = await axios.post(
              'https://h9mrv63epb.execute-api.ap-northeast-1.amazonaws.com/default/Setting-AutoPrice',
              body,
          {
              headers: {
                  'Content-type': 'text/plain',
              },
          }
          );
          setautoPrice(response.data[0])
      } catch (err) {
          console.error(err);
      }
    }

    React.useEffect(() => {
      const asyncfunc = async () => {
        if ((page + 1) * rowsPerPage > 30000) {
          pagedatasize.current = (page + 1) * rowsPerPage
          await handleSubmission('get', '', pagedatasize.current)
        }
      };
      asyncfunc();
    }, [page, rowsPerPage]);

    React.useEffect(() => {
      setitemData(inititemData)
    }, [inititemData]);

    React.useEffect(() => {
      if (id != '') {
        setfilteredItemData(itemData.filter((item: any, index: any) => {
          return item.jobid.includes(id);
        }));
      } else {
        setfilteredItemData(itemData)
      }
  
      setAllASINList(itemData
        .map((item: any) => {
          return item.id;
        })
      );
    }, [itemData]);

    const ExhibitSubmission = async (key: string, ASINList: any) => {
      if (key === 'allupload') {
        const isConfirmed = window.confirm('本当に実行しますか？');
        if (!isConfirmed) {
          return;
        }
      }
      setisLoadingUpload(true)
      const users = await Auth.currentAuthenticatedUser()
      const username = users.username
      const body = { username: username, key: key, ASINList: ASINList }
      if (key == 'allupload'){
        body.ASINList = AllASINList
      }
      try {
          const response = await axios.post(
              'https://h0mttivh6a.execute-api.ap-northeast-1.amazonaws.com/default/Exhibit-Listing-Result',
              body,
              {
                  headers: {
                      'Content-type': 'text/plain',
                  },
              }
          );
          if (response.data === 'OK') {
            alert('正常にアップロードできました！');
          } else if (response.data === 'Nothing') {
            alert('入力したASINは全て出品済みです。');
          }
      } catch (err) {
          console.error(err);
      }
      //setfilteredItemData(itemData.filter((item: any) => {
      setitemData(itemData.filter((item: any) => {
        return !selectedImages.includes(item.id)
      }))
      setSelectedImages([])
      setAllASINList([])
      setres(false)
      setisLoadingUpload(false)
      
  }

    // check boxに入れたASINをリストに追加する
    const handleImageToggle = (imageId: number) => {
      if (selectedImages.includes(imageId)) {
        setSelectedImages(selectedImages.filter((id) => id !== imageId));
      } else {
        setSelectedImages([...selectedImages, imageId]);
      }
    };

    const allCheckToggle = () => {
      if (selectedImages.length == 0) {
        const namesList = filteredItemData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any) => item.id);
        setSelectedImages([...namesList]);
      } else {
        setSelectedImages([]);
      }
    };
    console.log(selectedImages)

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [searched1, setSearched1] = React.useState("");
    const [searched2, setSearched2] = React.useState("");

    // メインページ
    if (res) {
      return (
      <PageContainer title="未出品データ確認" description="未出品データ確認">
          <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
              <CircularProgress size={100}/>
          </Box>
      </PageContainer>
      )
    }
      return (
            <PageContainer title="未出品データ確認" description="未出品データ確認">
                <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                    <DashboardCard title="未出品データ一覧">
                      <div>
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Grid container justifyContent="flex-end" style={{ marginBottom: '20px' }}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={autoPrice}
                                        onChange={(event) => handleAutoPriceSubmission('save', event.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />}
                                label="自動価格改定 ON/OFF" />
                        </FormGroup>
                    </Grid>
                          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <h2>未出品数: {datasize}個&emsp;</h2>
                            </Grid>
                            <Grid item>
                              <Search
                                initialRows={inititemData}
                                searched1={searched1}
                                searched2={searched2}
                                setRows={setitemData}
                                setSearched1={setSearched1}
                                setSearched2={setSearched2}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                            <Grid item>
                              {
                                id != '' ? <CustomSnackbarContent2 message={'ジョブIDでフィルター中 (' + filteredItemData.length + '個)'}/>
                              : 
                                <CustomSnackbarContent1 message="全件表示中"/>
                              }
                            </Grid>
                            <Grid item>
                              {/*<Button
                                variant="outlined"
                                size="large"
                                startIcon={<IconUpload />}
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                                disabled={ filteredItemData.length == 0 || isLoadingUpload == true}
                                onClick={() => {
                                  ExhibitSubmission('allupload', AllASINList);
                                }}
                              >
                                全件出品
                              </Button>*/}
                              <Button
                                variant="outlined"
                                size="large"
                                startIcon={<IconUpload />}
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                                disabled={selectedImages.length == 0 || isLoadingUpload == true}
                                onClick={() => {
                                  ExhibitSubmission('upload', selectedImages);
                                }}
                              >
                                選択出品
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                startIcon={<IconTrash />}
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                                disabled={selectedImages.length == 0 || isLoadingUpload == true}
                                onClick={() => {
                                  handleSubmission('delete', selectedImages, pagedatasize.current);
                                }}
                              >
                                選択削除
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="secondary"
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                                onClick={() => {
                                  allCheckToggle();
                                }}
                              >
                                全選択
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                color="success"
                                startIcon={<IconArrowBarToDown />}
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                                disabled={filteredItemData.length == 0}
                                onClick={() => {
                                  handleSubmission('allget', [], pagedatasize.current);
                                }}
                              >
                                CSVダウンロード
                              </Button>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <h2>選択数: {selectedImages.length}個&emsp;</h2>
                            </Grid>
                            <Grid item>
                              <div style={{ color: 'red' }}>※ 出品処理を行う場合は、必ず全ての画像を確認してから行ってください。</div>
                              ※ 自動価格改定中に出品処理を行う場合、価格改定と平行して処理が行われ、処理速度は半分になります。<br />
                              ※ 全選択は表示している商品全てを選択します。全件出品は、最大30000件までになります。<br />
                              ※ keepaトークンを使用して300件/時間で出品します。<br />
                              ※ 出品処理中に商品説明の除外を行うため、一部出品されない商品がある可能性があります。
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }} border={1} borderColor="#e0e0e0" p={2}>
                          {filteredItemData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length == 0 && res
                          ? <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
                              <CircularProgress size={100}/>
                            </Box>
                          : <ImageList cols={5} rowHeight={230} gap={0} sx={{ height: 750 }} >
                              {filteredItemData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item: any, index: any) => (
                                <ImageListItem key={index}>
                                  <a href={'https://www.amazon.co.jp/dp/' + item.id} target="_blank" rel="noreferrer">
                                    <img
                                      src={`${item.imagelink}?w=164&h=164&fit=crop&auto=format`}
                                      srcSet={`${item.imagelink}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                      alt={item.id}
                                      loading="lazy"
                                      style={{ width: 150, height: 150 }}
                                    />
                                  </a>
                                  <ImageListItemBar
                                    position='below'
                                    subtitle={<span>商品名: {item.name.substr(0, 12)+'...'}</span>}
                                    title={
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={selectedImages.includes(item.id)}
                                            onChange={() => handleImageToggle(item.id)}
                                            disableRipple={true}
                                          />
                                        }
                                        label={item.id}
                                      />
                                    }
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          }
                        </Box>
                        </div>
                    </DashboardCard>
                    </Grid>
                </Grid>
                </Box>
              <TablePagination
                  rowsPerPageOptions={[100, 500, 1000, 5000, 10000]}
                  component="div"
                  count={datasize}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </PageContainer>
        );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};