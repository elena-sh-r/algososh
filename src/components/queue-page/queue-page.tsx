import React, {useState, useEffect} from "react";
import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./queue";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('');
  const [addedIdx, setAddedIdx] = useState(-1);
  const [deletedIdx, setDeletedIdx] = useState(-1);

  const [render, setRender] = useState(false);
  const [queue, setQueue] = useState(new Queue<string>(7, '', setRender, setValue, setAddedIdx, setDeletedIdx));

  const timeout = 200;

  const handleChange = (e: any) => {
    const value = e.target?.value;
    setValue(value);
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

    setTimeout(()=>queue.dequeue(), timeout);
  }, [deletedIdx]);

  useEffect(() => {
    if (render){
        setRender(false);
    }
  }, [render]);

  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} value={value} onChange={handleChange} placeholder="Введите значение" />
          <Button text="Добавить" onClick={()=>queue.enqueue(value)} extraClass={`${styles.addButton}`} disabled={!value || queue.getTailIdx() === queue.getSize() - 1} />
          <Button text="Удалить" onClick={()=>setDeletedIdx(queue.getHeadIdx())} extraClass={`${styles.deleteButton}`} disabled={queue.getHeadIdx() === -1 && queue.getTailIdx() === -1} />
        </div>
        <Button text="Очистить" onClick={()=>queue.clear()} extraClass={`${styles.removeButton}`} disabled={queue.getHeadIdx() === -1 && queue.getTailIdx() === -1} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        {queue.getElements().map((letter:string, index:number) => 
          <Circle key={index} extraClass={index === addedIdx || index === deletedIdx ? `${styles.changingCircleColor}` : ""} letter={letter} head={index === queue.getHeadIdx() ? "head" : ""} index={index} tail={(index === queue.getTailIdx() ? `tail` : "")} />
        )}
      </div>

    </SolutionLayout>
  );
};
