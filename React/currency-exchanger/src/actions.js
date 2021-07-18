const EDIT_VALUE_A = 'EDIT_VALUE_A';
const EDIT_VALUE_B = 'EDIT_VALUE_B';
const SWITCH_CURRENCY_A = 'SWITCH_CURRENCY_A';
const SWITCH_CURRENCY_B = 'SWITCH_CURRENCY_B';
const API_URL = 'https://v6.exchangerate-api.com/v6/1bbd663a750c53c98492697e/latest/';

export const actions = {
  editA: (value) => ({ type: EDIT_VALUE_A, value }),
    
  editB: (value) => ({ type: EDIT_VALUE_B, value }),
  switchA: (value) => {
    return async(dispatch) => {
      const currencyDependence = await fetch(`${API_URL+value}`).then(res => res.json());

      dispatch({ type: SWITCH_CURRENCY_A, value: currencyDependence })
    }
  },
  switchB: (value) => ({ type: SWITCH_CURRENCY_B, value }),
}