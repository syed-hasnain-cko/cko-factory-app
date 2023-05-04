// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gateway: "checkoutltd",
  gatewayMerchantID: "pk_sbox_7za2ppcb4pw7zzdkfzutahfjl4t",
  baseAPIUrl:"https://api.sandbox.checkout.com",
  publicKey:"pk_sbox_7za2ppcb4pw7zzdkfzutahfjl4t", //NAS
  secretKey: "sk_sbox_dqmcmja373yetcnwkrwi6x6biyv", //NAS
  currencyAccountId:"ca_bit44sueegdejo6fye55n262se",
  processingChannelId:"pc_oxr4t4p3nseejeqdjqk3pdlpm4"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
