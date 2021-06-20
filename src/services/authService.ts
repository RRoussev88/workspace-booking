export const retrieveToken = async (code: string) => {
  const params = new URLSearchParams();
  params.append('code', code);
  params.append('grant_type', 'authorization_code');
  params.append('client_id', 'newClient');
  params.append('redirect_uri', 'http://localhost:8089/');
  params.append('client_secret', 'newClientSecret');

  try {
    const response = await fetch('http://localhost:8083/auth/realms/booking/protocol/openid-connect/token' + params, {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' },
    });
    console.log('Res: ', response);
  } catch (error) {
    console.error('ERROR! : ', error);
  }
};

// session_state=89e7ac76-791e-4b40-9c2f-8938c8d4198a&
// code=84d711d7-0410-42e8-b8b4-44d68d10f292.89e7ac76-791e-4b40-9c2f-8938c8d4198a.
// b88ce206-63d6-43b6-87c9-ea09d8c02f32

// saveToken(token) {
//   var expireDate = new Date().getTime() + (1000 * token.expires_in);
//   Cookie.set("access_token", token.access_token, expireDate);
//   console.log('Obtained Access token');
//   window.location.href = 'http://localhost:8089';
// }
