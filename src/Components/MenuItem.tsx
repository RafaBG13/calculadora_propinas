import type { MenuItem } from "../types"
import type { ActionDispatch } from "react"
import type { OrderActions } from "../reducers/order-reducer"

type MenuItemProps = {
  item: MenuItem // producto del menú (id, name, price, etc.)
  dispatch: ActionDispatch<[action: OrderActions]> // función para agregarlo a la orden
}

export default function MenuItem({ item, dispatch }: MenuItemProps) {
  return (
    // Botón estilizado que, al hacer clic, agrega este producto a la orden
    <button
      className="border-2 border-teal-400 rounded-xl hover:bg-teal-200 w-full p-3 flex justify-between"
      onClick={() => dispatch({type: 'add-item', payload:{item}})}
    >
      {/* Nombre del producto */}
      <p>{item.name}</p>
      {/* Precio mostrado con un símbolo. (Sugerencia: usa formatCurrency si quieres formateo local) */}
      <p className="font-black">${item.price}</p>
    </button>
  )
}