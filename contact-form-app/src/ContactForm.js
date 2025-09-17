import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  message, 
  Card, 
  Typography, 
  Space,
  Row,
  Col 
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  MessageOutlined,
  SendOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

const ContactForm = () => {
  const [form] = Form.useForm();
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const maxMessageLength = 500;

  // Handle form submission with preventDefault equivalent
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log form data (replace with actual API call)
      console.log('Form Data:', {
        name: values.name,
        email: values.email,
        message: values.message,
        newsletter: values.newsletter || false,
        submittedAt: new Date().toISOString()
      });
      
      // Show success notification
      message.success('Thank you! Your message has been sent successfully.');
      
      // Reset form and show success state
      form.resetFields();
      setMessageText('');
      setIsSubmitted(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      message.error('Sorry, something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle message input change for character counter
  const handleMessageChange = (e) => {
    setMessageText(e.target.value);
  };

  // Custom validation functions
  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject('Please enter your email address');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return Promise.reject('Please enter a valid email address');
    }
    return Promise.resolve();
  };

  const validateName = (_, value) => {
    if (!value || value.trim().length === 0) {
      return Promise.reject('Please enter your name');
    }
    if (value.trim().length < 2) {
      return Promise.reject('Name must be at least 2 characters long');
    }
    if (value.trim().length > 50) {
      return Promise.reject('Name cannot exceed 50 characters');
    }
    return Promise.resolve();
  };

  const validateMessage = (_, value) => {
    if (!value || value.trim().length === 0) {
      return Promise.reject('Please enter your message');
    }
    if (value.trim().length < 10) {
      return Promise.reject('Message must be at least 10 characters long');
    }
    if (value.length > maxMessageLength) {
      return Promise.reject(`Message cannot exceed ${maxMessageLength} characters`);
    }
    return Promise.resolve();
  };

  const resetForm = () => {
    form.resetFields();
    setMessageText('');
    setIsSubmitted(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Row justify="center" style={{ width: '100%', maxWidth: '1200px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card
            style={{
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              border: 'none',
              overflow: 'hidden'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Header */}
              <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
                <Title level={2} style={{ color: '#1890ff', marginBottom: 8 }}>
                  Get In Touch
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </Text>
              </div>

              {/* Success State */}
              {isSubmitted ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  background: 'linear-gradient(135deg, #f6ffed 0%, #f0f9ff 100%)',
                  borderRadius: '12px',
                  border: '1px solid #b7eb8f'
                }}>
                  <div style={{ 
                    fontSize: '64px', 
                    marginBottom: '24px',
                    background: 'linear-gradient(135deg, #52c41a 0%, #1890ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    ✅
                  </div>
                  <Title level={3} style={{ color: '#52c41a', marginBottom: 16 }}>
                    Message Sent Successfully!
                  </Title>
                  <Text style={{ fontSize: '16px', color: '#666', marginBottom: 24, display: 'block' }}>
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </Text>
                  <Button 
                    type="primary" 
                    onClick={resetForm}
                    style={{ borderRadius: '8px' }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                /* Contact Form */
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  size="large"
                  style={{ width: '100%' }}
                  scrollToFirstError
                >
                  {/* Name Field */}
                  <Form.Item
                    label={<Text strong>Full Name</Text>}
                    name="name"
                    rules={[{ validator: validateName }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                      placeholder="Enter your full name"
                      style={{ borderRadius: '8px', padding: '10px 12px' }}
                      maxLength={50}
                    />
                  </Form.Item>

                  {/* Email Field */}
                  <Form.Item
                    label={<Text strong>Email Address</Text>}
                    name="email"
                    rules={[{ validator: validateEmail }]}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: '#1890ff' }} />}
                      placeholder="Enter your email address"
                      style={{ borderRadius: '8px', padding: '10px 12px' }}
                      type="email"
                    />
                  </Form.Item>

                  {/* Message Field with Character Counter */}
                  <Form.Item
                    label={
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <Text strong>Message</Text>
                        <Text 
                          type={messageText.length > maxMessageLength ? 'danger' : 'secondary'}
                          style={{ 
                            fontSize: '12px',
                            fontWeight: messageText.length > maxMessageLength * 0.9 ? 'bold' : 'normal'
                          }}
                        >
                          {messageText.length}/{maxMessageLength}
                        </Text>
                      </div>
                    }
                    name="message"
                    rules={[{ validator: validateMessage }]}
                  >
                    <TextArea
                      placeholder="Tell us about your project, question, or how we can help you..."
                      rows={5}
                      onChange={handleMessageChange}
                      style={{ 
                        borderRadius: '8px',
                        resize: 'vertical',
                        minHeight: '120px'
                      }}
                      showCount={false}
                      maxLength={maxMessageLength}
                    />
                  </Form.Item>

                  {/* Newsletter Subscription Checkbox */}
                  <Form.Item
                    name="newsletter"
                    valuePropName="checked"
                    style={{ marginBottom: '32px' }}
                  >
                    <Checkbox 
                      style={{ fontSize: '14px' }}
                    >
                      <Text>
                        Subscribe to our newsletter for updates, tips, and special offers
                      </Text>
                    </Checkbox>
                  </Form.Item>

                  {/* Submit Button */}
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isSubmitting}
                      icon={<SendOutlined />}
                      style={{
                        width: '100%',
                        height: '50px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        background: 'linear-gradient(135deg, #1890ff 0%, #722ed1 100%)',
                        border: 'none'
                      }}
                      disabled={messageText.length > maxMessageLength}
                    >
                      {isSubmitting ? 'Sending Message...' : 'Send Message'}
                    </Button>
                  </Form.Item>

                  {/* Help Text */}
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      By sending this message, you agree to our terms of service and privacy policy.
                    </Text>
                  </div>
                </Form>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;