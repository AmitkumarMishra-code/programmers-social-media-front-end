import { Box, FormControl, FormLabel, VStack, Input, Text, Button, InputGroup, InputLeftElement, InputRightElement, Link} from "@chakra-ui/react";
import {FiUsers} from 'react-icons/fi'
import {AiOutlineLock} from 'react-icons/ai'
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import { useState } from "react";
import {Link as SignupLink} from 'react-router-dom'

export default function Login() {
    const [showPassword, setShowPassword] = useState('password')

    const showPasswordHandler = () => {
        setShowPassword('text')
    }

    const hidePasswordHandler = () => {
        setShowPassword('password')
    }

    return (
        <Box  d = 'flex' justifyContent='center' alignItems='center' minHeight='100vh'>
            <VStack>
                <Text fontSize='6xl' paddingBottom = '1rem'>GeekOverflow</Text>
                <Box d="flex" p = "2rem"  paddingBottom = '2rem' borderWidth="1px" borderRadius="lg">
                    <VStack>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FiUsers color="gray.300" />}
                                />
                                <Input
                                    variant='outline'
                                    placeholder="Username"
                                    isRequired
                                    type='text'
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                            <InputLeftElement
                                    pointerEvents="none"
                                    children={<AiOutlineLock color="gray.300" />}
                                />
                            <Input
                                variant='outline'
                                placeholder='Password'
                                isRequired
                                type={showPassword}
                            />
                            <InputRightElement
                                    children={<AiOutlineEyeInvisible color="gray.300" />}
                                    onMouseDown = {showPasswordHandler}
                                    onMouseUp = {hidePasswordHandler}
                                    cursor = 'pointer'
                                />
                            </InputGroup>
                        </FormControl>
                        <Button colorScheme='blue'>Submit</Button>
                        <Text>{''}</Text>
                    </VStack>
                </Box>
                <Text><Link as = {SignupLink} to = '/signup' color='blue'>Don't have an account? Sign Up!</Link></Text>
            </VStack>
        </Box>
    )
}