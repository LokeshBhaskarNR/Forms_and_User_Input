
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  DatePicker,
  Upload,
  message,
  Card,
  Space,
  Typography,
  Row,
  Col
} from 'antd';
import { UploadOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import SuccessMessage from './SuccessMessage';
import '../styles/ContactForm.css';

const { TextArea } = Input;
const { Title, Text } = Typography;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [messageText, setMessageText] = useState('');
  const [age, setAge] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const MAX_MESSAGE_LENGTH = 500;

  const calculateAge = (birthDate) => {
    if (!birthDate) {
      setAge(null);
      return;
    }
    
    const today = dayjs();
    const birth = dayjs(birthDate);
    const calculatedAge = today.diff(birth, 'year');
    setAge(calculatedAge);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      console.log('Form submitted:', {
        ...values,
        age: age,
        file: fileList[0]?.originFileObj || null,
        submittedAt: new Date().toISOString()
      });
      
      setLoading(false);
      setIsSubmitted(true);
      message.success('Form submitted successfully!');
    }, 1000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    form.resetFields();
    setMessageText('');
    setAge(null);
    setFileList([]);
  };

  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type.startsWith('image/') || 
                         file.type.startsWith('text/') ||
                         file.type === 'application/msword' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      if (!isValidType) {
        message.error('You can only upload PDF, image, text, or Word files!');
        return false;
      }
      
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('File must be smaller than 10MB!');
        return false;
      }
      
      return false;
    },
    fileList,
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    },
    onRemove: () => {
      setFileList([]);
    }
  };

  if (isSubmitted) {
    return <SuccessMessage onReset={handleReset} />;
  }

  return (
    <div className="contact-form-container">
      <Row justify="center">
        <Col xs={24} sm={22} md={18} lg={14} xl={12}>
          <Card className="contact-form-card">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <div className="form-header">
                <Title level={2} className="form-title">
                  Contact Us
                </Title>
                <Text type="secondary" className="form-subtitle">
                  Contact Form Using React JS and Ant Design
                </Text>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
                size="large"
              >
                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        { required: true, message: 'Please enter your name!' },
                        { min: 2, message: 'Name must be at least 2 characters!' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'Name can only contain letters and spaces!' }
                      ]}
                    >
                      <Input 
                        prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Enter your full name" 
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input 
                        prefix={<MailOutlined style={{ color: '#bfbfbf' }} />}
                        placeholder="Enter your email" 
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={[16, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Date of Birth"
                      name="dob"
                      rules={[
                        { required: true, message: 'Please select your date of birth!' }
                      ]}
                    >
                      <DatePicker
                        placeholder="Select date of birth"
                        style={{ width: '100%' }}
                        onChange={calculateAge}
                        disabledDate={(current) => current && current > dayjs().endOf('day')}
                        showToday={false}
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} sm={12}>
                    <Form.Item label="Age">
                      <Input
                        value={age ? `${age} years old` : ''}
                        placeholder="Age will be calculated automatically"
                        disabled
                        style={{ backgroundColor: '#f5f5f5' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="File Upload (Optional)"
                  help="Upload any relevant document (PDF, Image, Word, Text files - Max 10MB)"
                >
                  <Upload {...uploadProps} maxCount={1}>
                    <Button icon={<UploadOutlined />}>
                      Choose File
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label={
                    <div className="message-label">
                      <span>Message</span>
                      <Text type="secondary" className="character-count">
                        {messageText.length}/{MAX_MESSAGE_LENGTH}
                      </Text>
                    </div>
                  }
                  name="message"
                  rules={[
                    { required: true, message: 'Please enter your message!' },
                    { min: 10, message: 'Message must be at least 10 characters!' },
                    { max: MAX_MESSAGE_LENGTH, message: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters!` }
                  ]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Enter your message here... Tell us how we can help you!"
                    value={messageText}
                    onChange={handleMessageChange}
                    maxLength={MAX_MESSAGE_LENGTH}
                    showCount={false}
                  />
                </Form.Item>

                <Form.Item
                  name="newsletter"
                  valuePropName="checked"
                  style={{ marginBottom: 24 }}
                >
                  <Checkbox>
                    I would like to subscribe to your newsletter for updates and news
                  </Checkbox>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    className="submit-button"
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;