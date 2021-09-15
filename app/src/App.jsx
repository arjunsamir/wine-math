import React, { useState, useRef } from 'react';
import Input from './Input';
import './app.css'

const ouncesToLiters = oz => parseFloat(oz) * 0.0295735;
const gallonsToLiters = g => parseFloat(g) * 3.78541;
const roundToNearestHalf = x => {

  const int = Math.floor(x);
  const float = x - int;

  return int + Math.round(float * 2) / 2;

}

const App = () => {

  const totalVolume = useRef(0);
  const juiceBottleVolume = useRef(0);
  const servingSize = useRef(0);
  const sugarPerServing = useRef(0);

  const [validated, setValidated] = useState(false);
  const [results, setResults] = useState({});

  const calculateWineStuff = () => {

    if (!totalVolume.current || !juiceBottleVolume.current || !servingSize.current || !sugarPerServing.current) return setValidated(false);

    const cWine = 268; // Grams / L
    const cPoundsToGrams = 453.592;

    const params = {
      totalVolume: gallonsToLiters(totalVolume.current),
      juiceBottleVolume: ouncesToLiters(juiceBottleVolume.current),
      servingSize: ouncesToLiters(servingSize.current),
      sugarPerServing: sugarPerServing.current,
    };

    const totals = {
      sugarNeeded: Math.round(cWine * params.totalVolume),
      sugarFromJuice: Math.round((params.totalVolume / params.servingSize) * params.sugarPerServing),
    }

    totals.sugarAdd = totals.sugarNeeded - totals.sugarFromJuice;

    const quantities = {
      juiceBottles: roundToNearestHalf(params.totalVolume / params.juiceBottleVolume),
      poundsOfSugar: Math.round((totals.sugarAdd / cPoundsToGrams) * 100) / 100
    }


    setValidated(true);

    setResults({ ...quantities });

  }


  return (
    <main class="vino">

      <h1>Wine Math App</h1>

      <div>
        <Input label="Desired Wine Volume" value={totalVolume} unit="gallons" />
        <Input label="Juice Bottle Volume" value={juiceBottleVolume} unit="ounces" />
        <Input label="Juice Serving Size" value={servingSize} unit="ounces" />
        <Input label="Juice Sugars" value={sugarPerServing} unit="grams" />
      </div>

      <button onClick={calculateWineStuff}>Do the magic</button>

      {validated && (
        <div>
          <p>We need {results.juiceBottles} bottles of juice.</p>
          <p>We need {results.poundsOfSugar} pounds of sugar.</p>
        </div>
      )}

    </main>

  )

}

export default App;
