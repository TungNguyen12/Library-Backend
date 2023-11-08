import mongoose from 'mongoose'

import { type Author } from '../types/Author.js'

export const authorsData: Array<
  Partial<Author & { _id: mongoose.Types.ObjectId }>
> = [
  {
    _id: new mongoose.Types.ObjectId('6546a7febac08f6bd30c0505'),
    firstName: 'Leo',
    lastName: 'Tolstoy',
    books: ['Anna Karenina'],
  },
  {
    _id: new mongoose.Types.ObjectId('6546a899f28fbf438938fb11'),
    firstName: 'William',
    lastName: 'Shakespeare',
    books: ['Romeo and Juliet', 'Hamlet'],
  },
  {
    _id: new mongoose.Types.ObjectId('6546a914e0e22e2341124948'),
    firstName: 'Jane',
    lastName: 'Austen',
    books: ['Pride And Prejudice'],
  },
  {
    _id: new mongoose.Types.ObjectId('6546a923e0e22e234112494a'),
    firstName: 'George',
    lastName: 'Orwell',
    books: ['Animal Farm'],
  },
  {
    _id: new mongoose.Types.ObjectId('6546a92ee0e22e234112494c'),
    firstName: 'Jules',
    lastName: 'Verne',
    books: ['Journey To The Centre Of The Earth'],
  },
]
