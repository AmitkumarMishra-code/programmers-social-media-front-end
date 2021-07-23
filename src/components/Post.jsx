import { Box, Circle, Text } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineLike } from 'react-icons/ai'

export default function Post({ post, likes, created, author }) {
    const [like, setLike] = useState(false)

    const getTime = () => {
        let date = new Date(created)
        let currentDate = date.getDate()
        let currentMonth = Number(date.getMonth()) + 1
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return (currentDate < 10 ? '0' + currentDate : currentDate) + '/' + (currentMonth < 10 ? '0' + currentMonth : currentMonth) + '/' + date.getFullYear() + ', ' + (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    }

    const likeHandler = () => {
        setLike(!like)
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='flex-start' alignItems='flex-start' p='2rem' width='80%' boxShadow='md'>
            <Text fontSize='sm' color='blue' fontWeight='semibold' mb='0.5rem'>@{author}</Text>
            <Text fontSize='2xl' fontWeight='bold' mb='0.5rem'>{post}</Text>
            <Text fontSize='md' color='gray' mb='0.5rem'>Posted on: {getTime()}</Text>
            <Box d='flex' justifyContent='center' alignItems='center'>
                <Text mr='1rem'>{likes.length} likes </Text>
                <Circle
                    border='1px'
                    borderStyle='solid'
                    borderColor='blackAlpha.200'
                    size="30px" bg={like ? 'twitter.500' : 'transparent'}
                    onClick={likeHandler}
                    cursor='pointer'
                >
                    <AiOutlineLike color={like ? 'white' : 'black'} />
                </Circle>
            </Box>
        </Box>
    )
}