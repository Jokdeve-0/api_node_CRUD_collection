import { BaseController } from './base.controller.js';

class LogsController extends BaseController {
  constructor() {
    super();
    this.name = 'logs';
  }

  GetRoutes = (router) => {
    // ajouter les nouvelles routes ici
    this.GetBaseRoutes(router);
  };

  selectAll = async (req, res) => {
    req.app.locals.db.devLogs.findMany().then(async (result) => {
      res.status(200).json(result);
    });
  };

  addEntity = async (req,res) => {
    res.status(200).json({ message: 'Not implemented' });
  };

  selectEntity = async (req, res) => {
    res.status(200).json({ message: 'Not implemented' });
  };

  editEntity = async (req, res) => {
    res.status(200).json({ message: 'Not implemented' });
  };

  deleteEntity = async (req, res) => {
    res.status(200).json({ message: 'Not implemented' });
  };

  writeLog = async (pool, Level, Message) => {
    return await pool.DevLogs.create({ data: { Level,Message } });
  };

}

const WriterLogger = (new LogsController()).writeLog;

export { LogsController, WriterLogger };
