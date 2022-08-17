import { Dayjs } from 'dayjs'
import { getStrapiMedia } from '@/utils/media'
import { ArticleDto } from '../api'
import { countWords } from '~~/utils/countWords'

export class Article {
    static AVERAGE_READING_WPM = 250
    static FRIENDLY_DATE_MONTH_CEIL = 6

    getPublishedAtDisplay(date: Dayjs): string {
        // const { $dayjs } = useNuxtApp();
        return ($dayjs() as Dayjs).to(date);
    }

    static calcMinutesToRead(content: string): number {
        const wordCount = countWords(content, { isHtml: true }).wordsCount

        // const wordCount = Article.AVERAGE_READING_WPM
        return Math.ceil(wordCount / Article.AVERAGE_READING_WPM)
    }

    id: number
    title: string
    subtitle: string
    summary?: string
    body?: string
    slug: string
    points: number
    publishedAt: Dayjs
    publishedAtDisplay: string
    publishedDateDisplay: string
    minutesToRead: number
    // author?: Author
    thumbnail?: any
    thumbnailUrl?: string
    dto: ArticleDto

    constructor(dto: ArticleDto) {
        this.dto = dto
        this.id = dto.id
        this.title = dto.title
        this.subtitle = dto.subtitle
        this.summary = dto.summary
        this.body = dto.body;
        this.slug = dto.slug
        this.points = dto.points
        this.publishedAt = $dayjs(dto.publishedAt)

        this.publishedAtDisplay = this.getPublishedAtDisplay(this.publishedAt)

        this.publishedDateDisplay = this.publishedAt.format('MMM D')
        if (this.publishedAt.year() !== $dayjs().year()) {
            this.publishedDateDisplay = this.publishedAt.format('MMM D, YYYY')
        }

        const monthsPublished = $dayjs().diff(this.publishedAt, 'month')
        if (monthsPublished >= Article.FRIENDLY_DATE_MONTH_CEIL) {
            this.publishedAtDisplay = this.publishedDateDisplay
        }

        if (!dto.publishedAt) {
            const draftDisplay = 'Draft'
            this.publishedAtDisplay = draftDisplay
            this.publishedDateDisplay = draftDisplay
        }

        this.minutesToRead = Article.calcMinutesToRead(this.body)

        // if (dto.author) {
        //     this.author = new Author(dto.author)
        // }

        if (dto.thumbnail) {
            this.thumbnail = dto.thumbnail
            this.thumbnailUrl = getStrapiMedia(
                this.thumbnail.formats.thumbnail.url
            )
        }
    }

    get editLink(): string {
        return `/edit/${this.slug}`
    }

    get readLink(): string {
        return `/${this.slug}`
    }

    get isPublished(): boolean {
        return Boolean(this.dto.publishedAt)
    }

    getEditBody(): string {
        const titleEl = document.createElement('h1')
        titleEl.innerText = this.title

        const subtitleEl = document.createElement('p')
        subtitleEl.innerText = this.subtitle;

        const doc = new DOMParser().parseFromString(this.body, 'text/html')
        doc.documentElement.prepend(titleEl, subtitleEl)

        return doc.documentElement.outerHTML
    }
}