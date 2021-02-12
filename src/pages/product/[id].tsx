import { ReactElement } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Product {
  id: number
  name: string
  description: string
}

interface DetailedProductProps {
  product: Product
  children: ReactElement
}

const DetailedProduct: React.FC = ({ product }: DetailedProductProps) => (
  <div>
    <h1>Produto</h1>
    <p>{product.id}</p>
    <p>{product.name}</p>
    <p>{product.description}</p>
  </div>
)

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params

  try {
    const response = await fetch(`http://localhost:3001/products/${id}`)
    const parsedResponse = await response.json()

    return {
      props: {
        product: parsedResponse
      },
      revalidate: 10
    }
  } catch (error) {
    return {
      props: {
        product: {}
      },
      revalidate: 10
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await fetch('http://localhost:3001/products?_limit=2')
    const parsedResponse = await response.json()

    const paths = parsedResponse.map(product => ({
      params: {
        id: product.id.toString()
      }
    }))

    return {
      paths,
      fallback: false
    }
  } catch (error) {
    return {
      paths: [],
      fallback: false
    }
  }
}

export default DetailedProduct
