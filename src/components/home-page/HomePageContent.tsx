import React from 'react';
import styles from '../../styles/component/home-page/home-page-content.module.scss';
import CommonNavBar from '../common/CommonNavBar';
import HomePageCard, { ITestOption } from './HomePageCard';

const testOption: ITestOption[] = [
  {
    key: 'test-1',
  },
  {
    key: 'test-2',
  },
  {
    key: 'test-3',
  },
];

const HomePageContent = () => {
  return (
    <div className={styles.homePageContainer}>
      <CommonNavBar />
      <div className={styles.cardContent}>
        {testOption.map((item) => (
          <HomePageCard
            key={item.key}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePageContent;
