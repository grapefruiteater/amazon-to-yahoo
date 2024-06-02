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
    Switch,
    FormGroup,
    FormControlLabel,
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

    const [autoPrice, setautoPrice] = React.useState(false);

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
        await handleAutoPriceSubmission('init', false)
    }

    const handleSubmission = async (key: string) => {
        const users = await Auth.currentAuthenticatedUser()
        const username = users.username
        const body = { username: username }
        try {
            const response = await axios.post(
                'https://l3jbbwuki3.execute-api.ap-northeast-1.amazonaws.com/default/Get-Auto-Result',
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

    if (responseData[0] === '-') {
        return (
        <PageContainer title="価格改定ログ確認" description="価格改定ログ確認">
            <Box sx={{display: "flex", justifyContent: 'center', alignItems: "center", position: 'center', height: '100vh'}}>
                <CircularProgress size={100}/>
            </Box>
        </PageContainer>
        )
    } else if (responseData.length === 0) {
        return (
            <PageContainer title="価格改定ログ確認" description="価格改定ログ確認">
                <Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12}>
                    <DashboardCard title="価格改定ログ確認">
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
                                                処理開始時刻
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                処理終了時刻
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                ログ
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                商品データ取得状況
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={700}>
                                                価格改定結果
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
    <PageContainer title="価格改定ログ確認" description="価格改定ログ確認">
        <Box>
        <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
            <DashboardCard title="価格改定ログ確認">
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
                                        処理開始時刻
                                    </Typography>
                                </TableCell>
                                <TableCell style={{ width: '280px' }}>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        処理終了時刻
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        ログ
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        商品データ取得状況
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={700}>
                                        価格改定結果
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
                                        boxShadow: 1,
                                        border: 0,
                                        borderColor: 'primary.main',
                                        m: 0,
                                        p: 0,
                                        minWidth: 100,
                                        gap: 0,
                                    }}
                                >
                                    <TableCell sx={{borderRight: 0}}>
                                        { 'startdatetime' in product === false
                                            ? 
                                                <Box>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={300}>
                                                        {'-'}
                                                    </Typography>
                                                </Box>
                                            :
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: "400",
                                                            m: 0,
                                                        }}
                                                    >
                                                        {product.startdatetime.substr(0, 4)}/{product.startdatetime.substr(4, 2)}/{product.startdatetime.substr(6, 2)}&ensp;
                                                        {product.startdatetime.substr(8, 2)}:{product.startdatetime.substr(10, 2)}
                                                    </Typography>
                                                </Box>
                                            }
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                m: 0,
                                            }}
                                        >
                                            { 'enddatetime' in product === false
                                            ? 
                                                <Box>
                                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={300}>
                                                        {'-'}
                                                    </Typography>
                                                </Box>
                                            :
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "14px",
                                                            fontWeight: "400",
                                                            m: 0,
                                                        }}
                                                    >
                                                        {product.enddatetime.substr(0, 4)}/{product.enddatetime.substr(4, 2)}/{product.enddatetime.substr(6, 2)}&ensp;
                                                        {product.enddatetime.substr(8, 2)}:{product.enddatetime.substr(10, 2)}
                                                    </Typography>
                                                </Box>
                                            }
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {product.enddatetime && product.url !== 'cancel' && product.url !== 'error' && product.url !== 'waiting' ?
                                            <MuLink href={product.url} variant="subtitle2" fontWeight={400} sx={{flex: '2', fontSize: "14px", m: 0}} target="_blank" rel="noopener noreferrer">
                                                LINK
                                            </MuLink>
                                        :
                                            <Typography color="textSecondary" variant="subtitle2" fontWeight={300} align='left'>
                                                &ensp;&ensp;-
                                            </Typography>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            sx={
                                                product.url == 'cancel'
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
                                                product.url == 'cancel'
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
                                                product.url == 'cancel'
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
                                                product.url == 'cancel'
                                                ? 'キャンセル'
                                                : product.url == 'error'
                                                ? 'エラー'
                                                : product.url == 'waiting'
                                                ? '処理待ち'
                                                : product.enddatetime
                                                ? '価格改定 : ' + product.AutoOK + ', 出品停止 : ' + product.AutoNG
                                                : product.startdatetime
                                                ? '処理中'
                                                : '---'
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