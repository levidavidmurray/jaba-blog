import htmlToText from 'html-to-text'
import regex from 'word-regex'

export const countWords = (text, config) => {
    const result = {
        wordsCount: 0
    };
    const plainText = config && config.isHtml
        ? htmlToText.fromString(text, { ignoreHref: true, ignoreImage: true })
        : text;
    if (plainText.length > 0) {
        var match = plainText.match(regex());
        result.wordsCount = match ? match.length : 0;
    }
    return result;
}
