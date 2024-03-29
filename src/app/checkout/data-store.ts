import { ICurrency } from "./interfaces/currency-interface";
import { IPaymentMethod } from "./interfaces/payment-method-interface";

export const PAYPAL_PLANS= [
  'MERCHANT_INITIATED_BILLING',
  'MERCHANT_INITIATED_BILLING_SINGLE_AGREEMENT',
  'CHANNEL_INITIATED_BILLING',
  'CHANNEL_INITIATED_BILLING_SINGLE_AGREEMENT',
  'RECURRING_PAYMENTS',
  'PRE_APPROVED_PAYMENTS'
]

export const CURRENCIES: ICurrency[] = [
  { iso4217: 'AED', base: 100 },
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
    { iso4217: 'SAR', base: 100 },
    { iso4217: 'USD', base: 100 },
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
      type: 'benefit',
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
      },
      {
        name: 'Tamara',
        type: 'tamara',
        restrictedCurrencyCountryPairings: {
          'BHD': ['BH'],
          'AED': ['AE'],
          'KWD':['KW'],
          'QAR':['QA'],
          'SAR':['SA']
        }
      }
  ]

  export enum WebhookEvents {
    Pending = 'payment_pending',
    Authorized = 'payment_approved',
    Voided = 'payment_voided',
    VoidDeclined = 'payment_void_declined',
    CapturePending = 'payment_capture_pending',
    Captured = 'payment_captured',
    CapturedDeclined = 'payment_capture_declined',
    RefundPending = 'payment_refund_pending',
    Refunded = 'payment_refunded',
    RefundDeclined = 'payment_refund_declined',
    Canceled = 'payment_canceled',
    Expired = 'payment_expired',
    Declined = 'payment_declined',
    Returned = 'payment_returned'
  }