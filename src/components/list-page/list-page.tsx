import React, {useState, useEffect} from "react";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList } from "./linkedList";
import { LinkedListNode } from "./linkedListNode";
import { ArrowIcon } from "../ui/icons/arrow-icon";


export const ListPage: React.FC = () => {
  const [indexToProcess, setIndexToProcess] = useState('');
  const [value, setValue] = useState('');
  const [newItem, setNewItem] = useState(null);
  const [newItemIndex, setNewItemIndex] = useState(-1);
  const [progressIndex, setProgressIndex] = useState(-1);
  const [oldItem, setOldItem] = useState(null);
  const [oldItemIndex, setOldItemIndex] = useState(-1);
  const [addInProgress, setAddInProgress] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [list, setList] = useState(new LinkedList<string|number>('', setValue, setIndexToProcess, setNewItem, setNewItemIndex, setOldItem, setOldItemIndex, setProgressIndex, setAddInProgress, setDeleteInProgress, 500, ['0','34','8','1']));

  const isLoading = addInProgress || deleteInProgress;
  const endButtonsDisabled = list.toArray().length === 0 || isLoading;
  const indexButtonsDisabled = !indexToProcess || +indexToProcess < 0 || +indexToProcess > list.toArray().length - 1 || isLoading;

  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} placeholder="Введите значение" value={value} onChange={(e:any) => setValue(e.target.value)}/>
          <Button text="Добавить в head" onClick={()=>list.prepend(value)} extraClass={`${styles.valueButton}`} disabled={!value || isLoading} isLoader={newItemIndex === 0 && addInProgress}/>
          <Button text="Добавить в tail" onClick={()=>list.append(value)} extraClass={`${styles.valueButton}`} disabled={!value || isLoading} isLoader={newItemIndex === list.toArray().length - 1 && addInProgress} />
          <Button text="Удалить из head" onClick={()=>list.deleteHead()} extraClass={`${styles.valueButton}`} disabled={endButtonsDisabled} isLoader={oldItemIndex === 0 && deleteInProgress} />
          <Button text="Удалить из tail" onClick={()=>list.deleteTail()} extraClass={`${styles.valueButton}`} disabled={endButtonsDisabled} isLoader={oldItemIndex === list.toArray().length - 1 && deleteInProgress} />
        </div>
        <div className={`${styles.inputsContainer}`}>
          <Input placeholder="Введите индекс" type="number" value={indexToProcess} onChange={(e:any) => setIndexToProcess(e.target.value)} extraClass={`${styles.input}`} />
          <Button text="Добавить по индексу" onClick={()=>list.addByIndex(+indexToProcess, value)} extraClass={`${styles.indexButton}`} disabled={!value || indexButtonsDisabled} isLoader={+indexToProcess > 0 && addInProgress} />
          <Button text="Удалить по индексу" onClick={()=>list.deleteByIndex(+indexToProcess)} extraClass={`${styles.indexButton}`} disabled={indexButtonsDisabled} isLoader={+indexToProcess > 0 && deleteInProgress} />
        </div>
      </div>
      <div className={`${styles.circlesContainer}`}>
        {list.toArray().map((node:LinkedListNode<string|number>, index:number, array:LinkedListNode<string|number>[]) => 
          <div className={`${styles.circleContainer}`} key={index}>
            <Circle
              letter={index === oldItemIndex && oldItem ? "" : node.value.toString()}
              index={index}
              extraClass={index === newItemIndex && !newItem ? `${styles.modifiedCircleColor}` : ((addInProgress && index < progressIndex) || (deleteInProgress && index <= progressIndex) ? `${styles.changingCircleColor}` : "")}
              head={(progressIndex < 0 && index === newItemIndex && newItem) || (addInProgress && progressIndex === index)
                ? <Circle
                  letter={newItem!}
                  isSmall={true}
                  extraClass={`${styles.changingCircleColor}`}
                />
                : (index === 0 ? "head" : "")}
              tail={(progressIndex < 0 && index === oldItemIndex && oldItem) || (oldItemIndex === progressIndex && progressIndex === index)
                ? <Circle
                  letter={oldItem!}
                  isSmall={true}
                  extraClass={`${styles.changingCircleColor}`}
                />
                : (index === array.length - 1 ? "tail" : "")}
            />
            {index < array.length - 1 && <ArrowIcon fill={index === newItemIndex && !newItem ? "#7FE051" : ((addInProgress && index < progressIndex) || (deleteInProgress && index <= progressIndex) ? "#D252E1" : "#0032FF")}
              />}
          </div>
        )}
      </div>
    </SolutionLayout>
  );
};
