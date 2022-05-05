export type Product = {
  id: number
  title: string
  price: number
  promoPrice?: number
  image: string
  amount: number
}

export interface ProductFormatted extends Product {
  priceFormatted: string
  promoPriceFormatted?: string
}