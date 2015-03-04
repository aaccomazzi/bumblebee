define([], function() {
  "use strict";
  return {

    /**
     * The url to the API services, if you develop locally,
     * (and have created tunnel to the API) you can set this
     * to //localhost:5000/v1 - but since our API allows for
     * limited number of cross-site requests (from origin
     * of 'http://localhost:8000' you can also use the production
     * API of //api.adslabs.org/v1/
     */
    apiRoot: '//api.adslabs.org/v1/',

    /**
     * to let bumblebee discover oauth access_token at boot time
     * and load dynamic configuration (which will be merged with
     * the default config)
     * this can be absolute url; or url relative to the api path
     */
    bootstrapUrls: ['../bootstrap'],

    /**
     * If you have activated Orcid module, these settings
     * are necessary (showing sandbox/testing values):
     *  orcidClientId: 'APP-P5ANJTQRRTMA6GXZ'
     *  orcidApiEndpoint: 'https://api.sandbox.orcid.org/v1.2'
     */
    //orcidClientId: 'APP-P5ANJTQRRTMA6GXZ',
    //orcidApiEndpoint: 'https://api.sandbox.orcid.org/v1.2',

    //orcidProxy: '/oauth/',

    /**
     *  pushState: when true, urls are without hashtag '#'
     *  root is the url, under which your application is
     *  deployed, eg. /foo/bar if the main page lives at
     *  http://somewhere.org/foo/bar/index.html
     */
    routerConf: {
      pushState: false,
      root: '/',
    },

    /**
     * When set to true, window.app will contain reference to
     * to the application object
     */
    debug: true,
    debugExportBBB: true,

    /**
     * To get debugging output in console
     */
//    debug: true,

    orcidClientId: 'APP-P5ANJTQRRTMA6GXZ',
    orcidLoginEndpoint: 'http://sandbox.orcid.org/oauth/authorize',
    orcidApiEndpoint:  '//api.adslabs.org/v1/orcid'
  }
});
