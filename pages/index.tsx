import type { ReactElement } from 'react';
import React from 'react';
import {
  Grid,
  Box,
  Select,
  MenuItem,
  Typography,
  Avatar,
  Stack,
  Fab,
  Button,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  AlertTitle,
  useMediaQuery,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import axios from 'axios'
import { Auth } from 'aws-amplify'
import Papa from 'papaparse';

// components
import DashboardCard from '../src/components/shared/DashboardCard';
import PageContainer from '../src/components/container/PageContainer';
import FullLayout from '../src/layouts/full/FullLayout';

import { IconArrowUpLeft, IconArrowDownRight, IconCurrencyDollar, IconUpload } from '@tabler/icons-react';

import Dropzone from 'react-dropzone';

import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DropzoneContainer = styled('div')({
  border: '2px dashed #ddd',
  borderRadius: '4px',
  padding: '16px',
  height: '250px',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
});


export default function Home() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const successlight = theme.palette.success.light;

  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const [selectedFileExtension, setSelectedFileExtension] = React.useState<any>(null);
  const [csvData, setCsvData] = React.useState<any[]>([]);
  const [isLoadingUpload, setisLoadingUpload] = React.useState(false);
  const [isCorrectlyUpload, setisCorrectlyUpload] = React.useState(true);
  const [isLimitedUpload, setisLimitedUpload] = React.useState(false);
  const [isNothingUpload, setisNothingUpload] = React.useState(false);
  const [ParaValue1, setParaValue1] = React.useState<string>('off');
  const [Dialogopen, setDialogOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    initialTask()
  }, [])

  const initialTask = async () => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    await initialSubmission(username)
    //await handleSaveSubmission('get')
  }

  const initialSubmission = async (username: string) => {
    const body = { username: username}
    try {
      const response = await axios.post(
        'https://tlzq3985fa.execute-api.ap-northeast-1.amazonaws.com/default/Initial-SetUp',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
    } catch (err) {
      console.error(err);
    }
  }

  const FileInput = () => {
    const handleDrop = (acceptedFiles: File[]) => {
      // ファイルがドロップされた時の処理
      if (acceptedFiles.length !== 1) {
        console.log('none')
      } else {
        setSelectedFile(acceptedFiles[0]);
        console.log(acceptedFiles[0].name);
        setSelectedFileExtension(acceptedFiles[0].name.substr(-4))
        if (acceptedFiles !== null) {
          const file = acceptedFiles[0];
          const reader = new FileReader();
      
          reader.onload = (e) => {
            if (e.target?.result) {
              const content = e.target.result.toString();
              const result = Papa.parse(content, { header: false });
              setCsvData(result.data)
              console.log(csvData);
            }
          };
      
          reader.readAsText(file);
        }
      }
    };
  
    return (
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <DropzoneContainer {...getRootProps()}>
            <input {...getInputProps()}/>
            {selectedFile !== null ? (
              <p style={{fontSize: "20px"}}>{selectedFile.name}</p>
            ) : (
              <p>ファイルをドロップするか、ここをクリックしてファイルを選択してください。</p>
            )}
          </DropzoneContainer>
        )}
      </Dropzone>
    );
  };

  function checkEelement(element: any) {
    return element !== undefined && element !== 0 && element !== null && element['ASIN'] !== ''
  }

  const handleSubmission = async (key: string, event: any) => {
    setisLoadingUpload(true)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username

    const checkedasinlist = csvData.filter(checkEelement)
    const simpleasinlist = checkedasinlist.map((item) => item[0])
    const asinlist: string[] = Array.from(new Set(simpleasinlist))

    var today = new Date()
    var nowDate =
      today.getFullYear().toString() +
      ('0' + (today.getMonth() + 1)).toString().slice(-2) +
      ('0' + today.getDate()).toString().slice(-2) +
      ('0' + today.getHours()).toString().slice(-2) +
      ('0' + today.getMinutes()).toString().slice(-2) +
      ('0' + today.getSeconds()).toString().slice(-2)

    const body = {
      data: asinlist,
      username: username,
      timestamp: nowDate,
      filename: event.name,
      autolisting: ParaValue1,
    }
    console.log(body)

    try {
      const response = await axios.post(
        'https://wnhi6pdsj5.execute-api.ap-northeast-1.amazonaws.com/default/ASIN-Input-Product',
        body,
        {
          headers: {
            'Content-type': 'text/plain',
          },
        }
      );
      if (response.data === 'Limited') {
        setisLimitedUpload(true)
      } else if (response.data === 'Nothing') {
        setisNothingUpload(true)
      }
    } catch (err) {
      setisCorrectlyUpload(false)
      console.error(err);
    }
    setDialogOpen(true)
    setisLoadingUpload(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParaValue1(event.target.value);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setisCorrectlyUpload(true);
  };

  let ParameterList = [
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    [''],
    ParaValue1,
  ]
  console.log(ParameterList)

  const handleSaveSubmission = async (key: string) => {
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
      setParaValue1(response.data[23])
      if (key !== 'get') {
        alert('正常に保存できました！');
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.log(selectedFileExtension)

  return (
    <PageContainer title="新規出品" description="新規出品">
      <Box>
        <Grid container spacing={3} style={{ marginTop: '70px' }}>
          <Grid item xs={15} lg={10}>
            <DashboardCard title="ASINファイル(.txt)">
              <CardContent>
                <FileInput />
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<IconUpload />}
                  style={{ float: 'right' }}
                  sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                  disabled={selectedFile == null || isLoadingUpload == true || (selectedFileExtension !== '.txt' && selectedFileExtension !== '.csv')}
                  onClick={() => {
                    handleSubmission('upload', selectedFile);
                  }}
                >
                  {isLoadingUpload ? <>Upload&ensp; <CircularProgress size={24} /></> : 'Upload'}
                </Button>
                <Dialog
                  open={Dialogopen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullScreen={fullScreen}
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {isLimitedUpload ?
                        <>
                          <p>【制限】: 出品商品数の上限に達しました。</p>
                          <p> 出品商品を削除するか管理者に上限の増加をお願いしてください。</p>
                        </>
                      : isNothingUpload ?
                        <>
                          <p>【出品済み】: 入力したASINは全て出品済みです。</p>
                          <p> 出品商品以外のASINを入力してください。</p>
                        </>
                      //: isCorrectlyUpload ?
                        : '正常にアップロードされました' 
                      //:
                      //  <>
                      //</>    <p>【エラー】: 下記項目を確認してください。</p>
                      //</DialogContentText>    <p>・APIキー設定は正しく設定されているか</p>
                      //</DialogContent>    <p>・入力ファイルは所定のフォーマットであるか</p>
                      //</Dialog>  </>
                      }
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardContent>
            </DashboardCard>
          </Grid>
          {/*
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DashboardCard title="入力設定">
                    <Grid container spacing={3} justifyContent="space-between" alignItems="center">
                      <Grid item xs={7} sm={7}>
                        <Stack direction="row" spacing={1} mt={1} alignItems="center">
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">自動出品</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              sx={{ marginTop: '0.5rem'}}
                              value={ParaValue1}
                              onChange={handleChange}
                            >
                              <FormControlLabel value="on" control={<Radio />} label="on" />
                              <FormControlLabel value="off" control={<Radio />} label="off" />
                            </RadioGroup>
                          </FormControl>
                        </Stack>
                      </Grid>

                    <Button
                      variant="outlined"
                      size="medium"
                      startIcon={<IconUpload />}
                      style={{ float: 'right' }}
                      sx={{ marginTop: '4rem', marginBottom: '1rem' }}
                      onClick={() => {
                        handleSaveSubmission('save');
                      }}
                    >
                      Save
                    </Button>
                  </Grid>
                </DashboardCard>
              </Grid>
            </Grid>
          </Grid>*/}
        </Grid>
      </Box>
    </PageContainer>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};