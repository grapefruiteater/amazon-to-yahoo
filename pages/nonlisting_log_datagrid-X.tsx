import type { ReactElement } from 'react';
import React from 'react';
import AWS from 'aws-sdk';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridActionsCellItem,
  GridRowParams,
  GridCellParams,
  GridValueGetterParams,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
  jaJP,
} from '@mui/x-data-grid'
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
} from '@mui/material';
import axios from 'axios'
import { Auth } from 'aws-amplify'

import PageContainer from '../src/components/container/PageContainer';
import DashboardCard from '../src/components/shared/DashboardCard';
import FullLayout from '../src/layouts/full/FullLayout';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default function Home() {
    const [responseData, setResponseData] = React.useState<any[]>([])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
      initialTask()
    }, []);

    const initialTask = async () => {
        await handleSubmission('get')
    }

    const handleSubmission = async (key: string) => {
        const users = await Auth.currentAuthenticatedUser()
        const username = users.username
        const body = { username: username }
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
            setResponseData(response.data)
        } catch (err) {
            setResponseData([''])
            console.error(err);
        }
    }

    const rows = responseData.map((item: any, index) => ({
      imagelink: item['url'],
      id: item['ASIN'],
      ProductCode: item['ASIN'],
      Brand: item['brand'],
      jobid: item['id']
    }))

    const ImageRenderer: React.FC<GridCellParams> = (params) => {
      return <img src={params.value?.toString()} alt="Image" width={100} />;
    };

    const columns: GridColDef[] = [
      {
        field: 'imagelink',
        headerName: '商品画像',
        flex: 1,
        editable: false,
        renderCell: ImageRenderer,
      },
      {
        field: 'id',
        headerName: 'ASIN',
        flex: 1,
        editable: false,
      },
      {
        field: 'ProductCode',
        headerName: '商品コード',
        flex: 1,
        editable: false,
      },
      {
        field: 'Brand',
        headerName: 'Brand',
        flex: 1,
        editable: false,
      },
      {
        field: 'jobid',
        headerName: 'jobid',
        flex: 1,
        editable: false,
      },
    ];

    if (responseData.length === 0) {
      return (
      <PageContainer title="Dashboard" description="this is Dashboard">
          <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
              <CircularProgress size={100}/>
          </Box>
      </PageContainer>
      )
    }
      return (
            <PageContainer title="Dashboard" description="this is Dashboard">
                <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                    <DashboardCard title="未出品データ一覧">
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                          <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection={true}
                            disableColumnFilter={false}
                            disableColumnMenu={false}
                            disableColumnSelector={false}
                            disableDensitySelector={false}
                            disableRowSelectionOnClick={true}
                            disableVirtualization={false}
                            initialState={{
                              pagination: {
                                paginationModel: {
                                  pageSize: 100,
                                },
                              },
                            }}
                            //filterModel={{
                            //  items: [{ id: 1, field: 'id', operator: '>', value: '4' },]
                            //}}
                            pageSizeOptions={[10,100,500,1000]}
                            slots={{
                              toolbar: CustomToolbar 
                            }}
                            rowSpacingType={'border'}
                            showCellVerticalBorder={true}
                            showColumnVerticalBorder={true}
                            rowHeight={140}
                            sx={{
                              fontSize: '0.9rem',
                              '.MuiDataGrid-toolbarContainer': {
                                borderBottom: 'solid 1px rgba(224, 224, 224, 1) !important',
                              },
                              '.MuiDataGrid-columnHeader--withRightBorder': {
                                borderBottom: 'solid 1px rgba(224, 224, 224, 1) !important',
                              },                              
                              '.MuiDataGrid-row .MuiDataGrid-cell': {
                                borderTop: 'solid 1px rgba(224, 224, 224, 1) !important',
                                borderBottom: 'solid 1px rgba(224, 224, 224, 1) !important',
                                bgcolor: 'background.paper',
                              },
                              '.custom-row.Mui-selected .MuiDataGrid-row': {
                                backgroundColor: '#f5f5f5',
                              },
                            }}
                          />
                        </Box>
                    </DashboardCard>
                    </Grid>
                </Grid>
                </Box>

            </PageContainer>
        );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout>{page}</FullLayout>;
};