import { GetStaticProps } from 'next'
import { ReactElement } from 'react'
import Link from 'next/link'
import Head from 'next/head'

interface Product {
  id: number
  name: string
  description: string
}

interface ProductsList {
  children: ReactElement
  products: [Product]
}

const Home: React.FC = ({ products }: ProductsList) => (
  <div>
    <Head>
      <title>Static Shop</title>
    </Head>

    <main>
      <h1>Lojinha estática</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/product/${product.id}`}>
              <a>{product.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  try {
    const response = await fetch('http://localhost:3001/products')
    const parsedResponse = await response.json()
    return {
      props: {
        products: parsedResponse
      },
      revalidate: 5
    }
  } catch (error) {
    return {
      props: {
        products: []
      }
    }
  }
}

export default Home
