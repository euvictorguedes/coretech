import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createStandaloneToast } from '@chakra-ui/react'

import { api } from '../services/api'
import { Product } from '../types'

interface CartProviderProps {
  children: ReactNode
}

interface UpdateProductAmount {
  productId: number
  amount: number
}

interface CartContextData {
  cart: Product[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void
}

const CartContext = createContext<CartContextData>({} as CartContextData)

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const toast = createStandaloneToast()
  const [cart, setCart] = useState<Product[]>([])
  const prevCartRef = useRef<Product[]>()

  useEffect(() => {
    let storagedCart = localStorage.getItem('coretech:cart')

    if (storagedCart) {
      setCart(JSON.parse(storagedCart))
    }
  }, [])

  useEffect(() => {
    prevCartRef.current = cart
  })

  const cartPreviousValue = prevCartRef.current ?? cart

  useEffect(() => {
    if (cartPreviousValue !== cart) {
      localStorage.setItem('coretech:cart', JSON.stringify(cart))
    }
  }, [cart, cartPreviousValue])

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productExists = updatedCart.find(
        (product) => product.id === productId
      )

      const currentAmount = productExists ? productExists.amount : 0
      const amount = currentAmount + 1

      if (productExists) {
        productExists.amount = amount
      } else {
        const product = await api.get<Product>(`/products/${productId}`)

        const newProduct = {
          ...product.data,
          amount: 1,
        }
        updatedCart.push(newProduct)
      }

      setCart(updatedCart)
      toast({
        status: 'success',
        title: 'Produto adicionado ao carrinho',
        duration: 700,
        position: 'bottom-right',
      })
    } catch {
      toast({
        status: 'error',
        title: 'Erro na adição do produto',
        position: 'bottom-right',
      })
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productIndex = updatedCart.findIndex(
        (product) => product.id === productId
      )

      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1)
        setCart(updatedCart)
      } else {
        throw Error()
      }
    } catch {
      toast({
        status: 'error',
        title: 'Erro na remoção do produto',
        position: 'bottom-right',
      })
    }
  }

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return
      }

      const updatedCart = [...cart]
      const productExists = updatedCart.find(
        (product) => product.id === productId
      )

      if (productExists) {
        productExists.amount = amount
        setCart(updatedCart)
      } else {
        throw Error()
      }
    } catch {
      toast({
        status: 'error',
        title: 'Erro na alteração de quantidade do produto',
        position: 'bottom-right',
      })
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextData {
  const context = useContext(CartContext)

  return context
}
