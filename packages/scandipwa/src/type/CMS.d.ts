export interface PageType {
    title: string
    content: string,
    meta_title: string,
    meta_description: string,
    meta_keywords: string
}

export interface BlockType {
    title: string
    content: string
}

export interface BlockListType {
    items?: BlockType

    [key: string]: unknown
}
