import { Box, Button, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useRef } from "react";
import Post from "./Post";
import axios from "axios";
import Suggestions from "./Suggestions";

export default function Feed() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isPosting, setIsPosting] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const postRef = useRef()
    const history = useHistory()
    const logoutUrl = '/logout'
    const postsUrl = '/post/'

    const logoutHandler = async () => {
        try {
            let response = await axios.get(logoutUrl)
            if (response.status !== 200) {
                let errorMessage = await response.data
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
    const getPosts = async () => {
        setIsLoading(true)
        try {
            let response = await axios.get(postsUrl)
            let data = await response.data

            if (response.status !== 200) {
                alert(data.message)
                setIsLoading(false)
            }
            else {
                setPosts(data.message)
                setIsLoading(false)
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    const newPostHandler = async () => {
        if (!postRef.current.value.trim().length) {
            return
        }
        try {
            setIsPosting(true)
            let response = await axios.post(postsUrl, {
                post: postRef.current.value
            })
            let data = await response.data
            if (response.status !== 200) {
                alert(data.message)
                setIsPosting(false)
            }
            else {
                // alert('Successfully created a new post!')
                posts.push(data.message)
                setIsPosting(false)
                onClose()
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <Box display='flex' flexDirection='column' width='100%' position='relative' >
            <VStack>
                <Box bgColor='white' display='flex' justifyContent='space-between' alignItems='center' boxShadow='md' width='100%' px='2rem' py='1rem' position='fixed' top='0'>
                    <Text fontSize='4xl' fontWeight='bold' color='twitter.500'>GeekOverflow</Text>
                    <Box >
                        <Button colorScheme='purple' mr='1rem'>Profile</Button>
                        <Button colorScheme='red' onClick={logoutHandler}>Logout</Button>
                    </Box>
                </Box>
                <Box display='flex' width='100%' pb='2rem' pt='12vh' px='5rem' justifyContent='flex-start' alignItems='flex-start'>
                    <Box d='flex' flexDirection='column' width='50%'>
                        <Text fontSize='3xl' fontWeight='semibold' my='1rem' >Posts by your friends</Text>
                        {
                            !isLoading && posts.length === 0 &&
                            <Text fontWeight='semibold'>No posts to display, time to follow more people!</Text>
                        }
                        {
                            !isLoading && posts.length > 0 &&
                            posts.map((post, idx) => <Post key={idx} post={post.post} likes={post.likes} created={post.createdAt} author={post.author.username} />)
                        }
                        {
                            isLoading && <Progress size="xs" isIndeterminate width='100%' />
                        }
                    </Box>
                    <Suggestions />
                </Box>
            </VStack>
            <Box
                position='fixed'
                right='20px'
                bottom='20px'
                width='45px'
            >
                <BsFillPlusCircleFill
                    color='blue'
                    size='xl'
                    onClick={onOpen}
                />
            </Box>
            <Modal
                initialFocusRef={postRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader style={{ borderBottom: '1px solid lightblue' }}>Add New Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={6}>
                        <FormControl>
                            <Textarea ref={postRef} placeholder="How are you feeling today..." />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter style={{ borderTop: '1px solid lightblue' }}>
                        <Button onClick={onClose} mr='1rem' disabled={isPosting}>Cancel</Button>

                        <Button
                            colorScheme={!isPosting ? "blue" : 'gray'}
                            mr={3}
                            onClick={newPostHandler}
                            isLoading={isPosting}
                            loadingText = 'Posting...'
                        >
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}