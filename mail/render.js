const translate_request_to_mjml = require('./index');

module.exports = async function (req, res) {
    try {
        const { html } = await translate_request_to_mjml(req);

        res.write(html);
    } catch (e) {
        res.write(JSON.stringify(e));
    } finally {
        res.end();
    }
};
