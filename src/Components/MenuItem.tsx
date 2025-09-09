import type { MenuItem } from "../types"

type MenuItemProps = {
  item: MenuItem // producto del menú (id, name, price, etc.)
  addItem: (item: MenuItem) => void // función para agregarlo a la orden
}

export default function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    // Botón estilizado que, al hacer clic, agrega este producto a la orden
    <button
      className="border-2 border-teal-400 rounded-xl hover:bg-teal-200 w-full p-3 flex justify-between"
      onClick={() => addItem(item)}
    >
      {/* Nombre del producto */}
      <p>{item.name}</p>
      {/* Precio mostrado con un símbolo. (Sugerencia: usa formatCurrency si quieres formateo local) */}
      <p className="font-black">${item.price}</p>
    </button>
  )
}