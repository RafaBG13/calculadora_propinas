import type { ActionDispatch } from "react"
import type { OrderActions } from "../reducers/order-reducer"

// Opciones de propina disponibles (id para el input/label, value numérico y texto mostrado)
const tipOptions = [
  { id: 'tip-10', value: 0.10, label: '10%' },
  { id: 'tip-20', value: 0.20, label: '20%' },
  { id: 'tip-50', value: 0.50, label: '50%' },
]

type TipPercentageFormProps = {
  dispatch: ActionDispatch<[action: OrderActions]> // setter que viene del hook useOrder
  tip: number // valor actual seleccionado de la propina (porcentaje)
}

export default function TipPercentageForm({ dispatch, tip }: TipPercentageFormProps) {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina:</h3>

      <form>
        {tipOptions.map((tipOption) => (
          <div key={tipOption.id} className="flex gap-2">
            {/* Relacionamos label con el input mediante htmlFor = id del input */}
            {/* Nota: aquí es importante usar tipOption.id, no la cadena literal 'tip.id' */}
            <label htmlFor={tipOption.id}>{tipOption.label}</label>

            {/* Radio para elegir el porcentaje de propina */}
            <input
              id={tipOption.id}
              type="radio"
              name="tip"
              value={tipOption.value}
              onChange={(e) => dispatch({type: 'add-tip', payload: {value :+e.target.value}})} // convertimos el string del input a número con +
              checked={tip === tipOption.value} // marcamos el seleccionado
            />
          </div>
        ))}
      </form>
    </div>
  )
}