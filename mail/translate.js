const translate_request_to_mjml = require('./index');

module.exports = async function (req, res) {
    try {
        const data = await translate_request_to_mjml(req);

        res.write(JSON.stringify(data));
    } catch (e) {
        res.write(JSON.stringify(e));
    } finally {
        res.end();
    }
};
