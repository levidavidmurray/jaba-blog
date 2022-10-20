const fs = require('fs')
const convert = require('xml-js')
const dayjs = require('dayjs')
const axios = require('axios').default

const dateFormat = 'YYYY-MM-DD'

const baseUrl = 'https://lolidk.me'

const baseObj = {
    _declaration: {
        _attributes: {
            version: "1.0",
            encoding: "UTF-8"
        },
    },
    urlset: {
        _attributes: {
            xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        },
        url: [
            {
                loc: { _text: baseUrl },
                lastmod: { _text: dayjs().format(dateFormat) },
            },
        ]
    }
}

const fetchArticles = async () => {
    const { data } = await axios.get('https://api.lolidk.me/api/articles')
    return data?.data || []
}

const genSitemap = async () =>  {
    const articles = await fetchArticles()
    for (const { slug, updatedAt } of articles) {
        baseObj.urlset.url.push({
            loc: { _text: `${baseUrl}/${slug}` },
            lastmod: { _text: dayjs(updatedAt).format(dateFormat) }
        })
    }
    const sitemap = convert.js2xml(baseObj, { compact: true, spaces: 4 })
    fs.writeFileSync('./public/sitemap.xml', sitemap)
}

genSitemap()
