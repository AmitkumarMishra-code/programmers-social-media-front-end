import { Box, Button, CircularProgress, Image, Progress, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState({})
    const { id } = useParams()
    const [isFollowing, setIsFollowing] = useState(false)

    const getProfile = async (link) => {
        setIsLoading(true)
        try {
            let response = await axios.get(link)
            let data = await response.data

            if (response.status !== 200) {
                alert(data.message)
                setIsLoading(false)
            }
            else {
                setUser(data.message)
                setPosts({ posts: data.message.posts, likesMap: data.message.likesMap })
                setIsLoading(false)
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        getProfile(id ? '/profile/' + id : '/profile')
        // eslint-disable-next-line
    }, [])

    const followHandler = async () => {
        setIsFollowing(true)
        const url = user.currentlyFollowing ? '/unfollow/' : '/follow/'
        try {
            let response = await axios.post(url + user.username)
            let data = await response.data

            if (response.status !== 200) {
                console.log('here')
                alert(data.message)
                setIsFollowing(false)
            }
            else {
                setUser({ ...user, currentlyFollowing: !user.currentlyFollowing, following : user.currentlyFollowing ? user.following - 1 : user.following + 1 })
            setIsFollowing(false)
            }
        }
        catch (error) {
            alert(error.message)
            setIsFollowing(false)
        }
    }

    const likeHandler = async (id, idx, isLiked) => {
        try {
            let likeUrl = isLiked ? '/unlike/' + id : '/like/' + id
            let response = await axios.post(likeUrl)
            let data = await response.data
            if (response.status !== 200) {
                alert(data.message)
            }
            else {
                let newLikesMap = posts.likesMap.map((post, index) => index === idx ? !isLiked : post)
                setPosts({ ...posts, likesMap: newLikesMap })
            }
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <Box d='flex' justifyContent='center' alignItems='center' flexDirection='column' width='100%' pt='12vh' px='5rem'>
            <Box width='100%' d='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                {
                    isLoading && <CircularProgress size="xs" isIndeterminate width='25%' />
                }
                {
                    user &&
                    <Box d='flex' justifyContent='center' alignItems='center' flexDirection='column' mb='2rem' width='50%'>
                        <Text fontSize='4xl' fontWeight='bold' mb='1rem'>{user.name}</Text>
                        <Image mb='1rem' borderRadius='50%' width='125px' height='125px' objectFit='cover' src={axios.defaults.baseURL + (user.photoURL.includes('static/') ? user.photoURL.substring(6) : user.photoURL)} />
                        <Box display='flex' justifyContent='center' alignItems='center' width='100%' mb='1rem'>
                            <Text fontSize='md' fontWeight='bold' mr='3rem'>@{user.username}</Text>
                            {!user.self &&
                                <Button
                                    size='sm'
                                    backgroundColor={user.currentlyFollowing ? 'red' : 'twitter.500'}
                                    color='white'
                                    onClick={followHandler}
                                    isLoading = {isFollowing}
                                    loadingText = {user.currentlyFollowing ? 'Unfollowing...' : 'Following...'}
                                >
                                    {user.currentlyFollowing ? 'Unfollow' : 'Follow'}
                                </Button>}
                        </Box>
                        <Box display='flex'><Text fontSize='sm' fontWeight='semibold' mr='1rem'>Following : {user.following}</Text><Text fontSize='sm' fontWeight='semibold'> Followers: {user.followers}</Text></Box>
                    </Box>
                }
            </Box>
            <Box d='flex' justifyContent='center' alignItems='center' flexDirection='column' width='50%'>
                {
                    user && <Text fontSize='3xl' fontWeight='semibold' my='1rem' >Posts by {user.username}</Text>
                }
                {
                    !isLoading && posts.posts?.length === 0 &&
                    <Text fontWeight='semibold'>No posts to display!</Text>
                }
                {
                    !isLoading && posts.posts?.length > 0 &&
                    posts.posts?.map((post, idx) => <Post
                        key={idx}
                        post={post.post}
                        likes={post.likes}
                        created={post.createdAt}
                        author={post.author.username}
                        isLiked={posts.likesMap[idx]}
                        likeHandler={likeHandler}
                        id={post._id}
                        index={idx}
                    />)
                }
                {
                    isLoading && <Progress size="xs" isIndeterminate width='100%' />
                }
            </Box>
        </Box>
    )
}