import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={all} />
        <StatisticLine text='Average' value={average} />
        <StatisticLine text='Positive' value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ all, setAll ] = useState(0)
  const [ average, setAverage ] = useState(0)
  const [ positive, setPositive ] = useState(0)
  
  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(good + 1)
    setAll(updatedGood + neutral + bad)
    setAverage((updatedGood - bad)/(updatedGood + neutral + bad))
    setPositive((updatedGood/(updatedGood + neutral + bad)*100) + ' %')
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(neutral + 1)
    setAll(good + updatedNeutral + bad)
    setAverage((good - bad)/(good + updatedNeutral + bad))
    setPositive(good/(good + updatedNeutral + bad)*100 + ' %')
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(bad + 1)
    setAll(good + neutral + updatedBad)
    setAverage((good - updatedBad)/(good + neutral + updatedBad))
    setPositive(good/(good + neutral + updatedBad)*100 + ' %')
  }

  return (
    <div>
      <Header text='Give feedback' />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App