import React from 'react';
import Menuitems from './MenuItems';
import { useRouter } from 'next/router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import { uniqueId } from 'lodash';

import {
  IconUserPlus,
} from '@tabler/icons-react';


const SidebarItems = ({toggleMobileSidebar, username}: any) => {
  const { pathname } = useRouter();
  const pathDirect = pathname;

  const adminItemExists = Menuitems.some(item => item.title === '管理者設定');
  if ((username == 'keita.220.284@gmail.com' || username == 'y.ryota0819@gmail.com') && !adminItemExists) {
    Menuitems.push(
      {
        id: uniqueId(),
        title: '管理者設定',
        icon: IconUserPlus,
        href: '/utilities/admin',
      }
    );
  }

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect}  onClick={toggleMobileSidebar}/>
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
