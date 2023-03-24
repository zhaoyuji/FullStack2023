import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  if (props.text === 'positive'){
    return (
      <tr>
      <td>{props.text}</td>
      <td>{props.value}%</td>
      </tr>
    )
  }
  return (
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const a = props.a
  const b = props.b
  const c = props.c
  
  const calAvg = (a, b, c) => {
    if ((a+b+c) === 0) {
      return 0
    }
    return (1.0*a+0.0*b+(-1)*c)/(a+b+c)
  }

  const calPos = (a, b, c) => {
    if ((a+b+c) === 0) {
      return 0
    }
    return 100*a/(a+b+c)
  }
  if ((a+b+c) === 0) {
      return (<div>
      <p> No feedback given </p>
      </div>
    ) 
  }
  return (
      <div>
        <table>
        <StatisticLine text="good" value={a} />
        <StatisticLine text="neutral" value ={b} />
        <StatisticLine text="bad" value ={c} />
        <StatisticLine text="all" value ={a+b+c} />
        <StatisticLine text="average" value ={calAvg(a, b, c)} />
        <StatisticLine text="positive" value ={calPos(a, b, c)} />
        </table>
      </div>
  ) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1> give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1> statistics </h1>
      <Statistics a={good} b={neutral} c={bad} />
    </div>
  )
}

export default App
