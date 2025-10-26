import { parseExcelFileForSheets } from '../utils/excelReader';

const FileUploader = ({ onDataParsed, isDarkMode }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      const { sheetNames } = await parseExcelFileForSheets(file);
      onDataParsed({ sheetNames });
    } catch (error) {
      alert('Error parsing file: ' + error.message);
    }
  };

  return (
    <div>
      <h3 style={{
        color: isDarkMode ? '#ecf0f1' : '#2c3e50',
        marginBottom: '15px',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        📁 Upload Employee Data
      </h3>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        style={{
          padding: '12px 16px',
          fontSize: '14px',
          border: `2px solid ${isDarkMode ? '#34495e' : '#667eea'}`,
          borderRadius: '10px',
          background: isDarkMode ? '#2c3e50' : '#fff',
          color: isDarkMode ? '#ecf0f1' : '#2c3e50',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      />
    </div>
  );
};

export default FileUploader;