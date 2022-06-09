import React, { useEffect, useState } from "react";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [addedIdx, setAddedIdx] = useState(-1);
  const [deletedIdx, setDeletedIdx] = useState(-1);
  const [elements, setElements] = useState<string[]>([]);

  const timeout = 200;

  const push = (item: string) => {
    setAddedIdx(elements.length);
    setElements([...elements, item]);
  }

  const pop = () => {
    const elementsCopy = [...elements];
    elementsCopy.splice(-1);
    setElements(elementsCopy);
  }

  const clear = () => {
    setElements([]);
  }

  const handleAdd = (e: any) => {
    push(value);
    setValue('');
  }

  const handleDelete = (e: any) => {
    setDeletedIdx(elements.length-1);
  }

  const handleClear = (e: any) => {
    clear();
  }

  const handleChange = (e: any) => {
    setValue(e.target?.value);
  }

  useEffect(() => {
    setTimeout(()=>setAddedIdx(-1), timeout);
  }, [addedIdx]);

  useEffect(() => {
    if (deletedIdx < 0) {
      return;
    }

    setTimeout(()=>{
      pop();
      setDeletedIdx(-1);
    }, timeout);
  }, [deletedIdx]);

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} value={value} onChange={handleChange} />
          <Button text="Добавить" extraClass={`${styles.addButton}`} onClick={handleAdd} disabled={value.length <= 0 || value.length > 4} />
          <Button text="Удалить" extraClass={`${styles.deleteButton}`} onClick={handleDelete} disabled={elements.length === 0} />
        </div>
        <Button text="Очистить" extraClass={`${styles.clearButton}`} onClick={handleClear} disabled={elements.length === 0} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        {elements.map((element:string, index:number) => 
          <Circle key={index} extraClass={index === addedIdx || index === deletedIdx ? `${styles.changingCircleColor}` : ""} letter={element?.toString()} tail={index?.toString()} head={index===elements.length-1 ? 'top' : ''} />
        )}
      </div>
    </SolutionLayout>
  );
};
