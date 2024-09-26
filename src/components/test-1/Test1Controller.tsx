import React from 'react';
import Test1ControllerButton from './Test1ControllerButton';
import stylesShape from '../../styles/component/test-1/test-1-controller-button.module.scss';
import { Flex } from 'antd';

interface ITest1ControllerProps {
  onNext: () => void;
  onPrev: () => void;
  onSwitch: () => void;
}

const Test1Controller: React.FC<ITest1ControllerProps> = (props) => {
  const { onNext, onPrev, onSwitch } = props;
  return (
    <Flex
      justify="space-between"
      gap={'2rem'}
      style={{ minHeight: 150 }}
    >
      <Test1ControllerButton
        label="prev-next"
        onClick={onPrev}
      >
        <div className={stylesShape.triangleLeft} />
      </Test1ControllerButton>
      <Test1ControllerButton
        label="switch-positions"
        onClick={onSwitch}
        full
      >
        <Flex
          justify="space-around"
          style={{ width: '100%' }}
        >
          <div className={stylesShape.triangleUp} />
          <div className={stylesShape.triangleDown} />
        </Flex>
      </Test1ControllerButton>
      <Test1ControllerButton
        label="prev-next"
        onClick={onNext}
      >
        <div className={stylesShape.triangleRight} />
      </Test1ControllerButton>
    </Flex>
  );
};

export default Test1Controller;
