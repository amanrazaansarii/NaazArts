export const config = {
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'naaz_studio_secret_key_default_2026',
  jwtExpiresIn: '7d',
  cookieName: 'naaz_auth_token',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'studio@naazarts.com',
  },
};
