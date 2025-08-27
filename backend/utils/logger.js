import path from 'path';
import { fileURLToPath } from 'url';

// Pour utiliser __dirname avec les modules ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tentative d'import dynamique de winston avec fallback console
let createLogger, format, transports, hasWinston = true;
try {
  const w = await import('winston');
  ({ createLogger, format, transports } = w.default || w);
} catch (e) {
  hasWinston = false;
}

let logger;

if (hasWinston) {
  const { combine, timestamp, printf, colorize, json } = format;

  // Format personnalisé pour les logs en mode développement
  const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  // Logger dev
  const devLogger = () => {
    return createLogger({
      level: 'debug',
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        devFormat
      ),
      transports: [new transports.Console()],
    });
  };

  // Logger prod
  const prodLogger = () => {
    return createLogger({
      level: 'info',
      format: combine(timestamp(), format.errors({ stack: true }), json()),
      defaultMeta: { service: 'simplon-backend' },
      transports: [
        new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, '../../logs/combined.log') }),
      ],
    });
  };

  logger = process.env.NODE_ENV === 'production' ? prodLogger() : devLogger();

  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new transports.Console({
        format: combine(colorize(), timestamp(), format.simple()),
      })
    );
  }
} else {
  // Fallback minimal si winston est indisponible
  const noop = () => {};
  logger = {
    debug: console.debug ? console.debug.bind(console) : noop,
    info: console.info ? console.info.bind(console) : console.log.bind(console),
    warn: console.warn ? console.warn.bind(console) : console.log.bind(console),
    error: console.error ? console.error.bind(console) : console.log.bind(console),
  };
}

// Middleware HTTP logger (fonctionne avec winston ou console)
const httpLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(
      JSON.stringify({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      })
    );
  });
  next();
};

export { logger, httpLogger };
