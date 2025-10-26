import { loadExcelFromPath } from '../utils/autoLoader';

const PreloadButton = ({ onDataLoaded, isDarkMode }) => {
  const handlePreload = async () => {
    try {
      console.log('Attempting to load Employee_Payslip_Data.xlsx...');
      const { sheetNames } = await loadExcelFromPath('/Employee_Payslip_Data.xlsx');
      console.log('Loaded sheet names:', sheetNames);
      
      if (sheetNames && sheetNames.length > 0) {
        onDataLoaded({ sheetNames });
        alert(`Loaded Excel file with ${sheetNames.length} sheet(s): ${sheetNames.join(', ')}`);
      } else {
        alert('Excel file has no sheets');
      }
    } catch (error) {
      console.error('Error loading preloaded file:', error);
      alert('Error loading preloaded file: ' + error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handlePreload}
        style={{
          padding: '12px 24px',
          fontSize: '14px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #3498db, #2980b9)' 
            : 'linear-gradient(135deg, #17a2b8, #138496)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        }}
      >
        📄 Load Sample Data
      </button>
    </div>
  );
};

export default PreloadButton;