import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
const initalState = {
  orders: [],
  loading: false,
  purchased: false,
};

export const purchaseBurgerStart = (state, action) => {
  return updateObject(state, { loading: true });
};
export const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });

  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};
export const purchaseBurgerFail = (state, action) => {
  return updateObject(state, { loading: false });
};
export const purchaseInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

export const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};
export const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};
export const fetchOrdersFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);

    default:
      return state;
  }
};

export default reducer;
