const { mjml2html } = require('mjml');
const url = require('url');
const axios = require('axios');
const cheerio = require('cheerio')

module.exports = async function (req, res, next) {
    const body = req.body;

    try {
        const response = await axios({
            method: "POST",
            url: `mail${req.url.toString()}`,
            data: body,
            baseURL: "http://localhost:3000"
        });

        const $ = cheerio.load(response.data);
        const email_content = $('#__layout').html();

        const { html, errors } = mjml2html(email_content);
        console.log(html, errors);
        res.write(html);
    } catch (e) {
        console.error(e);
    } finally {
        res.end();
    }

    res.end();
};
