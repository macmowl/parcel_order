const calculatePrice = require('./priceEngine');
const validatePayload = require('./validate');
const countries = require('./countries');


const proxy = {
  // Priority processing.
  // apiMocker(app, path, option)
  // This is the option parameter setting for apiMocker
  _proxy: {
    changeHost: true,
    // modify the http-proxy options
    httpProxy: {
      options: {
        ignorePath: true,
      },
    },
  },
  // =====================
  // The default GET request.
  // https://github.com/jaywcjlove/mocker-api/pull/63
  '/api/user': {
    id: 1,
    username: 'kenny',
    sex: 6
  },
  'GET /api/user': {
    id: 1,
    username: 'kenny',
    sex: 6
  },
  'GET /api/countries': countries,

  'POST /api/quote': (req, res) => {
    const errors = validatePayload(req.body);

    if (errors.length) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    const { packages, countryFrom, countryTo } = req.body;
    const prices = calculatePrice(packages, countryFrom, countryTo);

    return res.json({
      success: true,
      quote: prices,
    });
  },
  'POST /api/order': (req, res) => {
    const errors = validatePayload(req.body);

    if (errors.length) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    const { packages, countryFrom, countryTo } = req.body;
    const prices = calculatePrice(packages, countryFrom, countryTo);

    return res.json({
      success: true,
      message: "Order successfully created",
      totalPrice: prices.totalPrice,
    });
  },
}


module.exports = proxy;
