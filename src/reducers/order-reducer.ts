import type { MenuItem, OrderItem } from "../types";


export type OrderActions = 
{type : 'add-item', payload: { item: MenuItem}} |
{type : 'remove-item', payload: { id: MenuItem['id']}} |
{type : 'place-order'} |
{type : 'add-tip', payload: { value: number}}

export type OrderState = {
    order: OrderItem[];
    tip: number;
}

export const initialState = {
    order : [],
    tip : 0
}

export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
) =>{
    if (action.type === 'add-item'){

    const itemExist = state.order.find((orderItem) => orderItem.id === action.payload.item.id)
    let Order : OrderItem[] = []

    if (itemExist) {
      // Si el producto ya está, creamos un nuevo arreglo actualizando la cantidad
    Order = state.order.map((orderItem) => orderItem.id === action.payload.item.id
        ? { ...orderItem, quantity: orderItem.quantity + 1 }
        : orderItem
    )
    } else {
      // Si no está, lo agregamos con quantity = 1
    const newItem : OrderItem = { ...action.payload.item, quantity: 1 }
    Order = [...state.order, newItem]
    }

        return {
            ...state,
            Order
        }
    }

    if (action.type === 'remove-item'){
        const order = state.order.filter((item) => item.id !== action.payload.id)
        return {
            ...state,
            order
        }
    }

    if (action.type === 'place-order'){
        return {
            ...state,
            order: [], // vaciamos la orden
            tip: 0    // reseteamos la propina
        }
    }

    if (action.type === 'add-tip'){
        const tip = action.payload.value
        return {
            ...state,
            tip
        }
    }

    return state
}