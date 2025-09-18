import { useMemo } from "react"
import type { OrderItem } from "../types"
import { formatCurrency } from "../helpers"
import type { ActionDispatch } from "react"
import type { OrderActions } from "../reducers/order-reducer"

type OrderTotalsProps = {
  order: OrderItem[] // arreglo con los productos y cantidades
  tip: number        // porcentaje de propina seleccionado (ej: 0.1 = 10%)
  dispatch: ActionDispatch<[action: OrderActions]>// acción al "guardar"/finalizar la orden
}

export default function OrderTotals({ order, tip, dispatch }: OrderTotalsProps) {
  // Calculamos el subtotal sumando (precio * cantidad) de cada ítem
  const SubtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  )

  // Monto de propina = subtotal * porcentaje
  const tipAmount = useMemo(() => SubtotalAmount * tip, [SubtotalAmount, tip])

  // Total = subtotal + propina
  const totalAmount = useMemo(() => SubtotalAmount + tipAmount, [SubtotalAmount, tipAmount])

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y Propina</h2>

        <p>
          Subtotal a pagar:
          <span className="font-bold"> {formatCurrency(SubtotalAmount)}</span>
        </p>

        <p>
          Propina:
          <span className="font-bold"> {formatCurrency(tipAmount)}</span>
        </p>

        <p>
          Total a pagar:
          <span className="font-bold"> {formatCurrency(totalAmount)}</span>
        </p>
      </div>

      {/* Botón de acción. Se deshabilita si el total es 0 (nada en la orden). */}
      <button
        className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-20"
        disabled={totalAmount === 0}
        onClick={() => dispatch({type: 'place-order'})}
      >
        Guardar Orden
      </button>
    </>
  )
}