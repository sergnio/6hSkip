const axios = require('axios');
const winston = require('winston');

/**
 * Set up logger
 * @type {winston.Logger}
 */
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logfile.log' })
    ]
});

/**
 * NOTES
 *
 * STEP 1 X
 *
 * I want to log in (login which takes username, password)
 * grab the auth cookie
 * set the auth cookie in the headers
 * then I want to call the skip ahead api
 * using the game id and my auth cookie
 *
 * IF FAIL:
 * Simply log the error
 * (Email there was an error to sergnioa@gmail.com [CONST]
 *
 * STEP 2
 *
 * After I'm able to successfully call this with a node command
 * I want to run this on a cron schedule.
 *
 * to test this, I can simply set the cron schedule to 1 minute from now
 * Then wait to see if the script runs
 *
 * STEP 3 X
 *
 * Create a function, skip (takes a game id), which first calls login.
 * login will return a cookie
 * skip will take the cookie, set it in the header
 * skip will then call the skip 6 hours endpoint in our game
 *
 * IF FAIL:
 * * Log error [LOG ERROR FUNCTION]
 * (email error to serginoa@gmail.com)
 *
 * STEP 4 X
 *
 * Main will call skip
 *
 * STEP 5
 *
 * Extract log error function
 *
 * STEP 6
 *
 * Send email if there are errors
 *
 * Success!
 *
 */

/**
 * Login using sergnio : pizza into blight of the immortals
 */

const main = async () => {
    const username = 'sergnio';
    const password = 'pizza';
    const gameId = 6395812891328512;

    try {
        const cookie = await login(username, password);

        const skipResponse = await skip(gameId, cookie);

        const data = skipResponse.data;

        if (data.report !== 'abort') {
            const gameState = data.report.paused ? 'paused' : 'unpaused';
            logger.info(`Success! Game ${gameId} is now ${gameState}`)
        } else {
            logger.error(`Error, something wrong happened. Report: ${data.report}`);
        }
    } catch (e) {
        logger.error(e);
    }


};

const skip = async (gameId, cookie) => {
    const skipUrl = `https://blight.ironhelmet.com/grequest/order?type=order&order=toggle_pause_game&age=129611&game_number=${gameId}&build_number=1052`;

    try {
        return await axios.request(
            {
                url: skipUrl,
                method: 'post',
                headers: {cookie}
            }
        );

    } catch (e) {
        logger.error(`Oops! Something went really wrong. Error : ${e}`)
    }
};

const login = async (username, password) => {
    const loginUrl =
        `https://blight.ironhelmet.com/arequest/
        login?type=login&alias=${username}&password=${password}`;
    try {
        let response = await axios.post(loginUrl);

        // Returns a string, containing various info such as:
        // max-age, expiration, and auth token
        const authInfo = response.headers['set-cookie'][0];
            // Separates all information by ';' delimiter
            // i.e. ['auth=xxx', 'Max-Age=233', 'Path=/', 'expires=Sun, 27...']
            // Then grab the auth=TOKEN string at index 0
            // i.e. ['auth=xxx']
        return authInfo.split(';')[0];
    } catch (err) {
        logger.error(`Oops! Something happened while logging in ${err}`);
    }
};

main();
