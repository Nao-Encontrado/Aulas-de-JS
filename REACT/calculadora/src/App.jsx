import './App.css';
import Button from './components/button';
import Display from './components/display';
import { useState } from 'react';

function App() {

  const initialStates = [{
      displayValue: '0',
      clearDisplay: false,
      operation: null,
      values: [0,0],
      current: 0
  }]

  const [states, setStates] = useState(...initialStates);

  function addNumber(number){

    if(number === '.' && states.displayValue.includes('.')){
      return
    }
    // Tratamento para que não fique um 0 (zero) na frente do número digitado pelo usuário
    const clearDisplay = states.displayValue === '0' || states.clearDisplay;

    // Salvar o valor atual do display em uma variável
    const currentValue = clearDisplay ? '' : states.displayValue;

    // Concatenação do valor do display com o numero clicado
    const displayValue = currentValue + number;

    setStates(copyValue => {
      return {...copyValue, displayValue, clearDisplay: false}
    });

    const newValue = parseFloat(displayValue);

    const values = [...states.values];
    values[states.current] = newValue; console.log(states .current)
    setStates(copyValue => {
      return {...copyValue, values}
    });
  }

  function clearMemory() {
    setStates(...initialStates);
  }

  function setOperation(operation) {
    if(states.current === 0){
      setStates(copyValue => {
        return {...copyValue, operation, current: 1, clearDisplay: true}
      });
    } else {
      const equals = operation === '=';
      const values = [...states.values];
      try {
        console.log(states)
        values[0] = eval(`${values[0]} ${states.operation} ${values[1]}`)
      }
      catch(error){
        values[0] = states.values[0]
      }

      values[1] = 0

      setStates(copyValue => {
        return {
          ...copyValue,
          displayValue: values[0],
          operation: equals ? null : operation,
          current: equals ? 0 : 1,
          clearDisplay: true,
          values,
        }
      })
    }
  }

  return (
    <>
      <div className='container'>
        <div className='calculadora'>
          <Display value={states.displayValue}/>
          <Button label="C" type="triple" action={clearMemory}/>
          <Button label="/" type="operation" action={() => setOperation('/')}/>
          <Button label="7" action={() => addNumber(7)}/>
          <Button label="8" action={() => addNumber(8)}/>
          <Button label="9" action={() => addNumber(9)}/>
          <Button label="*" type="operation" action={() => setOperation('*')}/>
          <Button label="4" action={() => addNumber(4)}/>
          <Button label="5" action={() => addNumber(5)}/>
          <Button label="6" action={() => addNumber(6)}/>
          <Button label="-" type="operation" action={() => setOperation('-')}/>
          <Button label="1" action={() => addNumber(1)}/>
          <Button label="2" action={() => addNumber(2)}/>
          <Button label="3" action={() => addNumber(3)}/>
          <Button label="+" type="operation" action={() => setOperation('+')}/>
          <Button label="0" type="double"action={() => addNumber(0)}/>
          <Button label="." action={() => addNumber('.')}/>
          <Button label="=" type="equal" action={() => setOperation('=')}/>
        </div>
      </div>
    </>
  )
}

export default App
