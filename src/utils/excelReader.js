import * as XLSX from 'xlsx';

// Store workbook globally for sheet switching
let globalWorkbook = null;

export const parseExcelFileForSheets = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        globalWorkbook = XLSX.read(data, { type: 'array' });
        resolve({ sheetNames: globalWorkbook.SheetNames });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const parseSheetData = (sheetName) => {
  if (!globalWorkbook) {
    throw new Error('No workbook loaded');
  }
  
  const sheet = globalWorkbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  
  let month = '';
  let year = '';
  
  if (jsonData.length > 0) {
    const firstEmployee = jsonData[0];
    month = firstEmployee['Month'] || '';
    year = firstEmployee['Year'] || '';
  }
  
  return { employees: jsonData, month, year };
};

export const parseExcelFile = (file, selectedSheet = null) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetNames = workbook.SheetNames;
        
        // If no sheet selected, return sheet names for selection
        if (!selectedSheet) {
          resolve({ sheetNames, workbook: null });
          return;
        }
        
        const sheet = workbook.Sheets[selectedSheet];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        
        // Extract month and year from first employee record
        let month = '';
        let year = '';
        
        if (jsonData.length > 0) {
          const firstEmployee = jsonData[0];
          month = firstEmployee['Month'] || '';
          year = firstEmployee['Year'] || '';
        }
        
        resolve({ employees: jsonData, month, year, sheetNames });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};