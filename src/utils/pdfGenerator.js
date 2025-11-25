const createPayslipHTML = (employee, month, year) => {
  // Helper function to safely get numeric values with fallbacks
  const getNumericValue = (employee, possibleKeys, defaultValue = 0) => {
    for (const key of possibleKeys) {
      if (employee[key] !== undefined && employee[key] !== null && employee[key] !== '') {
        const value = parseInt(employee[key]);
        if (!isNaN(value)) return value;
      }
    }
    return defaultValue;
  };
  
  // Helper function to safely get string values with fallbacks
  const getStringValue = (employee, possibleKeys, defaultValue = '') => {
    for (const key of possibleKeys) {
      if (employee[key] !== undefined && employee[key] !== null && employee[key] !== '') {
        return employee[key].toString();
      }
    }
    return defaultValue;
  };
  
  const basicPay = getNumericValue(employee, ['Basic Pay', 'Basic Salary', 'Basic']);
  const da = getNumericValue(employee, ['DA', 'Dearness Allowance']);
  const hra = getNumericValue(employee, ['HRA', 'House Rent Allowance']);
  const otherAllowance = getNumericValue(employee, ['Other allowance', 'Other Allowance', 'Additional Allowance']);
  const epf = getNumericValue(employee, ['EPF', 'Employee Provident Fund', 'PF']);
  const profTax = getNumericValue(employee, ['Professional Tax', 'Prof Tax', 'PT']);
  const loan = getNumericValue(employee, ['Loan Recovery', 'Loan', 'Advance Recovery']);
  const esi = getNumericValue(employee, ['ESI / Health Insurance', 'ESI', 'Health Insurance']);
  
  // Handle different possible column names for Total Payable Days
  const totalPayableDays = getNumericValue(employee, ['Total Payable Days', 'Payable Days', 'Working Days', 'Total Days'], 30);
  
  // Handle other employee details with fallbacks
  const employeeName = getStringValue(employee, ['Name', 'Employee Name', 'Emp Name']);
  const empId = getStringValue(employee, ['Emp ID', 'Employee ID', 'ID']);
  const designation = getStringValue(employee, ['Designation', 'Position', 'Job Title']);
  const doj = getStringValue(employee, ['DOJ', 'Date of Joining', 'Joining Date']);
  const uanNo = getStringValue(employee, ['UAN No', 'UAN', 'UAN Number']);
  const esiNo = getStringValue(employee, ['ESI No', 'ESI Number']);
  const clTaken = getStringValue(employee, ['CL Taken', 'Casual Leave Taken', 'Leave Taken'], '0');
  const balanceCL = getStringValue(employee, ['Balance CL', 'Balance Casual Leave', 'Remaining CL'], '0');
  const lossOfPay = getStringValue(employee, ['Loss of Pay', 'LOP', 'Loss Pay'], '0');
  
  const grossSalary = basicPay + da + hra + otherAllowance;
  const totalDeductions = epf + profTax + esi + loan;
  const netPay = grossSalary - totalDeductions;

  return `
  <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: Arial, sans-serif; 
      font-size: 12px; 
      margin: 0; 
      padding: 20px;
      line-height: 1.4;
      background: #f9f9f9;
    }
    .payslip { 
      border: 2px solid #000; 
      max-width: 800px;
      margin: 0 auto;
      background: white;
    }
    .header { 
      background-color: #fff1ca; 
      text-align: center; 
      font-weight: bold; 
      font-size: 16px; 
      padding: 8px 0;
      border-bottom:2px solid #000;
    }
    .sub-header { 
      /*text-align: center; */
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      font-size: 11px; 
      font-weight: bold;
      padding: 8px 0; 
      border-bottom:2px solid #000;
      background-color:#fff1ca;
    }
    .title { 
      background-color: #bdd7ee; 
      text-align: center; 
      font-size: 13px;
      font-weight: bold; 
      padding: 8px 0; 
      border-bottom:2px solid #000;
    }
    table { 
      width: 100%; 
      border-collapse: collapse; 
    }
    table, th, td { 
      border: 1px solid #000; 
      font-weight: 500;
    }
    th, td { 
      padding: 6px 2px 6px 8px; 
      text-align: left;
    }
    th { 
      background-color: #f2f2f2; 
      font-weight: bold;
      font-size: 12px;
    }
    .salary-table th { 
      text-align: center; 
    }
    .netpay { 
      font-weight: bold; 
      font-size: 14px; 
      margin: 15px 0 10px 0;
    }
    .note { 
      font-size: 10px; 
      text-align: center; 
      margin-top: 15px;
      font-style: italic;
    }
    b { font-weight: bold; }
  </style>
</head>
<body>
  <div class="payslip">
    <div class="header">MAGA TECH GRAMAM PVT LTD</div>

 
    <div class="sub-header">
           <img alt="" style=" width: 50px; height: 50px; margin-left:5%" src="data:image/png;base64,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" />
    
     <h3 style="width:80%; text-align:center;"> 59/2M, Ayyarkadu, Erumaipatti, Edappady, Salem - 637102<br>
      Operating office: ACGCET Main Building, Karaikudi - 630003
      </h3>
    </div>

    <div class="title">Pay Slip for the month of ${month} ${year}</div>
    
    <table>
      <tr>
        <td style="width: 22%;"><b>Name</b></td>
        <td style="width: 35%;">${employeeName}</td>
        <td><b>UAN No</b></td>
        <td style="width: 16%;">${uanNo}</td>
      </tr>
      <tr>
        <td><b>Emp ID</b></td>
        <td>${empId}</td>
        <td><b>ESI No</b></td>
        <td>${esiNo}</td>
      </tr>
      <tr>
        <td><b>Designation</b></td>
        <td>${designation}</td>
        <td><b>CL Taken</b></td>
        <td>${clTaken}</td>
      </tr>
      <tr>
        <td><b>DOJ</b></td>
        <td>${doj}</td>
        <td><b>Balance CL</b></td>
        <td>${balanceCL}</td>
      </tr>
      <tr>
        <td><b>Total Payable Days</b></td>
        <td>${totalPayableDays}</td>
        <td><b>Loss of Pay</b></td>
        <td>${lossOfPay}</td>
      </tr>
      <tr>
        <td colspan="4" style="padding:12px 0px"></td>
      </tr>
    </table>
    
    <table class="salary-table">
      <thead>
        <tr>
          <th>Details</th>
          <th>Gross Salary</th>
          <th>Earned Salary</th>
          <th colspan="2">Deductions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="width: 22.7%;">Basic Pay</td>
          <td style="width: 18%;">₹${basicPay.toLocaleString()}</td>
          <td style="width: 18%;">₹${basicPay.toLocaleString()}</td>
          <td>EPF</td>
          <td style="width: 16%;">₹${epf.toLocaleString()}</td>
        </tr>
        <tr>
          <td>DA</td>
          <td>₹${da.toLocaleString()}</td>
          <td>₹${da.toLocaleString()}</td>
          <td>ESI / Health Insurance</td>
          <td>₹${esi.toLocaleString()}</td>
        </tr>
        <tr>
          <td>HRA</td>
          <td>₹${hra.toLocaleString()}</td>
          <td>₹${hra.toLocaleString()}</td>
          <td>Professional Tax</td>
          <td>₹${profTax.toLocaleString()}</td>
        </tr>
        <tr>
          <td>Other Allowance</td>
          <td>₹${otherAllowance.toLocaleString()}</td>
          <td>₹${otherAllowance.toLocaleString()}</td>
          <td>Loan Recovery</td>
          <td>₹${loan.toLocaleString()}</td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td><b>₹${grossSalary.toLocaleString()}</b></td>
          <td><b>₹${grossSalary.toLocaleString()}</b></td>
          <td><b>Total Deductions</b></td>
          <td><b>₹${totalDeductions.toLocaleString()}</b></td>
        </tr>
        <tr>
          <td colspan="4" style="text-align:center;"><b>Net Pay</b></td>
          <td><b>₹${netPay.toLocaleString()}</b></td>
        </tr>
        <tr>
          <td colspan="5" style="text-align:center;"><b>"This is a System generated Pay slip. Hence, Signature is not required"</b></td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>


  `;
};

// Simple browser print method
export const generatePayslipPDF = (employee, month, year) => {
  try {
    const htmlContent = createPayslipHTML(employee, month, year);
    
    // Create print window
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto print after load
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
    
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert("Error generating PDF: " + error.message);
  }
};

// Alternative: Direct HTML download
export const downloadPayslipHTML = (employee, month, year) => {
  const htmlContent = createPayslipHTML(employee, month, year);
  const employeeName = employee['Name'] || employee['Employee Name'] || employee['Emp Name'] || 'Unknown';
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Payslip_${employeeName}_${month}_${year}.html`;
  a.click();
  URL.revokeObjectURL(url);
};

// Real PDF generation using html2pdf
export const generateRealPDF = async (employee, month, year) => {
  const html2pdf = (await import('html2pdf.js')).default;
  const htmlContent = createPayslipHTML(employee, month, year);
  const employeeName = employee['Name'] || employee['Employee Name'] || employee['Emp Name'] || 'Unknown';
  
  const opt = {
    margin: 10,
    filename: `Payslip_${employeeName}_${month}_${year}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  
  html2pdf().set(opt).from(htmlContent).save();
};

export const generateAllPayslips = (employees, month, year) => {
  // Validate all employees first
  const employeesWithIssues = [];
  employees.forEach((employee, index) => {
    const issues = validateEmployeeData(employee);
    if (issues.length > 0) {
      const employeeName = employee['Name'] || employee['Employee Name'] || employee['Emp Name'] || `Employee ${index + 1}`;
      employeesWithIssues.push({ name: employeeName, issues });
    }
  });
  
  // Show summary of issues if any
  if (employeesWithIssues.length > 0) {
    const issuesSummary = employeesWithIssues.map(emp => 
      `${emp.name}: ${emp.issues.join(', ')}`
    ).join('\n');
    
    const proceed = confirm(`Data issues found for ${employeesWithIssues.length} employee(s):\n\n${issuesSummary}\n\nDo you want to proceed with generation?`);
    if (!proceed) return;
  }
  
  // Generate payslips with delay
  employees.forEach((employee, index) => {
    setTimeout(() => {
      generateRealPDF(employee, month, year);
    }, index * 1000);
  });
};

// Validation function to check for common data issues
export const validateEmployeeData = (employee) => {
  const issues = [];
  
  // Check for required fields
  const employeeName = employee['Name'] || employee['Employee Name'] || employee['Emp Name'];
  if (!employeeName) issues.push('Employee name is missing');
  
  const empId = employee['Emp ID'] || employee['Employee ID'] || employee['ID'];
  if (!empId) issues.push('Employee ID is missing');
  
  // Check for numeric fields
  const basicPay = parseInt(employee['Basic Pay'] || employee['Basic Salary'] || employee['Basic'] || 0);
  if (basicPay <= 0) issues.push('Basic Pay is missing or invalid');
  
  const totalPayableDays = parseInt(employee['Total Payable Days'] || employee['Payable Days'] || employee['Working Days'] || 0);
  if (totalPayableDays <= 0) issues.push('Total Payable Days is missing or invalid');
  
  return issues;
};

export const generateSinglePayslip = (employee, month, year) => {
  // Validate data before generating
  const issues = validateEmployeeData(employee);
  if (issues.length > 0) {
    const employeeName = employee['Name'] || employee['Employee Name'] || employee['Emp Name'] || 'Unknown';
    console.warn(`Data issues found for ${employeeName}:`, issues);
    alert(`Warning: Data issues found for ${employeeName}:\n${issues.join('\n')}\n\nPayslip will be generated with available data.`);
  }
  
  generatePayslipPDF(employee, month, year);
};


