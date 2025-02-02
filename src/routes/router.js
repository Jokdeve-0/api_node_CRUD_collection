import express from'express';
import { HTTP_CONFIG } from '../config/http.settings.js';
import { controllers } from '../controllers/controllers.js';
import { API_CONFIG } from '../config/api.settings.js';
// import { IsAuthorizedToken } from '../middlewares/IsAuthorizedToken.js';

const router = express.Router();

router.use((request, response, next) => {
  response
    .header('Access-Control-Allow-Credentials', 'true')
    .header('Access-Control-Allow-Origin', HTTP_CONFIG.SERVER.origins)
    .header('Access-Control-Allow-Headers', HTTP_CONFIG.SERVER.allowHeaders.join(', '))
    .header('Access-Control-Expose-Headers', HTTP_CONFIG.SERVER.exposeHeaders.join(', '))
    .header('Access-Control-Allow-Methods', HTTP_CONFIG.SERVER.allowMethods.join(', '));
  next();
});

const Router = (name) => {

  const matchingController = controllers[name];
  if(matchingController){
    matchingController.GetRoutes(router);
  }else{
    router.get('/', (req, res) => {
      res.status(200).json(API_CONFIG.informations);
    });
  }

  return router;

};

export { Router };
