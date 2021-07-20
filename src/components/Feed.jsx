import { Box, Button, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function Feed() {
    const history = useHistory()
    const url = window.location.href.includes('localhost') ? 'http://localhost:4000' : `https://geek-overflow-backend.herokuapp.com/`

    const logoutHandler = async () => {
        let token = window.localStorage.getItem('access_Token')
        try {
            let response = await fetch(url + '/auth/logout', {
                method: 'GET',
                headers: {
                    "Authorization": 'Bearer ' + token
                }
            })
            if (response.status !== 200) {
                let errorMessage = await response.json()
                alert(errorMessage.message)
            }
            else {
                alert('Logged out')
                history.push('/login')
            }
        }
        catch (error) {
            alert(error.message)
        }
    }
    return (
        <Box>
            <Text>Feed will be visible here</Text>
            <Button colorScheme='red' onClick={logoutHandler}>Logout</Button>
        </Box>
    )
}