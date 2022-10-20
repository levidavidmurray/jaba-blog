export interface UserDto {
    id: number
    email: string
    username: string
    provider: string
    blocked: boolean
    confirmed: boolean
    createdAt: string
    updatedAt: string
}

export interface LoginDto {
    jwt: string
    user: UserDto
}

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

export interface StrapiDto {
    publishedAt: string
    createdAt: string
    updatedAt: string
}

export interface ArticleDto extends StrapiDto {
    id: number
    title: string
    subtitle: string
    summary: string
    body: string
    slug: string
    author?: AuthorDto
    thumbnail?: any
    points?: number
}

export interface CategoryDto {
    id: number
    name: string
    published_at: string
    created_at: string
    updated_at: string
}