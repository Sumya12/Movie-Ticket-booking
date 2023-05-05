import {React } from 'react'
import {Container,Box,Text,TabPanel,Tabs,TabList,Tab,TabPanels} from "@chakra-ui/react";
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import "../../App.css"
import Homepagenav from './Homepagenav';


const HomePage = () => {
 
  return (
 <>
    <div className='App4'>
     <Homepagenav/>
    <Container maxW='xl' centerContent>
      <Box display='flex' 
      justifyContent='center' 
      p={6} 
      bg={"white"}
      w="100%"
      m="50px 0 15px 0"
      borderRadius="lg"
      borderWidth = "1px" >
        <Text fontSize='4xl' fontFamily="Work sans" color="black" >Movie-Booking-Website</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" color="black" BorderWidth="1px" >
        <Tabs variant='soft-rounded'>
          <TabList mb="1em">
            
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
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
    </Container>
  </div>
  </>
  )
}

export default HomePage
