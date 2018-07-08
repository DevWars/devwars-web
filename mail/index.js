const axios = require('axios');
const cheerio = require('cheerio');

const { mjml2html } = require('mjml');

const NUXT_SELECTOR = '__nuxt';

module.exports = async function (req, res) {
    const body = req.body;

    try {
        // Get the HTML content from a SSR app
        const { data } = await axios({
            method: "POST",
            url: `mail${req.url.toString()}`,
            data: body,
            baseURL: "http://localhost:3000"
        });

        // Load up the HTML Content for parsing
        const $ = cheerio.load(data);

        // Get the meta
        const meta = $('div[subject]').attributes;
        const { subject } = meta;

        // Remove the meta element so we don't
        // mess up the email's final output
        meta.remove();

        // Email content is wrapped inside of the Nuxt Root Element
        const email_content = $(NUXT_SELECTOR).html();

        // Let's compile the rendered vue template into an MJML email
        const { html } = mjml2html(email_content);

        // Write the meta with the content back to the server
        res.write(JSON.stringify({
            html,
            subject,
        }), "utf8");
    } catch (e) {
        console.error(e);
    } finally {
        res.end();
    }

    res.end();
};
