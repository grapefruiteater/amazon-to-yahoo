import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Alert, AlertTitle} from '@mui/material';
import PropTypes from 'prop-types';

// components
import Profile from './Profile';
import { IconBellRinging, IconMenu, IconSquareRoundedChevronsDown } from '@tabler/icons-react';

import { Auth } from 'aws-amplify'

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
  username: string;
  apiExecuteState: any;
  checkSPAPIList: any;
}

const Header = ({toggleMobileSidebar, username, apiExecuteState, checkSPAPIList}: ItemType) => {

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    //background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>


        {/*<IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>

        </IconButton>*/}

        ユーザー名: {username}

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/*<Button variant="contained" disableElevation color="primary"  target="_blank" href="https://adminmart.com/product/modernize-next-js-admin-dashboard">
            Upgrade to Pro
          </Button>*/}
          <Box>
            { apiExecuteState 
              ? ''
              : <Alert variant="filled" severity="error" style={{ marginTop: '3px' }}><AlertTitle style={{ marginTop: '0px' }}>Yahoo APIが正常に動作していません。APIキー設定から更新してください。</AlertTitle></Alert>      
            }
          </Box>
          {checkSPAPIList.map((item: any, index: any) => (
            <Box key={index}>
            { item
              ? ''
              : <Alert variant="filled" severity="error" style={{ marginTop: '3px' }}><AlertTitle style={{ marginTop: '0px' }}>{index + 1} 番目のSP-API Keyが正常に動作していません。</AlertTitle></Alert>
            }
            </Box>
          ))}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
