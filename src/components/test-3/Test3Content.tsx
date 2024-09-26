import React, { useEffect } from 'react';
import styles from '../../styles/component/test-3/test-3-content.module.scss';
import CommonNavBar from '../common/CommonNavBar';
import { useTranslations } from 'next-intl';
import Test3Form from './Test3Form';
import Test3Table from './Test3Table';
import { getStorageData } from '@/utils/local-storage';
import { setInitialUserData } from '@/lib/features/test3/userDataSlice';
import { useAppDispatch } from '@/lib/hooks';

const Test3Content = () => {
  const t = useTranslations('HomePage.test-3');
  const dispatch = useAppDispatch();

  const initailData = () => {
    const data = getStorageData();
    if (data && data?.length > 0) {
      dispatch(setInitialUserData(data));
    }
  };

  useEffect(() => {
    initailData();
  }, []);
  return (
    <div className={styles.container}>
      <CommonNavBar
        title={t('desc')}
        showHome
      />
      <div className={styles.content}>
        <div className={styles.formBox}>
          <Test3Form />
        </div>
        <Test3Table />
      </div>
    </div>
  );
};

export default Test3Content;
