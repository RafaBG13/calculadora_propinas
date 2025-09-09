import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {
  // Estado principal de la orden: arreglo de productos con cantidad
  const [order, setOrder] = useState<OrderItem[]>([])

  // Estado de la propina: guardamos el porcentaje (0, 0.1, 0.2, etc.)
  const [tip, setTip] = useState<number>(0)

  // Agrega un producto al carrito/orden. Si ya existe, incrementa su cantidad.
  const addItem = (item: MenuItem) => {
    const itemExist = order.find((orderItem) => orderItem.id === item.id)

    if (itemExist) {
      // Si el producto ya está, creamos un nuevo arreglo actualizando la cantidad
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      )
      setOrder(updatedOrder)
    } else {
      // Si no está, lo agregamos con quantity = 1
      const newItem = { ...item, quantity: 1 }
      setOrder([...order, newItem])
    }
  }

  // Elimina un producto de la orden usando su id
  const removeItem = (id: MenuItem['id']) => {
    setOrder(order.filter((item) => item.id !== id))
  }

  // "Guarda" la orden. Aquí simplemente resetea el estado (podrías enviar a una API, etc.)
  const placeOrder = () => {
    setOrder([]) // vaciamos la orden
    setTip(0)    // reseteamos la propina
  }

  // Exponemos estado y funciones para que los componentes las usen
  return {
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    placeOrder
  }
}