import { ApolloServer } from 'apollo-server'

const data = [
  {
    name: 'Maluma Hass Avocado',
    id: '2zd33b8c',
    sku: 'NUR72KCM',
    price: 1.15,
    image: '/images/maluma.jpg',
  },
  {
    name: 'Fuerte Avocado',
    id: '6trfgkkj',
    sku: 'AX4M8SJV',
    price: 1.21,
    image: '/images/fuerte.jpg',
  },
  {
    name: 'Gwen Hass Avocado',
    id: '7bcr49em',
    sku: 'HYA78F6J',
    price: 1.25,
    image: '/images/gwen.jpg',
  },
  {
    name: 'Bacon Avocado',
    id: '098323ks',
    sku: 'BXD100BLK',
    price: 1.51,
    image: '/images/bacon.jpg',
  },
  {
    name: 'Hass Avocado',
    id: 'b8uthe2y',
    sku: 'RMRCZN7E',
    price: 1.39,
    image: '/images/hass.jpg',
  },
  {
    name: 'Lamb Hass Avocado',
    id: 'ewxsd6xb',
    sku: 'N55229ZA',
    price: 1.34,
    image: '/images/lamb.jpg',
  },
  {
    name: 'Pinkerton Avocado',
    id: 'fpr72m9k',
    sku: 'B4HZ42TM',
    price: 1.27,
    image: '/images/pinkerton.jpg',
  },
  {
    name: 'Reed Avocado',
    id: 't9dv25gs',
    sku: 'ZY3T9XXC',
    price: 1.18,
    image: '/images/reed.jpg',
  },
  {
    name: 'Zutano Avocado',
    id: 't345w48y',
    sku: 'MW79ZZ6Y',
    price: 1.25,
    image: '/images/zutano.jpg',
  },
]

// 1 - query
const typeDefs = `

  type Product {
    id: ID
    name: String
    sku: String
    price: Float
    image: String
  }

  input CreateProduct {
    name: String!
    sku: String!
    price: Float!
    image: String!
  }

  type Query {
    getAllProducts: [Product]
    getProductById(id: ID!): Product
  }

  type Mutation {
    createProduct(input: CreateProduct!): Product
    updateProduct(id: ID!, input: CreateProduct!): Product
  }
`

// 2 - resolver
const resolvers = {
  Query: {
    getAllProducts: () => data,
    getProductById: (_: any, { id }: { id: string }) =>
      data.find((product) => product.id === id),
  },
  Mutation: {
    createProduct: (
      _: any,
      {
        input,
      }: { input: { name: string; sku: string; price: number; image: string } }
    ) => {
      const newProduct: {
        id: string
        name: string
        sku: string
        price: number
        image: string
      } = {
        id: Math.random().toString(),
        ...input,
      }
      data.push(newProduct)
      return newProduct
    },
    updateProduct: (
      _: any,
      {
        id,
        input,
      }: {
        id: string
        input: { name: string; sku: string; price: number; image: string }
      }
    ) => {
      const product = data.find((product) => product.id === id)
      if (product) {
        product.name = input.name
        product.sku = input.sku
        product.price = input.price
        product.image = input.image
        return product
      }
      return false
    },
  },
}

//iniciar servidor
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
