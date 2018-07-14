const axios = require('axios');
const cheerio = require('cheerio');

const { mjml2html } = require('mjml');

const NUXT_SELECTOR = '#__nuxt';

const translate_request_to_mjml = async (req) => {
    const body = req.body;

    try {
        // Get the HTML content from a SSR app
        const { data } = await axios({
            method: "GET",
            url: `mail${req.url.toString()}`,
            params: body,
            baseURL: "http://localhost:3000"
        });

        // Load up the HTML Content for parsing
        const $ = cheerio.load(data);

        // Get the meta
        const meta = $('div[subject]');

        const attributes = meta.attr();

        // Remove the meta element so we don't
        // mess up the email's final output
        meta.remove();

        // Email content is wrapped inside of the Nuxt Root Element
        const email_content = $(NUXT_SELECTOR).html();

        // Let's compile the rendered vue template into an MJML email
        const { html } = mjml2html(email_content);

        // Write the meta with the content back to the server
        return {
            ...attributes,
            html,
        };
    } catch (e) {
        console.error(e);
    }

    return null;
};

module.exports = translate_request_to_mjml;
