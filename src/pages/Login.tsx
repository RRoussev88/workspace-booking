import { FC, useState, MouseEvent, MouseEventHandler, ChangeEvent, ChangeEventHandler } from 'react';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handlePassword: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit: MouseEventHandler = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUsername('');
    setPassword('');
  };

  return (
    <section>
      <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
        <fieldset className="text-gray-600">
          <legend className="mx-auto">Sign In</legend>
          <p className="my-9">
            <label htmlFor="username">
              Username
              <input
                className="block my-1 px-3 w-full h-8 rounded-2xl shadow focus:outline-none focus:ring"
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={handleUsernameChange}
              />
            </label>
          </p>
          <p className="my-9">
            <label htmlFor="password">
              Password
              <input
                className="block my-1 px-3 w-full h-8 rounded-2xl shadow focus:outline-none focus:ring"
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePassword}
              />
            </label>
          </p>
          <input
            className="hover:bg-blue-500 bg-blue-400 text-white block my-1 px-3 w-full h-8 rounded-2xl shadow focus:outline-none focus:ring"
            type="submit"
            value="Sign In"
            onClick={handleSubmit}
          />
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
