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
 * TODO - (Email there was an error to sergnioa@gmail.com [CONST]
 */

/**
 * Login using sergnio : pizza into blight of the immortals
 */

const main = async () => {
    const username = 'sergnio';
    const password = 'pizza';
    const gameId = 6424348586934272;

    try {
        const cookie = await login(username, password);

        const skipResponse = await skip(gameId, cookie);

        const data = skipResponse.data;

        if (data.report !== 'abort') {
            let currentTime = new Date();
            const gameState = data.report.paused ? 'paused' : 'unpaused';
            logger.info(`Success! Game ${gameId} is now ${gameState} at ${currentTime}`)
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
