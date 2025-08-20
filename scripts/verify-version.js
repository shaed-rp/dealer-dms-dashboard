#!/usr/bin/env node

/**
 * Version Verification Script
 * 
 * This script verifies that the version number is consistent across all
 * documentation files and package.json.
 */

import fs from 'fs';
import path from 'path';

const EXPECTED_VERSION = '1.0.0';
const FILES_TO_CHECK = [
  'package.json',
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'dealership-dashboard-api-mapping.md',
  'typescript-guidelines.md',
  'prevent-errors-checklist.md',
  'TROUBLESHOOTING.md'
];

function checkVersionInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const versionMatches = content.includes(EXPECTED_VERSION);
    
    if (versionMatches) {
      console.log(`✅ ${filePath} - Version ${EXPECTED_VERSION} found`);
      return true;
    } else {
      console.log(`❌ ${filePath} - Version ${EXPECTED_VERSION} NOT found`);
      return false;
    }
  } catch (error) {
    console.log(`⚠️  ${filePath} - Could not read file: ${error.message}`);
    return false;
  }
}

function main() {
  console.log(`🔍 Checking version consistency across documentation files...\n`);
  console.log(`Expected version: ${EXPECTED_VERSION}\n`);
  
  let allFilesConsistent = true;
  
  FILES_TO_CHECK.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    const isConsistent = checkVersionInFile(filePath);
    if (!isConsistent) {
      allFilesConsistent = false;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  
  if (allFilesConsistent) {
    console.log('🎉 All files have consistent version information!');
    process.exit(0);
  } else {
    console.log('⚠️  Some files have inconsistent version information.');
    console.log('Please update the files marked with ❌ above.');
    process.exit(1);
  }
}

main();
