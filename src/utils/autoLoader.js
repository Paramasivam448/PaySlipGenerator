import * as XLSX from 'xlsx';
import { parseSheetData } from './excelReader';

// Store workbook globally for sheet switching
let preloadedWorkbook = null;

export const loadExcelFromPath = async (filePath) => {
  try {
    console.log('Fetching file from:', filePath);
    const response = await fetch(filePath);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log('File fetched successfully, reading as array buffer...');
    const arrayBuffer = await response.arrayBuffer();
    
    console.log('Reading Excel workbook...');
    preloadedWorkbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    console.log('Sheet names:', preloadedWorkbook.SheetNames);
    return { sheetNames: preloadedWorkbook.SheetNames };
  } catch (error) {
    console.error('Error loading Excel file:', error);
    throw error;
  }
};

export const loadSheetData = (sheetName) => {
  if (!preloadedWorkbook) {
    throw new Error('No workbook loaded');
  }
  
  const sheet = preloadedWorkbook.Sheets[sheetName];
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