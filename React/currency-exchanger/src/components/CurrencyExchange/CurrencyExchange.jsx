import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux'
import { actions } from '../../actions';


export const CurrencyExchange = () => {
  const dispatch = useDispatch()
  const value = useSelector(state => state.value)
  const currencyA = useSelector(state => state.currencyA)
  const currencyB = useSelector(state => state.currencyB)
  const currentRate = useSelector(state => state.currentRate)

  useEffect(() => {
    dispatch(actions.switchA('UAH'))
  }, [dispatch])

  const numRound = useCallback((num) => Math.round(num * 100) / 100, []);
  const handleChange = useCallback((target, editedField) => {
    let  val = null;

    if (editedField === 'a') {
      val = /^[0-9]+$/.test(target.value)
    ? +target.value
    : value
      dispatch(actions.editA(val));
    } else {
      val = /^[0-9]+$/.test(target.value)
    ? +target.value
    : value * currentRate
      dispatch(actions.editB(val));
    }
      
  }, [value, dispatch, currentRate])

  return (
    <div className="container">
      <p class="title is-2 is-spaced">Currency Converter</p>
      <div className="card">
        <div className="card-content">
          <div class="field has-addons">
            <p class="control">
              <span class="select">
                <select
                  value={currencyA}
                  onChange={({target}) => dispatch(actions.switchA(target.value))}
                >
                  <option>UAH</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>RUB</option>
                </select>
              </span>
            </p>
            <p class="control">
              <input
                value={numRound(value)}
                onChange={({target}) => handleChange(target, 'a')}
                class="input"
                type="text"
                placeholder="Amount of money"
              />
            </p>
            <p class="control">
            <span class="icon">
              <i class="fas fa-exchange-alt"></i>
            </span>
            </p>
            <p class="control">
              <input
                value={numRound(value * currentRate)}
                onChange={({target}) => handleChange(target, 'b')}
                class="input"
                type="text"
                placeholder="Amount of money"
              />
            </p>
            <p class="control">
              <span class="select">
                <select
                  value={currencyB}
                  onChange={({target}) => dispatch(actions.switchB(target.value))}
                >
                  <option value="" disabled selected>
                    Select currency
                  </option>
                  <option>UAH</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>RUB</option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )

};