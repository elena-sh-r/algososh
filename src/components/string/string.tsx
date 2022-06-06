import React, { useEffect, useState } from "react";
import styles from "./string.module.css";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('');

  const [result, setResult] = useState('');
  const [step, setStep] = useState(-1);

  const [strArray, setStrArray] = useState<string[]>([]);
  const [candidatesIdx, setCandidatesIdx] = useState<number[]>([]);
  const [sortedIdx, setSortedIdx] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const value = e.target?.value;
    setValue(value);
  }

  const handleClick = (e: any) => {
    setSortedIdx([]);
    setCandidatesIdx([]);
    setResult(value);
    setStrArray(value.split(''));
    setValue('');
    
    if (!value) {
      return;
    }

    setIsLoading(true);
    setStep(0);
  }

  useEffect(() => {
    setTimeout(() => reverse(), 1000);
  }, [step]);

  const reverse = () => {
    if (step === -1) {
      return;
    }
    
    if (result.length === 1) setResult(value);

    if (step>result.length-step-1) {
      setIsLoading(false);
      return;
    } 
    
    setCandidatesIdx([...candidatesIdx, step + 1, strArray.length - step - 2]);

    let array = [...strArray];
    const char = array[step];
    array[step] = strArray[strArray.length - step - 1];
    array[strArray.length - step - 1] = char;

    setStrArray(array);
    setResult(array.join(''));

    setSortedIdx([...sortedIdx, step, strArray.length - step - 1]);
  
    setStep(step+1);
  }

  return (
    <SolutionLayout title="Строка">
      <div className={`${styles.controlsContainer}`}>
          <Input isLimitText={true} maxLength={11} value={value} onChange={handleChange} disabled={isLoading} />
        <Button text="Развернуть" onClick={handleClick} isLoader={isLoading} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        
        {result.split('').map((letter:string, index:number) => 
          <Circle extraClass={sortedIdx.includes(index) ? `${styles.modifiedCircleColor}` : candidatesIdx.includes(index) ? `${styles.changingCircleColor}` : ""} key={index} letter={letter} />
        )}
      </div>
    </SolutionLayout>
  );
};
