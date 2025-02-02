import bcrypt from 'bcrypt';
import { messages } from '../config/messages.settings.js';
import { logger } from '../classes/Logger.js';
import { BaseController } from './base.controller.js';
import { response } from '../classes/Response.js';
import { userManager } from '../classes/managers/user.manager.js';

class AuthController extends BaseController {
  constructor() {
    super();
    this.name = 'auth';
  }

  GetRoutes = (router) => {
    router.post(`/${this.name}/signup`, this.signup);
    router.post(`/${this.name}/login`, this.login);
    router.post(`/${this.name}/logout`, this.logout);
    // ajouter les nouvelles routes ici
    this.GetBaseRoutes(router);
  };

  signup = async (request, res) => {
    try {

      //#region CHECK USER VALIDATION DATA (THROW ERROR)
      const user = await userManager.CheckRegistrationUserData(request);
      //#endregion

      //#region CHECK USER EXISTS (THROW ERROR)
      const resultUserExists = await userManager.UserExists(request, user);
      if (resultUserExists.isExists) {
        await this.SendResWithLog(request, res, 403, { Sender: user, Existed: resultUserExists.existedUser }, messages.api.auth[400], 'error');
        return;
      }
      //#endregion

      //#region REGISTER USER WITH PASSWORD HASH
      bcrypt.hash(user.Password,12).then(async (hash) => {
        user.PasswordHash = hash;
        let newUser = null;
        try{
          const result = await userManager.RegistrationUser(request, user);
          newUser = result;
        }catch(error){
          this.ErrorHandler(error, request, res);
          return;
        }
        //#region SEND RESPONSE WITH REFRESH TOKEN
        this.SendResWithRefreshToken(request, res, newUser, messages.api.auth[201]);
        //#endregion
      });
      //#endregion

    }catch(error) {
      this.ErrorHandler(error, request, res);
    }
  };

  login = async (request, res) => {
    try {

      //#region CHECK USER LOGIN VALIDATION DATA
      const user = await userManager.CheckRegistrationUserData(request,'login');
      //#endregion

      //#region CHECK USER EXISTS
      const resultUserExists = await userManager.UserExists(request, user);
      const { isExists } = resultUserExists;
      if (!isExists) {
        await this.SendResWithLog(request, res, 403, { Sender: user, Existed: resultUserExists }, messages.api.auth[401], 'error');
        return;
      }
      await logger.info(request.app.locals.db, JSON.stringify({ user, resultUserExists }));
      //#endregion
      const { existedUser } = resultUserExists;
      //#region Check if the password is correct
      bcrypt.compare(user.Password, existedUser.PasswordHash)
        .then(valid => {
          if (!valid) {
            this.SendResWithLog(request, res, 403, { Sender: user, Existed: resultUserExists.existedUser }, messages.api.auth[401], 'error');
            return;
          }

          response.SendResWithRefreshToken(request, res, existedUser, messages.api.auth[200]);

        });
      //#endregion

    } catch (error) {
      this.ErrorHandler(error, request, res);
      return;
    }
  };

  logout = async (request, res) => {
    const resultUserExists = await userManager.UserExists(request, { Email: request.body.mail });
    const { isExists } = resultUserExists;
    if (!isExists) {
      await this.SendResWithLog(request, res, 403, { Sender: request.body.Email, Existed: resultUserExists }, messages.api.auth[401], 'error');
      return;
    }
    const { existedUser } = resultUserExists;
    this.SendResLogoutToken(request, res, existedUser, messages.api.auth[206]);
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

export { AuthController };
