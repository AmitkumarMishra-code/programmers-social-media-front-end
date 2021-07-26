import { Box, Button, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import { Link as profileLink, useHistory, Link as homeLink } from "react-router-dom";

export default function AppBar() {
    const history = useHistory()
    const logoutUrl = '/logout'

    const logoutHandler = async () => {
        try {
            let response = await axios.get(logoutUrl)
            if (response.status !== 200) {
                let errorMessage = await response.data
                alert(errorMessage.message)
            }
            else {
                window.localStorage.removeItem('access_Token')
                window.localStorage.removeItem('refresh_Token')
                history.push('/')
            }
        }
        catch (error) {
            alert(error.message)
        }
    }
    return (
        <Box bgColor='white' display='flex' justifyContent='space-between' alignItems='center' boxShadow='md' width='100%' px='2rem' py='1rem' position='fixed' top='0' zIndex='1'>
            <Text fontSize='4xl' fontWeight='bold' color='twitter.500'><Link as = {homeLink} to='/feed' textDecoration = 'none' style = {{textDecoration:'none'}}>GeekOverflow</Link></Text>
            <Box >
                <Link as={profileLink} to='/profile' textDecoration = 'none' style = {{textDecoration:'none'}}><Button colorScheme='purple' mr='1rem'>Profile</Button></Link>
                <Button colorScheme='red' onClick={logoutHandler}>Logout</Button>
            </Box>
        </Box>
    )
}