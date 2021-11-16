

const multipliers = {
  SI: 1.2,
  UA: 1.5,
  LX: 1.8,
  FR: 1.9,
  DE: 2.5,
}

const BASE_PRICE = 10;

const calculatePackagePrice = (packageItem, countryFrom, countryTo) => {
  let price;

  let dimensionMultiplier = Math.max((packageItem.width * packageItem.height * packageItem.length * packageItem.weight) / 100000, 1);

  price = BASE_PRICE * dimensionMultiplier;

  const countryMultiplier = (multipliers[countryFrom] + multipliers[countryTo]) / 2
  price = price * countryMultiplier;
  return Math.round(price);
}

const calculatePrice = (packages = [], countryFrom, countryTo) => {
  const packagesPrices = packages.map(payloadPackage => ({
    price: calculatePackagePrice(payloadPackage, countryFrom, countryTo),
  }));

  const totalPrice = packagesPrices.reduce((previousValue, currentValue) => {
    previousValue += currentValue.price;
    return previousValue;
  }, 0);


  return {
    packages: packagesPrices,
    totalPrice,
  }
}

module.exports = calculatePrice;
