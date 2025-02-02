const   messages= {
  api:{
    response:{
      200:{
        status:200,
        statusText:'OK',
        message:'✅SUCCESS✅'
      },
      400: {
        status:400,
        statusText:'Bad Request',
        message:'💥Nous ne pouvons traiter votre demande.💥',
      },
      401: {
        status:401,
        statusText:'Unauthorized',
        message:'🛑Vous n\'êtes pas autorisé à effectuer cette action. Veuillez vous authentifier.🛑',
      },
      403: {
        status:403,
        statusText:'Forbidden',
        message:'🛑Vous n\'êtes pas autorisé à effectuer cette action. Veuillez contactez le support.🛑',
      },
      404:{
        status:404,
        statusText:'Not Found',
        message:'💥Nous ne pouvons traiter votre demande.💥',
      },
      500: {
        status:500,
        statusText:'Internal Server Error',
        message:'💥Une erreur est survenue. Veuillez contactez le support.💥'
      },
      501: {
        status:501,
        statusText:'Internal Request Error',
        message:'💥 Votre demande ne peut pas aboutir. Veuillez contactez le support.💥'
      },
    },
    auth: {
      200:{
        status:200,
        statusText:'OK',
        message:'✅Vous êtes connecté.✅'
      },
      201:{
        status:201,
        statusText:'Created',
        message:'✅Bienvenue. Vous êtes enregistré.✅'
      },
      202:{
        status:202,
        statusText:'Updated',
        message:'✅Votre profil à bien été mise à jour.✅'
      },
      203:{
        status:202,
        statusText:'Deleted',
        message:'✅Votre profil à bien été supprimé.✅'
      },
      204:{
        status:204,
        statusText:'No Content',
        message:'✅Vous êtes authentifié.✅'
      },
      205:{
        status:204,
        statusText:'No Content',
        message:'✅Votre compte a été réactivé.✅'
      },
      206:{
        status:204,
        statusText:'No Content',
        message:'✅Vous êtes déconnecté.✅'
      },
      400: {
        status:400,
        statusText:'Not Authorized',
        message:'⚠️Ce mail est déjà utilisé.⚠️'
      },
      401: {
        status:401,
        statusText:'Not Authorized',
        message:'🛑Les identifiants sont incorrects.🛑'
      },
      402: {
        status:401,
        statusText:'Not Authorized',
        message:'⚠️Les mots de passe ne sont pas identiques.⚠️'
      },
      403:{
        status:403,
        statusText:'Forbidden',
        message:'🛑Cette E-mail est déjà utilisé.🛑'
      },
      404:{
        status:404,
        statusText:'Internal Server Error',
        message:'🛑L\'enregistrement du nouvel utilisateur à échoué.🛑'
      },
      405:{
        status:405,
        statusText:'Request Error',
        message:'🛑Des erreurs de validations ont été détectées.🛑'
      }
    },
    db:{
      100:{
        status:500,
        statusText:'Internal Server DB Error',
        message:'💥l\'enregistrement du log a échoué.💥'
      },
      200:{
        status:500,
        statusText:'Internal Server DB Error',
        message:'💥La recherche de l\'utilisateur à provoquer une erreur.💥'
      },
      201:{
        status:500,
        statusText:'Internal Server DB Error',
        message:'💥Une erreur est survenue lors de l\'enregistrement de l\'utilisateur.💥'
      }
    },
    dev:{
      info:'🚀 LOG INFORMATION 🚀'
    }
  },
};

export { messages };
