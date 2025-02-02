import { logger } from '../classes/Logger.js';
import { response } from '../classes/Response.js';
import { messages } from '../config/messages.settings.js';
import { IsAuthorizedToken } from '../middlewares/IsAuthorizedToken.js';

class BaseController {

  constructor() {}

  GetBaseRoutes = (router) => {
    router.get(`/${this.name}/all`, IsAuthorizedToken, this.selectAll);
    router.post(`/${this.name}/add`, IsAuthorizedToken, this.addEntity);
    router.post(`/${this.name}/show`, IsAuthorizedToken, this.selectEntity);
    router.patch(`/${this.name}/edit`, IsAuthorizedToken, this.editEntity);
    router.delete(`/${this.name}/delete/:id`, IsAuthorizedToken, this.deleteEntity);
    router.get(`/${this.name}/routes`, IsAuthorizedToken, (req, res) => {
      const routes = router.stack
        .filter(layer => layer.route)
        .map(layer => {
          return {
            method: Object.keys(layer.route.methods).join(', ').toUpperCase(),
            path: layer.route.path
          };
        });

      res.json([...new Map(routes.map(route => [`${route.method}_${route.path}`, route])).values()]);
    });
  };

  ErrorHandler = async (error, req, res) => {
    await logger.error(req.app.locals.db, JSON.stringify({
      message: messages.api.response['500'],
      error: error,
      details: error.errorDetails ? error.errorDetails() : 'have not details'
    }));

    const code = error.code ? error.code : '';
    switch(code){
    case 'AUTH_ERROR':
      res.status(403).json({
        error: error.message,
        details: error.details ? error.details: 'have not details'
      });
      break;
    case 'DB_ERROR':
      res.status(500).json({ error: error.message });
      break;
    default:
      res.status(500).json({ error:error.message });
      break;
    }
  };

  SendResWithRefreshToken = (req, res, user, body) => {
    response.SendResWithRefreshToken(req, res, user, body);
  };

  SendResLogoutToken = async (req, res, user, body) => {
    await logger.error(req.app.locals.db, JSON.stringify({
      message: body,
      user: user
    }));
    response.SendResLogoutToken(res, body);
  };

  SendResWithLog = async (req, res, status, user, body, level) => {
    if (logger[level]) {
      await logger[level](req.app.locals.db, JSON.stringify({
        message: body,
        user: user
      }));
    } else {
      console.warn(`Niveau de log invalide : ${level}`);
    }

    response.SendRes(res, status, body);
  };

  // ces méthodes sont surchargées dans les controllers enfants
  selectAll = async (req, res) => {
    res.status(200).json({ message: 'Not implemented' });
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
}

export { BaseController };
