import React, { useEffect, useState } from "react";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {reverseString} from "../string/utils"

import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('');

  const [resultArray, setResultArray] = useState<string[][]>([]);

  const [result, setResult] = useState('');
  const [step, setStep] = useState(-1);

  const [candidatesIdx, setCandidatesIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const timeout = DELAY_IN_MS;
  
  const handleChange = (e: React.UIEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
  }

  const handleClick = (e: React.UIEvent<HTMLElement>) => {
    setSortedIdx([]);
    setCandidatesIdx([]);
    setResult(value);
    setValue('');
    
    if (!value) {
      return;
    }

    setResultArray(reverseString(value));
    setIsLoading(true);
    setStep(0);
  }

  useEffect(() => {
    setTimeout(() => reverse(), timeout);
  }, [step]);

  const reverse = () => {
    if (step < 0) {
      return;
    }
    
    if (result.length === 1) setResult(value);

    if (step>result.length-step-1) {
      setIsLoading(false);
      return;
    } 
    
    setCandidatesIdx([...candidatesIdx, step + 1, result.length - step - 2]);
    setResult(resultArray[step].join(''));
    setSortedIdx([...sortedIdx, step, result.length - step - 1]);
  
    setStep(step+1);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles.controlsContainer}`}>
          <Input isLimitText={true} maxLength={11} value={value} onChange={handleChange} disabled={isLoading} />
        <Button text="Развернуть" onClick={handleClick} isLoader={isLoading} disabled={!value} name="stringReverseButton" />
      </div>
      <div className={`${styles.circlesContainer}`}>
        {result.split('').map((letter:string, index:number) => 
          <Circle extraClass={sortedIdx.includes(index) ? `${styles.modifiedCircleColor}` : candidatesIdx.includes(index) ? `${styles.changingCircleColor}` : ""} key={index} letter={letter} />
        )}
      </div>
    </SolutionLayout>
  );
};
