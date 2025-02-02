import { messages } from '../config/messages.settings.js';
import { WriterLogger } from '../controllers/logs.controller.js';
import { DatabaseError } from './Error.js';

class Logger {

  constructor() {

  }

  async log(pool,Level, Message) {
    try {
      const logs = await WriterLogger(pool, Level, Message);
      // console.log('Log ',logs);
      if(!logs.Id){
        throw new DatabaseError(messages.api.db[100].message, `Log - ${Level}`, { logs, Message });
      }
    } catch (error) {
      console.error('Failed to log to database:', error);
    }
  }

  // Méthodes utilitaires pour différents niveaux de log
  async info(pool, message) {
    await this.log(pool, 'INFO', message);
  }

  async warn(pool, message) {
    await this.log(pool, 'WARN', message);
  }

  async error(pool, message) {
    await this.log(pool, 'ERROR', message);
  }
}

const logger = new Logger();
export { logger };
