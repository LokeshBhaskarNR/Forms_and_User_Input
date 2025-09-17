import React from 'react';
import { ConfigProvider } from 'antd';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
      }}
    >
      <div className="App">
        <ContactForm />
      </div>
    </ConfigProvider>
  );
}

export default App;