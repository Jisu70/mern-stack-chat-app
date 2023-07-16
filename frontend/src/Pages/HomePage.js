import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Components/Authentication/Login';
import Signup from '../Components/Authentication/Signup';

const Homepage = () => {
  return <Container maxW={'xl'} centerContent>
    <Box d="flex"
      justifyContent="Center"
      p={3}
      bg="white"
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px">
      <Text fontSize="2xl" fontFamily="Work sans" textAlign="Center"> Chat Buddy !! </Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
      <Tabs variant='soft-rounded' >
        <TabList mb="1em">
          <Tab width="50%">Login</Tab>
          <Tab width="50%">Sign up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login/>
          </TabPanel>
          <TabPanel>
            <Signup/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  </Container>;
};

export default Homepage;
