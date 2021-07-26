import { Box, CircularProgress, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import UserCard from "./UserCard";
const usersUrl = '/users/'
const followUrl = '/follow/'

export default function Suggestions({getPosts}) {
    const [isLoading, setIsLoading] = useState(false)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [suggestionsToDisplay, setSuggestionsToDisplay] = useState([])

    useEffect(() => {
        let usersToDisplay = []
        if (suggestedUsers.length <= 5) {
            usersToDisplay = [...suggestedUsers]
        }
        else {
            usersToDisplay = suggestedUsers.slice(0,5)
        }
        setSuggestionsToDisplay(usersToDisplay)
    }, [suggestedUsers])

    const getUsersToFollow = async () => {
        setIsLoading(true)
        let response = await axios.get(usersUrl)
        let data = await response.data
        if (response.status !== 200) {
            setIsLoading(false)
            alert(data.message)
        }
        else {
            console.log(data.message)
            setSuggestedUsers(data.message)
            setIsLoading(false)
        }
    }

    const followHandler = async (username, setLoading) => {
        setLoading(true)
        let response = await axios.post(followUrl + username)
        let data = await response.data
        if (response.status !== 200) {
            setLoading(false)
            alert(data.message)
        }
        else {
            let newUsers = suggestedUsers.filter(user => user.username !== username)
            setSuggestedUsers(newUsers)
            setLoading(false)
            getPosts()
        }
    }

    useEffect(() => {
        getUsersToFollow()
    }, [])

    return (
        <Box position='fixed' right='5%' minHeight='88vh' bgColor='lightcyan' p='1rem' width = '20%' boxShadow = 'lg' borderRadius = '12px' >
            <VStack>
                {isLoading && suggestionsToDisplay.length === 0 && <CircularProgress isIndeterminate />}
                {!isLoading && suggestionsToDisplay.length > 0 ?
                    suggestionsToDisplay.map((user, idx) => <UserCard
                        key={idx}
                        username={user.username}
                        image={user.photoURL}
                        followers={user.followers.length}
                        followHandler={followHandler}
                    />
                    ) :
                    <Text fontSize='l'>Nothing to display for now...</Text>
                }
            </VStack>
        </Box>
    )
}