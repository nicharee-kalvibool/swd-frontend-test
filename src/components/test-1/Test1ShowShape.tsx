import { Col, Flex, Row } from 'antd';
import React, { useMemo } from 'react';
import Test1ControllerButton from './Test1ControllerButton';

export interface ITest1ShowShapeItem {
  id: number;
  content: React.ReactNode;
}

interface ITest1ShowShapeProps {
  data: ITest1ShowShapeItem[];
  revertLayout: boolean;
  onClickShape: () => void;
}

const Test1ShowShape: React.FC<ITest1ShowShapeProps> = (props) => {
  const { data, revertLayout, onClickShape } = props;

  const renderData = useMemo(() => {
    const subarrayTop = data.slice(0, 3);
    const subarrayBottom = data.slice(3, 6);
    return {
      top: subarrayTop,
      bottom: subarrayBottom,
    };
  }, [data]);

  return (
    <Flex
      vertical
      gap={16}
    >
      <Row
        justify={revertLayout ? 'end' : 'start'}
        gutter={16}
      >
        {renderData.top.map((item) => (
          <Col
            key={item.id}
            span={6}
          >
            <Test1ControllerButton onClick={onClickShape}>{item.content}</Test1ControllerButton>
          </Col>
        ))}
      </Row>
      <Row justify={revertLayout ? 'start' : 'end'}>
        {renderData.bottom.map((item) => (
          <Col
            key={item.id}
            span={6}
          >
            <Test1ControllerButton onClick={onClickShape}>{item.content}</Test1ControllerButton>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default Test1ShowShape;
