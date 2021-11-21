import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';

const useInput = ({ type, otherProps /*...*/ }) => {
  const [value, setValue] = useState("");
  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} {...otherProps}/>;
  return [value, input];
}

const hpRegenLevel = {
  1: 86,
  2: 81.7,
  3: 75.9,
  4: 68.3
}

function App() {
  const [remainingHP, remainingHPInput] = useInput({ type: "number" });
  const [heroLevel, heroLevelInput] = useInput({ type: "number" }, {min: 1, max: 4});
  // const [time, timeInput] = useInput({ type: "datetime-local" });

  const [next200, setNext200] = useState(new Date());
  const [next1000, setNext1000] = useState(new Date());

  useEffect(() => {
    const diff200 = 200 - remainingHP;
    const remainingTime200 = diff200 * hpRegenLevel[heroLevel];

    let next200Temp = new Date();
    next200Temp.setSeconds(next200Temp.getSeconds() + remainingTime200);

    setNext200(next200Temp);


    const diff1000 = 1000 - remainingHP;
    const remainingTime1000 = diff1000 * hpRegenLevel[heroLevel];

    let next1000Temp = new Date();
    next1000Temp.setSeconds(next1000Temp.getSeconds() + remainingTime1000);

    setNext1000(next1000Temp);
  }, [remainingHP, heroLevel])


  return <div className='container'>
    Remaining HP: {remainingHPInput}<br />
    Hero level: {heroLevelInput} <br />
    {/* Time: {timeInput} <br /> */}
    <br />

    Next 200HP: {next200.toLocaleString()} <br /><br />
    Next 1000HP: {next1000.toLocaleString()} <br />
  </div>;
}

export default App;
