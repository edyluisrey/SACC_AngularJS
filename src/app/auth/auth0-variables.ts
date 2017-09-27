interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: 'gMyLO3li8fso64vheXQDs5EZ1Jqbsou9',   
  CLIENT_DOMAIN: 'edyluisrey.auth0.com',
  AUDIENCE: 'mwa',
 // REDIRECT: 'http://localhost:4200/callback',
 REDIRECT: 'https://glomaga.github.io/SACC_AngularJS/callback',
  SCOPE: 'openid'
};