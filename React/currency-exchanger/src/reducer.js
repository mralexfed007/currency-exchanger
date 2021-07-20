/* eslint-disable no-unreachable */
const initialState = {
  currencyA: '',
  value: 0,
  currencyB: '',
  currentRate: 1,
  exchangeRate: {}
};

export default function reducer(state = initialState, action) {
  const { value: { base_code: baseCode, conversion_rates: conversionRates } = {}} = action;
  switch (action.type) {
    case 'EDIT_VALUE_A':
      return {
        ...state,
        value: action.value,
      }
      break;
    case 'EDIT_VALUE_B':
      return {
        ...state,
        value: action.value / state.currentRate,
      }
      break;
    case 'SWITCH_CURRENCY_A':
      return {
        ...state,
        currencyA: baseCode,
        exchangeRate: conversionRates,
        currentRate: (action.baseCode === state.currencyB || state.currencyB === '')
          ? 1
          : +conversionRates[state.currencyB],
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