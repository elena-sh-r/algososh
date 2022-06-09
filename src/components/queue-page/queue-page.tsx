import React from "react";
import styles from "./queue-page.module.css";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <div className={`${styles.controlsContainer}`}>
        <div className={`${styles.inputsContainer}`}>
          <Input isLimitText={true} maxLength={4} />
          <Button text="Добавить" extraClass={`${styles.addButton}`} />
          <Button text="Удалить" extraClass={`${styles.deleteButton}`} />
        </div>
        <Button text="Очистить" extraClass={`${styles.removeButton}`} />
      </div>
      <div className={`${styles.circlesContainer}`}>
        <Circle />
      </div>

    </SolutionLayout>
  );
};
