import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Anecdote = ({ anecdotes, selected }) => <p>{anecdotes[selected]}</p>

const Votes = ({ votes }) => <p>This anecdote have {votes} votes.</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [ selected, setSelected ] = useState(0)
  const [ points, setPoints ] = useState(Array(anecdotes.length).fill(0))

  const generateAnecdotNumber = () => {
    const lastAnecdotNumber = selected
    let newAnecdotNumber = lastAnecdotNumber
    while ( newAnecdotNumber === lastAnecdotNumber ) { newAnecdotNumber = Math.floor(Math.random()*anecdotes.length) }
    setSelected(newAnecdotNumber)
  }

  const addVote = () => {
    const updatedPoints = [...points]
    updatedPoints[selected] += 1
    setPoints(updatedPoints)
  }

  return (
    <div>
      <Header text='Anecdote of a day'/>
      <Anecdote anecdotes={anecdotes} selected={selected} />
      <Votes votes={points[selected]} />
      <Button handleClick={addVote} text='Vote' />
      <Button handleClick={generateAnecdotNumber} text='Next anecdote' />
      <Header text='Anecdote with most votes'/>
      <Anecdote anecdotes={anecdotes} selected={points.indexOf(Math.max(...points))} />
    </div>
  )
}

export default App