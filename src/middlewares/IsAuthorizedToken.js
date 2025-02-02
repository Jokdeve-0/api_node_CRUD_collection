import jwt from 'jsonwebtoken';

const IsAuthorizedToken = async (req, res, next) => {
  try {
    let token  = req.cookies['addictocode'];

    if(!token){
      token = req.headers['x-addictocode-apikey'];
    }

    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé : Token manquant' });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    // Gestion des erreurs JWT
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Le token a expiré' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Signature invalide' });
    } else {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
};

export { IsAuthorizedToken };
