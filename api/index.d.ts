type Url = string
type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

type TProductId = string

type TProduct = {
  id: TProductId
  name: string
  sku: string
  price: number
  image: Url
}

type TAPIAVODetailResponse = TProduct

type TAPIAvoResponse = {
  lenght: number
  data: TProduct[]
  error?: string
}
