import { Box, Circle, Image, Link, Text } from "@chakra-ui/react";
import { AiOutlineLike } from 'react-icons/ai'
import { Link as profileLink } from 'react-router-dom';


export default function Post({ post, likes, created, author, isLiked, likeHandler, id, index, name, image }) {
    const getTime = () => {
        let date = new Date(created)
        let currentDate = date.getDate()
        let currentMonth = Number(date.getMonth()) + 1
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return (currentDate < 10 ? '0' + currentDate : currentDate) + '/' + (currentMonth < 10 ? '0' + currentMonth : currentMonth) + '/' + date.getFullYear() + ', ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='flex-start' width='80%' boxShadow='md' mb='2rem' borderRadius='12px'>
            <Box display='flex' p='1rem' justifyContent='flex-start' alignItems='center' width='100%' backgroundColor='cyan' borderTopRadius='12px'>
                <Image borderRadius='50%' width='5rem' height='5rem' objectFit='cover' src={image} alt={author} mr='2rem' />
                <Box display='flex' flexDirection='column' color='black' justifyContent = 'space-evenly' height='5rem' alignItems='flex-start' mb='0.5rem'>
                    <Text fontSize='xl'  fontWeight='semibold'>{name}</Text>
                    <Text fontSize='sm' color='blue' fontWeight='semibold'>
                        <Link as={profileLink}
                            to={{
                                pathname: `/profile/${author}`,
                                state: { id: `${author}` }
                            }}
                            style={{ textDecoration: 'none' }}>
                            @{author}
                        </Link>
                    </Text>
                </Box>
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='flex-start' p='1rem'>
                <Text fontSize='2xl' fontWeight='bold' mb='0.5rem'>{post}</Text>
                <Text fontSize='md' color='gray' mb='0.5rem'>Posted on: {getTime()}</Text>
                <Box d='flex' justifyContent='center' alignItems='center'>
                    <Text mr='1rem'>{likes.length} {likes.length === 1 ? 'like' : 'likes'} </Text>
                    <Circle
                        border='1px'
                        borderStyle='solid'
                        borderColor='blackAlpha.200'
                        size="30px" bg={isLiked ? 'twitter.500' : 'transparent'}
                        onClick={() => likeHandler(id, index, isLiked)}
                        cursor='pointer'
                        mr='1rem'
                    >
                        <AiOutlineLike color={isLiked ? 'white' : 'black'} />
                    </Circle>
                    {isLiked && <Text>You like this!</Text>}
                </Box>
            </Box>
        </Box >
    )
}