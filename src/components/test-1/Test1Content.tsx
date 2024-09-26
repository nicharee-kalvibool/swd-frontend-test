import React, { useState } from 'react';
import styles from '../../styles/component/test-1/test-1-content.module.scss';
import stylesShape from '../../styles/component/test-1/test-1-controller-button.module.scss';
import CommonNavBar from '../common/CommonNavBar';
import { useTranslations } from 'next-intl';
import Test1Controller from './Test1Controller';
import Test1ShowShape, { ITest1ShowShapeItem } from './Test1ShowShape';
import { Divider } from 'antd';

const shapeItem: ITest1ShowShapeItem[] = [
  {
    id: 1,
    content: <div className={stylesShape.square}/>,
  },
  {
    id: 2,
    content: <div className={stylesShape.circle}/>,
  },
  {
    id: 3,
    content: <div className={stylesShape.oval}/>,
  },
  {
    id: 4,
    content: <div className={stylesShape.trapezoid}/>,
  },
  {
    id: 5,
    content: <div className={stylesShape.rectangle}/>,
  },
  {
    id: 6,
    content: <div className={stylesShape.parallelogram}/>,
  },
];

const Test1Content = () => {
  const [shapeData, setShapeData] = useState<ITest1ShowShapeItem[]>(shapeItem);
  const [revertLayout, setRevertLayout] = useState(true);
  const t = useTranslations('HomePage.test-1');

  const handleOnShuffleData = () => {
    const teptData = [...shapeData];
    teptData.sort(() => Math.random() - 0.5);
    setShapeData(teptData);
  };

  const handelOnClickPrev = () => {
    const teptData = [...shapeData];
    const poped = teptData.pop() as ITest1ShowShapeItem;
    setShapeData([poped, ...teptData]);
  };

  const handelOnClickNext = () => {
    const teptData = [...shapeData];
    const shifted = teptData.shift() as ITest1ShowShapeItem;
    setShapeData([...teptData, shifted]);
  };

  const handelOnClickSwitchPositions = () => {
    setRevertLayout(!revertLayout);
  };

  return (
    <div className={styles.container}>
      <CommonNavBar title={t('desc')} />
      <div className={styles.content}>
        <Test1Controller
          onNext={handelOnClickNext}
          onPrev={handelOnClickPrev}
          onSwitch={handelOnClickSwitchPositions}
        />
        <Divider />
        <Test1ShowShape
          data={shapeData}
          onClickShape={handleOnShuffleData}
          revertLayout={revertLayout}
        />
      </div>
    </div>
  );
};

export default Test1Content;
