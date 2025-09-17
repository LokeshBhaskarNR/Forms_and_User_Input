import React from 'react';
import { ConfigProvider } from 'antd';
import ContactForm from './ContactForm';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <div className="App">
        <ContactForm />
      </div>
    </ConfigProvider>
  );
};

export default App;