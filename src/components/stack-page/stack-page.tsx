import React, { useEffect, useState } from "react";
import styles from "./stack-page.module.css";
import { Stack } from "./stack";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState<number|string>('');
  const [addedIdx, setAddedIdx] = useState(-1);
  const [deletedIdx, setDeletedIdx] = useState(-1);

  const [render, setRender] = useState(false);
  const [stack, setStack] = useState(new Stack<number|string>(setRender, setValue, setAddedIdx, setDeletedIdx));

  const timeout = 200;

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
      stack.pop();
    }, timeout);
  }, [deletedIdx]);

  useEffect(() => {
    if (render){
        setRender(false);
    }
  }, [render]);

  return (
    <SolutionLayout title="Стек">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} value={value} onChange={handleChange} placeholder="" />
          <Button text="Добавить" extraClass={`${styles.addButton}`} onClick={()=>stack.push(value)} disabled={value.toString().length <= 0 || value.toString().length > 4} />
          <Button text="Удалить" extraClass={`${styles.deleteButton}`} onClick={()=>setDeletedIdx(stack.getSize()-1)} disabled={stack.getSize() === 0} />
        </div>
        <Button text="Очистить" extraClass={`${styles.clearButton}`} onClick={()=>stack.clear()} disabled={stack.getSize() === 0} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        {stack.getElements().map((element: string|number, index:number) => 
           <Circle key={index} extraClass={index === addedIdx || index === deletedIdx ? `${styles.changingCircleColor}` : ""} letter={element?.toString()} tail={index?.toString()} head={index===stack.getSize()-1 ? 'top' : ''} />
        )}
      </div>
    </SolutionLayout>
  );
};
