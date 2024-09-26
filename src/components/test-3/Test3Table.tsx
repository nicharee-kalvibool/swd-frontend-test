import { clearAllData, deleteMultiUserData, deleteUserData, selectDeleteUserData, selectEditUserData } from '@/lib/features/test3/userDataSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button, Checkbox, Flex, Table, TableColumnsType } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';

const Test3Table = () => {
  const tHead = useTranslations('Test-3.table.head');
  const tController = useTranslations('Test-3.table.controller');
  const tDataNationality = useTranslations('Test-3.data.nationality');
  const tDataGender = useTranslations('Test-3.data.gender');
  const { value: data } = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();
  const [allCheck, setAllCheck] = useState(false);

  const dataList = useMemo(() => {
    const temp = data?.listDataUser?.map((data, idx) => ({
      ...data,
      id: idx,
    }));
    return temp;
  }, [data.listDataUser]);

  const handleOnEditData = (idx: number) => {
    dispatch(selectEditUserData(idx));
  };

  const handleOnDeleteOne = (idx: number) => {
    dispatch(deleteUserData(idx));
    alert('Delete Success');
  };

  const columns: TableColumnsType = [
    {
      title: tHead('name'),
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <>
          {record?.fname} {record?.lname}
        </>
      ),
    },
    {
      title: tHead('gender'),
      dataIndex: 'gender',
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      render: (value) => <>{tDataGender(value)}</>,
    },
    {
      title: tHead('mobile'),
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
      render: (_, record) => (
        <>
          {record?.mobilePrefix}
          {record?.mobile}
        </>
      ),
    },
    {
      title: tHead('nationality'),
      dataIndex: 'nationality',
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      render: (value) => <>{tDataNationality(value)}</>,
    },
    {
      title: tHead('manage'),
      render: (_, record) => (
        <Flex gap={10}>
          <Button
            type="text"
            onClick={() => handleOnEditData(record.id)}
          >
            {tController('edit-btn')}
          </Button>
          <Button
            type="text"
            onClick={() => handleOnDeleteOne(record.id)}
          >
            {tController('delete-btn')}
          </Button>
        </Flex>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    const temp = newSelectedRowKeys as number[];
    dispatch(
      selectDeleteUserData(
        temp.sort((a, b) => {
          return b - a;
        })
      )
    );
  };

  const handleOnDeleteSelected = () => {
    if (allCheck) {
      dispatch(clearAllData());
      setAllCheck(false);
    } else {
      dispatch(deleteMultiUserData());
    }
  };

  const handleOnSelectAll = () => {
    if (allCheck) {
      dispatch(selectDeleteUserData([]));
    } else {
      let temp: number[] = [];
      dataList?.map((item) => {
        temp.push(item.id);
      });
      dispatch(selectDeleteUserData(temp));
    }
    setAllCheck(!allCheck);
  };

  return (
    <Flex
      vertical
      gap={30}
      style={{ marginTop: 30 }}
    >
      <div>
        <Checkbox
          checked={allCheck}
          onChange={() => handleOnSelectAll()}
        >
          {tController('select-all')}
        </Checkbox>
        <Button onClick={handleOnDeleteSelected}>{tController('delete-btn')}</Button>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: onSelectChange,
          selectedRowKeys: data.selectedData,
        }}
        columns={columns}
        dataSource={dataList}
        pagination={{
          position: ['topRight'],
          nextIcon: tController('next'),
          prevIcon: tController('prev'),
        }}
        rowKey={'id'}
      />
    </Flex>
  );
};

export default Test3Table;
