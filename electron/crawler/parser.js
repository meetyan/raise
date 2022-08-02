import * as cheerio from 'cheerio'

/**
 * Parse and convert repos from html into machine readable format
 * @param {*} html
 */
export const parseRepos = html => {
  const $ = cheerio.load(html)

  const result = $('.Box-row')
    .get()
    .map(repo => {
      const url = $(repo).find('.h3 a').first().attr('href').substr(1)
      const [author, name] = url.split('/')
      const description = $(repo).find('p').text().trim()
      const language = $(repo).find('.f6 .d-inline-block span').text()

      const [stars, forked] = $(repo)
        .find('.f6 a')
        .get()
        .map(item => $(item).text().trim())

      const builtBy = $(repo)
        .find('.f6 .d-inline-block a img')
        .get()
        .map(item => ({
          name: $(item).attr('alt'),
          avatar: $(item).attr('src'),
        }))

      const starsToday = $(repo)
        .find('.f6 .d-inline-block')
        .last()
        .text()
        .trim()
        .replace(' stars today', '')

      return {
        author,
        repo: name,
        description,
        language,
        url: `https://github.com/${url}`,
        stars,
        forked,
        builtBy,
        starsToday,
      }
    })

  return result
}
