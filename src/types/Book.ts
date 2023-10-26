export interface Book {
  ISBN: number
  title: string
  edition: string
  category: string
  description: string
  publisher: string
  author: string[]
  isAvaslable: string
  borrowedDate: Date | null
  returnedDate: Date | null
}
