export const ironOptions = {
  password: process.env.SECRET_KEY as string,
  cookieName: `frontendweb3token`,
  cookieOptions: {
    secure: process.env.NODE_ENV === `production`,
  },
};
