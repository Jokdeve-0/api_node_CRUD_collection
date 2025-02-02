const HTTP_CONFIG = {
  SERVER:  {
    url: process.env.SERVER_URL,
    port: process.env.PORT,
    origins: [
      process.env.CORS_ORIGIN,
    ],
    csrfHeader: 'x-csrf-token',
    allowHeaders: [
      'x-csrf-header',
      'Origin',
      'Content-Type',
      'Accept',
    ],
    allowMethods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'OPTIONS',
    ],
    exposeHeaders: [
      'Location',
    ],
  }
};

export { HTTP_CONFIG };
