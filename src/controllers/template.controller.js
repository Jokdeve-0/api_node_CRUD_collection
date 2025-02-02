import { BaseController } from './base.controller.js';

class TemplateController extends BaseController {
  constructor() {
    super();
    // nom de la collection à modifier
    // doit correspondre au nom de la propriété dans la liste des controllers
    this.name = 'template';
  }

  GetRoutes = (router) => {
    // ajouter les nouvelles routes ici
    this.GetBaseRoutes(router);
  };

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

export { TemplateController };
