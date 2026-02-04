import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { antdTheme } from './theme/antdTheme';
import { router } from './routes';
import './App.css';

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
