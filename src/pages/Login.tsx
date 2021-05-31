import { FC, useState, MouseEvent, MouseEventHandler, ChangeEvent, ChangeEventHandler } from 'react';
import CustomFormInput from 'components/CustomFormInput';

type LoginProps = {};

const Login: FC<LoginProps> = () => {
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
    setUsername('');
    setPassword('');
  };

  return (
    <main>
      <form className="max-w-sm mx-auto my-4 sm:my-6 lg:my-8 bg-gray-100 p-4 sm:p-6 lg:p-8 rounded shadow">
        <fieldset className="text-gray-600">
          <legend className="mx-auto">Sign In</legend>
          <CustomFormInput
            name="username"
            label="Username"
            placeholder="Enter Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <CustomFormInput
            name="password"
            label="Password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="form__button w-full" type="submit" onClick={handleSubmit}>
            Sign In
          </button>
        </fieldset>
      </form>
    </main>
  );
};

export default Login;
