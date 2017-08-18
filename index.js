const Yelp = require("yelp-fusion");
const Foursquare = require("node-foursquare-venues");
const Zomato = require("zomato");
const Factual = require("factual-api");

/**
 * 
 * A package to obtain data on restaurants. 
 * 
 * There are many Places and Restaurant APIs out there. Sometimes it's hard to decide which one suits 
 * your needs the best. In the event that there is no perfect API out there for you, combining data from
 * multiple sources may be your best bet. With this module you can specify which APIs you want to use
 * and it'll make calls to each API and attempt to combine the data together to form one comprehensive list.
 * 
 * @class
 */

module.exports = class GlobalFood {

    /**
     * 
     * The ID used in Yelp Fusion API calls
     * 
     * @protected
     * @type { string }
     * 
     */
    yelpID;

    /**
     * 
     * The secret used in the Yelp Fusion API calls
     * 
     * @protected
     * @type { string }
     * 
     */
    yelpSecret;

    /**
     * 
     * The client that communicates with the Yelp API
     * 
     * @type { YelpClient }
     * 
     */
    yelpClient;

    /**
     * 
     *  The client that communicates with the Foursquare API
     * 
     * @type { object }
     * 
     */
    foursquareClient;

    /**
     * 
     * The client that communicates with the Zomato API
     * 
     * @type { object }
     * 
     */
    zomatoClient;

    /**
     * 
     * The client that communicates with the Factual API
     * 
     * @type { object }
     * 
     */
    factualClient;

    constructor(cred) {
        setCredentials(creds);
    }

    setCredentials(creds) {
        if (creds) {
            setYelpCredentials(creds);
            setFoursquareCredentials(creds);
            setZomatoCredentials(creds);
            setFactualCredentials(creds);
        }
    }

    /**
     * 
     * Sets the ID and secret for the Yelp API.
     * If the new credentials are valid then it authenticates them with Yelp to get an access token.
     * 
     * @param { { yelpID: string, yelpSecret: string } } creds 
     * @return { void }
     * 
     */
    setYelpCredentials(creds) {
        this.yelpID = creds.yelpID || this.yelpID;
        this.yelpSecret = creds.yelpSecret || this.yelpSecret;

        // If passed new credentials
        if (creds.yelpID && creds.yelpSecret) {

            // Gets a new access token for those credentials
            Yelp.accessToken(this.yelpID, this.yelpSecret)
                .then((res) => {

                    // Creates a new client to call the Yelp API with
                    this.yelpClient = yelp.client(res.jsonBody.access_token);
                })
                .catch((err) => {
                    // TODO: Handle error
                })
        }
    }

    /**
     * 
     * If provided with new credentials, it creates a new Foursquare client
     * 
     * @param { { foursquareID: string, foursquareSecret: string, foursquareVersion: string, foursquareMode: any } } creds 
     *
     */
    setFoursquareCredentials(creds) {
        // If new credentials
        if (creds.foursquareID && creds.foursquareSecret) {
            this.foursquareClient = Foursquare(creds.foursquareID, creds.foursquareSecret, 
                creds.foursquareVersion, creds.foursquareMode)
        }
    }

    /**
     * 
     * Creates a new Zomato client if provided with a new key
     * 
     * @param { { zomatoKey: string } } creds 
     * 
     */
    setZomatoCredentials(creds) {
        if (creds.zomatoKey) {
            this.zomatoClient = Zomato.createClient({ userKey: creds.zomatoKey });
        }
    }

    /**
     * 
     * Creates a new Factual client if provided with a new key and secret
     * 
     * @param { { factualKey: string, factualSecret: string } } creds 
     * 
     */
    setFactualCredentials(creds) {
        if (creds.factualKey && creds.factualSecret) {
            this.factualClient = new Factual(creds.factualKey, creds.factualSecret);
        }
    }

    search(options = {}) {

    }


}