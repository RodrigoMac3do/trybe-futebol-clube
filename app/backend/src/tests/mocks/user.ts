const validAdmin = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const invalidAdmin = { email: 'admin@xablau.com', password: 'senha_invalida' };

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjczMzk3NTc3LCJleHAiOjE2NzM0MjYzNzd9.-8XjtNIVcFo5fE46cImisz0I2gC3fW3lotsqfvjuuV8';

const users = {
  admin: {
    validAdmin: {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: 'secret_admin',
    },
    invalidAdmin: {
      id: 1,
      username: 'Admin',
      role: 'undefined',
      email: 'admin@xablau.com',
      password: 'senha_invalida',
    },
  },
  user: {
    validUser: {
      id: 2,
      username: 'User',
      role: 'user',
      email: 'user@user.com',
      password: 'secret_user',
    },
    invalidUser: {
      id: 2,
      username: 'User',
      role: 'undefined',
      email: 'user@xablau.com',
      password: 'senha_invalida',
    },
  },
};

export { validAdmin, invalidAdmin, token, users };
