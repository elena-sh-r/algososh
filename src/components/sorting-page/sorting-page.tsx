import React, { useEffect, useState } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { getRandomArr } from "../../utils";
import { sortBubble, sortSelect } from "./utils";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [isBubble, setIsBubble] = useState(false);
  const [isDesc, setIsDesc] = useState(false);

  const [step, setStep] = useState(-1);
  const [internalStep, setInternalStep] = useState(-1);

  const [minNumIdx, setMinNumIdx] = useState(-1);
  const [minNum, setMinNum] = useState(-1);

  const [maxNumIdx, setMaxNumIdx] = useState(-1);
  const [maxNum, setMaxNum] = useState(-1);

  const [candidateIdx, setCandidateIdx] = useState(-1);
  const [candidatesIdx, setCandidatesIdx] = useState<number[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const timeout = SHORT_DELAY_IN_MS;

  const handleAsc = (e: React.UIEvent<HTMLElement>) => {
    setIsLoading(true);
    setIsDesc(false);
    setStep(0);
  }

  const handleDesc = (e: React.UIEvent<HTMLElement>) => {
    setIsLoading(true);
    setIsDesc(true);
    setStep(0);
  }

  const handleRefresh = (e: React.UIEvent<HTMLElement>) => {
    setStep(-1);
    setCandidateIdx(-1);
    setCandidatesIdx([]);
    setArr(getRandomArr());
  }

  const sortInternal = () => {
    if (internalStep < 0) {
      return;
    }

    if (isBubble) {
      if (internalStep === arr.length - step - 1) {
        setCandidatesIdx([0, 1]);
        setStep(step+1);
        return;
      }

      setArr(sortBubble(arr, isDesc, internalStep));

      setCandidatesIdx([internalStep, internalStep+1]);

    } else {
      if (internalStep>=arr.length) {
        setArr(sortSelect(arr, isDesc, minNumIdx, maxNumIdx, step));

        setCandidateIdx(-1);
        setStep(step+1);

        return;
      }

      if (isDesc) {
        if (arr[internalStep] > maxNum) {
          setMaxNum(arr[internalStep]);
          setMaxNumIdx(internalStep);
        }
      } else {
        if (arr[internalStep] < minNum) {
          setMinNum(arr[internalStep]);
          setMinNumIdx(internalStep);
        }
      }
    }

    setInternalStep(internalStep+1);
  }

  const sort = () => {
    if (step < 0) {
      return;
    }

    if (step === arr.length-1) {
      setStep(step+1);
      return;
    } 

    if (step > arr.length-1) {
      setInternalStep(-1);
      setIsLoading(false);
      return;
    }

    const firstNum = arr[step];
    const secondNum = arr[step+1];

    if (isBubble) {
      setInternalStep(0);
    } else {
      if (isDesc){
        setMaxNum(firstNum > secondNum ? firstNum : secondNum);
        const maxNumIdx = firstNum > secondNum ? step : step+1;
        setMaxNumIdx(maxNumIdx);
        setCandidateIdx(maxNumIdx);
      } else {
        setMinNum(firstNum < secondNum ? firstNum : secondNum);
        const minNumIdx = firstNum < secondNum ? step : step+1;
        setMinNumIdx(minNumIdx);
        setCandidateIdx(minNumIdx);
      }
      
      setCandidatesIdx([step, step+1]);
    }
  }

  const isSortedColumn = (index: number) => {
    return isBubble
      ? index > arr.length - step - 1
      : index < step;
  }

  const isCandidateColumn = (index: number) => {
    return isBubble
      ? candidatesIdx.includes(index)
      : candidatesIdx.includes(index) || index === internalStep || index === candidateIdx;
  }

  useEffect(() => {
    setTimeout(() => sort(), timeout);
  }, [step]);

  useEffect(() => {
    setTimeout(() => {
      setCandidatesIdx([]);
      setInternalStep(candidateIdx);
    }, timeout);
  }, [candidateIdx]);

  useEffect(() => {
    setTimeout(() => sortInternal(), timeout);
  }, [internalStep]);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <RadioInput label="Выбор" checked={!isBubble} disabled={isLoading} onChange={() => setIsBubble(false)} />
          <RadioInput label="Пузырёк" checked={isBubble} disabled={isLoading} onChange={() => setIsBubble(true)} />
        </div>
        <div className={`${styles.buttonsContainer}`}>
          <div className={`${styles.sortButtonsContainer}`}>
            <Button text="По возрастанию" sorting={Direction.Ascending} extraClass={`${styles.button}`} isLoader={isLoading && !isDesc} disabled={arr.length === 0 || (isLoading && isDesc)} onClick={handleAsc} />
            <Button text="По убыванию" sorting={Direction.Descending} extraClass={`${styles.button}`} isLoader={isLoading && isDesc} disabled={arr.length === 0 || (isLoading && !isDesc)} onClick={handleDesc} />
          </div>
          <Button text="Новый массив" extraClass={`${styles.button}`} disabled={isLoading} onClick={handleRefresh} />
        </div>
      </div>
      <div className={`${styles.histogramContainer}`}>
        {arr.map((item, index) => <Column key={index} index={item} extraClass={isSortedColumn(index) ? `${styles.sortedColumnColor}` : isCandidateColumn(index) ? `${styles.candidateColumnColor}` : '' } />)}
      </div>
    </SolutionLayout>
  );
};
