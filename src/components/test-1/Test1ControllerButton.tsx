import React, { PropsWithChildren } from 'react';
import styles from '../../styles/component/test-1/test-1-controller-button.module.scss';
import { useTranslations } from 'next-intl';
import { Button, ConfigProvider } from 'antd';

interface ITest1ControllerButtonProps extends PropsWithChildren {
  label?: string;
  full?: boolean;
  onClick: () => void;
}

const Test1ControllerButton: React.FC<ITest1ControllerButtonProps> = (props) => {
  const { label, onClick, full, children } = props;
  const t = useTranslations('Test-1.label');
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultHoverBg: '#ffa200',
            colorBorder: 'transparent',
            defaultHoverBorderColor: 'transparent',
            defaultActiveBg: '#6EDA78',
            defaultActiveBorderColor: 'transparent',
          },
        },
      }}
    >
      <Button
        className={styles.button}
        onClick={onClick}
        style={{
          height: 150,
          width:  full ? '100%' : 250
        }}
      >
        {children}
        {label && <span className={styles.label}>{t(label)}</span>}
      </Button>
    </ConfigProvider>
  );
};

export default Test1ControllerButton;
