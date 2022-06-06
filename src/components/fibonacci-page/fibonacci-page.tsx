import React, { useEffect, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [numbersToShow, setNumbersToShow] = useState<number[]>([]);
  const [step, setStep] = useState(-1);

  const [isLoading, setIsLoading] = useState(false);

  const getFibonacciNumbers = (n: number) => {
    const array = [];

    if (n > 0){
      array.push(1);
    }

    if (n > 1){
      array.push(1);
    }

    let a = 1;
    let b = 1;
    for (let i = 3; i <= n; i++) {
      let c = a + b;
      a = b;
      b = c;
      array.push(c);
    }

    setNumbers(array);
  }

  const handleClick = (e: any) => {
    setNumbers([]);
    setNumbersToShow([]);

    getFibonacciNumbers(+value);

    setValue('');
    setIsLoading(true);
    setStep(0);
  }

  const handleChange = (e: any) => {
    const value = e.target?.value;
    setValue(value);
  }

  const handleTick = () => {
    if (step < 0) {
      return;
    }

    if (step >= numbers.length) {
      setIsLoading(false);
      return;
    } 

    setNumbersToShow([...numbersToShow, numbers[step]]);
    setStep(step+1);
  }

  useEffect(() => {
    if (numbers.length === 0) {
      return;
    }
    
    setStep(0);
  }, [numbers])

  useEffect(() => {
    setTimeout(() => handleTick(), 500);
  }, [step])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${styles.controlsContainer}`}>
        <Input isLimitText={true} min="1" max="19" type="number" onChange={handleChange} value={value} disabled={isLoading} />
        <Button text="Рассчитать" onClick={handleClick} isLoader={isLoading} disabled={+value <= 0 || +value > 19} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        {numbersToShow.map((number:number, index:number) => 
          <Circle key={index} letter={number?.toString()} tail={index?.toString()} />
        )}
      </div>
    </SolutionLayout>
  );
};