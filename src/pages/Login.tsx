import { ChangeEvent, ChangeEventHandler, FC, MouseEvent, MouseEventHandler, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { CustomFormInput, SvgIcon } from '../components';
import { AuthToken, CoworkerPayload } from '../models';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
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
          auth.onLogin({ ...data.token, ExpiresIn: new Date().valueOf() + data.token.ExpiresIn * 1000 }, data.payload);
          navigation('/organizations', { replace: true });
        }
      });
  };

  return (
    <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
      <fieldset className="text-gray-600">
        <legend className="mx-auto my-4 text-xl">Sign In</legend>
        {hasError && (
          <div className="p-4 rounded shadow bg-red-100 border-2 border-red-300 flex">
            Incorrect username and/or password
            <button
              type="button"
              onClick={() => setHasError(false)}
              className="border-2 border-red-300 p-2 rounded-md text-red-300 hover:bg-red-300 hover:text-white focus:outline-none"
            >
              <SvgIcon>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </SvgIcon>
            </button>
          </div>
        )}
        <CustomFormInput
          name="username"
          label="Username"
          containerClasses="mt-9"
          placeholder="Enter Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <CustomFormInput
          name="password"
          label="Password"
          type="password"
          containerClasses="my-9"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="form__button w-full" type="submit" onClick={handleSubmit}>
          Sign In
        </button>
      </fieldset>
    </form>
  );
};

export default Login;
