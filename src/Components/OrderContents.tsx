
import type { OrderItem } from "../types"

type OrderContentsProps = {
  order: OrderItem[]
  removeItem: (id: number) => void
}

export default function OrderContents({ order, removeItem }: OrderContentsProps) {
  return (
    <div>
      <h2 className="font-black text-4xl">Consumo</h2>
      <div className="space-y-2 mt-5">
        {order.length === 0 ? (
          <p className="text-center">La orden está Vacía</p>
        ) : (
          order.map(item => (
            <div key={item.id} className="flex justify-between items-center border-t border-gray-200 py-3 last-of-type:border-b">
              <div>
                <p className="text-lg">
                  {item.name} - ${item.price}
                </p>
                <p className="font-black">
                  Cantidad: {item.quantity} - ${item.price * item.quantity}
                </p>
              </div>
              <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black" onClick={() => removeItem(item.id)}>
                X
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}