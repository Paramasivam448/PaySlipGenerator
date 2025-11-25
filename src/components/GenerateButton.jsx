import { useState } from 'react';
import { generateAllPayslips } from '../utils/pdfGenerator';

const GenerateButton = ({ employees, isDarkMode }) => {
  const [useCustomDate, setUseCustomDate] = useState(false);
  const [customMonth, setCustomMonth] = useState('');
  const [customYear, setCustomYear] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleGenerate = () => {
    if (!employees || employees.length === 0) {
      alert('Please upload employee data first');
      return;
    }
    
    let month, year;
    
    if (useCustomDate) {
      if (!customMonth || !customYear) {
        alert('Please select both month and year');
        return;
      }
      month = customMonth;
      year = customYear;
    } else {
      month = employees[0]?.Month;
      year = employees[0]?.Year;
      
      if (!month || !year) {
        alert('Month and Year not found in Excel data. Please enable custom date selection.');
        return;
      }
    }
    
    generateAllPayslips(employees, month, year);
    alert(`Generated ${employees.length} payslips for ${month} ${year}!`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Custom Date Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          color: isDarkMode ? '#ecf0f1' : '#2c3e50',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          <input
            type="checkbox"
            checked={useCustomDate}
            onChange={(e) => setUseCustomDate(e.target.checked)}
            style={{ transform: 'scale(1.2)' }}
          />
          Override Excel Month/Year
        </label>
      </div>

      {/* Custom Date Selectors */}
      {useCustomDate && (
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <select
            value={customMonth}
            onChange={(e) => setCustomMonth(e.target.value)}
            style={{
              padding: '10px 15px',
              fontSize: '14px',
              border: `2px solid ${isDarkMode ? '#34495e' : '#667eea'}`,
              borderRadius: '8px',
              background: isDarkMode ? '#2c3e50' : '#fff',
              color: isDarkMode ? '#ecf0f1' : '#2c3e50',
              minWidth: '140px'
            }}
          >
            <option value="">Select Month</option>
            {months.map((m, index) => (
              <option key={index} value={m}>{m}</option>
            ))}
          </select>
          
          <input
            type="number"
            placeholder="Year"
            value={customYear}
            onChange={(e) => setCustomYear(e.target.value)}
            style={{
              padding: '10px 15px',
              fontSize: '14px',
              border: `2px solid ${isDarkMode ? '#34495e' : '#667eea'}`,
              borderRadius: '8px',
              background: isDarkMode ? '#2c3e50' : '#fff',
              color: isDarkMode ? '#ecf0f1' : '#2c3e50',
              width: '100px'
            }}
          />
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={!useCustomDate || (useCustomDate && (!customMonth || !customYear))}
        style={{
          padding: '18px 40px',
          fontSize: '16px',
          background: (!useCustomDate || (useCustomDate && (!customMonth || !customYear)))
            ? '#6c757d'
            : isDarkMode 
              ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
              : 'linear-gradient(135deg, #007bff, #0056b3)',
          color: 'white',
          border: 'none',
          borderRadius: '15px',
          cursor: (!useCustomDate || (useCustomDate && (!customMonth || !customYear))) ? 'not-allowed' : 'pointer',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          boxShadow: '0 6px 20px rgba(0, 123, 255, 0.4)',
          minWidth: '250px',
          opacity: (!useCustomDate || (useCustomDate && (!customMonth || !customYear))) ? 0.6 : 1
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-3px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.6)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
        }}
      >
        🚀 Generate All Payslips
      </button>
    </div>
  );
};

export default GenerateButton;