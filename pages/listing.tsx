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
} from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'
import { Auth } from 'aws-amplify'

import { IconArrowUpLeft, IconArrowDownRight, IconCurrencyDollar, IconUpload, IconTrash, IconTrashX, IconArrowBarToDown } from '@tabler/icons-react';
import Search from "./Search_listing";

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
    //const isLoadingUpload = React.useRef(false)
    const [isLoadingUpload, setisLoadingUpload] = React.useState(false);
    const [id, setId] = React.useState<string>('');
    const [inititemData, setinititemData] = React.useState<any>([]);
    const [itemData, setitemData] = React.useState<any>([...inititemData]);
    const [res, setres] = React.useState(true);

    // ページ変更コンポーネント
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const datasize = React.useRef(0)
    const pagedatasize = React.useRef(0)
    const Nondatasize = React.useRef(0)

    const [filteredItemData, setfilteredItemData] = React.useState<any>([]);

    // 読み込み時処理
    React.useEffect(() => {
      initialTask()
    }, []);

    const initialTask = async () => {
      await handleSubmission('get', '', 0)
    }

    const handleSubmission = async (key: string, SelectedList: any, pagedatasize: any) => {
        setisLoadingUpload(true)
        const users = await Auth.currentAuthenticatedUser()
        const username = users.username
        const body = { username: username, key: key, SelectedList: SelectedList, pagedatasize: pagedatasize }

        if (key == 'allget') {
          const link = document.createElement('a');
          link.href = 'https://' + username + '-bucket.s3.ap-northeast-1.amazonaws.com/ProductList.csv';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else if (key == 'delete' || key === 'selecteddelete') {
          try {
              const response = await axios.post(
                  'https://a7gvd0ka2i.execute-api.ap-northeast-1.amazonaws.com/default/Delete-Listing-Result',
                  body,
                  {
                      headers: {
                          'Content-type': 'text/plain',
                      },
                  }
              );
              alert('正常に削除できました！');
              setfilteredItemData(itemData.filter((item: any) => {
                return !selectedImages.includes(item.Code)
              }))
              setSelectedImages([])
          } catch (err) {
              console.error(err);
          }
        } else {
          try {
              const response = await axios.post(
                  'https://sdcm94zwq8.execute-api.ap-northeast-1.amazonaws.com/default/Get-Listing-Result',
                  body,
                  {
                      headers: {
                          'Content-type': 'text/plain',
                      },
                  }
              );
              setinititemData(response.data['data'].map((item: any, index: any) => ({
                Category: item[0].substr(1),
                Name: item[1].substr(1),
                Code: item[2].substr(1),
                SubCode: item[3].substr(1),
                Price: item[4].substr(1),
                ImageLink: item[5].substr(1),
                quantity: item[6].substr(1),
                SellerID: item[7].substr(1),
                ASIN: item[8].substr(1),
              })))
              Nondatasize.current = response.data['Nondatasize']
              datasize.current = response.data['datasize']
          } catch (err) {
              console.error(err);
          }
        }
        setres(false)
        setisLoadingUpload(false)
    }

    React.useEffect(() => {
      const asyncfunc = async () => {
        if ((page + 0) * rowsPerPage >= 10000) {
          pagedatasize.current = (page + 0) * rowsPerPage
          await handleSubmission('get', '', pagedatasize.current)
        }
      };
      asyncfunc();
    }, [page, rowsPerPage]);
    console.log(page, rowsPerPage)

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
  
    }, [itemData]);

    // check boxに入れたASINをリストに追加する
    const handleImageToggle = (imageId: number) => {
      if (selectedImages.includes(imageId)) {
        setSelectedImages(selectedImages.filter((id) => id !== imageId));
      } else {
        setSelectedImages([...selectedImages, imageId]);
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

    const allCheckToggle = () => {
      if (selectedImages.length == 0) {
        const namesList = filteredItemData.slice(page * rowsPerPage - Math.floor((page * rowsPerPage) / 10000) * rowsPerPage, (page + 1) * rowsPerPage - Math.floor((page * rowsPerPage) / 10000) * rowsPerPage).map((item: any) => item.Code);
        setSelectedImages([...namesList]);
      } else {
        setSelectedImages([]);
      }
    };

    const [searched1, setSearched1] = React.useState("");
    const [searched2, setSearched2] = React.useState("");
    const [searched3, setSearched3] = React.useState("");
    console.log(page * rowsPerPage - Math.floor((page * rowsPerPage) / 10000))

    // メインページ
    if (res) {
      return (
      <PageContainer title="出品データ確認" description="出品データ確認">
          <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
              <CircularProgress size={100}/>
          </Box>
      </PageContainer>
      )
    }
      return (
            <PageContainer title="出品データ確認" description="出品データ確認">
                <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                    <DashboardCard title="出品中データ一覧">
                      <div>
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                            <Grid item>
                              <h2>出品数: {datasize.current}個&ensp;(在庫なし: {Nondatasize.current}個)</h2>
                            </Grid>
                            <Grid item>
                              <Search
                                initialRows={inititemData}
                                searched1={searched1}
                                searched2={searched2}
                                searched3={searched3}
                                setRows={setitemData}
                                setSearched1={setSearched1}
                                setSearched2={setSearched2}
                                setSearched3={setSearched3}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                            <Grid item>
                              {
                                searched1 != '' || searched2 != '' || searched3 != '' ? ( <CustomSnackbarContent2 message="フィルター中"/>
                              ) : (
                                <CustomSnackbarContent1 message="全件表示中"/>
                              )}
                            </Grid>
                          <Grid item>
                              <Button
                                variant="outlined"
                                size="large"
                                startIcon={<IconTrash />}
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                                disabled={Nondatasize.current == 0 || isLoadingUpload == true}
                                onClick={() => {
                                  handleSubmission('delete', [], pagedatasize.current);
                                }}
                              >
                                在庫切れ削除
                              </Button>
                              <Button
                                variant="outlined"
                                size="large"
                                startIcon={<IconTrash />}
                                style={{ float: 'right' }}
                                sx={{ marginTop: '1rem', marginBottom: '1rem', marginRight: '1rem' }}
                                disabled={selectedImages.length == 0 || isLoadingUpload == true}
                                onClick={() => {
                                  handleSubmission('selecteddelete', selectedImages, pagedatasize.current);
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
                                disabled={datasize.current == 0}
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
                            </Grid>
                            <Grid item>
                              ※ 出品情報は数分ほど最新の情報からラグがあります。<br />
                              ※ 出品削除の反映には、数分かかります。<br />
                              ※ 全選択は表示している商品全てを選択します。<br />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }} border={1} borderColor="#e0e0e0" p={2}>
                          <ImageList cols={5} rowHeight={300} gap={0} sx={{ height: 750 }} >
                            {filteredItemData.slice(page * rowsPerPage - Math.floor((page * rowsPerPage) / 10000) * rowsPerPage, (page + 1 ) * rowsPerPage - Math.floor((page * rowsPerPage) / 10000) * rowsPerPage).map((item: any, index: any) => (
                              <ImageListItem key={index}>
                                <a href={'https://store.shopping.yahoo.co.jp/' + item.SellerID + '/' + item.Code + '.html'} target="_blank" rel="noreferrer">
                                  <img
                                    src={`${item.ImageLink}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item.ImageLink}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.id}
                                    loading="lazy"
                                    style={{ width: 150, height: 150 }}
                                  />
                                </a>
                                <ImageListItemBar
                                  position='below'
                                  subtitle={
                                    <span style={{lineHeight:1.4, fontSize: 12}}>
                                      商品名: {item.Name.substr(0, 12)+'...'}<br />
                                      Quantity: {item.quantity}<br />
                                      Price: {item.Price}円<br />
                                      Category: {item.Category.substr(0, 12)}<br />
                                      ASIN: {item.ASIN}
                                    </span>}
                                  title={
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          checked={selectedImages.includes(item.Code)}
                                          onChange={() => handleImageToggle(item.Code)}
                                        />
                                      }
                                      label={item.Code}
                                    />
                                  }
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>
                        </div>
                    </DashboardCard>
                    </Grid>
                </Grid>
                </Box>
              <TablePagination
                  rowsPerPageOptions={[100, 500, 1000, 5000, 10000]}
                  component="div"
                  count={datasize.current}
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