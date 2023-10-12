import './App.css';
import { useState } from "react";

function App() {

  const [list, setList] = useState([])
  const [operation, setOperation] = useState([])
  const [result, setResult] = useState(0)

  let renderAll = (index) => (<div>
    <select disabled={operation[index].disabled} onChange={(e) => handleInputOperator(e, index)}>
      <option>+</option>
      <option>-</option>
    </select>
    <input disabled={operation[index].disabled} value={operation[index]?.value ?? undefined} type='number' onChange={(e) => handleInputText(e, index)} />
  </div>);

  function handleInputAdder() {
    const itemsPushed = [...list, list.length];
    setList(itemsPushed)
    setOperation([...operation, { index: list.length, sign: '+', value: '', disabled: false }])
  }

  function handleInputOperator(e, index) {
    e.preventDefault()
    const tmp = operation
    const _index = index
    tmp[_index].sign = e.target.value
    setOperation(tmp)
    handleOperations(operation)
  }

  function handleInputText(e, index) {
    e.preventDefault()
    const tmp = operation
    const _index = index
    tmp[_index].value = e.target.value
    setOperation(tmp)
    handleOperations(operation)
  }

  function handleOperations(operation) {
    let res = 0
    operation.forEach((item) => {
      !item.disabled && (item.sign == '+' ? res += Number(item.value)
        : res -= Number(item.value))
    })
    setResult(res)
  }

  function handleDelete(index) {
    const ls = list.filter((item, idx) => idx !== index)
    setList(ls)
    const ops = operation.filter((itm, idx) => idx !== index)
    setOperation(ops)
    handleOperations(ops)
  }


  function handleEnabling(index) {
    const tmp = operation
    const _index = index
    tmp[_index].disabled = !tmp[_index].disabled
    setOperation(tmp)
    handleOperations(tmp)
    setList([...list])
  }

  return (
    <div>
      <form>
        <div>
          <ul>
            {list.map((item, index) =>
              <li key={index} >
                {renderAll(index)}
                <button type="button" onClick={(e) => {
                  handleDelete(index)
                }}>Delete</button>

                <button type="button" onClick={(e) => {
                  handleEnabling(index)
                }}>Abilita/disabilita</button>
              </li>
            )}
          </ul>
        </div>
      </form>

      <button type="button" onClick={handleInputAdder} >Add Row</button>
      <div >
        Result: {result}
      </div>
    
    </div>
  );
}

export default App;