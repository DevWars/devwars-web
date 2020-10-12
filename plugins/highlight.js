import highlight from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

highlight.registerLanguage('html', xml);
highlight.registerLanguage('css', css);
highlight.registerLanguage('js', javascript);

export default highlight;
