import { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import EmployeeTable from './components/EmployeeTable';
import GenerateButton from './components/GenerateButton';
import PreloadButton from './components/PreloadButton';
import SheetSelector from './components/SheetSelector';
import { parseSheetData } from './utils/excelReader';
import { loadSheetData } from './utils/autoLoader';

function App() {
  const [employees, setEmployees] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dataSource, setDataSource] = useState(''); // 'uploaded' or 'preloaded'

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
  if (sheetNames.length && !selectedSheet) {
    setSelectedSheet(sheetNames[0]);
  }
}, [sheetNames]);


  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const theme = {
    light: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      text: '#333',
      headerText: '#fff',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    dark: {
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      cardBg: 'rgba(44, 62, 80, 0.95)',
      text: '#ecf0f1',
      headerText: '#fff',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
    }
  };

  const currentTheme = isDarkMode ? theme.dark : theme.light;

  const handleDataParsed = ({ employees, sheetNames, selectedSheet, source = 'uploaded' }) => {
    if (sheetNames) {
      setSheetNames(sheetNames);
      setEmployees([]);
      setDataSource(source);
      
      const sheetToSelect = selectedSheet || sheetNames[0];
      setSelectedSheet(sheetToSelect);
    }
    if (employees) {
      setEmployees(employees);
    }
  };

  const handleSheetSelect = (sheetName) => {
    setSelectedSheet(sheetName);
    if (sheetName) {
      try {
        const sheetData = dataSource === 'uploaded' 
          ? parseSheetData(sheetName) 
          : loadSheetData(sheetName);
        setEmployees(sheetData.employees);
      } catch (error) {
        console.error('Error parsing sheet:', error);
        alert('Error loading sheet data');
      }
    }
  };



  return (
    <div style={{
      minHeight: '100vh',
      background: currentTheme.background,
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header with Theme Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: currentTheme.headerText,
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            💼 Payslip Generator
          </h1>
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              padding: '12px 20px',
              color: currentTheme.headerText,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Main Content Card */}
        <div style={{
          background: currentTheme.cardBg,
          borderRadius: '20px',
          padding: '30px',
          boxShadow: currentTheme.shadow,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {/* File Upload Section */}
          <div style={{
            background: isDarkMode ? 'rgba(52, 73, 94, 0.5)' : 'rgba(102, 126, 234, 0.1)',
            borderRadius: '15px',
            padding: '25px',
            marginBottom: '25px',
            border: `1px solid ${isDarkMode ? 'rgba(236, 240, 241, 0.1)' : 'rgba(102, 126, 234, 0.2)'}`
          }}>
            <div style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <FileUploader onDataParsed={handleDataParsed} isDarkMode={isDarkMode} />
              <PreloadButton onDataLoaded={handleDataParsed} isDarkMode={isDarkMode} />
            </div>
          </div>

          {/* Sheet Selector */}
          <SheetSelector
            sheetNames={sheetNames}
            selectedSheet={selectedSheet}
            onSheetSelect={handleSheetSelect}
            isDarkMode={isDarkMode}
          />

          {/* Employee Table */}
          <EmployeeTable employees={employees} isDarkMode={isDarkMode} />

          {/* Generate Button */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <GenerateButton employees={employees} isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          color: currentTheme.headerText,
          opacity: 0.8,
          fontSize: '14px'
        }}>
          Built with ❤️ for efficient payroll management
        </div>
      </div>
    </div>
  );
}

export default App;