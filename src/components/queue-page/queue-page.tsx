import React, {useState, useEffect} from "react";
import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [headIdx, setHeadIdx] = useState(-1);
  const [tailIdx, setTailIdx] = useState(-1);
  const [addedIdx, setAddedIdx] = useState(-1);
  const [deletedIdx, setDeletedIdx] = useState(-1);
  const [elements, setElements] = useState<string[]>(['','','','','','',''])

  const timeout = 200;

  const enqueue = (item:string) => {
    if (headIdx < 0) {
      setHeadIdx(0);
    }

    let newTailIdx = tailIdx + 1;

    if (newTailIdx > elements.length - 1) {
      return;
    }

    const newElements = [...elements];
    newElements[newTailIdx] = item;

    setElements(newElements);
    setTailIdx(newTailIdx);
    setAddedIdx(newTailIdx);
  }

  const dequeue = () => {
    let newHeadIdx = headIdx + 1;
    const newElements = [...elements];
    newElements[headIdx] = '';

    setElements(newElements);

    if (newHeadIdx > tailIdx) {
      setHeadIdx(-1);
      setTailIdx(-1);
    } else {
      setHeadIdx(newHeadIdx);
    }

    setDeletedIdx(-1);
  }
  
  const handleChange = (e: any) => {
    const value = e.target?.value;
    setValue(value);
  }

  const handleAdd = (e:any) => {
    enqueue(value);
    setValue('');
  }
  
  const handleDelete = (e:any) => {
    setDeletedIdx(headIdx);
    setValue('');
  }

  const handleClear = (e:any) => {
    setHeadIdx(-1);
    setTailIdx(-1);
    setElements(['','','','','','','']);
  }

  useEffect(() => {
    if (addedIdx < 0) {
      return;
    }

    setTimeout(()=>setAddedIdx(-1), timeout);
  }, [addedIdx]);

  useEffect(() => {
    if (deletedIdx < 0) {
      return;
    }

    setTimeout(()=>dequeue(), timeout);
  }, [deletedIdx]);

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} value={value} onChange={handleChange} placeholder="Введите значение" />
          <Button text="Добавить" onClick={handleAdd} extraClass={`${styles.addButton}`} disabled={!value || tailIdx === elements.length - 1} />
          <Button text="Удалить" onClick={handleDelete} extraClass={`${styles.deleteButton}`} disabled={headIdx === -1 && tailIdx === -1} />
        </div>
        <Button text="Очистить" onClick={handleClear} extraClass={`${styles.removeButton}`} disabled={headIdx === -1 && tailIdx === -1} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        {elements.map((letter:string, index:number) => 
          <Circle key={index} extraClass={index === addedIdx || index === deletedIdx ? `${styles.changingCircleColor}` : ""} letter={letter} head={index === headIdx ? "head" : ""} tail={index.toString() + (index === tailIdx ?
            `
              tail` : "")} />
        )}
      </div>

    </SolutionLayout>
  );
};
