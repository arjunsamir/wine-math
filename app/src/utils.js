export const doTheMath = (totalVolume, juiceBottleVolume, servingSize, sugarPerServing) => {

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