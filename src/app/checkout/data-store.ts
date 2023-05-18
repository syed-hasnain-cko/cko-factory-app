import { ICurrency } from "./interfaces/currency-interface";
import { IPaymentMethod } from "./interfaces/payment-method-interface";

export const CURRENCIES: ICurrency[] = [
    { iso4217: 'ARS', base: 100 },
    { iso4217: 'AUD', base: 100 },
    { iso4217: 'BHD', base: 1000 },
    { iso4217: 'BRL', base: 100 },
    { iso4217: 'CHF', base: 100 },
    { iso4217: 'CNY', base: 100 },
    { iso4217: 'COP', base: 100 },
    { iso4217: 'EGP', base: 100 },
    { iso4217: 'EUR', base: 100 },
    { iso4217: 'GBP', base: 100 },
    { iso4217: 'HKD', base: 100 },
    { iso4217: 'KWD', base: 1000 },
    { iso4217: 'MXN', base: 100 },
    { iso4217: 'NOK', base: 100 },
    { iso4217: 'NZD', base: 100 },
    { iso4217: 'PLN', base: 100 },
    { iso4217: 'QAR', base: 100 },
    { iso4217: 'SEK', base: 100 },
    { iso4217: 'SGD', base: 100 },
    { iso4217: 'USD', base: 100 }
  ];

  export const PAYMENT_METHODS: IPaymentMethod[] = [
    {
      name: 'Credit Card (Frames)',
      type: 'frames',
      restrictedCurrencyCountryPairings: null
    },
    {
      name: 'Bancontact',
      type: 'bancontact',
      restrictedCurrencyCountryPairings: {
        'EUR': ['BE']
      }
    },
    {
      name: 'BenefitPay',
      type: 'benefitpay',
      restrictedCurrencyCountryPairings: {
        'BHD': ['BH']
      }
    },
    {
      name: 'eps',
      type: 'eps',
      restrictedCurrencyCountryPairings: {
        'EUR': ['AT']
      }
    },
    {
      name: 'Fawry',
      type: 'fawry',
      restrictedCurrencyCountryPairings: {
        'EGP': ['EG']
      }
    },
    {
      name: 'giropay',
      type: 'giropay',
      restrictedCurrencyCountryPairings: {
        'EUR': ['DE']
      }
    },
    {
      name: 'Google Pay',
      type: 'googlepay',
      restrictedCurrencyCountryPairings: null
    },
    {
      name: 'iDEAL',
      type: 'ideal',
      restrictedCurrencyCountryPairings: {
        'EUR': ['NL']
      }
    },
    {
      name: 'Klarna',
      type: 'klarna',
      restrictedCurrencyCountryPairings: {
        'EUR': ['AT', 'DE', 'FI', 'NL'],
        'DKK': ['DK'],
        'GBP': ['GB'],
        'NOK': ['NO'],
        'SEK': ['SE']
      }
    },
    {
      name: 'KNet',
      type: 'knet',
      restrictedCurrencyCountryPairings: {
        'KWD': ['KW']
      }
    },
    {
      name: 'Multibanco',
      type: 'multibanco',
      restrictedCurrencyCountryPairings: {
        'EUR': ['PT']
      }
    },
    {
      name: 'PayPal',
      type: 'paypal',
      restrictedCurrencyCountryPairings: null
    },
    {
      name: 'Przelewy24',
      type: 'p24',
      restrictedCurrencyCountryPairings: {
        'EUR': ['PL'],
        'PLN': ['PL']
      }
    },
    {
      name: 'QPay',
      type: 'qpay',
      restrictedCurrencyCountryPairings: {
        'QAR': ['QA']
      }
    },
    {
      name: 'SEPA Direct Debit',
      type: 'sepa',
      restrictedCurrencyCountryPairings: {
        'EUR': ['AD', 'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'SM', 'VA']
      }
    },
    {
      name: 'Sofort / Pay Now',
      type: 'sofort',
      restrictedCurrencyCountryPairings: {
        'EUR': ['AT', 'BE', 'DE', 'ES', 'IT', 'NL']
      }
    },
    {
        name: 'Trustly',
        type: 'trustly',
        restrictedCurrencyCountryPairings: {
          'EUR': ['AT', 'LV', 'DE', 'ES', 'UK', 'NL', 'CZ', 'DK','EE','FI','LT','NO','SE']
        }
      }
  ]