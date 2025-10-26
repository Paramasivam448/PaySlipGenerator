import { generateAllPayslips } from '../utils/pdfGenerator';

const GenerateButton = ({ employees, isDarkMode }) => {
  const handleGenerate = () => {
    if (!employees || employees.length === 0) {
      alert('Please upload employee data first');
      return;
    }
    
    const empMonth = employees[0]?.Month;
    const empYear = employees[0]?.Year;
    
    if (!empMonth || !empYear) {
      alert('Month and Year not found in Excel data');
      return;
    }
    
    generateAllPayslips(employees, empMonth, empYear);
    alert(`Generated ${employees.length} payslips successfully!`);
  };

  return (
    <div>
      <button
        onClick={handleGenerate}
        style={{
          padding: '18px 40px',
          fontSize: '16px',
          background: isDarkMode 
            ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
            : 'linear-gradient(135deg, #007bff, #0056b3)',
          color: 'white',
          border: 'none',
          borderRadius: '15px',
          cursor: 'pointer',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'all 0.3s ease',
          boxShadow: '0 6px 20px rgba(0, 123, 255, 0.4)',
          minWidth: '250px'
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