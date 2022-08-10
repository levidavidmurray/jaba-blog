import dayjs, { Dayjs } from 'dayjs'
import { getStrapiMedia } from '@/utils/media'
import { ArticleDto } from '../api'

export class Article {
    static AVERAGE_READING_WPM = 250

    id: number
    title: string
    subtitle: string
    summary?: string
    content?: string
    slug: string
    publishedAt: Dayjs
    publishedAtDisplay: string
    minutesToRead?: number
    // author?: Author
    thumbnail?: any
    thumbnailUrl?: string

    constructor(dto: ArticleDto, codeHighlight?: boolean) {
        const { attributes } = dto;
        this.id = dto.id
        this.title = attributes.title
        this.subtitle = attributes.subtitle
        this.summary = attributes.summary
        this.slug = attributes.slug
        this.publishedAt = dayjs(attributes.publishedAt)
        this.publishedAtDisplay = Article.getPublishedAtDisplay(
            this.publishedAt
        )

        // if (attributes.author) {
        //     this.author = new Author(attributes.author)
        // }

        if (attributes.thumbnail) {
            this.thumbnail = attributes.thumbnail
            this.thumbnailUrl = getStrapiMedia(
                this.thumbnail.formats.thumbnail.url
            )
        }
    }

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
}