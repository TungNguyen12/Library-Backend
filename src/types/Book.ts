export interface Book {
  ISBN: string
  title: string
  edition: string
  category: string
  description: string
  publisher: string
  author: string[]
  isAvailable: boolean
  borrowedDate: Date | null
  returnedDate: Date | null
}
