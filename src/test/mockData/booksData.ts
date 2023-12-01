import mongoose from 'mongoose'

import { type Book } from '../../types/Book.js'

const ObjectId = mongoose.Types.ObjectId

export const booksData: Book[] = [
  {
    id: new ObjectId('655d13daf50dd1ceca878b43'),
    ISBN: '0756603390',
    title: 'something69',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    img: 'https://placehold.co/600x400',
    author: [new mongoose.Types.ObjectId('6546a7febac08f6bd30c0505')],
  },
  {
    id: new ObjectId('655ec8104202fd2aa0055472'),
    ISBN: '099777035X',
    title: 'something420',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    img: 'https://placehold.co/600x400',
    author: [new mongoose.Types.ObjectId('6546a7febac08f6bd30c0505')],
  },
  {
    id: new ObjectId('655ec83e4202fd2aa0055474'),
    ISBN: '0517682397',
    title: 'something69420',
    edition: '1',
    category: 'something',
    description: 'something',
    publisher: 'something',
    img: 'https://placehold.co/600x400',
    author: [new mongoose.Types.ObjectId('6546a7febac08f6bd30c0505')],
  },
]

export const convertedBookData = booksData.map((book) => ({
  _id: book.id,
  ISBN: book.ISBN,
  title: book.title,
  edition: book.edition,
  category: book.category,
  description: book.description,
  publisher: book.publisher,
  img: book.img,
  author: book.author,
}))

export const BookCopiesData = [
  {
    _id: new ObjectId('655d145b404afab97bd851da'),
    book_id: new ObjectId('655d13daf50dd1ceca878b43'),
    is_Available: true,
  },
  {
    _id: new ObjectId('655d145b404afab97bd851e0'),
    book_id: new ObjectId('655d13daf50dd1ceca878b43'),
    is_Available: false,
  },
]

export const BorrowedBookData = [
  {
    _id: new ObjectId('655e9ced4202fd2aa005546d'),
    copy_id: new ObjectId('655d145b404afab97bd851da'),
    user_id: new ObjectId('655d1091fba90fb470aa806f'),
    borrowed_Date: '2023-11-22T22:15:21.852Z',
    returned_Date: '2023-11-22T22:16:21.852Z',
  },
  {
    _id: new ObjectId('655e7d79a0e52b844d17753d'),
    copy_id: new ObjectId('655d145b404afab97bd851e0'),
    user_id: new ObjectId('655d1091fba90fb470aa806f'),
    borrowed_Date: '2023-11-22T22:15:21.852Z',
  },
]
