import { useState } from 'react';
import { generateSinglePayslip, downloadPayslipHTML, generateRealPDF } from '../utils/pdfGenerator';


const EmployeeTable = ({ employees, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pdfMethod, setPdfMethod] = useState('print'); // 'print', 'canvas', 'html'

  if (!employees || employees.length === 0) {
    return <p>No employee data to display</p>;
  }

  const headers = Object.keys(employees[0]);
  const nameIndex = headers.findIndex(header => 
    header.toLowerCase().includes('name') || header === 'Name'
  );

  // Filter employees based on search term (name and emp id)
  const filteredEmployees = employees.filter(employee => {
    const name = (employee.Name || '').toString().toLowerCase();
    const empId = (employee['Emp ID'] || employee.ID || employee['Employee ID'] || '').toString().toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || empId.includes(search);
  });

  // Column width mapping
  const getColumnWidth = (header) => {
    const headerLower = header.toLowerCase();
    if (headerLower.includes('name')) return '200px';
    if (headerLower.includes('id') || headerLower.includes('emp')) return '120px';
    if (headerLower.includes('salary') || headerLower.includes('amount')) return '150px';
    if (headerLower.includes('date') || headerLower.includes('month') || headerLower.includes('year')) return '120px';
    if (headerLower.includes('department') || headerLower.includes('designation')) return '180px';
    if (headerLower.includes('email')) return '220px';
    if (headerLower.includes('phone') || headerLower.includes('mobile')) return '140px';
    return '130px'; // default width
  };

  const handleIndividualGenerate = (employee) => {
    const empMonth = employee.Month;
    const empYear = employee.Year;
    
    if (!empMonth || !empYear) {
      alert('Month and Year not found in Excel data');
      return;
    }
    
    try {
      switch(pdfMethod) {
        case 'pdf':
          generateRealPDF(employee, empMonth, empYear);
          break;
        case 'html':
          downloadPayslipHTML(employee, empMonth, empYear);
          break;
        case 'print':
          generateSinglePayslip(employee, empMonth, empYear);
          break;
        default:
          generateRealPDF(employee, empMonth, empYear);
      }
      const employeeName = employee.Name || employee['Employee Name'] || employee['Emp Name'] || 'employee';
      alert(`Generated payslip for ${employeeName}`);
    } catch (error) {
      console.error('Error in handleIndividualGenerate:', error);
      alert('Error generating payslip: ' + error.message);
    }
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <h3 style={{
        color: isDarkMode ? '#ecf0f1' : '#2c3e50',
        marginBottom: '20px',
        fontSize: '1.4rem',
        fontWeight: '600'
      }}>
        📅 Employee Data Preview
      </h3>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search by name or employee ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 16px',
            fontSize: '14px',
            border: `2px solid ${isDarkMode ? '#34495e' : '#667eea'}`,
            borderRadius: '10px',
            width: '350px',
            maxWidth: '100%',
            background: isDarkMode ? '#2c3e50' : '#fff',
            color: isDarkMode ? '#ecf0f1' : '#2c3e50',
            transition: 'all 0.3s ease'
          }}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{
            color: isDarkMode ? '#ecf0f1' : '#2c3e50',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            📥 Download Method:
          </label>
          <select
            value={pdfMethod}
            onChange={(e) => setPdfMethod(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '14px',
              border: `2px solid ${isDarkMode ? '#34495e' : '#667eea'}`,
              borderRadius: '8px',
              background: isDarkMode ? '#2c3e50' : '#fff',
              color: isDarkMode ? '#ecf0f1' : '#2c3e50',
              cursor: 'pointer',
              minWidth: '140px'
            }}
          >
            <option value="pdf">📕 PDF Download</option>
            <option value="print">🖨️ Browser Print</option>
            <option value="html">🌐 HTML Download</option>
          </select>
        </div>
      </div>
      <div style={{ 
        position: 'relative',
        borderRadius: '15px',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
          <table style={{ 
            borderCollapse: 'collapse',
            background: isDarkMode ? '#34495e' : '#fff',
            minWidth: '100%'
          }}>
          <thead>
            <tr style={{ 
              background: isDarkMode 
                ? 'linear-gradient(135deg, #2c3e50, #34495e)' 
                : 'linear-gradient(135deg, #667eea, #764ba2)'
            }}>
              {headers.map((header, index) => (
                <th key={index} style={{ 
                  padding: '15px 12px', 
                  color: '#fff',
                  textAlign: 'left',
                  fontWeight: '600',
                  fontSize: '14px',
                  width: getColumnWidth(header),
                  minWidth: getColumnWidth(header),
                  position: index === nameIndex ? 'sticky' : 'static',
                  left: index === nameIndex ? '0' : 'auto',
                  zIndex: index === nameIndex ? '10' : '1',
                  background: index === nameIndex ? (isDarkMode 
                    ? 'linear-gradient(135deg, #2c3e50, #34495e)' 
                    : 'linear-gradient(135deg, #667eea, #764ba2)') : 'transparent'
                }}>
                  {header}
                </th>
              ))}
              <th style={{ 
                padding: '15px 12px', 
                color: '#fff',
                textAlign: 'center',
                fontWeight: '600',
                fontSize: '14px',
                width: '120px',
                minWidth: '120px',
                position: 'sticky',
                right: '0',
                zIndex: '10',
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #2c3e50, #34495e)' 
                  : 'linear-gradient(135deg, #667eea, #764ba2)'
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index} style={{
                backgroundColor: index % 2 === 0 
                  ? (isDarkMode ? '#2c3e50' : '#f8f9fa')
                  : (isDarkMode ? '#34495e' : '#fff'),
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#3498db' : '#e3f2fd';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = index % 2 === 0 
                  ? (isDarkMode ? '#2c3e50' : '#f8f9fa')
                  : (isDarkMode ? '#34495e' : '#fff');
              }}>
                {headers.map((header, headerIndex) => (
                  <td key={headerIndex} style={{ 
                    padding: '12px', 
                    color: isDarkMode ? '#ecf0f1' : '#2c3e50',
                    fontSize: '14px',
                    width: getColumnWidth(header),
                    minWidth: getColumnWidth(header),
                    position: headerIndex === nameIndex ? 'sticky' : 'static',
                    left: headerIndex === nameIndex ? '0' : 'auto',
                    zIndex: headerIndex === nameIndex ? '9' : '1',
                    background: headerIndex === nameIndex ? (index % 2 === 0 
                      ? (isDarkMode ? '#2c3e50' : '#f8f9fa')
                      : (isDarkMode ? '#34495e' : '#fff')) : 'transparent',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {employee[header] || 'N/A'}
                  </td>
                ))}
                <td style={{ 
                  padding: '12px',
                  textAlign: 'center',
                  width: '120px',
                  minWidth: '120px',
                  position: 'sticky',
                  right: '0',
                  zIndex: '9',
                  background: index % 2 === 0 
                    ? (isDarkMode ? '#2c3e50' : '#f8f9fa')
                    : (isDarkMode ? '#34495e' : '#fff')
                }}>
                  <button
                    onClick={() => handleIndividualGenerate(employee)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '12px',
                      background: 'linear-gradient(135deg, #28a745, #20c997)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-1px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(40, 167, 69, 0.3)';
                    }}
                  >
                    📝 Generate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;