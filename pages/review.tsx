import type { ReactElement } from 'react';
import React from 'react';
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


export default function Home() {
    const [responseData, setResponseData] = React.useState<any[]>(['-'])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
                'https://0zxxg826ia.execute-api.ap-northeast-1.amazonaws.com/default/Get-Result',
                body,
                {
                    headers: {
                        'Content-type': 'text/plain',
                    },
                }
            );
            setResponseData(response.data)
        } catch (err) {
            setResponseData([])
            console.error(err);
        }
    }
    console.log(responseData)

    if (responseData[0] === '-') {
        return (
        <PageContainer title="処理状況確認" description="処理状況確認">
            <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
                <CircularProgress size={100}/>
            </Box>
        </PageContainer>
        )
    } else if (responseData.length === 0) {
        return (
            <PageContainer title="処理状況確認" description="処理状況確認">
                <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                    <DashboardCard title="処理状況">
                        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    whiteSpace: "nowrap",
                                    mt: 2
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                アップロード日付
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                ファイル名
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                ログ
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                処理状況
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                未出品データ確認
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </Box>
                    </DashboardCard>
                    </Grid>
                </Grid>
                </Box>
            </PageContainer>
        )
    }

    return (
    <PageContainer title="処理状況確認" description="処理状況確認">
        <Box>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
            <DashboardCard title="処理状況">
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="simple table"
                        sx={{
                            tableLayout: 'auto',
                            whiteSpace: 'wrap',
                            overflow: 'auto',
                            textOverflow: 'ellipsis',
                            mt: 0
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '170px' }} sx={{ flex: '1', whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis' }}>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        アップロード日付
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ width: '280px' }}>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        ファイル名
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        ログ
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        処理状況
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        未出品データ確認
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {responseData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                                <TableRow
                                    key={index}
                                    hover={true}
                                    sx={{
                                        //bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        border: 0,
                                        borderColor: 'primary.main',
                                        //borderRadius: 2,
                                        m: 0,
                                        p: 0,
                                        minWidth: 100,
                                        gap: 0,
                                    }}
                                >
                                    <TableCell sx={{borderRight: 0}}>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: "400",
                                                m: 0,
                                            }}
                                        >
                                            {product.id.substr(0, 4)}/{product.id.substr(4, 2)}/{product.id.substr(6, 2)}&ensp;
                                            {product.id.substr(8, 2)}:{product.id.substr(10, 2)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                m: 0,
                                            }}
                                        >
                                            { product.url === '出品処理'
                                            ? 
                                                <Box>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={300}>
                                                        {product.url}
                                                    </Typography>
                                                </Box>
                                            :
                                                <Box>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={300}>
                                                        {product.filename}
                                                    </Typography>
                                                </Box>
                                            }
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {product.enddatetime && product.url !== 'cancel' && product.url !== 'error' && product.url !== 'waiting' && product.url !== '出品処理' ?
                                            <MuLink href={product.url} variant="subtitle2" fontWeight={400} sx={{flex: '2', fontSize: "14px", m: 0}} target="_blank" rel="noopener noreferrer">
                                                LINK
                                            </MuLink>
                                        : product.url === '出品処理' && product.filename == 'OK'
                                        ?
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={300} align='left'>
                                                正常
                                            </Typography>
                                        : product.url === '出品処理' && product.enddatetime === undefined
                                        ?
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={300} align='left'>
                                                処理中
                                            </Typography>
                                        : product.url === '出品処理' && product.filename !== 'OK'
                                        ?
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={300} align='left'>
                                                エラー
                                            </Typography>
                                        :
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={300} align='left'>
                                                &ensp;&ensp;-
                                            </Typography>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={
                                                product.url == '出品処理' && product.enddatetime === undefined
                                                ? {px: "2px", backgroundColor: 'primary.main', color: "#fff", m: 0,}
                                                : product.url == '出品処理'
                                                ? {px: "2px", backgroundColor: 'success.main', color: "#fff", m: 0,}
                                                : product.url == 'cancel'
                                                ? {px: "2px", backgroundColor: 'warning.main', color: "#fff", m: 0,}
                                                : product.url == 'error'
                                                ? {px: "2px", backgroundColor: 'error.main', color: "#fff", m: 0,}
                                                : product.url == 'waiting'
                                                ? {px: "2px", backgroundColor: 'info.main', color: "#fff", m: 0,}
                                                : product.enddatetime
                                                ? {px: "2px", backgroundColor: 'success.main', color: "#fff", m: 0,}
                                                : product.startdatetime
                                                ? {px: "2px", backgroundColor: 'primary.main', color: "#fff", m: 0,}
                                                : {px: "2px", backgroundColor: 'secondary.main', color: "#fff", m: 0,}
                                            }
                                            size="small"
                                            label={
                                                product.url == '出品処理' && product.enddatetime === undefined
                                                ? '処理中 (OK : ' + product.datasize + ')'
                                                : product.url == '出品処理'
                                                ? '処理済み (OK : ' + product.datasize + ', NG : ' + product.NGdatasize + ')'
                                                : product.url == 'cancel'
                                                ? 'キャンセル (件数 : ' + product.datasize + ')'
                                                : product.url == 'error'
                                                ? 'エラー (件数 : ' + product.datasize + ')'
                                                : product.url == 'waiting'
                                                ? '処理待ち (件数 : ' + product.datasize + ')'
                                                : product.enddatetime
                                                ? '処理済み (件数 : ' + product.datasize + ')'
                                                : product.startdatetime
                                                ? '処理中 (件数 : ' + product.datasize + ')'
                                                : '--- (件数 : ' + product.datasize + ')'
                                                }
                                        ></Chip>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={
                                                product.url == '出品処理' && product.filename == 'OK'
                                                ? {px: "2px", color: "#fff", m: 0,}
                                                : product.url == '出品処理' && product.enddatetime === undefined
                                                ? {px: "2px", color: "#fff", m: 0,}
                                                : product.url == '出品処理' && product.filename !== 'OK'
                                                ? {px: "2px", backgroundColor: 'error.main', color: "#fff", m: 0,}
                                                : product.autolisting == 'off'
                                                ? {px: "2px", backgroundColor: 'secondary.main', color: "#fff", m: 0,}
                                                : product.autolisting == 'on'
                                                ? {px: "2px", backgroundColor: 'success.main', color: "#fff", m: 0,}
                                                : {px: "2px", backgroundColor: 'secondary.main', color: "#fff", m: 0,}
                                            }
                                            size="small"
                                            label={
                                                product.url == '出品処理' && product.filename == 'OK'
                                                ? '-'
                                                : product.url == '出品処理' && product.filename !== 'OK'
                                                ? product.filename
                                                : product.autolisting == 'off'
                                                ? <MuLink href={"/nonlisting?id=" + product.id} color="inherit">未出品データ確認</MuLink>
                                                : product.autolisting == 'on'
                                                ? '自動出品済み'
                                                : <MuLink href={"/nonlisting?id=" + product.id} color="inherit">未出品データ確認</MuLink>
                                                }
                                        ></Chip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>
            </Grid>
        </Grid>
        </Box>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={responseData.length}
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