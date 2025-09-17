
import React, { useEffect, useState } from 'react';
import { Card, Alert, Button, Typography, Space, Row, Col } from 'antd';
import { CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SuccessMessage = ({ onReset }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onReset();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onReset]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f2f5', 
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card style={{ textAlign: 'center', borderRadius: '12px' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <CheckCircleOutlined 
                style={{ 
                  fontSize: '64px', 
                  color: '#52c41a',
                  marginBottom: '16px'
                }} 
              />
              
              <Title level={2} style={{ color: '#52c41a', margin: 0 }}>
                Message Sent Successfully!
              </Title>
              
              <Alert
                message="Thank you for contacting us!"
                description="We've received your message and will get back to you within 24 hours. Check your email for a confirmation."
                type="success"
                showIcon
                style={{ textAlign: 'left' }}
              />
              
              <div>
                <Text type="secondary">
                  Redirecting back to form in {countdown} seconds...
                </Text>
              </div>
              
              <Button 
                type="primary" 
                icon={<ReloadOutlined />}
                onClick={onReset}
                size="large"
              >
                Send Another Message
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SuccessMessage;