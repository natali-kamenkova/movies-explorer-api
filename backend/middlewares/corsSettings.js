const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'https://localhost:3000',
  'http://localhost:3000',
  'localhost:3000',
  'https://api.natali.nomoredomains.monster',
  'http://api.natali.nomoredomains.monster',
  'https://natali.nomoredomains.monster',
  'http://natali.nomoredomains.monster',
  'api.natali.nomoredomains.monster',
  'natali.nomoredomains.monster',
];

const corsFunction = {
  origin(origin, callback) {
    console.log(origin);
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
};

module.exports = { corsFunction };
