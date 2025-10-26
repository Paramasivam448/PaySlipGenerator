const SheetSelector = ({ sheetNames, selectedSheet, onSheetSelect, isDarkMode }) => {
  if (!sheetNames || sheetNames.length <= 1) {
    return null;
  }

  return (
    <div style={{ marginBottom: '25px' }}>
      <label style={{
        marginRight: '15px',
        fontWeight: '600',
        color: isDarkMode ? '#ecf0f1' : '#2c3e50',
        fontSize: '1.1rem'
      }}>
        📈 Select Sheet:
      </label>
      <select
        value={selectedSheet || ''}
        onChange={(e) => onSheetSelect(e.target.value)}
        style={{
          padding: '12px 16px',
          fontSize: '14px',
          border: `2px solid ${isDarkMode ? '#34495e' : '#667eea'}`,
          borderRadius: '10px',
          background: isDarkMode ? '#2c3e50' : '#fff',
          color: isDarkMode ? '#ecf0f1' : '#2c3e50',
          cursor: 'pointer',
          minWidth: '200px',
          transition: 'all 0.3s ease'
        }}
      >
        <option value="">-- Select a sheet --</option>
        {sheetNames.map((sheetName, index) => (
          <option key={index} value={sheetName}>
            {sheetName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SheetSelector;