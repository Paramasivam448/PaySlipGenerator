const MonthYearSelector = ({ month, year, onMonthChange, onYearChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Select Month & Year</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        <select
          value={month}
          onChange={(e) => onMonthChange(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        >
          <option value="">Select Month</option>
          {months.map((m, index) => (
            <option key={index} value={m}>{m}</option>
          ))}
        </select>
        
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          style={{ padding: '8px', fontSize: '16px', width: '100px' }}
        />
      </div>
    </div>
  );
};

export default MonthYearSelector;