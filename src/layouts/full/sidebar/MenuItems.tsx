import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconAdjustments,
  IconAdjustmentsHorizontal,
  IconApps,
  IconUpload,
  IconArticle,
  IconCalculator,
  IconAppsOff,
  IconApi,
  IconBook,
  IconListDetails,
  IconListCheck,
  IconClipboardText,
  IconClipboardList,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: '出品',
  },
  {
    id: uniqueId(),
    title: '新規出品',
    icon: IconUpload,
    href: '/',
  },
  {
    id: uniqueId(),
    title: '出品データ確認',
    icon: IconListCheck,
    href: '/listing',
  },
  {
    id: uniqueId(),
    title: '未出品データ確認',
    icon: IconListDetails,
    href: '/nonlisting',
  },
  {
    id: uniqueId(),
    title: '処理状況確認',
    icon: IconClipboardText,
    href: '/review',
  },
  {
    id: uniqueId(),
    title: '価格改定ログ確認',
    icon: IconClipboardList,
    href: '/autoreview',
  },  {
    navlabel: true,
    subheader: '設定',
  },
  {
    id: uniqueId(),
    title: '出品設定',
    icon: IconAdjustmentsHorizontal,
    href: '/utilities/exhibit',
  },
  {
    id: uniqueId(),
    title: '利益計算設定',
    icon: IconCalculator,
    href: '/utilities/profit',
  },
  {
    id: uniqueId(),
    title: '除外設定',
    icon: IconAppsOff,
    href: '/utilities/filtering',
  },
  {
    id: uniqueId(),
    title: 'APIキー設定',
    icon: IconApi,
    href: '/utilities/apikey',
  },
  {
    navlabel: true,
    subheader: 'その他',
  },
  {
    id: uniqueId(),
    title: 'マニュアル',
    icon: IconBook,
    href: 'https://sites.google.com/view/non-stock-sales-1993-manual/%E3%83%9E%E3%83%8B%E3%83%A5%E3%82%A2%E3%83%AB',
  }
];

export default Menuitems;
