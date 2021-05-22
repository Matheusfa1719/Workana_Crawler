export interface Ikeywords {
    keywords: [
        {
            id: number,
            palavra_chave: string,
            is_active: boolean,
            createdAt: Date,
            updatedAt: Date
        }
    ]
}

export interface Ikeyword {
    id: number,
    palavra_chave: string,
    is_active: boolean,
    createdAt: Date,
    updatedAt: Date
}