/* eslint-disable no-unreachable */
const initialState = {
  currencyA: '',
  value: 0,
  currencyB: '',
  currentRate: 1,
  exchangeRate: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'EDIT_VALUE_A':
      return {
        ...state,
        value: +action.value,
      }
      break;
    case 'EDIT_VALUE_B':
      return {
        ...state,
        value: +action.value / state.currentRate,
      }
      break;
    case 'SWITCH_CURRENCY_A':
      return {
        ...state,
        currencyA: action.value.base_code,
        exchangeRate: action.value.conversion_rates,
        currentRate: (action.value.base_code === state.currencyB || state.currencyB === '')
          ? 1
          : +action.value.conversion_rates[state.currencyB],
      }
      break;
      case 'SWITCH_CURRENCY_B':
        return {
          ...state,
          currencyB: action.value,
          currentRate: (state.currencyA === action.value)
          ? 1
          : +state.exchangeRate[action.value],
        }
      break;
  
    default:
      return state;
  }
}