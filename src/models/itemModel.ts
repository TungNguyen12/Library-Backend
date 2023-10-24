export interface Item {
  id: number
  value: number
}

const items: Item[] = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
]

export const getAllItems = (): Item[] => {
  return items
}

export const getItemByIndex = (index: number): Item | undefined => {
  return items.find((item) => item.id === index)
}
