import React from 'react';
import styles from '../../styles/component/common/common-nav-bar.module.scss';
import { Flex, Select, Typography } from 'antd';
import { TH, GB } from 'country-flag-icons/react/3x2';
import { useLocale, useTranslations } from 'next-intl';
import { setUserLocale } from '@/service/locale';
import { Locale } from '@/i18n/config';

interface ICommonNavBarProps {
  title?: string;
}

type TFlagOption = 'th' | 'en';
const flagOption = {
  en: <GB style={{ objectFit: 'cover' }} />,
  th: <TH style={{ objectFit: 'cover' }} />,
};

const CommonNavBar: React.FC<ICommonNavBarProps> = (props) => {
  const { title } = props;
  const locale = useLocale();
  const t = useTranslations('Option');

  function handleChange(value: string) {
    const locale = value as Locale;
    setUserLocale(locale);
  }

  const options = [
    {
      key: 'th',
      label: (
        <Flex
          align="center"
          gap={10}
        >
          <div className={styles.optionIcon}>{flagOption['th']}</div>
          {t('th')}
        </Flex>
      ),
      value: 'th',
    },
    {
      key: 'en',
      label: (
        <Flex
          align="center"
          gap={10}
        >
          <div className={styles.optionIcon}>{flagOption['en']}</div>
          {t('en')}
        </Flex>
      ),
      value: 'en',
    },
  ];

  return (
    <div className={styles.commonNavBar}>
      <Typography.Title level={2} className={styles.title}>{title}</Typography.Title>
      <Select
        defaultValue={locale}
        style={{ width: 150 }}
        onChange={handleChange}
        options={options}
        labelRender={({ value }) => (
          <Flex
            align="center"
            gap={10}
          >
            <div className={styles.optionIcon}>{flagOption?.[value as TFlagOption]}</div>
            {t(value)}
          </Flex>
        )}
      />
    </div>
  );
};

export default CommonNavBar;
