import { Box, Button, Image, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link as profileLink } from 'react-router-dom';


export default function UserCard({ username, image, followers, followHandler }) {
    console.log(image)
    const [loading, setLoading] = useState(false)
    return (
        <Box bgColor='cyan' p='1rem' width='100%' d='flex' flexDirection='column' borderRadius='12px' boxShadow='lg'>
            <Box d='flex' justifyContent='space-between' alignItems='center'>
                <Text fontSize='md' color='blue' mr='1rem'>
                    <Link
                        as={profileLink}
                        to = {{
                            pathname : `/profile/${username}`,
                            state : {id: `${username}`}
                        }} 
                        style={{ textDecoration: 'none' }}
                    >
                        @{username}
                    </Link>
                </Text>
                <Image borderRadius='50%' width='35px' src={image} alt='Profile Image' /></Box>
            <Box d='flex' justifyContent='space-between' alignItems='center' mt='1rem'>
                <Text fontSize='md'>Followers : {followers}</Text>
                <Button
                    color='twitter.500'
                    size='xs'
                    onClick={() => followHandler(username, setLoading)}
                    isLoading={loading}
                    loadingText='Following'
                >
                    Follow
                </Button>
            </Box>
        </Box>
    )
}