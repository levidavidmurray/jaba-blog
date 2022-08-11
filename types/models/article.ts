import dayjs, { Dayjs } from 'dayjs'
import { getStrapiMedia } from '@/utils/media'
import { ArticleDto } from '../api'

export class Article {
    static AVERAGE_READING_WPM = 250

    static getPublishedAtDisplay(date: Dayjs): string {
        const { $dayjs } = useNuxtApp();
        return ($dayjs() as Dayjs).to(date);
        return dayjs().to(date);
        if (date.year() < dayjs().year()) {
            return dayjs(date).format('MMM DD, YYYY')
        }

        // Current year
        return dayjs(date).format('MMM DD')
    }

    id: number
    title: string
    subtitle: string
    summary?: string
    body?: string
    slug: string
    publishedAt: Dayjs
    publishedAtDisplay: string
    minutesToRead?: number
    // author?: Author
    thumbnail?: any
    thumbnailUrl?: string

    constructor(dto: ArticleDto) {
        this.id = dto.id
        this.title = dto.title
        this.subtitle = dto.subtitle
        this.summary = dto.summary
        this.body = dto.body;
        this.slug = dto.slug
        this.publishedAt = dayjs(dto.publishedAt)
        this.publishedAtDisplay = Article.getPublishedAtDisplay(
            this.publishedAt
        )

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