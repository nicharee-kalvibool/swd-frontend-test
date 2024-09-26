import React from 'react';
import { Typography } from 'antd';
import { useTranslations } from 'next-intl';
import styles from '../../styles/component/home-page/home-page-card.module.scss';
import Link from 'next/link';

export interface ITestOption {
  key: string;
}

interface THomePageCardProps {
  data: ITestOption;
}

const HomePageCard: React.FC<THomePageCardProps> = (props) => {
  const { data } = props;
  const t = useTranslations(`HomePage.${data.key}`);
  return (
    <Link href={data.key}>
      <div className={styles.homePageCard}>
        <Typography.Title level={5}>{t('title')}</Typography.Title>
        <Typography.Text>{t('desc')}</Typography.Text>
      </div>
    </Link>
  );
};

export default HomePageCard;
