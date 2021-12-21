import { Box, IconButton, CircularProgress, Text, useToast, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
const usersUrl = '/users/'
const followUrl = '/follow/'

export default function Suggestions({ getPosts }) {
    const [isLoading, setIsLoading] = useState(false)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const [suggestionsToDisplay, setSuggestionsToDisplay] = useState([])
    const [drawerOpen, setDrawerOpen] = useState(true)
    const [position, setPosition] = useState('5%')
    const toast = useToast()

    useEffect(() => {
        let usersToDisplay = []
        if (suggestedUsers.length <= 5) {
            usersToDisplay = [...suggestedUsers]
        }
        else {
            usersToDisplay = suggestedUsers.slice(0, 5)
        }
        setSuggestionsToDisplay(usersToDisplay)
    }, [suggestedUsers])

    const getUsersToFollow = async () => {
        setIsLoading(true)
        let response = await axios.get(usersUrl)
        let data = await response.data
        console.log(data)
        if (response.status !== 200) {
            setIsLoading(false)
            toast({
                title: 'An Error Occurred',
                description: data.message,
                status: 'error',
                isClosable: true,
                duration: 3000
            })
        }
        else {
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
            toast({
                title: 'An Error Occurred',
                description: data.message,
                status: 'error',
                isClosable: true,
                duration: 3000
            })
        }
        else {
            let newUsers = suggestedUsers.filter(user => user.username !== username)
            setSuggestedUsers(newUsers)
            setLoading(false)
            toast({
                title: `Followed ${username} successfully!`,
                status: 'success',
                duration: 1500,
                isClosable: true
            })
            getPosts()
        }
    }

    useEffect(() => {
        getUsersToFollow()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setPosition(drawerOpen ? '5%' : '-20%')
    }, [drawerOpen])

    const drawerHandler = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent={suggestionsToDisplay.length >3 ? 'space-around' : 'flex-start'}
            alignItems='flex-start'
            position='fixed'
            transition='all 500ms ease-in'
            right={position}
            minHeight='88vh'
            bgColor='lightcyan'
            p='1rem'
            width='20%'
            boxShadow='lg'
            borderRadius='12px'
        >
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
            <Tooltip label={drawerOpen ? 'Close Drawer' : 'Open Drawer'} fontSize='sm' bg='transparent' color="black">
                <IconButton
                    variant='ghost'
                    aria-label="Drawer Control"
                    icon={drawerOpen ? <AiOutlineDoubleRight /> : <AiOutlineDoubleLeft />}
                    onClick={drawerHandler}
                    position='absolute'
                    left='-40px'
                    top='44vh'
                />
            </Tooltip>
        </Box>
    )
}