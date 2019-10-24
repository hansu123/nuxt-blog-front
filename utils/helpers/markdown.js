import marked from "marked";
import highlight from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import php from "highlight.js/lib/languages/php";
import python from "highlight.js/lib/languages/python";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
highlight.registerLanguage("javascript", javascript);
highlight.registerLanguage("css", css);
highlight.registerLanguage("php", php);
highlight.registerLanguage("python", python);
highlight.registerLanguage("sql", sql);
highlight.registerLanguage("bash", bash);

const emitMarkDown = content => {
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
            return highlight.highlightAuto(code).value;
        }
    });
    return marked(content)
}

export default emitMarkDown