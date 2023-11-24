import mongoose from 'mongoose'

import { type Book } from '../../types/Book.js'

const ObjectId = mongoose.Types.ObjectId

export const booksData: Array<
  Partial<Book & { _id: mongoose.Types.ObjectId }>
> = [
  {
    _id: new ObjectId('655d13daf50dd1ceca878b43'),
    ISBN: '0756603390',
    title: 'something69',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    author: ['Someone'],
  },
  {
    _id: new ObjectId('655ec8104202fd2aa0055472'),
    ISBN: '099777035X',
    title: 'something420',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    author: ['Someone'],
  },
  {
    _id: new ObjectId('655ec83e4202fd2aa0055474'),
    ISBN: '0517682397',
    title: 'something69420',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    author: ['Someone'],
  },
]

export const BookCopiesData = [
  {
    _id: new ObjectId('655d145b404afab97bd851da'),
    book_id: new ObjectId('655d13daf50dd1ceca878b43'),
    is_Available: true,
  },
  {
    _id: new ObjectId('655d145b404afab97bd851da'),
    book_id: new ObjectId('655d13daf50dd1ceca878b43'),
    is_Available: false,
  },
]
