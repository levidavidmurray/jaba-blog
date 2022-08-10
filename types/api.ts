import { Strapi4ResponseData } from "@nuxtjs/strapi/dist/runtime/types"

export interface AuthorDto {
    id: number
    first_name: string
    last_name: string
    avatar: any
    published_at: string
    created_at: string
    updated_at: string
    articles?: ArticleDto[]
}

export interface ArticleDtoAttribs {
    title: string
    subtitle: string
    summary: string
    body: string
    author?: AuthorDto
    thumbnail: any
    slug: string
    publishedAt: string
    createdAt: string
    updatedAt: string
}

export interface ArticleDto extends Strapi4ResponseData<ArticleDtoAttribs> {
    id: number
}

export interface CategoryDto {
    id: number
    name: string
    published_at: string
    created_at: string
    updated_at: string
}