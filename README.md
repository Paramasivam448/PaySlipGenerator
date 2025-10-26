# Local Payslip Generator

A React-based payslip generator that works entirely in the browser without any backend.

## Features

- Upload Excel files (.xlsx, .xls) with employee data
- Select month and year for payslip generation
- Preview employee data in a table
- Generate individual PDF payslips for all employees
- Download payslips automatically

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

## Excel File Format

Your Excel file should have the following columns (first row as headers):

| Name | Emp ID | Designation | DOJ | UAN No | ESI No | CL Taken | Balance CL | Loss of Pay | Total Payable Days | Basic Pay | DA | HRA | Other allowance | EPF | ESI / Health Insurance | Professional Tax | Loan Recovery | Month | Year |
|------|--------|-------------|-----|--------|--------|----------|------------|-------------|-------------------|-----------|----|----- |----------------|-----|----------------------|------------------|---------------|-------|------|
| Mr.Paramasivam | MG030 | GET I - Software Development | 1-Jul-25 | 102249610512 | | 0 | 2 | 0 | 30 | 11600 | 5800 | 5800 | 0 | 1800 | 0 | 200 | 0 | September | 2025 |

**Column Details:**
- **Name**: Employee full name with title (Mr./Ms.)
- **Emp ID**: Employee ID (e.g., MG030, MG031)
- **Designation**: Job title (e.g., GET I - Software Development)
- **DOJ**: Date of Joining in DD-MMM-YY format
- **UAN No**: 12-digit UAN number
- **ESI No**: ESI number (can be blank)
- **CL Taken**: Casual leaves taken
- **Balance CL**: Remaining casual leaves
- **Loss of Pay**: Loss of pay days (usually 0)
- **Total Payable Days**: Working days in month (usually 30)
- **Basic Pay**: Basic salary amount
- **DA**: Dearness Allowance (typically 50% of Basic)
- **HRA**: House Rent Allowance (typically 50% of Basic)
- **Other allowance**: Additional allowances
- **EPF**: Employee Provident Fund (12% of Basic)
- **ESI / Health Insurance**: ESI/Health insurance deduction
- **Professional Tax**: Professional tax (typically ₹200)
- **Loan Recovery**: Loan recovery amount
- **Month**: Payslip month (e.g., September)
- **Year**: Payslip year (e.g., 2025)

## Usage

1. Upload an Excel file with employee data
2. Select the month and year for the payslips
3. Preview the parsed data in the table
4. Click "Generate Payslips" to download all PDFs

## Dependencies

- `react` - UI framework
- `xlsx` - Excel file parsing
- `jspdf` - PDF generation
- `vite` - Build tool

## File Structure

```
src/
├── components/
│   ├── FileUploader.jsx      # Excel file upload
│   ├── MonthYearSelector.jsx # Month/year selection
│   ├── EmployeeTable.jsx     # Data preview table
│   └── GenerateButton.jsx    # PDF generation trigger
├── utils/
│   ├── excelReader.js        # Excel parsing logic
│   └── pdfGenerator.js       # PDF creation logic
├── App.jsx                   # Main application
└── index.js                  # Entry point
```