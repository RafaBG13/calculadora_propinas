import MenuItem from "./Components/MenuItem"
import OrderContents from "./Components/OrderContents"
import OrderTotals from "./Components/OrderTotals"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"
import TipPercentageForm from "./Components/TipPercentageForm"

function App() {
  // Desestructuramos del hook personalizado los estados y funciones que gestionan la orden
  const { order, addItem, removeItem, tip, setTip, placeOrder } = useOrder()

  return (
    <>
      {/* ENCABEZADO */}
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas y Consumo</h1>
      </header>

      {/* LAYOUT PRINCIPAL: 2 columnas en pantallas medianas en adelante */}
      <main className="max-w-7xl mx-auto py-10 grid md:grid-cols-2">
        {/* COLUMNA IZQUIERDA: Menú con los productos disponibles */}
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-2 mt-5">
            {/* Recorremos los productos del "menú" y pintamos un <MenuItem /> por cada uno */}
            {menuItems.map((item) => (
              <MenuItem
                key={item.id} // clave única para que React optimice el renderizado
                item={item} // el producto en sí
                addItem={addItem} // función para agregarlo a la orden
              />
            ))}
          </div>
        </div>

        {/* COLUMNA DERECHA: Estado de la orden actual */}
        <div className="border border-dashed border-slate-300 p-5 rounded-xl space-y-10">
          {/* Si hay elementos en la orden, mostramos su contenido, el formulario de propina y los totales */}
          {order.length ? (
            <>
              {/* Lista de ítems agregados + botón para eliminar */}
              <OrderContents order={order} removeItem={removeItem} />

              {/* Radios para elegir porcentaje de propina */}
              <TipPercentageForm setTip={setTip} tip={tip} />

              {/* Subtotal, propina calculada y total, además del botón para "Guardar Orden" */}
              <OrderTotals order={order} tip={tip} placeOrder={placeOrder} />
            </>
          ) : (
            // Si la orden está vacía, mostramos un mensaje
            <p className="text-center">La orden está Vacía</p>
          )}
        </div>
      </main>
    </>
  )
}

export default App