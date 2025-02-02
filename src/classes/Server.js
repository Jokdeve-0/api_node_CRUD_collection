class AppServer {

  constructor(app) {
    this.app = app;
    this.server = null; // Initialisation de server à null
    this.port = this.normalizePort(process.env.PORT || '3000');
    this.app.set('port', this.port);

    // Définir errorHandler en tant que méthode fléchée pour conserver le contexte this
    this.errorHandler = (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const address = this.server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + this.port;
      switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
      }
    };

    // Créer le serveur et écouter sur le port
    this.server = this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.server.address().port}`);
    });

    // Gérer les erreurs du serveur
    this.server.on('error', this.errorHandler);
  }

  normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

}

export { AppServer };
