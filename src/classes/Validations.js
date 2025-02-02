import { messages } from '../config/messages.settings.js';

import { AuthError } from './Error.js';
import { logger } from './Logger.js';

class Validations {
  constructor(){
    this.regex = {
      // Doit commencer par une lettre (y compris les lettres accentuées) ou un tiret.
      // Ne doit pas contenir de chiffres, de caractères spéciaux (comme `_`, `!`, `@`, etc.), sauf le tiret.
      // Doit avoir au moins 3 caractères.
      username: /^[A-Za-zÀ-ÖØ-öø-ÿ-][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/,

      // Similaire à `username`, mais sans restriction sur les chiffres.
      // Doit avoir au moins 3 caractères.
      name: /^[A-Za-zÀ-ÖØ-öø-ÿ-][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:.,[\]]{2,}$/,

      // Doit être une adresse e-mail valide.
      // Doit contenir des lettres, des chiffres, des points (`.`), des tirets (`-`), et des underscores (`_`).
      // Doit avoir un domaine valide avec une extension de 2 à 4 caractères.
      Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,

      // Doit contenir au moins une lettre minuscule.
      // Doit contenir au moins une lettre majuscule.
      // Doit contenir au moins un chiffre.
      // Doit contenir au moins un caractère spécial parmi `!@#$%^&*`.
      // Doit avoir au moins 8 caractères.
      Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,

      // Doit contenir des lettres, des chiffres, des underscores (`_`), et certains caractères spéciaux (`!?÷+=@#$%ˆ&*()~;:`).
      // Ne doit pas contenir certains caractères spéciaux (`¡¿\\{}|<>[]`).
      message: /[a-zA-Z0-9_!?÷+=@#$%ˆ&*()~;:][^¡¿\\{}|``<>[\]]{0,}$/,

      // Doit être une chaîne JSON valide avec des paires clé-valeur.
      json: /^\{".*":.*\}/,

    };
    this.valid =
        {
          username:'Le nom est invalide il doit comporter au moins trois caractères et ne peut contenir que des lettres ou le tiret (-).',
          Email:'L\'adresse email est invalide.',
          name: 'Le nom est invalide il doit comporter au moins trois caractères et ne peut contenir que des lettres, des chiffres ou le tiret (-).',
          Password: 'Le mot de passe est incorrect, il doit contenir au moins 8 caractères dont un chiffre,une minuscule, une majuscule et un caractère spécial.',
          PasswordConfirme: 'Les deux mots de passe ne sont pas identiques.',
          role:'Le nom est invalide il doit comporter au moins deux caractères et ne peut contenir que des lettres, des chiffres ou le tiret (-).',
          isbn_product:'L\'ISBN du produit est invalide. il doit être composé de trois chiffres.',
          isbn_editor:'L\'ISBN de l\'éditeur est invalide. il doit être composé de cinq chiffres.',
          isbn_country:'L\'ISBN du pays est invalide. il doit être composé de deux chiffres.',
          uuid:'L\'UUID est invalide. il doit être composé de un à sept chiffres.',
          isbn_article:'L\'ISBN de l\'article est invalide. il doit être composé de sept chiffres.',
          title:'Le titre est invalide il doit comporter au moins deux caractères et ne peut contenir que des lettres, des chiffres, des espaces ou le tiret (-).',
          authors:'Le champs des auteurs est invalide il doit comporter au moins deux caractères et ne peut contenir que des lettres, des espaces ou le tiret (-).',
          metadata:'Le champs metadata est invalide',
          nav:'Le champs nav est invalide',
          editor_id:'Le champs Id éditeur est invalide',
          user_id:'Le champs Id utilisateur est invalide',
        };
  }
  //#region BASE
  checkers = (entity,fieldControls) =>{
    const validations = {};
    fieldControls.forEach(field => {
      validations[field] = this.regex[field].test(String(entity[field]))
        ? false : this.valid[field] ;
    });
    return validations;
  };

  hasErrorsInValidations = (validations) =>{
    for( const val in validations ){if(validations[val]){return true;}}
    return false;
  };

  CleanValidationsResponse = (validations) =>{
    for (let prop in validations) {
      if (validations[prop] === false) {
        validations[prop] = 'paramètre validé.';
      }
    }
    return validations;
  };
  //#endregion

  //#region UTILS
  jsonTryParse = (jsonString) => {try {return JSON.parse(jsonString);} catch {return false;}};
  //#endregion

  //#region AUTH
  /**
   * Vérifie les informations de connexion de l'utilisateur.
   *
   * @param {Object} user - L'objet utilisateur contenant les informations de connexion.
   * @param {string} user.Email - L'adresse email de l'utilisateur.
   * @param {string} user.Password - Le mot de passe de l'utilisateur.
   * @returns {boolean} - Retourne true si les informations sont valides, sinon false.
   */
  loginCheck = (user) => this.checkers(user,['Email','Password']);

  /**
   * Compares the user's password with the password confirmation.
   *
   * @param {Object} user - The user object containing password fields.
   * @param {string} user.Password - The user's password.
   * @param {string} user.PasswordConfirme - The user's password confirmation.
   * @returns {boolean} - Returns true if the password and password confirmation match, otherwise false.
   */
  passwordConfirmer = (user) => user.Password === user.PasswordConfirme;

  /**
   * Vérifie les informations d'enregistrement de l'utilisateur.
   *
   * @param {Object} registrationUser - L'utilisateur en cours d'enregistrement.
   * @param {string} registrationUser.Password - Le mot de passe de l'utilisateur.
   * @throws {AuthError} - Si la confirmation du mot de passe échoue ou si des erreurs de validation sont trouvées.
   * @returns {Object} - Un objet contenant un code de statut et l'utilisateur à enregistrer.
   */
  async userLoginCheck(pool,registrationUser) {
    const validations = this.loginCheck(registrationUser);
    if (this.hasErrorsInValidations(validations)) {
      this.CleanValidationsResponse(validations);
      throw new AuthError(
        messages.api.auth['405'].message,
        'Validations.hasErrorsInValidations',
        validations
      );
    }
    await logger.info(pool, JSON.stringify({ userLoginCheck: registrationUser }));
    return registrationUser;
  }
  //#endregion
}
const validations = new Validations();

export { validations };
