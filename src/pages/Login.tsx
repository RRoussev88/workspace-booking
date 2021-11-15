import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { AuthToken, CoworkerPayload } from '../models';

const Login: FC = () => {
  const navigation = useNavigate();
  const auth = useContext(AuthContext);
  const [hasError, setHasError] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handlePasswordChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit: MouseEventHandler = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    auth.onLogout();
    fetch('http://localhost:8000/auth/signin', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then<{ token?: AuthToken; payload?: CoworkerPayload; errors?: string[] }>((raw) => raw.json())
      .then((data) => {
        if (data.token && data.payload) {
          setUsername('');
          setPassword('');
        }
        if (data.errors?.length) {
          setHasError(true);
        }
        return data;
      })
      // Call to `auth.onLogin` is extracted in separate promise in order to avoid unmounted component state change
      .then((data) => {
        if (data.token && data.payload) {
          auth.onLogin(
            { ...data.token, ExpiresIn: new Date().valueOf() + data.token.ExpiresIn * 1000 },
            data.payload,
          );
          navigation('/organizations', { replace: true });
        }
      });
  };

  return (
    <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow border text-gray-600">
      <Heading as="legend" size="lg" className="mx-auto my-4">
        Sign In
      </Heading>
      <Stack spacing={6}>
        <Stack as="fieldset">
          {hasError && (
            <Alert status="error" className="rounded shadow border border-red-300">
              <AlertIcon />
              <Box flex="1">
                <AlertTitle mr={2}>Incorrect credentials</AlertTitle>
                <AlertDescription>Please check your username and password and try again!</AlertDescription>
              </Box>
              <CloseButton position="absolute" right="8px" top="8px" onClick={() => setHasError(false)} />
            </Alert>
          )}
          <FormControl id="username" className="block my-2 w-full">
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              name="username"
              label="Username"
              type="text"
              className="bg-white shadow"
              variant=""
              placeholder="Enter Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
          <FormControl id="password" className="block my-2 w-full">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              className="bg-white shadow"
              variant=""
              placeholder="Enter Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
        </Stack>
        <Button size="md" colorScheme="blue" type="submit" onClick={handleSubmit}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default Login;
