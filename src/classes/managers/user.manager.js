import { messages } from '../../config/messages.settings.js';
import { AuthError, DatabaseError } from '../Error.js';
import { validations } from '../Validations.js';

class UserManager {

  CheckRegistrationUserData = async (request, type = 'registration') => {
    try{
      const registrationUser = new RegistrationUser(
        request.body?.mail,
        request.body?.password,
        request.body?.passwordConfirme,
      );

      if(type === 'registration'){
        if (!validations.passwordConfirmer(registrationUser)) {
          throw new AuthError(
            messages.api.auth['402'].message,
            'Validations.passwordConfirmer',
            messages.api.auth['402']
          );
        }
      }

      const validationsData = this.LoginCheck(registrationUser);
      if (validations.hasErrorsInValidations(validationsData)) {
        validations.CleanValidationsResponse(validationsData);
        console.log(validationsData);
        throw new AuthError(
          messages.api.auth['405'].message,
          'Validations.hasErrorsInValidations',
          validationsData
        );
      }
      return registrationUser;
    }catch(error){
      console.log(error);
      if(error instanceof AuthError){
        throw error;
      }
      throw new DatabaseError(messages.api.db[200].message,'UserManager.CheckRegistrationUserData',error);
    }
  };

  LoginCheck = (user) => validations.checkers(user,['Email','Password']);

  UserExists = async (req, user) => {
    try{
      const existedUser = await req.app.locals.db.user.findUnique({
        where: {
          Email: user.Email,
        },
      });

      return existedUser ? { isExists: true, existedUser } : { isExists: false };

    }catch(error){
      throw new DatabaseError(messages.api.db[200].message,'UserManager.UserExists',error);
    }
  };

  RegistrationUser = async (request, user) => {
    try{
      const result = await request.app.locals.db.user.create({ data: { Email: user.Email, PasswordHash: user.PasswordHash } });
      console.log('result',result.Id);
      if(!(result?.Id)) {
        console.log('Check resultId');
        throw new DatabaseError(messages.api.db[201].message,'UserManager.RegistrationUser',result);
      }
      return result;
    }catch(error){
      if(error instanceof DatabaseError){
        throw error;
      }
      throw new DatabaseError(messages.api.db[201].message,'UserManager.RegistrationUser',error);
    }
  };
}

class RegistrationUser{

  constructor(Email, Password, PasswordConfirme){
    this.Email = Email;
    this.Password = Password;
    this.PasswordConfirme = PasswordConfirme;
    this.PasswordHash = null;
  }

  setPasswordHash(value){
    this.PasswordHash = value;
  }
}

const userManager = new UserManager();
export { userManager, RegistrationUser };
