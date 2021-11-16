const countries = require('./countries');

const validateDimension = (value, dimension) =>  {
  if (!value) {
    return 'You need to provide package ' + dimension;
  }

  if (dimension !== 'weight' && value < 10) {
    return 'This value needs to be higher than 10';
  }

  if (value > 200) {
    return 'This value cannot be higher than 200';
  }
}

const validatePackage = (data, index) => {
  const errors = [];


  const dimensions = ['width', 'height', 'weight', 'length'];

  dimensions.forEach(dimension => {
    const error = validateDimension(data[dimension], dimension);
    if (error) {
      errors.push({
        name: `packages[${index}].${dimension}`,
        message: error,
      })
    }
  });

  return errors;
}

const validateCountry = (country) => {
  if (!country) {
    return 'This field is required';
  }

  const countryIds = countries.map(c => c.id);
  if (!countryIds.includes(country)) {
    return `This value needs to match with one of the following country IDs: ${countryIds.join(', ')}`;
  }
}

const validatePayload = (data) => {
  let errors = [];

  const fromError = validateCountry(data.countryFrom);
  if (fromError) {
    errors.push({
      name: 'countryFrom',
      message: fromError,
    })
  }

  const toError = validateCountry(data.countryTo);
  if (toError) {
    errors.push({
      name: 'countryTo',
      message: toError,
    })
  }

  if (!data.packages || !Array.isArray(data.packages)) {
    errors.push({
      name: 'packages',
      message: 'You need to provide packages data',
    });
    return errors;
  }

  data.packages.forEach((p, index) => {
    const packageErrors = validatePackage(p, index);
    if (packageErrors) {
      errors = errors.concat(packageErrors);
    }
  })

  return errors;
};

module.exports = validatePayload;
