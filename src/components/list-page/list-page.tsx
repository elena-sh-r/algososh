import React from "react";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";


export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} placeholder="Введите значение" />
          <Button text="Добавить в head" extraClass={`${styles.valueButton}`} />
          <Button text="Добавить в tail" extraClass={`${styles.valueButton}`} />
          <Button text="Удалить из head" extraClass={`${styles.valueButton}`} />
          <Button text="Удалить из tail" extraClass={`${styles.valueButton}`} />
        </div>
        <div className={`${styles.inputsContainer}`}>
          <Input placeholder="Введите индекс" />
          <Button text="Добавить в head" extraClass={`${styles.indexButton}`} />
          <Button text="Добавить в tail" extraClass={`${styles.indexButton}`} />
        </div>
      </div>
      <div className={`${styles.circlesContainer}`}>
        <Circle />
      </div>
    </SolutionLayout>
  );
};
