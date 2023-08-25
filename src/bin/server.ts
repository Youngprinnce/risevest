import http from 'http';
import app from '../app';
import debug from 'debug';
import { setUpDatabase } from '../db/conn';
import normalizePort from '../utils/normalize-port';
import gracefulShutdown from 'http-graceful-shutdown';
import { preShutdown, onShutdown } from '../utils/graceful-shutdown';

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);

setUpDatabase().then(() => {
  console.log(`Db Connected, and server is on port:${PORT}`);
  server.listen(normalizePort(PORT));
}).catch(err => {
  console.error('Error connecting to the database:', err.message);
  process.exit(1);
});

// Handle signal events gracefully
gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM, SIGKILL, SIGHUP',   // signals for shutting the server
  development: false,                           // not in dev mode
  forceExit: false,                             // triggers process.exit() at the end of shutdown process if true
  timeout: 10000,                               // timeout: 10 secs
  preShutdown,                                  // needed operation before httpConnections shuts down, like redis
  onShutdown,                                   // shutdown function (async) - e.g. for cleanup DB, ...
});

// Event listener for HTTP server "error" event.
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr?.port}`;
  debug('Listening on ' + bind);
}
