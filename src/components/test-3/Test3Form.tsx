import React, { useEffect } from 'react';
import { Button, Col, DatePicker, Flex, Form, Input, Radio, Row, Select } from 'antd';
import { useTranslations } from 'next-intl';
import { FR, TH, US } from 'country-flag-icons/react/3x2';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addUserData, editUserData, IUserDataState } from '@/lib/features/test3/userDataSlice';
import dayjs from 'dayjs';

const { Option } = Select;

type TFlagOption = '+66' | '+1' | '+33';
const flagOption = {
  '+66': <TH style={{ objectFit: 'cover' }} />,
  '+1': <US style={{ objectFit: 'cover' }} />,
  '+33': <FR style={{ objectFit: 'cover' }} />,
};

const Test3Form: React.FC = () => {
  const [form] = Form.useForm();
  const tData = useTranslations('Test-3.label');
  const tDataGender = useTranslations('Test-3.data.gender');
  const tDataNationality = useTranslations('Test-3.data.nationality');
  const tError = useTranslations('Test-3.error');
  const tButton = useTranslations('Test-3.form');

  const dispatch = useAppDispatch();
  const { value: data } = useAppSelector((state) => state.userData);

  const onFinish = (values: IUserDataState) => {
    const payload: IUserDataState = {
      ...values,
      citizenId: `${values?.citizenId1 ?? ''}-${values?.citizenId2 ?? ''}-${values?.citizenId3 ?? ''}-${values?.citizenId4 ?? ''}-${values?.citizenId5 ?? ''}`,
      birthday: dayjs(values.birthday).format(),
    };
    if (data.selectedEditDataIdx != null) {
      dispatch(editUserData({ index: data?.selectedEditDataIdx as number, upadateData: payload }));
    } else {
      dispatch(addUserData(payload));
    }
    alert('Save Success');
    form.resetFields();
  };

  const options = [
    {
      key: 'th',
      label: (
        <Flex
          align="center"
          gap={10}
        >
          <Flex
            align="center"
            style={{
              width: 36,
              height: 20,
            }}
          >
            {flagOption['+66']}
          </Flex>
          +66
        </Flex>
      ),
      value: '+66',
    },

    {
      key: 'us',
      label: (
        <Flex
          align="center"
          gap={10}
        >
          <Flex
            align="center"
            style={{
              width: 36,
              height: 20,
            }}
          >
            {flagOption['+1']}
          </Flex>
          +1
        </Flex>
      ),
      value: '+1',
    },
    {
      key: 'fr',
      label: (
        <Flex
          align="center"
          gap={10}
        >
          <Flex
            align="center"
            style={{
              width: 36,
              height: 20,
            }}
          >
            {flagOption['+33']}
          </Flex>
          +33
        </Flex>
      ),
      value: '+33',
    },
  ];

  useEffect(() => {
    if (data.selectedEditDataIdx != null) {
      const temp = data.listDataUser?.[data.selectedEditDataIdx];
      if (temp) {
        form.setFieldsValue({ ...temp, birthday: dayjs(temp.birthday) });
      }
    } else {
      form.resetFields();
    }
  }, [data.selectedEditDataIdx]);

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row gutter={24}>
        <Col span={6}>
          <Form.Item
            name="title"
            label={tData('title')}
            rules={[
              {
                required: true,
                message: tError('title'),
              },
            ]}
          >
            <Select placeholder={tData('title')}>
              <Option value="male">{tDataGender('male')}</Option>
              <Option value="female">{tDataGender('female')}</Option>
              <Option value="unisex">{tDataGender('unisex')}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            name="fname"
            label={tData('fname')}
            rules={[
              {
                required: true,
                message: tError('fname'),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            name="lname"
            label={tData('lname')}
            rules={[
              {
                required: true,
                message: tError('lname'),
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name="birthday"
            label={tData('birthday')}
            rules={[
              {
                required: true,
                message: tError('birthday'),
              },
            ]}
          >
            <DatePicker
              format="YYYY/MM/DD"
              style={{ width: '100%' }}
              placeholder={tData('birthday-placeholder')}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="nationality"
            label={tData('nationality')}
            rules={[
              {
                required: true,
                message: tError('nationality'),
              },
            ]}
          >
            <Select placeholder={tData('nationality-placeholder')}>
              <Option value="th">{tDataNationality('th')}</Option>
              <Option value="fr">{tDataNationality('fr')}</Option>
              <Option value="us">{tDataNationality('us')}</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label={tData('citizen-id')}>
        <Row gutter={12}>
          <Col span={2}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="citizenId1"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Flex justify="center">-</Flex>
          </Col>
          <Col span={4}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="citizenId2"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Flex justify="center">-</Flex>
          </Col>
          <Col span={4}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="citizenId3"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Flex justify="center">-</Flex>
          </Col>
          <Col span={4}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="citizenId4"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Flex justify="center">-</Flex>
          </Col>
          <Col span={2}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="citizenId5"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="gender"
        label={tData('gender')}
        rules={[
          {
            required: true,
            message: tError('gender'),
          },
        ]}
      >
        <Radio.Group>
          <Radio value="male">{tDataGender('male')}</Radio>
          <Radio value="female">{tDataGender('female')}</Radio>
          <Radio value="unisex">{tDataGender('unisex')}</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label={tData('mobile')}
        rules={[
          {
            required: true,
            message: tError('mobile'),
          },
        ]}
      >
        <Row gutter={12}>
          <Col span={4}>
            <Form.Item
              style={{ marginBottom: 0 }}
              name="mobilePrefix"
            >
              <Select
                options={options}
                labelRender={({ value }) => (
                  <Flex
                    align="center"
                    gap={10}
                  >
                    <Flex
                      align="center"
                      style={{
                        width: 36,
                        height: 20,
                      }}
                    >
                      {flagOption?.[value as TFlagOption]}
                    </Flex>
                    {value}
                  </Flex>
                )}
              />
            </Form.Item>
          </Col>
          <Col span={1}>
            <Flex justify="center">-</Flex>
          </Col>
          <Col span={6}>
            <Form.Item
              name="mobile"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="passportNo"
            label={tData('passport-no')}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="expectedDalary"
            label={tData('expected-salary')}
            rules={[{ required: true, message: tError('expected-salary') }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Flex justify="space-around">
            <Button htmlType="reset">{tButton('reset')}</Button>
            <Button htmlType="submit">{tButton('submit')}</Button>
          </Flex>
        </Col>
      </Row>
    </Form>
  );
};

export default Test3Form;
