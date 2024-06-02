import React, { useState } from "react";
import { styled, Container, Box } from "@mui/material";

import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

import { Auth } from 'aws-amplify'
import axios from 'axios'

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

interface Props {
  children: React.ReactNode;
}

const FullLayout: React.FC<Props> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const [apiExecuteState, setapiExecuteState] = React.useState(true);
  const [checkSPAPIList, setcheckSPAPIList] = React.useState([]);

  const [username, setUser] = React.useState(' ')
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user.attributes.email)
      })
      .catch((err) => {
        console.log(err)
      })
    handleAutoPriceSubmission()
    handleCheckSPAPISubmission()
  }, [])

  const handleAutoPriceSubmission = async () => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    const body = { username: username, key: 'APIState' }

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
        setapiExecuteState(response.data[1])
    } catch (err) {
        console.error(err);
    }
  }

  const handleCheckSPAPISubmission = async () => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username
    const body = { username: username, key: 'APIState' }

    try {
        const response = await axios.post(
            'https://1kziwszbn5.execute-api.ap-northeast-1.amazonaws.com/default/Check-APIKey',
            body,
        {
            headers: {
                'Content-type': 'text/plain',
            },
        }
        );
        setcheckSPAPIList(response.data)
    } catch (err) {
        console.error(err);
    }
  }

  return (
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        username={username}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header
          toggleMobileSidebar={() => setMobileSidebarOpen(true)}
          username={username}
          apiExecuteState={apiExecuteState}
          checkSPAPIList={checkSPAPIList}
        />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
