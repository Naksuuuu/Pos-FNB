import { createSelector } from "@reduxjs/toolkit";

const selectOrderState = (state) => state.customer.order || { order: {}, loading: false, error: null, totalPrice: 0 };

export const selectOrder = createSelector(selectOrderState, (orderState) => orderState.order);
