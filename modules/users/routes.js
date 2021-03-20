export default [
  { path: '/users', name: 'users', component: 'index'},
  { path: '/@:username([a-z0-9]+)',  name: 'users.show', component: 'show' },

  /*
    Редактирование.
   */
  { path: '/me/edit', name: 'users.edit', component: 'edit' },

  /**
   * Регистрация.
   */
  { path: '/login',  name: 'users.login', component: 'login' },
  { path: '/register',  name: 'users.register', component: 'register' },

  
  /**
   * Подтверждение адреса электронной почты.
   */
  { path: '/users/verify/resend', name: 'users.verify.resend', component: 'verify-resend' },
  { path: '/users/verify/:userId(\\d+)/:token', name: 'users.verify', component: 'verify' },

  // {
  //   path: '/users/token/:providerName/callback',
  //   name: 'users.token.callback',
  //   component: 'users/pages/callback',
    // common: true
  // },

  


  /**
   * Восстановление пароля.
   */
  { path: '/password/email',  name: 'users.password.email', component: 'password-send-reset-link' },
  { path: '/password/reset/:token',  name: 'users.password.reset', component: 'password-reset' },

  
  { path: '/terms', name: 'users.terms', component: 'terms', common: true },
  { path: '/privacy', name: 'users.privacy', component: 'privacy', common: true },
];
