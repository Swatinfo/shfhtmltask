// =============================================================================
// Loan Processing Task Management System - Combined JavaScript File
// This file combines all JavaScript modules in the correct dependency order
// =============================================================================

// =============================================================================
// CONFIGURATION AND CONSTANTS (config.js)
// =============================================================================

// Loan Types Configuration
const LOAN_TYPES = {
  'home-loan': {
    name: 'Home Loan',
    displayName: 'Home Loan',
    documentKey: 'home-loan'
  },
  'lap': {
    name: 'LAP',
    displayName: 'Loan Against Property',
    documentKey: 'lap'
  },
  'od': {
    name: 'OD',
    displayName: 'Overdraft',
    documentKey: 'od'
  },
  'asha': {
    name: 'ASHA',
    displayName: 'ASHA Loan',
    documentKey: 'asha'
  },
  'pratham': {
    name: 'Pratham',
    displayName: 'Pratham Loan',
    documentKey: 'pratham'
  }
};

// Branch Configuration
const BRANCHES = {
  'main': {
    id: 'main',
    name: 'Main Branch',
    address: '123 Corporate Avenue, Mumbai',
    banks: ['hdfc', 'sbi', 'icici', 'axis', 'kotak'],
    code: 'BR001'
  },
  'andheri': {
    id: 'andheri',
    name: 'Andheri Branch',
    address: '456 Linking Road, Andheri West, Mumbai',
    banks: ['hdfc', 'icici', 'axis'],
    code: 'BR002'
  },
  'powai': {
    id: 'powai',
    name: 'Powai Branch',
    address: '789 Hiranandani, Powai, Mumbai',
    banks: ['sbi', 'kotak', 'hdfc'],
    code: 'BR003'
  },
  'bandra': {
    id: 'bandra',
    name: 'Bandra Branch',
    address: '321 Bandra-West, Mumbai',
    banks: ['icici', 'axis'],
    code: 'BR004'
  },
  'pune': {
    id: 'pune',
    name: 'Pune Branch',
    address: '654 FC Road, Pune',
    banks: ['hdfc', 'sbi', 'kotak'],
    code: 'BR005'
  }
};

// Bank-Specific Loan Types with Custom Workflows
const BANK_LOAN_WORKFLOWS = {
  'sbi': {
    name: 'State Bank of India',
    employees: ['emp001', 'emp002', 'emp003'],
    defaultEmployee: 'emp001',
    loanTypes: {
      'home-loan': {
        displayName: 'Home Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'TECHNICAL', name: 'Technical Valuation', role: 'branch-manager', required: true },
          { key: 'CIBIL_CHECK', name: 'CIBIL Score Check', role: 'bank-employee', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'AGREEMENT', name: 'Loan Agreement', role: 'office-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'personal-loan': {
        displayName: 'Personal Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'CIBIL_CHECK', name: 'CIBIL Score Check', role: 'bank-employee', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'business-loan': {
        displayName: 'Business Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'FINANCIAL_ANALYSIS', name: 'Financial Analysis', role: 'bank-employee', required: true },
          { key: 'SITE_VISIT', name: 'Site Visit Report', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'COLLATERAL', name: 'Collateral Verification', role: 'office-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      }
    }
  },
  'hdfc': {
    name: 'HDFC Bank',
    employees: ['emp004', 'emp005', 'emp006'],
    defaultEmployee: 'emp004',
    loanTypes: {
      'home-loan': {
        displayName: 'Home Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'TECHNICAL', name: 'Technical Valuation', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DOCUMENT_VERIFICATION', name: 'Document Verification', role: 'office-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'lap': {
        displayName: 'Loan Against Property',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'PROPERTY_VALUATION', name: 'Property Valuation', role: 'branch-manager', required: true },
          { key: 'TITLE_SEARCH', name: 'Title Search', role: 'legal-advisor', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'MORTGAGE', name: 'Mortgage Creation', role: 'office-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      }
    }
  },
  'icici': {
    name: 'ICICI Bank',
    employees: ['emp007', 'emp008', 'emp009'],
    defaultEmployee: 'emp007',
    loanTypes: {
      'home-loan': {
        displayName: 'Home Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'TECHNICAL', name: 'Technical Valuation', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'APPROVAL_COMMITTEE', name: 'Approval Committee', role: 'bank-employee', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'personal-loan': {
        displayName: 'Personal Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'car-loan': {
        displayName: 'Car Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'VEHICLE_VALUATION', name: 'Vehicle Valuation', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      }
    }
  },
  'axis': {
    name: 'Axis Bank',
    employees: ['emp010', 'emp011', 'emp012'],
    defaultEmployee: 'emp010',
    loanTypes: {
      'home-loan': {
        displayName: 'Home Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'TECHNICAL', name: 'Technical Valuation', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'car-loan': {
        displayName: 'Car Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'VEHICLE_VALUATION', name: 'Vehicle Valuation', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'INSURANCE', name: 'Insurance Verification', role: 'office-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      }
    }
  },
  'kotak': {
    name: 'Kotak Mahindra Bank',
    employees: ['emp013', 'emp014', 'emp015'],
    defaultEmployee: 'emp013',
    loanTypes: {
      'home-loan': {
        displayName: 'Home Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'TECHNICAL', name: 'Technical Valuation', role: 'branch-manager', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'CREDIT_COMMITTEE', name: 'Credit Committee', role: 'bank-employee', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      },
      'business-loan': {
        displayName: 'Business Loan',
        stages: [
          { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
          { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
          { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
          { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
          { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
          { key: 'BUSINESS_VALUATION', name: 'Business Valuation', role: 'branch-manager', required: true },
          { key: 'CREDIT_ANALYSIS', name: 'Credit Analysis', role: 'bank-employee', required: true },
          { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
          { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
          { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
        ]
      }
    }
  }
};

// Helper function to get workflow stages for bank and loan type
function getWorkflowStages(bankKey, loanTypeKey) {
  const bank = BANK_LOAN_WORKFLOWS[bankKey];
  if (!bank || !bank.loanTypes || !bank.loanTypes[loanTypeKey]) {
    // Return default workflow if not found
    return [
      { key: 'INITIATION', name: 'Loan Initiation', role: 'loan-advisor', required: true },
      { key: 'DOCUMENT_COLLECTION', name: 'Document Collection', role: 'loan-advisor', required: true },
      { key: 'DATA_ENTRY', name: 'Data Entry & Login', role: 'loan-advisor', required: true },
      { key: 'BSM_OSV', name: 'BSM OSV Approval', role: 'bank-employee', required: true },
      { key: 'LEGAL', name: 'Legal Verification', role: 'legal-advisor', required: true },
      { key: 'TECHNICAL', name: 'Technical Valuation', role: 'branch-manager', required: true },
      { key: 'RATE_PF', name: 'Rate & PF Approval', role: 'loan-advisor', required: true },
      { key: 'SANCTION_LETTER', name: 'Sanction Letter', role: 'bank-employee', required: true },
      { key: 'DISBURSEMENT', name: 'Fund Disbursement', role: 'loan-advisor', required: true }
    ];
  }
  return bank.loanTypes[loanTypeKey].stages;
}

// Helper function to get all loan types for a bank
function getBankLoanTypes(bankKey) {
  const bank = BANK_LOAN_WORKFLOWS[bankKey];
  if (!bank || !bank.loanTypes) {
    return {};
  }
  return bank.loanTypes;
}

// Helper function to get bank name from bank key
function getBankName(bankKey) {
  const bank = BANK_LOAN_WORKFLOWS[bankKey];
  return bank ? bank.name : bankKey;
}

// Helper function to get loan type display name
function getLoanTypeDisplayName(bankKey, loanTypeKey) {
  const bank = BANK_LOAN_WORKFLOWS[bankKey];
  if (!bank || !bank.loanTypes || !bank.loanTypes[loanTypeKey]) {
    return loanTypeKey;
  }
  return bank.loanTypes[loanTypeKey].displayName;
}

// Helper function to get stage display name
function getStageDisplayName(task, stageKey) {
  // First check if task has custom workflow stages
  if (task && task.workflowStages && task.workflowStages[stageKey]) {
    return task.workflowStages[stageKey].name;
  }

  // Fallback to default workflow stages
  const stage = WORKFLOW_STAGES[stageKey];
  return stage ? stage.name : stageKey;
}

// Helper function to get user by ID
function getUserById(userId) {
  if (!userId) return null;
  const users = typeof USERS !== 'undefined' ? USERS : {};
  return users[userId] || null;
}

// Helper function to get parallel stages information
function getParallelStagesInfo(task) {
  if (!task || !task.parallelStages) {
    return '';
  }

  // Only show parallel stages info when task has progressed to DATA_ENTRY or beyond
  // This ensures parallel stages are not shown during INITIATION or DOCUMENT_COLLECTION
  const allowedStages = ['DATA_ENTRY', 'PARALLEL_PROCESSING', 'BSM_OSV', 'LEGAL', 'TECHNICAL', 'RATE_PF'];
  if (!allowedStages.includes(task.currentStage)) {
    return '';
  }

  // Check if current stage is a parallel processing stage
  const parallelStages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
  const activeParallelStages = Object.entries(task.parallelStages)
    .filter(([key]) => parallelStages.includes(key));

  if (activeParallelStages.length === 0) {
    return '';
  }

  let html = '<div class="parallel-stages-info">';
  html += '<div class="parallel-stages-label"><i class="bi bi-diagram-3 me-1"></i>Parallel Stages:</div>';

  activeParallelStages.forEach(([stageKey, stageData]) => {
    const stageName = getStageDisplayName(task, stageKey);

    // Handle both object and string structures
    let assignee = null;
    let isCompleted = false;

    if (typeof stageData === 'object' && stageData !== null) {
      // New structure with object
      assignee = stageData.assignee;
      isCompleted = stageData.completed || stageData.status === 'completed';
    } else {
      // Old structure with string value
      assignee = stageData;
      isCompleted = task.completedStages && task.completedStages.includes(stageKey);
    }

    const userName = assignee ? getUserById(assignee)?.name || 'Unassigned' : 'Unassigned';

    // Get parallel stage status from task
    let status = 'Pending';
    let statusClass = 'warning';

    if (isCompleted) {
      status = 'Completed';
      statusClass = 'success';
    } else if (assignee) {
      status = 'In Progress';
      statusClass = 'info';
    }

    html += `
      <div class="parallel-stage-item">
        <span class="stage-name">${stageName}:</span>
        <span class="stage-assignee">${userName}</span>
        <span class="stage-status status-${statusClass}">${status}</span>
      </div>
    `;
  });

  html += '</div>';
  return html;
}

// Helper function to get icon for stage
function getStageIcon(stageKey) {
  const icons = {
    'INITIATION': 'bi-play-circle',
    'DOCUMENT_COLLECTION': 'bi-file-earmark-text',
    'DATA_ENTRY': 'bi-keyboard',
    'BSM_OSV': 'bi-bank',
    'LEGAL': 'bi-shield-check',
    'TECHNICAL': 'bi-tools',
    'PROPERTY_VALUATION': 'bi-house',
    'VEHICLE_VALUATION': 'bi-car-front',
    'BUSINESS_VALUATION': 'bi-briefcase',
    'CIBIL_CHECK': 'bi-credit-card',
    'FINANCIAL_ANALYSIS': 'bi-graph-up',
    'SITE_VISIT': 'bi-geo-alt',
    'RATE_PF': 'bi-percent',
    'SANCTION_LETTER': 'bi-envelope-check',
    'APPROVAL_COMMITTEE': 'bi-people',
    'TITLE_SEARCH': 'bi-search',
    'COLLATERAL': 'bi-building',
    'MORTGAGE': 'bi-house-lock',
    'AGREEMENT': 'bi-file-earmark-check',
    'DOCUMENT_VERIFICATION': 'bi-check2-square',
    'INSURANCE': 'bi-shield-plus',
    'DISBURSEMENT': 'bi-cash-stack'
  };
  return icons[stageKey] || 'bi-circle';
}

// Document Templates by Loan Type
const DOCUMENT_TEMPLATES = {
  'home-loan': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof (3 months salary slip)', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'property-docs', name: 'Property Documents', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'signature', name: 'Signature Proof', required: false },
    { id: 'it-returns', name: 'IT Returns (2 years)', required: false }
  ],
  'lap': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'property-docs', name: 'Property Documents', required: true },
    { id: 'valuation', name: 'Property Valuation', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'title-search', name: 'Title Search Report', required: true },
    { id: 'encumbrance', name: 'Encumbrance Certificate', required: true }
  ],
  'od': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (1 year)', required: true },
    { id: 'itr', name: 'IT Returns (3 years)', required: true },
    { id: 'collateral', name: 'Collateral Documents', required: true },
    { id: 'business-proof', name: 'Business Proof', required: false },
    { id: 'gst', name: 'GST Registration', required: false }
  ],
  'asha': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'residence-proof', name: 'Residence Proof', required: true },
    { id: 'age-proof', name: 'Age Proof', required: true },
    { id: 'disability-certificate', name: 'Disability Certificate', required: false }
  ],
  'pratham': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'residence-proof', name: 'Residence Proof', required: true },
    { id: 'employment-proof', name: 'Employment Proof', required: true },
    { id: 'qualification', name: 'Qualification Certificate', required: false }
  ],
  'personal-loan': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof (3 months salary slip)', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'residence-proof', name: 'Residence Proof', required: true },
    { id: 'form-16', name: 'Form 16', required: false },
    { id: 'it-returns', name: 'IT Returns (2 years)', required: false }
  ],
  'business-loan': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'business-proof', name: 'Business Registration', required: true },
    { id: 'gst', name: 'GST Registration', required: true },
    { id: 'bank-statement', name: 'Bank Statement (1 year)', required: true },
    { id: 'itr', name: 'IT Returns (3 years)', required: true },
    { id: 'audited-financials', name: 'Audited Financials (3 years)', required: true },
    { id: 'collateral', name: 'Collateral Documents', required: false }
  ],
  'vehicle-loan': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'residence-proof', name: 'Residence Proof', required: true },
    { id: 'quotation', name: 'Vehicle Quotation', required: true },
    { id: 'insurance', name: 'Insurance Papers', required: false }
  ],
  'education-loan': [
    { id: 'pan', name: 'PAN Card (of guardian)', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card (of guardian)', required: true },
    { id: 'income-proof', name: 'Income Proof (of guardian)', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'residence-proof', name: 'Residence Proof', required: true },
    { id: 'admission-letter', name: 'Admission Letter', required: true },
    { id: 'fee-structure', name: 'Fee Structure', required: true },
    { id: 'mark-sheets', name: 'Mark Sheets (10th, 12th, Graduation)', required: false }
  ],
  'cc': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (1 year)', required: true },
    { id: 'itr', name: 'IT Returns (3 years)', required: true },
    { id: 'business-proof', name: 'Business Proof', required: true },
    { id: 'collateral', name: 'Collateral Documents', required: false },
    { id: 'gst', name: 'GST Registration', required: false }
  ],
  'bl': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'business-proof', name: 'Business Registration', required: true },
    { id: 'bank-statement', name: 'Bank Statement (1 year)', required: true },
    { id: 'itr', name: 'IT Returns (3 years)', required: true },
    { id: 'audited-financials', name: 'Audited Financials (3 years)', required: true },
    { id: 'collateral', name: 'Collateral Documents', required: true },
    { id: 'stock-statement', name: 'Stock Statement', required: false },
    { id: 'debtors', name: 'Debtors Statement', required: false }
  ],
  'construction-finance': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'property-docs', name: 'Property Documents', required: true },
    { id: 'approved-plan', name: 'Approved Construction Plan', required: true },
    { id: 'estimate', name: 'Construction Estimate', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'noc', name: 'NOC from Society', required: false }
  ],
  'bill-discounting': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'business-proof', name: 'Business Registration', required: true },
    { id: 'gst', name: 'GST Registration', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'itr', name: 'IT Returns (2 years)', required: true },
    { id: 'bills', name: 'Bills to be Discounted', required: true },
    { id: 'customer-po', name: 'Customer Purchase Orders', required: false }
  ],
  'pl': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'property-docs', name: 'Property Documents', required: true },
    { id: 'title-search', name: 'Title Search Report', required: true },
    { id: 'encumbrance', name: 'Encumbrance Certificate', required: true },
    { id: 'valuation', name: 'Property Valuation', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true }
  ],
  'micro-loan': [
    { id: 'pan', name: 'PAN Card', required: true },
    { id: 'aadhaar', name: 'Aadhaar Card', required: true },
    { id: 'income-proof', name: 'Income Proof', required: true },
    { id: 'bank-statement', name: 'Bank Statement (6 months)', required: true },
    { id: 'photo', name: 'Passport Size Photo', required: true },
    { id: 'residence-proof', name: 'Residence Proof', required: true },
    { id: 'business-proof', name: 'Business Proof', required: false }
  ]
};

// Workflow Stages
const WORKFLOW_STAGES = {
  'INITIATION': {
    name: 'Loan Initiation',
    order: 1,
    mandatory: true,
    assignee: 'loan-advisor',
    actions: ['create_task', 'select_documents']
  },
  'DOCUMENT_COLLECTION': {
    name: 'Document Collection',
    order: 2,
    mandatory: true,
    assignee: 'loan-advisor',
    actions: ['verify_documents']
  },
  'DATA_ENTRY': {
    name: 'Data Entry & Login',
    order: 3,
    mandatory: true,
    assignee: 'loan-advisor',
    actions: ['enter_application_number']
  },
  'BSM_OSV': {
    name: 'BSM OSV Approval',
    order: 4,
    mandatory: true,
    assignee: 'bank-employee',
    parallel: true,
    actions: ['approve', 'reject']
  },
  'LEGAL': {
    name: 'Legal Verification',
    order: 4,
    mandatory: true,
    assignee: 'legal-advisor',
    parallel: true,
    actions: ['approve', 'reject']
  },
  'TECHNICAL': {
    name: 'Technical Valuation',
    order: 4,
    mandatory: true,
    assignee: 'branch-manager',
    parallel: true,
    actions: ['approve', 'reject']
  },
  'PARALLEL_PROCESSING': {
    name: 'Parallel Processing',
    order: 4.5,
    mandatory: true,
    parallel: true,
    actions: []
  },
  'RATE_PF': {
    name: 'Rate & PF Approval',
    order: 5,
    mandatory: true,
    assignee: 'loan-advisor',
    actions: ['set_rates', 'approve']
  },
  'SANCTION_LETTER': {
    name: 'Sanction Letter',
    order: 6,
    mandatory: true,
    assignee: 'loan-advisor',
    actions: ['generate', 'confirm']
  },
  'DOCKET_LOGIN': {
    name: 'Docket Login',
    order: 7,
    mandatory: true,
    assignee: 'office-employee',
    actions: ['login', 'approve']
  },
  'KFS_GENERATION': {
    name: 'KFS Generation',
    order: 8,
    mandatory: true,
    assignee: 'office-employee',
    actions: ['generate', 'complete']
  },
  'ECS_ESIGN': {
    name: 'ECS & E-Sign',
    order: 9,
    mandatory: true,
    assignee: 'bank-employee',
    actions: ['generate', 'complete']
  },
  'DISBURSEMENT': {
    name: 'Fund Disbursement',
    order: 10,
    mandatory: true,
    assignee: 'loan-advisor',
    actions: ['fund_transfer', 'cheque_upload']
  }
};

// Storage Keys
const STORAGE_KEYS = {
  CURRENT_USER: 'loanProcessingCurrentUser',
  TASKS: 'loanProcessingTasks',
  NOTIFICATIONS: 'loanProcessingNotifications',
  WORKFLOW_CONFIGS: 'loanProcessingWorkflowConfigs'
};

// Sample Tasks
const SAMPLE_TASKS = [

];

// Sample Notifications
const SAMPLE_NOTIFICATIONS = [

];

// =============================================================================
// USER DATABASE (users.js)
// =============================================================================

// User Database
const USERS = {
  // Loan Advisors - Can be assigned to multiple branches
  'user001': {
    id: 'user001',
    name: 'John Doe',
    role: 'loan-advisor',
    branches: ['main', 'andheri', 'powai'], // Multiple branches
    email: 'john.doe@company.com',
    phone: '9876543210'
  },
  'user002': {
    id: 'user002',
    name: 'Sarah Smith',
    role: 'loan-advisor',
    branches: ['main', 'pune'], // Multiple branches
    email: 'sarah.smith@company.com',
    phone: '9876543211'
  },
  'user003': {
    id: 'user003',
    name: 'Michael Fernandes',
    role: 'loan-advisor',
    branches: ['andheri', 'bandra'], // Multiple branches
    email: 'michael.fernandes@company.com',
    phone: '9876543212'
  },

  // Branch Managers - Each assigned to one branch
  'branch001': {
    id: 'branch001',
    name: 'Raj Kumar',
    role: 'branch-manager',
    branch: 'main',
    email: 'raj.kumar@company.com',
    phone: '9876543213'
  },
  'branch002': {
    id: 'branch002',
    name: 'Amit Sharma',
    role: 'branch-manager',
    branch: 'andheri',
    email: 'amit.sharma@company.com',
    phone: '9876543214'
  },
  'branch003': {
    id: 'branch003',
    name: 'Priya Desai',
    role: 'branch-manager',
    branch: 'powai',
    email: 'priya.desai@company.com',
    phone: '9876543215'
  },
  'branch004': {
    id: 'branch004',
    name: 'Vikram Mehta',
    role: 'branch-manager',
    branch: 'bandra',
    email: 'vikram.mehta@company.com',
    phone: '9876543216'
  },
  'branch005': {
    id: 'branch005',
    name: 'Neha Reddy',
    role: 'branch-manager',
    branch: 'pune',
    email: 'neha.reddy@company.com',
    phone: '9876543217'
  },

  // Bank Employees - Assigned to bank only, not branches
  'emp001': {
    id: 'emp001',
    name: 'Suresh Kumar',
    role: 'bank-employee',
    bank: 'sbi',
    employeeId: 'SBI001',
    email: 'suresh.k@sbi.co.in',
    phone: '9876543218'
  },
  'emp002': {
    id: 'emp002',
    name: 'Meera Reddy',
    role: 'bank-employee',
    bank: 'sbi',
    employeeId: 'SBI002',
    email: 'meera.r@sbi.co.in',
    phone: '9876543219'
  },
  'emp003': {
    id: 'emp003',
    name: 'Vikram Singh',
    role: 'bank-employee',
    bank: 'sbi',
    employeeId: 'SBI003',
    email: 'vikram.s@sbi.co.in',
    phone: '9876543220'
  },
  'emp004': {
    id: 'emp004',
    name: 'Amit Patel',
    role: 'bank-employee',
    bank: 'hdfc',
    employeeId: 'HDFC001',
    email: 'amit.p@hdfc.com',
    phone: '9876543221'
  },
  'emp005': {
    id: 'emp005',
    name: 'Neha Sharma',
    role: 'bank-employee',
    bank: 'hdfc',
    employeeId: 'HDFC002',
    email: 'neha.s@hdfc.com',
    phone: '9876543222'
  },
  'emp006': {
    id: 'emp006',
    name: 'Rohit Verma',
    role: 'bank-employee',
    bank: 'hdfc',
    employeeId: 'HDFC003',
    email: 'rohit.v@hdfc.com',
    phone: '9876543223'
  },
  'emp007': {
    id: 'emp007',
    name: 'Sanjay Kumar',
    role: 'bank-employee',
    bank: 'icici',
    employeeId: 'ICICI001',
    email: 'sanjay.k@icici.com',
    phone: '9876543224'
  },
  'emp008': {
    id: 'emp008',
    name: 'Pooja Nair',
    role: 'bank-employee',
    bank: 'icici',
    employeeId: 'ICICI002',
    email: 'pooja.n@icici.com',
    phone: '9876543225'
  },
  'emp009': {
    id: 'emp009',
    name: 'Rahul Menon',
    role: 'bank-employee',
    bank: 'icici',
    employeeId: 'ICICI003',
    email: 'rahul.m@icici.com',
    phone: '9876543226'
  },
  'emp010': {
    id: 'emp010',
    name: 'Amit Singh',
    role: 'bank-employee',
    bank: 'axis',
    employeeId: 'AXIS001',
    email: 'amit.s@axis.com',
    phone: '9876543227'
  },
  'emp011': {
    id: 'emp011',
    name: 'Divya Reddy',
    role: 'bank-employee',
    bank: 'axis',
    employeeId: 'AXIS002',
    email: 'divya.r@axis.com',
    phone: '9876543228'
  },
  'emp012': {
    id: 'emp012',
    name: 'Vikram Patel',
    role: 'bank-employee',
    bank: 'axis',
    employeeId: 'AXIS003',
    email: 'vikram.p@axis.com',
    phone: '9876543229'
  },

  // Office Employees - Assigned to branches
  'office001': {
    id: 'office001',
    name: 'Priya Nair',
    role: 'office-employee',
    branch: 'main',
    email: 'priya.n@company.com',
    phone: '9876543230'
  },
  'office002': {
    id: 'office002',
    name: 'Karthik Menon',
    role: 'office-employee',
    branch: 'andheri',
    email: 'karthik.m@company.com',
    phone: '9876543231'
  },
  'office003': {
    id: 'office003',
    name: 'Anita Sharma',
    role: 'office-employee',
    branch: 'powai',
    email: 'anita.s@company.com',
    phone: '9876543232'
  },

  // Legal Advisors - Can be assigned to multiple branches
  'legal001': {
    id: 'legal001',
    name: 'Anil Deshmukh',
    role: 'legal-advisor',
    branches: ['main', 'andheri', 'powai'], // Multiple branches
    email: 'anil.d@company.com',
    phone: '9876543233'
  },
  'legal002': {
    id: 'legal002',
    name: 'Swati Nair',
    role: 'legal-advisor',
    branches: ['bandra', 'pune'], // Multiple branches
    email: 'swati.n@company.com',
    phone: '9876543234'
  },
  'legal003': {
    id: 'legal003',
    name: 'Ravi Kumar',
    role: 'legal-advisor',
    branches: ['main', 'bandra'], // Multiple branches
    email: 'ravi.k@company.com',
    phone: '9876543235'
  },
  // More bank employees for Kotak
  'emp013': {
    id: 'emp013',
    name: 'Ramesh Kumar',
    role: 'bank-employee',
    bank: 'kotak',
    employeeId: 'KOTAK001',
    email: 'ramesh.k@kotak.com',
    phone: '9876543236'
  },
  'emp014': {
    id: 'emp014',
    name: 'Sneha Reddy',
    role: 'bank-employee',
    bank: 'kotak',
    employeeId: 'KOTAK002',
    email: 'sneha.r@kotak.com',
    phone: '9876543237'
  },
  'emp015': {
    id: 'emp015',
    name: 'Arjun Singh',
    role: 'bank-employee',
    bank: 'kotak',
    employeeId: 'KOTAK003',
    email: 'arjun.s@kotak.com',
    phone: '9876543238'
  },

  // Admin users - Access to all branches and banks
  'admin001': {
    id: 'admin001',
    name: 'Admin User',
    role: 'admin',
    branches: ['main', 'andheri', 'powai', 'bandra', 'pune'], // All branches
    email: 'admin@company.com',
    phone: '9876543239'
  },
  'superadmin001': {
    id: 'superadmin001',
    name: 'Super Admin',
    role: 'super-admin',
    branches: ['main', 'andheri', 'powai', 'bandra', 'pune'], // All branches
    email: 'superadmin@company.com',
    phone: '9876543240'
  }
};

// User Roles Configuration
const ROLES = {
  'branch-manager': {
    name: 'Branch Manager',
    permissions: ['view_all', 'override_stages', 'reassign_tasks', 'manage_workflow', 'technical_valuation']
  },
  'loan-advisor': {
    name: 'Loan Advisor',
    permissions: ['create_task', 'document_collection', 'data_entry', 'rate_approval', 'disbursement']
  },
  'bank-employee': {
    name: 'Bank Employee',
    permissions: ['bsm_osv_approval', 'rate_queries', 'sanction_letter', 'ecs_sign']
  },
  'office-employee': {
    name: 'Office Employee',
    permissions: ['docket_login', 'kfs_generation', 'otc_management']
  },
  'legal-advisor': {
    name: 'Legal Advisor',
    permissions: ['legal_review', 'approve_reject_legal']
  },
  'admin': {
    name: 'Admin',
    permissions: ['view_all', 'override_stages', 'reassign_tasks', 'manage_workflow', 'technical_valuation']
  },
  'super-admin': {
    name: 'Super Admin',
    permissions: ['view_all', 'override_stages', 'reassign_tasks', 'manage_workflow', 'technical_valuation']
  }
};

// =============================================================================
// MAIN APPLICATION LOGIC (app.js)
// =============================================================================

// Application State
let currentUser = {
  id: 'user001',
  name: 'John Doe',
  role: 'loan-advisor',
  bank: 'hdfc',
  branch: 'main'
};

let currentTask = null;
let notifications = [];
let tasks = [];
let workflowConfigs = {};

// Initialize Application
function init() {
  loadFromStorage();
  migrateParallelStageData(); // Migrate existing tasks to new parallel stage format
  setupEventListeners();
  updateUserInterface();
  loadWorkflowConfigurations();
  renderTasks();
  renderNotifications();
  updateNotificationBadge();
  updateDashboardStats();
}

// Migrate Parallel Stage Data
function migrateParallelStageData() {
  let migrated = false;

  tasks.forEach(task => {
    // Check if task has parallel stages
    if (task.parallelStages) {
      let needsMigration = false;

      // Convert parallel stages to object format if needed
      Object.entries(task.parallelStages).forEach(([stageKey, stageData]) => {
        if (typeof stageData === 'string' || typeof stageData === 'number') {
          needsMigration = true;

          // Convert to new object format
          task.parallelStages[stageKey] = {
            assignee: String(stageData),
            status: 'pending',
            completed: false
          };
        }
      });

      // If task has parallel stages but currentStage is not PARALLEL_PROCESSING,
      // and it has completed DATA_ENTRY, update it
      if (task.completedStages.includes('DATA_ENTRY') && task.currentStage !== 'PARALLEL_PROCESSING') {
        // Check if any parallel stages are not completed
        const hasIncompleteParallel = Object.entries(task.parallelStages).some(([stageKey, stageData]) => {
          if (typeof stageData === 'object') {
            return !stageData.completed;
          }
          return !task.completedStages.includes(stageKey);
        });

        if (hasIncompleteParallel) {
          task.currentStage = 'PARALLEL_PROCESSING';
          task.currentAssignee = task.createdBy;
          needsMigration = true;
          console.log(`Updated task ${task.id} to PARALLEL_PROCESSING stage`);
        }
      }

      if (needsMigration) {
        migrated = true;
        console.log(`Migrated task ${task.id} parallel stages to new format`);
      }
    }
  });

  if (migrated) {
    saveToStorage();
    console.log('Parallel stage data migration completed');
  }
}

// Helper function to safely add event listeners
function addListener(id, event, callback) {
  const element = document.getElementById(id);
  if (element) {
    element.addEventListener(event, callback);
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Back buttons
  addListener('taskDetailBackBtn', 'click', closeTaskDetail);
  addListener('documentScreenBackBtn', 'click', closeDocumentScreen);

  // Modal close handled by Bootstrap automatically

  // Tab switching
  addListener('tasksTab', 'click', () => showTab('tasks'));
  addListener('workflowTab', 'click', () => showTab('workflow'));
  addListener('notificationsTab', 'click', () => showTab('notifications'));

  // Workflow loan type change
  addListener('workflowLoanType', 'change', renderWorkflowConfig);

  // Bank change event listener for dynamic loan types
  addListener('taskBank', 'change', function (e) {
    updateLoanTypesForBank(e.target.value);
  });

  // Close modals
  addListener('closeModalBtn', 'click', closeCreateTaskModal);
  addListener('cancelCreateBtn', 'click', closeCreateTaskModal);
  addListener('createTaskBtn', 'click', createNewTask);

  // Document selection
  addListener('selectDocumentsBtn', 'click', selectDocuments);
  addListener('cancelDocBtn', 'click', closeDocumentScreen);

  // Notification close
  addListener('notificationPanelBackBtn', 'click', closeNotificationPanel);

  // Setup user switcher
  setupUserSwitcher();

  // Close user switcher when clicking outside
  document.addEventListener('click', function (e) {
    // Small delay to allow toggle to complete first
    setTimeout(() => {
      const switcher = document.getElementById('userSwitcher');
      const roleElement = document.getElementById('currentUserRole');

      if (switcher && switcher.classList.contains('show') &&
        !switcher.contains(e.target) &&
        e.target !== roleElement) {
        switcher.classList.remove('show');
      }
    }, 10);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Prevent touch scroll on modals
  document.querySelectorAll('.modal-content').forEach(el => {
    el.addEventListener('touchmove', e => e.stopPropagation(), { passive: false });
  });
}

// Update User Interface
function updateUserInterface() {
  const roleElement = document.getElementById('currentUserRole');
  if (roleElement) {
    const roles = typeof ROLES !== 'undefined' ? ROLES : {
      'branch-manager': { name: 'Branch Manager' },
      'loan-advisor': { name: 'Loan Advisor' },
      'bank-employee': { name: 'Bank Employee' },
      'office-employee': { name: 'Office Employee' },
      'legal-advisor': { name: 'Legal Advisor' },
      'admin': { name: 'Admin' },
      'super-admin': { name: 'Super Admin' }
    };
    roleElement.textContent = roles[currentUser.role]?.name || 'Unknown Role';
    roleElement.className = `user-role role-badge ${currentUser.role}`;
  }

  // Hide/Show workflow tab based on user role
  const workflowTab = document.querySelector('[data-tab="workflow"]');
  const workflowTabPane = document.getElementById('workflowTab');

  if (workflowTab && workflowTabPane) {
    if (currentUser.role === 'admin' || currentUser.role === 'super-admin') {
      workflowTab.style.display = 'flex';
    } else {
      workflowTab.style.display = 'none';
      workflowTabPane.style.display = 'none';
      workflowTabPane.classList.remove('active');
      // If workflow tab was active, switch to dashboard
      if (workflowTab.classList.contains('active')) {
        showTab('dashboard');
      }
    }
  }

  // Update user switcher active state
  document.querySelectorAll('.user-option').forEach(option => {
    option.classList.remove('active');
  });

  const activeOption = document.querySelector(`.user-option[onclick*="${currentUser.id}"]`);
  if (activeOption) {
    activeOption.classList.add('active');
  }
}

// User Switcher Functions
function toggleUserSwitcher(e) {
  // Prevent event bubbling and default behavior
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const switcher = document.getElementById('userSwitcher');
  if (switcher) {
    const isShowing = switcher.classList.toggle('show');

    // Focus on search input when opening
    if (isShowing) {
      setTimeout(() => {
        const searchInput = document.getElementById('userSearchInput');
        if (searchInput) {
          searchInput.focus();
          // Clear search when opening
          searchInput.value = '';
          populateUserSwitcher();
        }
      }, 100);
    }
  }
}

function setupUserSwitcher() {
  const userRoleEl = document.getElementById('currentUserRole');
  if (userRoleEl) {
    // Clone the element to remove all event listeners
    const newEl = userRoleEl.cloneNode(true);
    userRoleEl.parentNode.replaceChild(newEl, userRoleEl);

    // Add new click listener with proper event handling
    newEl.addEventListener('click', toggleUserSwitcher);

    // Make it look clickable
    newEl.style.cursor = 'pointer';
    newEl.style.padding = '2px 8px';
    newEl.style.borderRadius = '4px';
  }

  // Setup search functionality
  const userSearchInput = document.getElementById('userSearchInput');
  if (userSearchInput) {
    userSearchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.trim();
      populateUserSwitcher(searchTerm);
    });

    // Focus search input when user switcher opens
    userSearchInput.addEventListener('focus', function() {
      this.select();
    });
  }

  // Generate and populate the user list dynamically
  populateUserSwitcher();
}

// Populate User Switcher with sorted users
function populateUserSwitcher(searchTerm = '') {
  const userListContainer = document.getElementById('userListContainer');
  if (!userListContainer) return;

  // Define role order for sorting
  const roleOrder = {
    'super-admin': 0,
    'admin': 1,
    'branch-manager': 2,
    'loan-advisor': 3,
    'bank-employee': 4,
    'legal-advisor': 5,
    'office-employee': 6
  };

  // Get all users and sort them by role and name
  let sortedUsers = Object.values(USERS).sort((a, b) => {
    // First sort by role order
    const roleDiff = roleOrder[a.role] - roleOrder[b.role];
    if (roleDiff !== 0) return roleDiff;

    // If same role, sort by name
    return a.name.localeCompare(b.name);
  });

  // Filter users based on search term
  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    sortedUsers = sortedUsers.filter(user => {
      const userName = user.name.toLowerCase();
      const userRole = (ROLES[user.role]?.name || user.role).toLowerCase();
      const userBank = user.bank ? user.bank.toLowerCase() : '';
      const userBranch = user.branch ? user.branch.toLowerCase() : '';

      return userName.includes(lowerSearchTerm) ||
             userRole.includes(lowerSearchTerm) ||
             userBank.includes(lowerSearchTerm) ||
             userBranch.includes(lowerSearchTerm);
    });
  }

  // Generate HTML for user list
  let html = '';
  let currentRole = '';

  if (sortedUsers.length === 0) {
    html = `
      <div style="padding: 20px; text-align: center; color: #6b7280; font-size: 14px;">
        No users found matching "${searchTerm}"
      </div>
    `;
  } else {
    sortedUsers.forEach(user => {
      // Add role header if role changes
      if (user.role !== currentRole) {
        currentRole = user.role;
        const roleName = ROLES[user.role]?.name || user.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        html += `
          <div style="padding: 8px 16px; background: #f3f4f6; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">
            ${roleName}
          </div>
        `;
      }

      // Get user-specific info for display
      let extraInfo = '';
      if (user.role === 'bank-employee' && user.bank) {
        extraInfo = `(${user.bank.toUpperCase()})`;
      } else if (user.role === 'branch-manager' && user.branch) {
        extraInfo = `(${user.branch.charAt(0).toUpperCase() + user.branch.slice(1)})`;
      }

      // Get icon based on role
      let icon = '👤';
      switch(user.role) {
        case 'super-admin': icon = '👑'; break;
        case 'admin': icon = '👨‍💼'; break;
        case 'branch-manager': icon = '🏦'; break;
        case 'loan-advisor': icon = '💼'; break;
        case 'bank-employee': icon = '👨‍💻'; break;
        case 'legal-advisor': icon = '⚖️'; break;
        case 'office-employee': icon = '📋'; break;
      }

      html += `
        <div class="user-option" onclick="switchUser('${user.id}')">
          <div class="user-avatar">${icon}</div>
          <div class="user-info">
            <div class="user-name">${user.name}</div>
            <div class="user-role-tag">${extraInfo || ROLES[user.role]?.name || user.role}</div>
          </div>
        </div>
      `;
    });
  }

  userListContainer.innerHTML = html;
}

function switchUser(userId) {
  // Get the event object
  const e = window.event || event;
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  const users = typeof USERS !== 'undefined' ? USERS : {};
  const new_user = users[userId];
  if (!new_user) return;

  // Save the new user to storage
  currentUser = { ...new_user };
  saveToStorage();

  // Close the user switcher
  closeUserSwitcher();

  // Show a brief loading message
  const switcherEl = document.getElementById('userSwitcher');
  if (switcherEl) {
    switcherEl.innerHTML = '<div style="padding: 20px; text-align: center;">Switching user...</div>';
  }

  // Refresh the page to ensure all permissions and UI elements are properly updated
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

function closeUserSwitcher() {
  const switcher = document.getElementById('userSwitcher');
  if (switcher) {
    switcher.classList.remove('show');
  }
}

// Tab Navigation
function showTab(tabName) {
  // Close all detail screens before switching tabs
  closeAllModals();
  closeTaskDetail();
  closeBsmOsvScreen();
  closeLegalScreen();
  closeTechnicalScreen();
  closeApplicationNumberScreen();
  closeDocumentScreen();
  closeNotificationPanel();
  closeUserSwitcher();

  // Update tab buttons
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-tab') === tabName) {
      tab.classList.add('active');
    }
  });

  // Hide all tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
    pane.style.display = 'none';
  });

  // Show corresponding content
  let tabId = tabName + 'Tab';
  if (tabName === 'all-tasks') tabId = 'all-tasksTab';
  if (tabName === 'my-tasks') tabId = 'my-tasksTab';
  if (tabName === 'completed') tabId = 'completedTab';
  if (tabName === 'workflow') tabId = 'workflowTab';
  if (tabName === 'dashboard') tabId = 'dashboardTab';

  const selectedContent = document.getElementById(tabId);
  if (selectedContent) {
    selectedContent.classList.add('active');
    selectedContent.style.display = 'block';
  }

  // Special handling for each tab
  if (tabName === 'dashboard') {
    renderTasks(); // Render tasks on dashboard
  } else if (tabName === 'all-tasks') {
    renderAllTasks();
  } else if (tabName === 'my-tasks') {
    renderMyTasks();
  } else if (tabName === 'completed') {
    renderCompletedTasks();
  } else if (tabName === 'workflow') {
    renderWorkflowConfig();
  }
}

// Modal Functions
let createTaskModalInstance = null;

function openCreateTaskModal() {
  if (!['loan-advisor', 'branch-manager', 'admin', 'super-admin'].includes(currentUser.role)) {
    showToast('Only Loan Advisors, Branch Managers, Admins, and Super Admins can create new loan requests', 'danger');
    return;
  }

  const modal = document.getElementById('createTaskModal');
  if (!createTaskModalInstance) {
    createTaskModalInstance = new bootstrap.Modal(modal);
  }

  // Reset form validation
  const form = document.getElementById('createTaskForm');
  form.classList.remove('was-validated');
  form.reset();

  // Reset loan type dropdown
  document.getElementById('taskLoanType').disabled = true;
  document.getElementById('taskLoanType').innerHTML = '<option value="">Select bank first</option>';

  // Handle task owner selection
  const taskOwnerSelect = document.getElementById('taskOwner');
  const taskOwnerLabel = taskOwnerSelect.previousElementSibling; // Get the label element

  if (currentUser.role === 'loan-advisor') {
    // For loan advisors, they are the task owners
    taskOwnerSelect.style.display = 'none';
    taskOwnerLabel.style.display = 'none';
    taskOwnerSelect.required = false;
  } else {
    // For branch manager, admin, and super admin, show task owner selection
    taskOwnerSelect.style.display = 'block';
    taskOwnerLabel.style.display = 'block';
    taskOwnerSelect.required = true;

    // Populate with loan advisors
    taskOwnerSelect.innerHTML = '<option value="">Select Loan Advisor</option>';
    let loanAdvisors = getUsersByRole('loan-advisor');

    // If current user is branch manager, filter by their branch
    if (currentUser.role === 'branch-manager') {
      const managerBranch = currentUser.branch || (currentUser.branches && currentUser.branches[0]) || 'main';
      loanAdvisors = loanAdvisors.filter(advisor => {
        const advisorBranch = advisor.branches ? advisor.branches[0] : (advisor.branch || 'main');
        return advisorBranch === managerBranch;
      });
    }

    loanAdvisors.forEach(user => {
      taskOwnerSelect.innerHTML += `<option value="${user.id}">${user.name} (${user.branches ? user.branches.join(', ') : user.branch || 'main'})</option>`;
    });

    // Auto-select first advisor if only one available
    if (loanAdvisors.length === 1) {
      taskOwnerSelect.value = loanAdvisors[0].id;
    }
  }

  createTaskModalInstance.show();
}

function closeCreateTaskModal() {
  if (createTaskModalInstance) {
    createTaskModalInstance.hide();
  }
  clearCreateTaskForm();
}

function validateAndCreateTask() {
  const form = document.getElementById('createTaskForm');

  // Bootstrap validation
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    showToast('Please fill all required fields correctly', 'danger');
    return;
  }

  // If form is valid, create the task
  form.classList.add('was-validated');
  createNewTask();
}

function clearCreateTaskForm() {
  const customerName = document.getElementById('customerName');
  const customerPhone = document.getElementById('customerPhone');
  const taskBank = document.getElementById('taskBank');
  const taskLoanType = document.getElementById('taskLoanType');
  const loanAmount = document.getElementById('loanAmount');
  const taskNotes = document.getElementById('taskNotes');

  if (customerName) customerName.value = '';
  if (customerPhone) customerPhone.value = '';
  if (taskBank) taskBank.value = '';
  if (taskLoanType) taskLoanType.innerHTML = '<option value="">Select Bank First</option>';
  if (loanAmount) loanAmount.value = '';
  if (taskNotes) taskNotes.value = '';
}

function updateLoanTypesForBank(bankKey) {
  const loanTypeSelect = document.getElementById('taskLoanType');
  if (!loanTypeSelect) return;

  if (!bankKey || !BANK_LOAN_WORKFLOWS[bankKey]) {
    loanTypeSelect.innerHTML = '<option value="">Select Bank First</option>';
    loanTypeSelect.disabled = true;
    return;
  }

  // Get loan types for this bank from the new BANK_LOAN_WORKFLOWS
  const bankLoanTypes = getBankLoanTypes(bankKey);

  loanTypeSelect.innerHTML = '<option value="">Select Loan Type</option>';
  loanTypeSelect.disabled = false;

  Object.keys(bankLoanTypes).forEach(loanTypeKey => {
    const loanType = bankLoanTypes[loanTypeKey];
    const option = document.createElement('option');
    option.value = loanTypeKey;
    option.textContent = loanType.displayName;
    loanTypeSelect.appendChild(option);
  });
}

// Close all modals and detail screens
function closeAllModals() {
  closeCreateTaskModal();
  closeTaskDetail();
  closeDocumentScreen();
  closeNotificationPanel();
  closeUserSwitcher();
  closeBsmOsvScreen();
  closeLegalScreen();
  closeTechnicalScreen();
  closeApplicationNumberScreen();
  closeBsmQueryModal();

  // Close any modal dialogs
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });

  // Close any detail screens
  document.querySelectorAll('.detail-screen').forEach(screen => {
    screen.classList.remove('active');
  });
}

// Update Dashboard Statistics
function updateDashboardStats() {
  const totalTasksEl = document.getElementById('totalTasks');
  const myTasksEl = document.getElementById('myTasks');
  const pendingTasksEl = document.getElementById('pendingTasks');
  const completedTodayEl = document.getElementById('completedToday');

  if (!totalTasksEl || !myTasksEl || !pendingTasksEl || !completedTodayEl) {
    console.log('Dashboard stat elements not found');
    return;
  }

  console.log('Updating dashboard stats...');
  console.log('Total tasks:', tasks.length);
  console.log('Current user:', currentUser);

  const myTasks = tasks.filter(task => {
    // Branch managers and admins see all tasks
    if (currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin') return true;

    // Check if user is the main assignee or created the task
    if (task.currentAssignee === currentUser.id || task.createdBy === currentUser.id) return true;

    // Check if user is assigned to any parallel stage
    if (task.parallelStages) {
      // Check BSM OSV
      if (task.parallelStages.BSM_OSV && task.parallelStages.BSM_OSV.assignee === currentUser.id) return true;
      // Check Legal
      if (task.parallelStages.LEGAL && task.parallelStages.LEGAL.assignee === currentUser.id) return true;
      // Check Technical
      if (task.parallelStages.TECHNICAL && task.parallelStages.TECHNICAL.assignee === currentUser.id) return true;
    }

    return false;
  });

  const pendingCount = myTasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;
  const completedToday = myTasks.filter(t => {
    if (!t.completedAt) return false;
    return new Date(t.completedAt).toDateString() === new Date().toDateString();
  }).length;

  // Count tasks where user is the current assignee (including parallel stages)
  const currentlyAssignedCount = tasks.filter(task => {
    if (task.currentAssignee === currentUser.id) return true;

    // Check parallel stages
    if (task.parallelStages) {
      if (task.parallelStages.BSM_OSV && task.parallelStages.BSM_OSV.assignee === currentUser.id &&
          !task.parallelStages.BSM_OSV.completed) return true;
      if (task.parallelStages.LEGAL && task.parallelStages.LEGAL.assignee === currentUser.id &&
          !task.parallelStages.LEGAL.completed) return true;
      if (task.parallelStages.TECHNICAL && task.parallelStages.TECHNICAL.assignee === currentUser.id &&
          !task.parallelStages.TECHNICAL.completed) return true;
    }

    return false;
  }).length;

  console.log('My tasks count:', myTasks.length);
  console.log('Currently assigned count:', currentlyAssignedCount);
  console.log('Pending count:', pendingCount);
  console.log('Completed today:', completedToday);

  totalTasksEl.textContent = myTasks.length;
  myTasksEl.textContent = currentlyAssignedCount;
  pendingTasksEl.textContent = pendingCount;
  completedTodayEl.textContent = completedToday;
}

// Storage Functions
function saveToStorage() {
  const keys = STORAGE_KEYS || {
    CURRENT_USER: 'loanProcessingCurrentUser',
    TASKS: 'loanProcessingTasks',
    NOTIFICATIONS: 'loanProcessingNotifications',
    WORKFLOW_CONFIGS: 'loanProcessingWorkflowConfigs'
  };

  localStorage.setItem(keys.CURRENT_USER, JSON.stringify(currentUser));
  localStorage.setItem(keys.TASKS, JSON.stringify(tasks));
  localStorage.setItem(keys.NOTIFICATIONS, JSON.stringify(notifications));
  localStorage.setItem(keys.WORKFLOW_CONFIGS, JSON.stringify(workflowConfigs));
}

function loadFromStorage() {
  const keys = STORAGE_KEYS || {
    CURRENT_USER: 'loanProcessingCurrentUser',
    TASKS: 'loanProcessingTasks',
    NOTIFICATIONS: 'loanProcessingNotifications',
    WORKFLOW_CONFIGS: 'loanProcessingWorkflowConfigs'
  };

  const savedUser = localStorage.getItem(keys.CURRENT_USER);
  const savedTasks = localStorage.getItem(keys.TASKS);
  const savedNotifications = localStorage.getItem(keys.NOTIFICATIONS);
  const savedWorkflowConfigs = localStorage.getItem(keys.WORKFLOW_CONFIGS);

  // Load saved user or use default
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
  }

  if (savedTasks) {
    tasks = JSON.parse(savedTasks);

    // Migrate existing tasks to include lastUpdatedTime and enhanced history
    let needsMigration = false;
    tasks.forEach(task => {
      // Add lastUpdatedTime if missing
      if (!task.lastUpdatedTime) {
        task.lastUpdatedTime = task.updatedAt || task.createdAt || new Date().toISOString();
        needsMigration = true;
      }

      // Migrate history items to include actionType and details
      if (task.history && task.history.length > 0) {
        task.history.forEach(item => {
          if (!item.actionType) {
            item.actionType = item.action?.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20) || 'unknown';
            needsMigration = true;
          }
        });
      }

      // Ensure parallel stages have proper structure
      if (task.parallelStages) {
        Object.entries(task.parallelStages).forEach(([stageKey, stageData]) => {
          if (typeof stageData === 'string' || typeof stageData === 'number') {
            needsMigration = true;

            // Convert to new object format
            task.parallelStages[stageKey] = {
              assignee: String(stageData),
              status: 'pending',
              completed: false,
              queries: []
            };
          }
        });
      }
    });

    if (needsMigration) {
      saveToStorage();
      console.log('Migrated existing tasks with new fields');
    }
  } else {
    // Load sample tasks for demo
    tasks = typeof SAMPLE_TASKS !== 'undefined' ? [...SAMPLE_TASKS] : [];
  }

  if (savedNotifications) {
    notifications = JSON.parse(savedNotifications);
  } else {
    notifications = typeof SAMPLE_NOTIFICATIONS !== 'undefined' ? [...SAMPLE_NOTIFICATIONS] : [];
  }

  if (savedWorkflowConfigs) {
    workflowConfigs = JSON.parse(savedWorkflowConfigs);
  }
}

// =============================================================================
// TASK MANAGEMENT FUNCTIONS (tasks.js)
// =============================================================================

// Create New Task
function createNewTask() {
  const customerName = document.getElementById('customerName').value;
  const phone = document.getElementById('customerPhone').value;
  const bank = document.getElementById('taskBank').value;
  const loanType = document.getElementById('taskLoanType').value;
  const loanAmount = document.getElementById('loanAmount').value;
  const notes = document.getElementById('taskNotes').value;
  const taskOwnerSelect = document.getElementById('taskOwner');

  // Get selected task owner or use current user
  let taskOwnerId = currentUser.id;
  let taskOwnerName = currentUser.name;

  if (['loan-advisor'].includes(currentUser.role)) {
    // Loan advisors create tasks for themselves
    taskOwnerId = currentUser.id;
    taskOwnerName = currentUser.name;
  } else {
    // Admin, Super Admin, and Branch Manager must select a task owner
    const selectedOwnerId = taskOwnerSelect.value;
    if (!selectedOwnerId) {
      showNotification('Please select a task owner', 'error');
      return;
    }
    taskOwnerId = selectedOwnerId;
    const selectedUser = getUserById(selectedOwnerId);
    taskOwnerName = selectedUser ? selectedUser.name : selectedOwnerId;
  }

  if (!customerName || !phone || !bank || !loanType || !loanAmount) {
    showNotification('Please fill all required fields', 'error');
    return;
  }

  const taskId = 'TSK' + new Date().toISOString().slice(0, 10).replace(/-/g, '') +
    String(Math.floor(Math.random() * 1000)).padStart(3, '0');

  // Get workflow stages for this bank and loan type
  const workflowStages = getWorkflowStages(bank, loanType);

  // Get bank default employee
  const bankData = BANK_LOAN_WORKFLOWS[bank];
  const defaultEmployee = bankData ? bankData.defaultEmployee : null;

  // Initialize parallel stages based on workflow
  const parallelStages = {};
  const stageConfig = {};

  workflowStages.forEach(stage => {
    stageConfig[stage.key] = {
      name: stage.name,
      role: stage.role,
      required: stage.required,
      enabled: true
    };

    // Set up parallel stages if they exist in the workflow (but don't assign yet)
    if (stage.key === 'BSM_OSV') {
      parallelStages['BSM_OSV'] = {
        assignee: null,  // Will be assigned in application number entry
        status: 'pending',
        completed: false,
        queries: []
      };
    }
    if (stage.key === 'LEGAL') {
      parallelStages['LEGAL'] = {
        assignee: null,
        status: 'pending',
        completed: false
      }; // Will be assigned later
    }
    if (stage.key === 'TECHNICAL' || stage.key === 'PROPERTY_VALUATION' || stage.key === 'VEHICLE_VALUATION' || stage.key === 'BUSINESS_VALUATION') {
      parallelStages['TECHNICAL'] = {
        assignee: null,
        status: 'pending',
        completed: false
      }; // Will be assigned later
    }
  });

  // Get branch info from task owner
  const taskOwner = getUserById(taskOwnerId);
  const taskOwnerBranch = taskOwner ? (taskOwner.branches ? taskOwner.branches[0] : taskOwner.branch || 'main') : 'main';

  const now = new Date().toISOString();
  const newTask = {
    id: taskId,
    customerName: customerName,
    phone: phone,
    bank: bank,
    loanType: loanType,
    loanAmount: parseInt(loanAmount),
    status: 'pending',
    currentStage: 'INITIATION',
    currentAssignee: taskOwnerId, // Use the task owner
    // bankEmployee will be set in application number entry screen
    createdBy: currentUser.id,
    createdAt: now,
    lastUpdatedTime: now, // Track last update time
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    applicationNumber: '',
    documents: [],
    completedStages: ['INITIATION'],
    parallelStages: parallelStages,
    workflowStages: stageConfig, // Store the complete workflow configuration
    branch: taskOwnerBranch, // Use task owner's branch
    history: [{
      stage: 'INITIATION',
      action: 'Task Created',
      user: currentUser.name,
      timestamp: now,
      actionType: 'created',
      details: `Loan request created for ${loanType} - ₹${parseInt(loanAmount).toLocaleString('en-IN')}${taskOwnerId !== currentUser.id ? ` (Assigned to: ${taskOwnerName})` : ''}`
    }],
    notes: notes,
    rates: {
      interest: null,
      processingFee: null,
      adminCharges: null
    },
    valuation: null
  };

  tasks.unshift(newTask);

  // Debug: Log the created task
  console.log('Created Task:', newTask);
  console.log('Task Owner ID:', taskOwnerId);
  console.log('Current User ID:', currentUser.id);

  saveToStorage();
  renderTasks();

  // Show success message
  showToast('Loan request created successfully!', 'success');

  closeCreateTaskModal();

  // Add notification for assigned employee
  addNotification({
    id: Date.now(),
    message: `New task ${taskId} assigned to you for initiation`,
    timestamp: new Date().toISOString(),
    type: 'info',
    userId: currentUser.id,
    taskId: taskId,
    read: false
  });

  showNotification('Task created successfully', 'success');

  // Open task detail for immediate action
  openTaskDetail(taskId);
}

// Render All Tasks
function renderAllTasks() {
  const allTasksList = document.getElementById('allTasksList');
  if (!allTasksList) return;

  // Use filtered tasks based on user role
  const allTasks = getFilteredTasks();
  const banks = typeof BANKS !== 'undefined' ? BANKS : {};
  const loanTypes = typeof LOAN_TYPES !== 'undefined' ? LOAN_TYPES : {};

  if (allTasks.length === 0) {
    allTasksList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <div class="empty-title">No tasks found</div>
        <div class="empty-desc">Create a new task to get started</div>
      </div>
    `;
    return;
  }

  allTasksList.innerHTML = allTasks.map(task => {
    const bankName = banks[task.bank]?.name || task.bank;
    const loanTypeName = loanTypes[task.loanType]?.displayName || task.loanType;
    const statusClass = task.status === 'completed' ? 'completed' : task.status === 'rejected' ? 'rejected' : task.status === 'in-progress' ? 'in-progress' : 'pending';
    const statusText = task.status === 'completed' ? 'Completed' : task.status === 'rejected' ? 'Rejected' : task.status === 'in-progress' ? 'In Progress' : 'Pending';

    return `
      <div class="task-item ${statusClass}" onclick="openTaskDetail('${task.id}')">
        <div class="task-header">
          <div class="task-number">${task.id}</div>
          <div class="task-status ${task.status}">${statusText}</div>
        </div>
        <div class="task-customer">${task.customerName}</div>
        <div class="task-details">
          <div class="task-amount">₹${task.loanAmount.toLocaleString('en-IN')}</div>
          <div class="task-due">Due: ${formatDate(task.dueDate)}</div>
        </div>
        <div class="task-owner">${bankName} • ${loanTypeName}</div>
      </div>
    `;
  }).join('');
}

// Render My Tasks
function renderMyTasks() {
  const myTasksList = document.getElementById('myTasksList');
  if (!myTasksList) return;

  const myTasks = typeof tasks !== 'undefined' ? tasks.filter(task => {
    return task.currentAssignee === currentUser.id || task.createdBy === currentUser.id;
  }) : [];

  const banks = typeof BANKS !== 'undefined' ? BANKS : {};
  const loanTypes = typeof LOAN_TYPES !== 'undefined' ? LOAN_TYPES : {};

  if (myTasks.length === 0) {
    myTasksList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">👤</div>
        <div class="empty-title">No tasks assigned to you</div>
        <div class="empty-desc">Tasks assigned to you will appear here</div>
      </div>
    `;
    return;
  }

  myTasksList.innerHTML = myTasks.map(task => {
    const bankName = banks[task.bank]?.name || task.bank;
    const loanTypeName = loanTypes[task.loanType]?.displayName || task.loanType;
    const statusClass = task.status === 'completed' ? 'completed' : task.status === 'rejected' ? 'rejected' : task.status === 'in-progress' ? 'in-progress' : 'pending';
    const statusText = task.status === 'completed' ? 'Completed' : task.status === 'rejected' ? 'Rejected' : task.status === 'in-progress' ? 'In Progress' : 'Pending';

    return `
      <div class="task-item ${statusClass}" onclick="openTaskDetail('${task.id}')">
        <div class="task-header">
          <div class="task-number">${task.id}</div>
          <div class="task-status ${task.status}">${statusText}</div>
        </div>
        <div class="task-customer">${task.customerName}</div>
        <div class="task-details">
          <div class="task-amount">₹${task.loanAmount.toLocaleString('en-IN')}</div>
          <div class="task-due">Due: ${formatDate(task.dueDate)}</div>
        </div>
        <div class="task-owner">${bankName} • ${loanTypeName}</div>
      </div>
    `;
  }).join('');
}

// Render Completed Tasks
function renderCompletedTasks() {
  const completedTasksList = document.getElementById('completedTasksList');
  if (!completedTasksList) return;

  const completedTasks = typeof tasks !== 'undefined' ? tasks.filter(task => task.status === 'completed') : [];
  const banks = typeof BANKS !== 'undefined' ? BANKS : {};
  const loanTypes = typeof LOAN_TYPES !== 'undefined' ? LOAN_TYPES : {};

  if (completedTasks.length === 0) {
    completedTasksList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">✅</div>
        <div class="empty-title">No completed tasks</div>
        <div class="empty-desc">Completed tasks will appear here</div>
      </div>
    `;
    return;
  }

  completedTasksList.innerHTML = completedTasks.map(task => {
    const bankName = banks[task.bank]?.name || task.bank;
    const loanTypeName = loanTypes[task.loanType]?.displayName || task.loanType;

    return `
      <div class="task-item completed" onclick="openTaskDetail('${task.id}')">
        <div class="task-header">
          <div class="task-number">${task.id}</div>
          <div class="task-status completed">Completed</div>
        </div>
        <div class="task-customer">${task.customerName}</div>
        <div class="task-details">
          <div class="task-amount">₹${task.loanAmount.toLocaleString('en-IN')}</div>
          <div class="task-due">Completed on ${formatDate(task.completedAt || task.updatedAt)}</div>
        </div>
        <div class="task-owner">${bankName} • ${loanTypeName}</div>
      </div>
    `;
  }).join('');
}

// Render Tasks
function renderTasks() {
  const taskList = document.getElementById('taskList');
  const allTasksList = document.getElementById('allTasksList');
  const filteredTasks = getFilteredTasks();
  const banks = typeof BANKS !== 'undefined' ? BANKS : {};
  const loanTypes = typeof LOAN_TYPES !== 'undefined' ? LOAN_TYPES : {};

  // Render dashboard tasks (recent/fixed number)
  if (taskList) {
    if (filteredTasks.length === 0) {
      taskList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-title">No tasks found</div>
          <div class="empty-desc">Create a new task to get started</div>
        </div>
      `;
    } else {
      taskList.innerHTML = filteredTasks.slice(0, 5).map(task => {
        const statusClass = task.status === 'completed' ? 'completed' :
          task.status === 'overdue' ? 'urgent' : '';
        const isAssigned = isTaskAssignedToUser(task);
        const statusText = getStatusText(task);
        const bankName = banks[task.bank]?.name || task.bank;
        const loanTypeName = loanTypes[task.loanType]?.displayName || task.loanType;

        return `
          <div class="task-item ${statusClass}" onclick="openTaskDetail('${task.id}')">
            <div class="task-header">
              <div class="task-number">${task.id}</div>
              <div class="task-status ${task.status}">${statusText}</div>
            </div>
            <div class="task-customer">${task.customerName}</div>
            <div class="task-details">
              <div class="task-amount">₹${task.loanAmount.toLocaleString('en-IN')}</div>
              <div class="task-due">Due: ${formatDate(task.dueDate)}</div>
            </div>
            <div class="task-owner">${bankName} • ${loanTypeName}</div>

            <!-- Current Stage Info -->
            <div class="task-stage-info">
              <div class="current-stage">
                <i class="bi bi-arrow-right-circle me-1"></i>
                <strong>Stage:</strong> ${getStageDisplayName(task, task.currentStage)}
              </div>
              <div class="assigned-user">
                <i class="bi bi-person me-1"></i>
                ${task.currentAssignee ? getUserById(task.currentAssignee)?.name || 'Unassigned' : 'Unassigned'}
              </div>
            </div>

            <!-- Parallel Stages Info -->
            ${getParallelStagesInfo(task)}
            ${getPendingStagesInfo(task)}
            ${!isAssigned ? '<div class="task-reassign">⚠️ Not assigned to you</div>' : ''}
          </div>
        `;
      }).join('');
    }
  }

  // Render all tasks list
  if (allTasksList) {
    const allTasks = typeof tasks !== 'undefined' ? tasks : [];
    if (allTasks.length === 0) {
      allTasksList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-title">No tasks in the system</div>
          <div class="empty-desc">Create your first loan request to get started</div>
        </div>
      `;
    } else {
      allTasksList.innerHTML = allTasks.map(task => {
        const statusClass = task.status === 'completed' ? 'completed' :
          task.status === 'overdue' ? 'urgent' : '';
        const isAssigned = isTaskAssignedToUser(task);
        const statusText = getStatusText(task);
        const bankName = banks[task.bank]?.name || task.bank;
        const loanTypeName = loanTypes[task.loanType]?.displayName || task.loanType;

        return `
          <div class="task-item ${statusClass}" onclick="openTaskDetail('${task.id}')">
            <div class="task-header">
              <div class="task-number">${task.id}</div>
              <div class="task-status ${task.status}">${statusText}</div>
            </div>
            <div class="task-customer">${task.customerName}</div>
            <div class="task-details">
              <div class="task-amount">₹${task.loanAmount.toLocaleString('en-IN')}</div>
              <div class="task-due">Due: ${formatDate(task.dueDate)}</div>
            </div>
            <div class="task-owner">${bankName} • ${loanTypeName}</div>

            <!-- Current Stage Info -->
            <div class="task-stage-info">
              <div class="current-stage">
                <i class="bi bi-arrow-right-circle me-1"></i>
                <strong>Stage:</strong> ${getStageDisplayName(task, task.currentStage)}
              </div>
              <div class="assigned-user">
                <i class="bi bi-person me-1"></i>
                ${task.currentAssignee ? getUserById(task.currentAssignee)?.name || 'Unassigned' : 'Unassigned'}
              </div>
            </div>

            <!-- Parallel Stages Info -->
            ${getParallelStagesInfo(task)}
            ${getPendingStagesInfo(task)}
            ${!isAssigned ? '<div class="task-reassign">⚠️ Not assigned to you</div>' : ''}
          </div>
        `;
      }).join('');
    }
  }

  // Update dashboard stats after rendering tasks
  updateDashboardStats();
}

// Get Filtered Tasks Based on User Role
function getFilteredTasks() {
  let filteredTasks;

  // Debug: Log current user and tasks
  console.log('Current User:', currentUser);
  console.log('Total Tasks:', tasks.length);
  console.log('Tasks for current user:', tasks.filter(t => t.currentAssignee === currentUser.id));

  if (currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin') {
    // Branch Manager, Admin, and Super Admin can see all tasks
    filteredTasks = tasks;
  } else {
    // Other roles see only their assigned tasks or tasks they can work on
    filteredTasks = tasks.filter(task => {
      if (task.createdBy === currentUser.id) return true;
      if (task.currentAssignee === currentUser.id) return true;

      // Check if user is assigned to any parallel stage
      if (task.parallelStages) {
        return Object.values(task.parallelStages).some(stageData => {
          if (!stageData) return false;

          // Handle both object and string structures
          if (typeof stageData === 'object' && stageData !== null) {
            // New structure with object - check the assignee property
            return stageData.assignee === currentUser.id;
          }
          // Old structure with string value
          return stageData === currentUser.id;
        });
      }

      // Check bank employee assignments
      if (currentUser.role === 'bank-employee' && task.bankEmployee === currentUser.id) {
        return true;
      }

      return false;
    });
  }

  // Sort tasks by lastUpdatedTime (most recent first)
  filteredTasks.sort((a, b) => {
    // Try to use lastUpdatedTime, fallback to updatedAt, createdAt or last history entry
    const timeA = a.lastUpdatedTime || a.updatedAt || (a.history && a.history.length > 0 ? a.history[a.history.length - 1].timestamp : a.createdAt);
    const timeB = b.lastUpdatedTime || b.updatedAt || (b.history && b.history.length > 0 ? b.history[b.history.length - 1].timestamp : b.createdAt);

    if (!timeA && !timeB) return 0;
    if (!timeA) return 1;
    if (!timeB) return -1;

    return new Date(timeB) - new Date(timeA); // Most recent first
  });

  return filteredTasks;
}

// Check if Task is Assigned to Current User
function isTaskAssignedToUser(task) {
  if (currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin') return true;
  if (task.createdBy === currentUser.id) return true;
  if (task.currentAssignee === currentUser.id) return true;

  if (task.parallelStages) {
    return Object.values(task.parallelStages).some(stageData => {
      if (!stageData) return false;

      // Handle both object and string structures
      if (typeof stageData === 'object' && stageData !== null) {
        // New structure with object - check the assignee property
        return stageData.assignee === currentUser.id;
      }
      // Old structure with string value
      return stageData === currentUser.id;
    });
  }

  if (currentUser.role === 'bank-employee' && task.bankEmployee === currentUser.id) {
    return true;
  }

  return false;
}

// Get Status Text
function getStatusText(task) {
  if (task.status === 'completed') return 'Completed';
  if (task.status === 'rejected') return 'Rejected';
  if (task.status === 'overdue') return 'Overdue';

  const workflowStages = typeof WORKFLOW_STAGES !== 'undefined' ? WORKFLOW_STAGES : {};
  const stage = workflowStages[task.currentStage];

  // Special handling for parallel stages - only show when in PARALLEL_PROCESSING stage
  const parallelStages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
  if (task.currentStage === 'PARALLEL_PROCESSING' && task.parallelStages) {
    const stageName = stage ? stage.name : task.currentStage;

    // Check which parallel stages are completed
    const completedCount = parallelStages.filter(stage => {
      const stageData = task.parallelStages[stage];
      if (!stageData) return false;

      // Handle both object and string structures
      if (typeof stageData === 'object' && stageData !== null) {
        // New structure with object
        return stageData.completed || stageData.status === 'completed';
      }
      // Old structure - check if stage is in completedStages array
      return task.completedStages && task.completedStages.includes(stage);
    }).length;

    const totalStages = parallelStages.length;
    const pendingCount = totalStages - completedCount;

    if (pendingCount === 0) {
      return `${stageName} - All stages completed`;
    } else {
      return `${stageName} (${completedCount}/${totalStages} completed)`;
    }
  }

  return stage ? stage.name : 'Pending';
}

// Get Pending Stages Information for Task Cards
function getPendingStagesInfo(task) {
  if (task.status === 'completed' || task.status === 'rejected') return '';

  const workflowStages = typeof WORKFLOW_STAGES !== 'undefined' ? WORKFLOW_STAGES : {};

  // Show next steps for parallel stages - only show when in PARALLEL_PROCESSING stage
  const parallelStages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
  if (task.currentStage === 'PARALLEL_PROCESSING' && task.parallelStages) {
    const pendingStages = parallelStages.filter(stage => {
      const stageData = task.parallelStages[stage];
      if (!stageData) return false;

      // Handle both object and string structures
      if (typeof stageData === 'object' && stageData !== null) {
        // New structure with object
        return !(stageData.completed || stageData.status === 'completed');
      }
      // Old structure - check if stage is in completedStages array
      return !(task.completedStages && task.completedStages.includes(stage));
    }).map(stage => {
      const stageNames = {
        'BSM_OSV': 'BSM OSV Approval',
        'LEGAL': 'Legal Verification',
        'TECHNICAL': 'Technical Valuation'
      };
      return stageNames[stage];
    });

    if (pendingStages.length > 0) {
      return `<div class="task-pending-stages" style="font-size: 11px; color: #6b7280; margin-top: 4px;">
        🔄 Pending: ${pendingStages.join(', ')}
      </div>`;
    }
  }

  // Show next step for non-parallel stages
  else if (task.currentStage && workflowStages[task.currentStage]) {
    return `<div class="task-next-step" style="font-size: 11px; color: #6b7280; margin-top: 4px;">
      → Next: ${workflowStages[task.currentStage].name}
    </div>`;
  }

  return '';
}

// Format Date
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays > 0 && diffDays <= 7) return `${diffDays} days`;
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;

  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// Open Task Detail
function openTaskDetail(taskId) {
  currentTask = tasks.find(t => t.id === taskId);
  if (!currentTask) return;

  const detailScreen = document.getElementById('taskDetailScreen');
  const detailContent = document.getElementById('taskDetailContent');

  document.getElementById('detailTitle').textContent = 'Task Details';
  document.getElementById('detailTaskNumber').textContent = currentTask.id;

  detailContent.innerHTML = generateTaskDetailHTML();

  detailScreen.classList.add('active');
}

// Generate Task Detail HTML
function generateTaskDetailHTML() {
  if (!currentTask) return '';

  const banks = typeof BANKS !== 'undefined' ? BANKS : {};
  const loanTypes = typeof LOAN_TYPES !== 'undefined' ? LOAN_TYPES : {};
  const workflowStages = typeof WORKFLOW_STAGES !== 'undefined' ? WORKFLOW_STAGES : {};
  const bankName = banks[currentTask.bank]?.name || currentTask.bank;
  const loanTypeName = loanTypes[currentTask.loanType]?.displayName || currentTask.loanType;

  return `
    ${generateWorkflowHTML()}

    <!-- Quick Info Summary (Compact) -->
    <div class="info-card" style="padding: 12px;">
      <div class="quick-info-grid">
        <div class="quick-info-item">
          <small class="text-muted">Customer</small>
          <div class="fw-bold">${currentTask.customerName}</div>
        </div>
        <div class="quick-info-item">
          <small class="text-muted">Loan Amount</small>
          <div class="fw-bold text-success">₹${currentTask.loanAmount.toLocaleString('en-IN')}</div>
        </div>
        ${currentTask.valuation ? `
        <div class="quick-info-item">
          <small class="text-muted">Valuation</small>
          <div class="fw-bold text-info">₹${currentTask.valuation.toLocaleString('en-IN')}</div>
        </div>
        ` : ''}
        <div class="quick-info-item">
          <small class="text-muted">Bank</small>
          <div class="fw-bold">${bankName}</div>
        </div>
        <div class="quick-info-item">
          <small class="text-muted">Stage</small>
          <div class="fw-bold text-primary">${getStageDisplayName(currentTask, currentTask.currentStage)}</div>
        </div>
      </div>
      ${currentTask.applicationNumber ? `
      <div class="mt-2 pt-2 border-top">
        <small class="text-muted">App No:</small>
        <span class="ms-2 fw-bold">${currentTask.applicationNumber}</span>
      </div>
      ` : ''}
    </div>

    <!-- Active Actions (Priority) -->
    ${generateActiveActionsHTML()}

    <!-- Collapsible Details -->
    <div class="accordion" id="taskDetailsAccordion">
      <!-- Parallel Stages (if applicable) -->
      ${currentTask.parallelStages && Object.keys(currentTask.parallelStages).length > 0 && ['DATA_ENTRY', 'PARALLEL_PROCESSING', 'BSM_OSV', 'LEGAL', 'TECHNICAL', 'RATE_PF'].includes(currentTask.currentStage) ? `
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#parallelStages">
            <i class="bi bi-diagram-3 me-2"></i>Parallel Stages
            <span class="badge bg-secondary ms-auto">${Object.keys(currentTask.parallelStages).length}</span>
          </button>
        </h2>
        <div id="parallelStages" class="accordion-collapse collapse" data-bs-parent="#taskDetailsAccordion">
          <div class="accordion-body p-0">
            <div class="parallel-stages-detail">
              ${Object.entries(currentTask.parallelStages).map(([stageKey, stageData]) => {
                const stageName = getStageDisplayName(currentTask, stageKey);

                // Handle both object and string structures
                let assignee = null;
                let isCompleted = false;

                if (typeof stageData === 'object' && stageData !== null) {
                  // New structure with object
                  assignee = stageData.assignee;
                  isCompleted = stageData.completed || stageData.status === 'completed';
                } else {
                  // Old structure with string value
                  assignee = stageData;
                  isCompleted = currentTask.completedStages && currentTask.completedStages.includes(stageKey);
                }

                const userName = assignee ? getUserById(assignee)?.name || 'Unassigned' : 'Unassigned';

                let status = 'Pending';
                let statusClass = 'warning';
                let statusIcon = 'bi-clock';

                if (isCompleted) {
                  status = 'Completed';
                  statusClass = 'success';
                  statusIcon = 'bi-check-circle';
                } else if (assignee) {
                  status = 'In Progress';
                  statusClass = 'info';
                  statusIcon = 'bi-arrow-repeat';
                }

                // Show valuation amount for Technical stage
                let valuationInfo = '';
                if (stageKey === 'TECHNICAL' && typeof stageData === 'object' && stageData.valuationAmount) {
                  valuationInfo = `<br><small class="text-success"><i class="bi bi-currency-rupee me-1"></i>${stageData.valuationAmount.toLocaleString('en-IN')}</small>`;
                } else if (stageKey === 'TECHNICAL' && currentTask.valuation) {
                  valuationInfo = `<br><small class="text-success"><i class="bi bi-currency-rupee me-1"></i>${currentTask.valuation.toLocaleString('en-IN')}</small>`;
                }

                return `
                  <div class="parallel-stage-detail-item" style="border-radius: 0; border-left: 3px solid #667eea;">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>
                        <div class="fw-semibold">
                          <i class="bi ${getStageIcon(stageKey)} me-2"></i>
                          ${stageName}
                        </div>
                        <small class="text-muted">
                          <i class="bi bi-person-circle me-1"></i>
                          ${userName}
                        </small>
                        ${valuationInfo}
                      </div>
                      <span class="badge bg-${statusClass === 'success' ? 'success' : statusClass === 'info' ? 'primary' : 'warning'}">
                        <i class="bi ${statusIcon} me-1"></i>${status}
                      </span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
      ` : ''}

      <!-- History Section -->
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#historySection">
            <i class="bi bi-clock-history me-2"></i>History
            <span class="badge bg-secondary ms-auto">${currentTask.history?.length || 0}</span>
          </button>
        </h2>
        <div id="historySection" class="accordion-collapse collapse" data-bs-parent="#taskDetailsAccordion">
          <div class="accordion-body">
            <div class="timeline">
              ${generateHistoryHTML()}
            </div>
          </div>
        </div>
      </div>
    </div>

    ${generateActionButtons()}
  `;
}

// Generate Active Actions HTML (Priority Actions at Top)
function generateActiveActionsHTML() {
  let html = '';

  // Show query summary first if there are active queries
  const queryHTML = generateQuerySummaryHTML();
  if (queryHTML) {
    html += queryHTML;
  }

  // Show stage-specific actions for current user
  const userRole = currentUser.role;
  const canAct = currentTask.currentAssignee === currentUser.id ||
                (userRole === 'branch-manager' && currentTask.currentStage === 'TECHNICAL') ||
                (userRole === 'legal-advisor' && currentTask.currentStage === 'LEGAL') ||
                (userRole === 'bank-employee' && currentTask.currentStage === 'BSM_OSV') ||
                (userRole === 'office-employee' && ['DOCKET', 'KFS'].includes(currentTask.currentStage)) ||
                (userRole === 'loan-advisor' && ['INITIATION', 'DOCUMENT_COLLECTION', 'DATA_ENTRY', 'RATE_PF', 'SANCTION_LETTER', 'DISBURSEMENT'].includes(currentTask.currentStage));

  if (canAct) {
    let actionButtons = '';

    // Get appropriate action buttons based on stage
    switch(currentTask.currentStage) {
      case 'INITIATION':
        // Check if task is already created
        if (currentTask.id && currentTask.customerName) {
          // Task exists, move to document collection
          actionButtons = `
            <button class="btn btn-primary btn-sm w-100" onclick="selectDocuments()">
              <i class="bi bi-file-text me-2"></i>Continue to Document Collection
            </button>
          `;
        } else {
          // New task creation
          actionButtons = `
            <button class="btn btn-primary btn-sm w-100" onclick="openCreateTaskModal()">
              <i class="bi bi-plus-circle me-2"></i>Create Loan Request
            </button>
          `;
        }
        break;
      case 'DOCUMENT_COLLECTION':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="openDocumentScreen()">
            <i class="bi bi-file-text me-2"></i>Manage Documents
          </button>
        `;
        break;
      case 'DATA_ENTRY':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="showApplicationNumberScreen()">
            <i class="bi bi-input-cursor-text me-2"></i>Enter Application Number
          </button>
        `;
        break;
      case 'PARALLEL_PROCESSING':
        actionButtons = `
          <div class="alert alert-info mb-2">
            <i class="bi bi-info-circle me-2"></i>
            Parallel processing in progress
          </div>
        `;
        break;
      case 'RATE_PF':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="openRateScreen()">
            <i class="bi bi-calculator me-2"></i>Set Rates & Processing Fees
          </button>
        `;
        break;
      case 'SANCTION_LETTER':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="generateSanctionLetter()">
            <i class="bi bi-file-earmark-text me-2"></i>Generate Sanction Letter
          </button>
        `;
        break;
      case 'DOCKET':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="openDocketScreen()">
            <i class="bi bi-folder me-2"></i>Docket Login
          </button>
        `;
        break;
      case 'KFS':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="openKfsScreen()">
            <i class="bi bi-file-earmark-pdf me-2"></i>Generate KFS
          </button>
        `;
        break;
      case 'E_SIGN':
        actionButtons = `
          <button class="btn btn-primary btn-sm w-100" onclick="processESign()">
            <i class="bi bi-pen-fill me-2"></i>Process E-Sign & ECS
          </button>
        `;
        break;
      case 'DISBURSEMENT':
        actionButtons = `
          <button class="btn btn-success btn-sm w-100" onclick="openDisbursementScreen()">
            <i class="bi bi-cash-stack me-2"></i>Process Fund Disbursement
          </button>
        `;
        break;
    }

    if (actionButtons) {
      html += `
        <div class="info-card" style="padding: 12px;">
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-play-circle text-primary me-2"></i>
            <small class="text-uppercase fw-bold">Actions Required</small>
          </div>
          ${actionButtons}
        </div>
      `;
    }
  }

  return html;
}

// Generate History HTML with Parallel Stages
function generateHistoryHTML() {
  const workflowStages = typeof WORKFLOW_STAGES !== 'undefined' ? WORKFLOW_STAGES : {};

  // Group history by parallel processing stage
  const parallelStageHistory = {};
  const regularHistory = [];

  // Separate parallel stage history from regular history
  currentTask.history.forEach(item => {
    if (['BSM_OSV', 'LEGAL', 'TECHNICAL'].includes(item.stage)) {
      if (!parallelStageHistory[item.stage]) {
        parallelStageHistory[item.stage] = [];
      }
      parallelStageHistory[item.stage].push(item);
    } else {
      regularHistory.push(item);
    }
  });

  let html = '';

  // Render regular history first
  regularHistory.forEach(item => {
    html += `
      <div class="timeline-item">
        <div class="timeline-dot ${item.stage === currentTask.currentStage ? 'active' : 'completed'}"></div>
        ${item.stage !== currentTask.currentStage ? '<div class="timeline-line completed"></div>' : ''}
        <div class="timeline-content">
          <div class="timeline-title">${item.action}</div>
          <div class="timeline-desc">Stage: ${workflowStages[item.stage]?.name || item.stage}</div>
          <div class="timeline-time">${formatDateTime(item.timestamp)}</div>
          ${item.user ? `<div class="timeline-user">by ${item.user}</div>` : ''}
        </div>
      </div>
    `;
  });

  // Add parallel processing summary if applicable
  if (Object.keys(parallelStageHistory).length > 0) {
    html += `
      <div class="timeline-item parallel-processing-header">
        <div class="timeline-dot parallel"></div>
        <div class="timeline-content">
          <div class="timeline-title"><i class="bi bi-diagram-3-fill me-2"></i>Parallel Processing Stage</div>
          <div class="timeline-desc">Multiple stages running simultaneously</div>
        </div>
      </div>
    `;

    // Render each parallel stage's history
    ['BSM_OSV', 'LEGAL', 'TECHNICAL'].forEach(stageKey => {
      if (parallelStageHistory[stageKey] && parallelStageHistory[stageKey].length > 0) {
        const stageInfo = currentTask.parallelStages && currentTask.parallelStages[stageKey];
        let assignee = null;
        let isCompleted = false;

        if (stageInfo) {
          if (typeof stageInfo === 'object' && stageInfo !== null) {
            assignee = stageInfo.assignee;
            isCompleted = stageInfo.completed || stageInfo.status === 'completed';
          } else {
            assignee = stageInfo;
            isCompleted = currentTask.completedStages && currentTask.completedStages.includes(stageKey);
          }
        }

        const userName = assignee ? getUserById(assignee)?.name || 'Unassigned' : 'Unassigned';
        const stageName = getStageDisplayName(currentTask, stageKey);

        // Add parallel stage header
        html += `
          <div class="timeline-parallel-stage">
            <div class="parallel-stage-header">
              <i class="bi ${getStageIcon(stageKey)} me-2"></i>
              <span class="stage-name">${stageName}</span>
              <span class="stage-status ${isCompleted ? 'completed' : 'pending'}">
                ${isCompleted ? '✅ Completed' : '⏳ In Progress'}
              </span>
              <span class="stage-assignee">👤 ${userName}</span>
            </div>
            <div class="parallel-stage-history">
        `;

        // Add history items for this parallel stage
        parallelStageHistory[stageKey].forEach(item => {
          html += `
            <div class="timeline-item sub-item">
              <div class="timeline-dot small"></div>
              <div class="timeline-content">
                <div class="timeline-title">${item.action}</div>
                <div class="timeline-time">${formatDateTime(item.timestamp)}</div>
                ${item.user ? `<div class="timeline-user">by ${item.user}</div>` : ''}
              </div>
            </div>
          `;
        });

        html += `
            </div>
          </div>
        `;
      }
    });
  }

  return html;
}

// Generate Query Summary HTML for parallel stages
function generateQuerySummaryHTML() {
  if (!currentTask.parallelStages || Object.keys(currentTask.parallelStages).length === 0) {
    return '';
  }

  const parallelStages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
  let hasQueries = false;
  let html = '';

  // Check if any parallel stage has active queries
  parallelStages.forEach(stageKey => {
    const stage = currentTask.parallelStages[stageKey];
    if (stage && stage.queries && stage.queries.some(q => q.status === 'active' || q.status === 'responded')) {
      hasQueries = true;
    }
  });

  if (!hasQueries) {
    return '';
  }

  html = `
    <div class="info-card">
      <h3 style="font-size: 16px; margin-bottom: 12px;">
        <i class="bi bi-exclamation-triangle-fill text-warning me-2"></i>
        Active Queries
      </h3>
      <div class="query-summary-container">
  `;

  // Display each parallel stage with active queries
  parallelStages.forEach(stageKey => {
    const stage = currentTask.parallelStages[stageKey];
    const stageName = getStageDisplayName(currentTask, stageKey);
    const stageIcon = getStageIcon(stageKey);

    if (stage && stage.queries && stage.queries.some(q => q.status === 'active' || q.status === 'responded')) {
      const activeQuery = stage.queries.find(q => q.status === 'active' || q.status === 'responded');
      const queryText = activeQuery ? activeQuery.text.substring(0, 100) + (activeQuery.text.length > 100 ? '...' : '') : '';
      const isAssignedToUser = stage.assignee === currentUser.id;
      const canRespond = (currentUser.role === 'loan-advisor' && (activeQuery.status === 'responded' || activeQuery.status === 'active')) ||
                        (isAssignedToUser && activeQuery.status === 'active');

      html += `
        <div class="query-summary-item" data-stage="${stageKey}">
          <div class="query-stage-header">
            <span class="query-stage-name">
              <i class="bi ${stageIcon} me-2"></i>${stageName}
            </span>
            <span class="query-status-badge ${activeQuery.status === 'active' ? 'active' : 'responded'}">
              ${activeQuery.status === 'active' ? '⏳ Pending Response' : '💬 Responded'}
            </span>
          </div>
          <div class="query-details">
            <div class="query-text">${queryText}</div>
            <div class="query-meta">
              <span class="query-raised-by">Raised by: ${activeQuery.raisedByName || 'Unknown'}</span>
              <span class="query-date">${formatDate(activeQuery.raisedAt)}</span>
            </div>
          </div>
          <div class="query-actions">
            ${canRespond ? `
              <button class="btn btn-sm btn-primary" onclick="handleQueryResponse('${stageKey}', '${activeQuery.id || ''}')">
                <i class="bi bi-reply-fill me-1"></i>Respond
              </button>
            ` : ''}
            <button class="btn btn-sm btn-outline-secondary" onclick="openParallelStageScreen('${stageKey}')">
              <i class="bi bi-eye me-1"></i>View Details
            </button>
          </div>
        </div>
      `;
    }
  });

  html += `
      </div>
    </div>
  `;

  return html;
}

// Handle query response from task detail screen
function handleQueryResponse(stageKey, queryId) {
  switch(stageKey) {
    case 'BSM_OSV':
      openBsmOsvScreen(currentTask.id);
      // Scroll to query section
      setTimeout(() => {
        const querySection = document.getElementById('bsmLoanAdvisorSection');
        if (querySection) {
          querySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      break;
    case 'LEGAL':
      openLegalScreen(currentTask.id);
      setTimeout(() => {
        const querySection = document.getElementById('legalLoanAdvisorSection');
        if (querySection) {
          querySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      break;
    case 'TECHNICAL':
      openTechnicalScreen(currentTask.id);
      setTimeout(() => {
        const querySection = document.getElementById('technicalLoanAdvisorSection');
        if (querySection) {
          querySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      break;
  }
}

// Open appropriate task screen based on current stage
function openTaskScreen() {
  switch(currentTask.currentStage) {
    case 'INITIATION':
      openCreateTaskModal();
      break;
    case 'DOCUMENT_COLLECTION':
      openDocumentScreen();
      break;
    case 'DATA_ENTRY':
      showApplicationNumberScreen();
      break;
    case 'BSM_OSV':
      openBsmOsvScreen(currentTask.id);
      break;
    case 'LEGAL':
      openLegalScreen(currentTask.id);
      break;
    case 'TECHNICAL':
      openTechnicalScreen(currentTask.id);
      break;
    case 'RATE_PF':
      openRateScreen();
      break;
    case 'SANCTION_LETTER':
      generateSanctionLetter();
      break;
    case 'DOCKET':
      openDocketScreen();
      break;
    case 'KFS':
      openKfsScreen();
      break;
    case 'E_SIGN':
      processESign();
      break;
    case 'DISBURSEMENT':
      openDisbursementScreen();
      break;
    default:
      showToast('No action required for this stage', 'info');
  }
}

// Open parallel stage screen
function openParallelStageScreen(stageKey) {
  switch(stageKey) {
    case 'BSM_OSV':
      openBsmOsvScreen(currentTask.id);
      break;
    case 'LEGAL':
      openLegalScreen(currentTask.id);
      break;
    case 'TECHNICAL':
      openTechnicalScreen(currentTask.id);
      break;
  }
}

// Generate Workflow HTML
function generateWorkflowHTML() {
  const workflowStages = typeof WORKFLOW_STAGES !== 'undefined' ? WORKFLOW_STAGES : {};
  const stages = Object.entries(workflowStages).sort((a, b) => a[1].order - b[1].order);
  const currentStageInfo = workflowStages[currentTask.currentStage];

  // Find next stage
  let nextStageInfo = null;
  const currentStageIndex = stages.findIndex(([key, stage]) => key === currentTask.currentStage);

  if (currentStageIndex !== -1) {
    // Look for the next incomplete stage
    for (let i = currentStageIndex + 1; i < stages.length; i++) {
      const [stageKey, stage] = stages[i];
      if (!currentTask.completedStages.includes(stageKey)) {
        nextStageInfo = stage;
        break;
      }
    }
  }

  let headerText = currentStageInfo?.name || currentTask.currentStage;
  if (currentTask.status === 'completed') {
    headerText = 'Completed';
  } else if (nextStageInfo) {
    headerText = `Next: ${nextStageInfo.name}`;
  } else {
    headerText = `Current: ${currentStageInfo?.name || currentTask.currentStage}`;
  }

  let html = `
    <div class="workflow-section">
      <div class="workflow-header" onclick="toggleWorkflow('${currentTask.id}')">
        <h3 style="font-size: 16px; margin: 0;">Workflow Progress</h3>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 13px; color: white; font-weight: 500;">
            ${headerText}
          </span>
          <span class="toggle-icon" id="workflowToggleIcon-${currentTask.id}">▶</span>
        </div>
      </div>
      <div class="workflow-content collapsed" id="workflowContent-${currentTask.id}">
  `;

  // 2x4 Grid Layout for all stages
  html += '<div class="progress-steps">';

  stages.forEach(([key, stage], index) => {
    const isCompleted = currentTask.completedStages.includes(key);
    const isActive = key === currentTask.currentStage;

    html += `
      <div class="progress-step ${isCompleted ? 'completed' : isActive ? 'active' : ''}">
        <div class="progress-step-dot">
          ${isCompleted ? '✓' : stage.order}
        </div>
        <div class="progress-step-label">${stage.name}</div>
      </div>
    `;
  });

  html += '</div>';

  // Current Stage Details
  html += '<div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">';

  // Show parallel stages if in PARALLEL_PROCESSING stage
  const parallelStages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
  if (currentTask.currentStage === 'PARALLEL_PROCESSING' && currentTask.parallelStages) {
    html += '<div style="margin-bottom: 16px;"><strong style="font-size: 14px; color: #374151;">Parallel Stages:</strong></div>';
    html += '<div class="parallel-stages" style="display: flex; flex-direction: column; gap: 12px;">';

    // BSM OSV Stage
    const bsmStage = currentTask.parallelStages.BSM_OSV;
    if (bsmStage) {
      const bsmUser = getUsersById(bsmStage.assignee);
      const hasActiveQuery = bsmStage.queries && bsmStage.queries.some(q => q.status === 'active');
      const isCompleted = bsmStage.completed || (currentTask.completedParallelStages && currentTask.completedParallelStages.includes('BSM_OSV'));

      html += `
        <div class="parallel-stage-card ${isCompleted ? 'completed' : hasActiveQuery ? 'query' : 'pending'}"
             style="padding: 12px; background: ${isCompleted ? '#d1fae5' : hasActiveQuery ? '#fef3c7' : '#f3f4f6'}; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="font-size: 14px; margin: 0;">BSM OSV Approval</h4>
              <p style="font-size: 12px; color: #6b7280; margin: 4px 0;">Assigned to: ${bsmUser?.name || 'Unassigned'}</p>
              ${hasActiveQuery ? '<p style="font-size: 11px; color: #d97706; margin: 0;">⚠️ Query Raised</p>' : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${isCompleted ? '<span style="color: #059669;">✅ Completed</span>' : hasActiveQuery ? '<span style="color: #d97706;">❓ Query</span>' : '<span style="color: #6b7280;">⏳ Pending</span>'}
              ${currentUser.id === bsmStage.assignee || currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin' ?
          `<button class="btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}"
                         onclick="openBsmOsvScreen('${currentTask.id}')"
                         ${currentTask.status === 'rejected' ? 'disabled' : ''}>
                  ${isCompleted ? 'View' : 'Open'}
                </button>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    // Legal Stage
    const legalStage = currentTask.parallelStages.LEGAL;
    if (legalStage) {
      const legalUser = getUsersById(legalStage.assignee);
      const isCompleted = legalStage.completed || (currentTask.completedParallelStages && currentTask.completedParallelStages.includes('LEGAL'));

      html += `
        <div class="parallel-stage-card ${isCompleted ? 'completed' : 'pending'}"
             style="padding: 12px; background: ${isCompleted ? '#d1fae5' : '#f3f4f6'}; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="font-size: 14px; margin: 0;">Legal Verification</h4>
              <p style="font-size: 12px; color: #6b7280; margin: 4px 0;">Assigned to: ${legalUser?.name || 'Unassigned'}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${isCompleted ? '<span style="color: #059669;">✅ Completed</span>' : '<span style="color: #6b7280;">⏳ Pending</span>'}
              ${currentUser.id === legalStage.assignee || currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin' ?
          `<button class="btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}"
                         onclick="openLegalScreen('${currentTask.id}')"
                         ${currentTask.status === 'rejected' ? 'disabled' : ''}>
                  ${isCompleted ? 'View' : 'Open'}
                </button>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    // Technical Stage
    const technicalStage = currentTask.parallelStages.TECHNICAL;
    if (technicalStage) {
      const techUser = getUsersById(technicalStage.assignee);
      const isCompleted = technicalStage.completed || (currentTask.completedParallelStages && currentTask.completedParallelStages.includes('TECHNICAL'));

      html += `
        <div class="parallel-stage-card ${isCompleted ? 'completed' : 'pending'}"
             style="padding: 12px; background: ${isCompleted ? '#d1fae5' : '#f3f4f6'}; border-radius: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="font-size: 14px; margin: 0;">Technical Valuation</h4>
              <p style="font-size: 12px; color: #6b7280; margin: 4px 0;">Assigned to: ${techUser?.name || 'Unassigned'}</p>
              ${technicalStage.valuationAmount ? `<p style="font-size: 12px; color: #059669; margin: 4px 0;">Valuation: ₹${technicalStage.valuationAmount.toLocaleString('en-IN')}</p>` : ''}
              ${currentTask.valuation && !technicalStage.valuationAmount ? `<p style="font-size: 12px; color: #059669; margin: 4px 0;">Valuation: ₹${currentTask.valuation.toLocaleString('en-IN')}</p>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              ${isCompleted ? '<span style="color: #059669;">✅ Completed</span>' : '<span style="color: #6b7280;">⏳ Pending</span>'}
              ${currentUser.id === technicalStage.assignee || currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin' ?
          `<button class="btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}"
                         onclick="openTechnicalScreen('${currentTask.id}')"
                         ${currentTask.status === 'rejected' ? 'disabled' : ''}>
                  ${isCompleted ? 'View' : 'Open'}
                </button>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    html += '</div>';

    // Add buttons to assign Legal and Technical stages if not assigned
    const canAssign = ['branch-manager', 'admin', 'super-admin'].includes(currentUser.role) || currentUser.id === currentTask.createdBy;

    if (!currentTask.parallelStages.LEGAL && canAssign) {
      html += `
        <div style="margin-top: 16px; padding: 12px; background: #fef3c7; border-radius: 8px; border-left: 3px solid #f59e0b;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #92400e;">
            <i class="bi bi-info-circle me-1"></i>Legal Verification not assigned yet
          </p>
          <button class="btn btn-sm btn-warning" onclick="assignLegalStage('${currentTask.id}')">
            <i class="bi bi-person-plus me-1"></i>Assign Legal Advisor
          </button>
        </div>
      `;
    }

    if (!currentTask.parallelStages.TECHNICAL && canAssign) {
      html += `
        <div style="margin-top: 16px; padding: 12px; background: #fef3c7; border-radius: 8px; border-left: 3px solid #f59e0b;">
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #92400e;">
            <i class="bi bi-info-circle me-1"></i>Technical Valuation not assigned yet
          </p>
          <button class="btn btn-sm btn-warning" onclick="assignTechnicalStage('${currentTask.id}')">
            <i class="bi bi-person-plus me-1"></i>Assign Branch Manager
          </button>
        </div>
      `;
    }

    // Show completion message if stages are completed
    const allStages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
    const completedStages = allStages.filter(stage => {
      const stageData = currentTask.parallelStages[stage];
      if (!stageData) return false;

      // Handle both object and string structures
      if (typeof stageData === 'object' && stageData !== null) {
        // New structure with object
        return stageData.completed || stageData.status === 'completed';
      }
      // Old structure - check if stage is in completedStages array
      return currentTask.completedStages && currentTask.completedStages.includes(stage);
    }).map(stage => {
      const stageNames = { 'BSM_OSV': 'BSM OSV', 'LEGAL': 'Legal', 'TECHNICAL': 'Technical' };
      return stageNames[stage];
    });

    if (completedStages.length > 0) {
      html += `
        <div style="margin-top: 16px; padding: 12px; background: #dbeafe; border-radius: 8px;">
          <p style="margin: 0; font-size: 13px; color: #1e40af;">
            ✓ ${completedStages.join(', ')} completed. Ready for Rate & PF stage.
          </p>
        </div>
      `;
    }
  } else {
    // Single stage info
    const users = typeof USERS !== 'undefined' ? USERS : {};
    const assignee = users[currentTask.currentAssignee];
    html += `
      <div style="padding: 12px; background: #f9fafb; border-radius: 8px;">
        <p style="margin: 0 0 8px 0; font-size: 14px;">
          <strong style="color: #374151;">Assigned to:</strong>
          <span style="color: #667eea;">${assignee?.name || 'Unassigned'}</span>
        </p>
        <p style="margin: 0; font-size: 14px;">
          <strong style="color: #374151;">Status:</strong>
          <span style="color: #10b981;">In Progress</span>
        </p>
      </div>
    `;
  }

  // Add any active queries
  if (currentTask.queries && currentTask.queries.length > 0) {
    html += '<div style="margin-top: 16px;"><strong style="font-size: 14px; color: #374151;">Active Queries:</strong></div>';
    currentTask.queries.forEach((query, index) => {
      html += `
        <div class="query-item" style="margin-bottom: 8px;">
          <div class="query-text">${query.message}</div>
          <div class="query-meta">${query.from} - ${formatDateTime(query.timestamp)}</div>
        </div>
      `;
    });
  }

  // Add Action History Section
  html += '<div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb;">';
  html += '<h3 style="font-size: 16px; margin-bottom: 12px;">Action History</h3>';

  if (currentTask.history && currentTask.history.length > 0) {
    // Sort history by timestamp (most recent first)
    const sortedHistory = [...currentTask.history].sort((a, b) =>
      new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt)
    );

    html += '<div class="history-timeline" style="display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto; padding-right: 10px;">';

    sortedHistory.forEach((item, index) => {
      const timestamp = item.timestamp || item.createdAt;
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const formattedTime = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const actionType = item.actionType || item.action?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
      const actionIcon = {
        'created': '🆕',
        'approved': '✅',
        'rejected': '❌',
        'completed': '✓',
        'query': '❓',
        'responded': '💬',
        'resolved': '🔔',
        'updated': '📝',
        'assigned': '👤',
        'submitted': '📤',
        'generated': '📄',
        'processed': '⚙️',
        'initiated': '🚀',
        'login': '🔐',
        'verified': '✔',
        'rejected': '🚫'
      }[actionType] || '📌';

      html += `
        <div class="history-item" style="
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px;
          background: #f9fafb;
          border-radius: 8px;
          border-left: 3px solid #3b82f6;
        ">
          <span style="font-size: 18px; margin-top: -2px;">${actionIcon}</span>
          <div style="flex: 1;">
            <div style="font-weight: 500; color: #1f2937; font-size: 13px;">
              ${item.action || item.stage || 'Unknown Action'}
            </div>
            ${item.details ? `<div style="color: #6b7280; font-size: 12px; margin-top: 2px;">${item.details}</div>` : ''}
            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
              <span style="color: #9ca3af; font-size: 11px;">${item.user || 'System'}</span>
              <span style="color: #d1d5db; font-size: 10px;">•</span>
              <span style="color: #9ca3af; font-size: 11px;">${formattedDate} at ${formattedTime}</span>
            </div>
          </div>
        </div>
      `;
    });

    html += '</div>';
  } else {
    html += '<p style="color: #9ca3af; font-size: 13px; font-style: italic;">No action history available</p>';
  }

  html += '</div>'; // Close history section

  html += '</div>'; // Close current stage details
  html += '</div></div>'; // Close workflow content and section

  return html;
}

// Toggle Workflow Section
function toggleWorkflow(taskId) {
  const content = document.getElementById('workflowContent-' + taskId);
  const icon = document.getElementById('workflowToggleIcon-' + taskId);

  if (content && icon) {
    content.classList.toggle('collapsed');
    if (content.classList.contains('collapsed')) {
      icon.textContent = '▶';
    } else {
      icon.textContent = '▼';
    }
    console.log('Workflow toggled for task', taskId, 'collapsed:', content.classList.contains('collapsed'));
  } else {
    console.error('Workflow toggle elements not found for task', taskId, { content, icon });
  }
}

// Generate Action Buttons
function generateActionButtons() {
  if (currentTask.status === 'completed' || currentTask.status === 'rejected') {
    return '';
  }

  const workflowStages = typeof WORKFLOW_STAGES !== 'undefined' ? WORKFLOW_STAGES : {};
  const stage = workflowStages[currentTask.currentStage];
  if (!stage) return '';

  // Special handling for PARALLEL_PROCESSING stage
  let canAct = false;
  if (currentTask.currentStage === 'PARALLEL_PROCESSING') {
    // Debug logging
    console.log('Task in PARALLEL_PROCESSING stage:', {
      taskId: currentTask.id,
      currentUser: currentUser.id,
      currentRole: currentUser.role,
      parallelStages: currentTask.parallelStages
    });

    // For parallel processing, check if user is assigned to any parallel stage
    canAct = currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin';

    if (!canAct && currentTask.parallelStages) {
      // Check if user is assigned to any parallel stage
      canAct = Object.values(currentTask.parallelStages).some(stageData => {
        const assigneeId = typeof stageData === 'object' ? stageData.assignee : stageData;
        console.log(`Checking stage assignment: ${assigneeId} === ${currentUser.id}?`, assigneeId === currentUser.id);
        return assigneeId === currentUser.id;
      });
    }

    console.log('Can act on parallel stages:', canAct);
  } else {
    // For other stages, use original logic
    canAct = currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin' ||
      stage.assignee === currentUser.role ||
      currentTask.currentAssignee === currentUser.id;
  }

  if (!canAct) {
    const users = typeof USERS !== 'undefined' ? USERS : {};

    // For parallel processing, show a more specific message
    if (currentTask.currentStage === 'PARALLEL_PROCESSING') {
      let assignedStages = [];
      if (currentTask.parallelStages) {
        Object.entries(currentTask.parallelStages).forEach(([stageKey, stageData]) => {
          const assigneeId = typeof stageData === 'object' ? stageData.assignee : stageData;
          const user = users[assigneeId];
          if (user) {
            const stageName = stageKey.replace('_', ' ');
            assignedStages.push(`${stageName}: ${user.name}`);
          }
        });
      }

      if (assignedStages.length > 0) {
        return `<div style="text-align: center; padding: 20px; color: #6b7280; font-size: 13px;">
          <div>Parallel Stages Assigned:</div>
          <div style="margin-top: 8px; font-size: 12px;">${assignedStages.join('<br>')}</div>
          <div style="margin-top: 12px; color: #dc2626;">You are not assigned to any parallel stage</div>
        </div>`;
      }
    }

    return `<div style="text-align: center; padding: 20px; color: #6b7280; font-size: 13px;">
      This task is assigned to ${users[currentTask.currentAssignee]?.name || 'someone else'}
    </div>`;
  }

  let buttons = '';

  switch (currentTask.currentStage) {
    case 'INITIATION':
      buttons = `
        <button class="btn btn-primary" onclick="selectDocuments()">Select Documents</button>
      `;
      break;

    case 'DOCUMENT_COLLECTION':
      const hasDocs = currentTask.documents && currentTask.documents.length > 0;
      const buttonText = hasDocs ? 'Manage Documents' : 'Select Documents';
      buttons = `
        <button class="btn btn-primary" onclick="selectDocuments()">${buttonText}</button>
      `;
      break;

    case 'DATA_ENTRY':
      if (currentTask.applicationNumber) {
        buttons = `
          <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 13px;">
            Application Number: ${currentTask.applicationNumber}<br>
            <span style="color: #10b981;">✓ Data Entry Complete</span>
          </div>
        `;
      } else {
        buttons = `
          <button class="btn btn-primary" onclick="showApplicationNumberScreen()">Enter Application Number</button>
        `;
      }
      break;

    case 'PARALLEL_PROCESSING':
      // Check if task is already completed or rejected
      if (currentTask.status === 'completed' || currentTask.status === 'rejected') {
        buttons = `<div class="text-center">Task has been ${currentTask.status === 'completed' ? 'completed' : 'rejected'}</div>`;
      } else {
        // Check each parallel stage to see if current user is assigned
        buttons = '<div style="margin-bottom: 16px;"><strong>Parallel Stages:</strong></div>';

        if (currentTask.parallelStages) {
          let hasAnyAction = false;

          // Check BSM OSV
          if (currentTask.parallelStages.BSM_OSV) {
            const bsmAssignee = typeof currentTask.parallelStages.BSM_OSV === 'object'
              ? currentTask.parallelStages.BSM_OSV.assignee
              : currentTask.parallelStages.BSM_OSV;
            const bsmCompleted = currentTask.completedStages.includes('BSM_OSV') ||
              (typeof currentTask.parallelStages.BSM_OSV === 'object' && currentTask.parallelStages.BSM_OSV.completed);
            const canOverrideBsm = currentUser.role === 'admin' || currentUser.role === 'super-admin';
            const isBranchManager = currentUser.role === 'branch-manager';

            if (!bsmCompleted && (bsmAssignee === currentUser.id || canOverrideBsm)) {
              hasAnyAction = true;
              buttons += `
                <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
                  <div style="font-weight: 600; margin-bottom: 8px;">BSM OSV ${bsmCompleted ? '✓' : ''}</div>
                  ${!bsmCompleted ? `
                    <button class="btn btn-success btn-sm" onclick="approveParallelStage('BSM_OSV')">Approve</button>
                    <button class="btn btn-danger btn-sm" onclick="rejectParallelStage('BSM_OSV')">Reject</button>
                    <button class="btn btn-warning btn-sm" onclick="showBsmQueryInputDirect('${currentTask.id}')">Raise Query</button>
                  ` : '<div class="text-success">Completed</div>'}
                </div>
              `;
            }
          }

          // Check Legal
          if (currentTask.parallelStages.LEGAL) {
            const legalAssignee = typeof currentTask.parallelStages.LEGAL === 'object'
              ? currentTask.parallelStages.LEGAL.assignee
              : currentTask.parallelStages.LEGAL;
            const legalCompleted = currentTask.completedStages.includes('LEGAL') ||
              (typeof currentTask.parallelStages.LEGAL === 'object' && currentTask.parallelStages.LEGAL.completed);
            const canOverrideLegal = currentUser.role === 'admin' || currentUser.role === 'super-admin';

            if (!legalCompleted && (legalAssignee === currentUser.id || canOverrideLegal)) {
              hasAnyAction = true;
              buttons += `
                <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
                  <div style="font-weight: 600; margin-bottom: 8px;">Legal Verification ${legalCompleted ? '✓' : ''}</div>
                  ${!legalCompleted ? `
                    <button class="btn btn-success btn-sm" onclick="approveParallelStage('LEGAL')">Approve</button>
                    <button class="btn btn-danger btn-sm" onclick="rejectParallelStage('LEGAL')">Reject</button>
                  ` : '<div class="text-success">Completed</div>'}
                </div>
              `;
            }
          }

          // Check Technical
          if (currentTask.parallelStages.TECHNICAL) {
            const techAssignee = typeof currentTask.parallelStages.TECHNICAL === 'object'
              ? currentTask.parallelStages.TECHNICAL.assignee
              : currentTask.parallelStages.TECHNICAL;
            const techCompleted = currentTask.completedStages.includes('TECHNICAL') ||
              (typeof currentTask.parallelStages.TECHNICAL === 'object' && currentTask.parallelStages.TECHNICAL.completed);
            const canOverrideTechnical = currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin';

            if (!techCompleted && (techAssignee === currentUser.id || canOverrideTechnical)) {
              hasAnyAction = true;
              // For Branch Manager, show Set Valuation and Raise Query buttons
              if (currentUser.role === 'branch-manager') {
                buttons += `
                  <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">Technical Valuation ${techCompleted ? '✓' : ''}</div>
                    ${!techCompleted ? `
                      <button class="btn btn-primary btn-sm w-100 mb-2" onclick="openTechnicalScreen('${currentTask.id}')">Set Valuation</button>
                      <button class="btn btn-warning btn-sm w-100" onclick="showTechnicalQueryInputDirect('${currentTask.id}')">Raise Query</button>
                    ` : '<div class="text-success">Completed</div>'}
                  </div>
                `;
              } else {
                // For other roles (admin/super-admin), show all buttons
                buttons += `
                  <div style="margin-bottom: 12px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px;">
                    <div style="font-weight: 600; margin-bottom: 8px;">Technical Valuation ${techCompleted ? '✓' : ''}</div>
                    ${!techCompleted ? `
                      <button class="btn btn-success btn-sm" onclick="approveParallelStage('TECHNICAL')">Approve</button>
                      <button class="btn btn-danger btn-sm" onclick="rejectParallelStage('TECHNICAL')">Reject</button>
                      <button class="btn btn-primary btn-sm" onclick="openTechnicalScreen('${currentTask.id}')">Set Valuation</button>
                    ` : '<div class="text-success">Completed</div>'}
                  </div>
                `;
              }
            }
          }

          if (!hasAnyAction) {
            buttons = `<div style="text-align: center; padding: 20px; color: #6b7280; font-size: 13px;">
              No pending actions for you in parallel stages
            </div>`;
          }
        }
      }
      break;

    case 'BSM_OSV':
    case 'LEGAL':
    case 'TECHNICAL':
      // Check if task is already completed or rejected
      if (currentTask.status === 'completed' || currentTask.status === 'rejected') {
        buttons = `<div class="text-center">Task has been ${currentTask.status === 'completed' ? 'completed' : 'rejected'}</div>`;
      } else {
        // Check if user has permission to approve/reject this stage
        var canApprove = checkApprovalPermission(currentTask.currentStage, currentUser.role);
        var isAssigned = currentTask.currentAssignee === currentUser.id;
        var canOverride = currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin';

        // Check if this parallel stage is already completed
        var isStageCompleted = currentTask.completedParallelStages && currentTask.completedParallelStages.includes(currentTask.currentStage);

        if (isStageCompleted) {
          buttons = `<br /><div class="text-success" style="width:100%;">This stage has been completed</div><br />`;
        } else if (currentTask.currentStage === 'TECHNICAL' && (isAssigned || canOverride)) {
          // Special handling for TECHNICAL stage
          if (currentUser.role === 'branch-manager') {
            // Branch Manager gets Set Valuation and Raise Query buttons
            buttons = `
              <button class="btn btn-primary w-100 mb-2" onclick="openTechnicalScreen('${currentTask.id}')">
                <i class="bi bi-calculator me-2"></i>Set Valuation
              </button>
              <button class="btn btn-warning w-100" onclick="showTechnicalQueryInputDirect('${currentTask.id}')">
                <i class="bi bi-question-circle me-2"></i>Raise Query
              </button>
            `;
          } else if (canApprove && (isAssigned || canOverride)) {
            // Other roles get approve/reject
            buttons = `
              <button class="btn btn-success" onclick="approveStage('${currentTask.currentStage}')">Approve</button>
              <button class="btn btn-danger" onclick="rejectStage('${currentTask.currentStage}')">Reject</button>
            `;
          } else {
            buttons = `<div class="text-muted">You don't have permission to approve this task</div>`;
          }
        } else if (canApprove && (isAssigned || canOverride)) {
          // For BSM_OSV and LEGAL stages
          buttons = `
            <button class="btn btn-success" onclick="approveStage('${currentTask.currentStage}')">Approve</button>
            <button class="btn btn-danger" onclick="rejectStage('${currentTask.currentStage}')">Reject</button>
          `;
        } else {
          buttons = `<div class="text-muted">You don't have permission to approve this task</div>`;
        }
      }
      break;

    case 'RATE_PF':
      if (currentUser.role === 'bank-employee' && currentTask.bankEmployee !== currentUser.id) {
        buttons = `
          <button class="btn btn-warning" onclick="raiseQuery()">Raise Query</button>
        `;
      } else {
        buttons = `
          <button class="btn btn-primary" onclick="setRatesAndPF()">Set Rates & PF</button>
        `;
      }
      break;

    case 'SANCTION_LETTER':
      if (currentUser.role === 'bank-employee' && currentTask.bankEmployee !== currentUser.id) {
        buttons = `
          <button class="btn btn-success" onclick="confirmSanctionLetter()">Confirm</button>
          <button class="btn btn-danger" onclick="rejectSanctionLetter()">Reject</button>
        `;
      } else {
        buttons = `
          <button class="btn btn-primary" onclick="generateSanctionLetter()">Generate Letter</button>
        `;
      }
      break;

    case 'DOCKET_LOGIN':
      buttons = `
        <button class="btn btn-primary" onclick="loginDocket()">Login Docket</button>
      `;
      break;

    case 'KFS_GENERATION':
      buttons = `
        <button class="btn btn-primary" onclick="generateKFS()">Generate KFS</button>
      `;
      break;

    case 'ECS_ESIGN':
      buttons = `
        <button class="btn btn-primary" onclick="generateECSEsign()">Generate ECS & E-Sign</button>
      `;
      break;

    case 'DISBURSEMENT':
      buttons = `
        <button class="btn btn-success" onclick="processFundTransfer()">Fund Transfer</button>
        <button class="btn btn-secondary" onclick="uploadCheque()">Upload Cheque</button>
      `;
      break;
  }

  // Removed old reassign button - now using floating reassign button

  return buttons ? `<div class="action-buttons">${buttons}</div>` : '';
}

// Format Date Time
function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit'
  });
}

// Close Task Detail
function closeTaskDetail() {
  const taskDetailScreen = document.getElementById('taskDetailScreen');
  if (taskDetailScreen) {
    taskDetailScreen.classList.remove('active');
  }
  currentTask = null;
}

// =============================================================================
// WORKFLOW MANAGEMENT FUNCTIONS (workflow.js)
// =============================================================================

// Load Workflow Configurations
function loadWorkflowConfigurations() {
  // Initialize default configs if not exists
  Object.keys(LOAN_TYPES).forEach(loanType => {
    if (!workflowConfigs[loanType]) {
      workflowConfigs[loanType] = {
        stages: Object.keys(WORKFLOW_STAGES).reduce((acc, stage) => {
          acc[stage] = WORKFLOW_STAGES[stage].mandatory;
          return acc;
        }, {})
      };
    }
  });
}

// Render Workflow Configuration
function renderWorkflowConfig() {
  const bankEl = document.getElementById('workflowBank');
  const loanTypeEl = document.getElementById('workflowLoanType');
  const stagesContainer = document.getElementById('workflowStages');

  if (!bankEl || !loanTypeEl || !stagesContainer) return;

  const bankKey = bankEl.value;
  const loanTypeKey = loanTypeEl.value;

  if (!bankKey || !loanTypeKey) {
    stagesContainer.innerHTML = '<p style="color: #666; padding: 20px;">Please select both bank and loan type to configure workflow</p>';
    return;
  }

  // Get workflow stages for this bank and loan type
  const workflowStages = getWorkflowStages(bankKey, loanTypeKey);

  // Initialize workflow config if not exists
  const configKey = `${bankKey}_${loanTypeKey}`;
  if (!workflowConfigs[configKey]) {
    workflowConfigs[configKey] = {
      stages: workflowStages.reduce((acc, stage) => {
        acc[stage.key] = stage.required;
        return acc;
      }, {})
    };
  }

  stagesContainer.innerHTML = '';

  // Add bank and loan type header
  stagesContainer.innerHTML += `
    <div style="background: #f0f4ff; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
      <h4 style="margin: 0; color: #667eea;">${getBankName(bankKey)} - ${getLoanTypeDisplayName(bankKey, loanTypeKey)}</h4>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #666;">Configure workflow stages for this loan type</p>
    </div>
  `;

  workflowStages.forEach(stage => {
    const isEnabled = workflowConfigs[configKey].stages[stage.key] !== false;

    stagesContainer.innerHTML += `
      <div class="workflow-stage-item">
        <span>${stage.name} <small style="color: #999; font-weight: normal;">(${stage.role})</small></span>
        <div class="toggle-switch ${isEnabled ? 'active' : ''}"
             onclick="toggleWorkflowStage('${bankKey}', '${loanTypeKey}', '${stage.key}')"
             title="${stage.required ? 'Required stage' : 'Optional stage'}"></div>
      </div>
    `;
  });

  // Add save button
  stagesContainer.innerHTML += `
    <div style="margin-top: 20px; text-align: center;">
      <button class="btn btn-primary" onclick="saveWorkflowConfig('${bankKey}', '${loanTypeKey}')">
        <i class="bi bi-save me-2"></i>Save Workflow Configuration
      </button>
    </div>
  `;
}

// Toggle Workflow Stage
function toggleWorkflowStage(bankKey, loanTypeKey, stageKey) {
  const configKey = `${bankKey}_${loanTypeKey}`;

  if (!workflowConfigs[configKey]) {
    workflowConfigs[configKey] = { stages: {} };
  }

  const isEnabled = workflowConfigs[configKey].stages[stageKey] !== false;
  workflowConfigs[configKey].stages[stageKey] = !isEnabled;

  renderWorkflowConfig();
}

// Save Workflow Configuration
function saveWorkflowConfig(bankKey, loanTypeKey) {
  const configKey = `${bankKey}_${loanTypeKey}`;

  if (!workflowConfigs[configKey]) {
    showNotification('No configuration to save', 'warning');
    return;
  }

  // Here you would normally send this to a backend
  localStorage.setItem(`workflow_config_${configKey}`, JSON.stringify(workflowConfigs[configKey]));

  showNotification(`Workflow configuration saved for ${getBankName(bankKey)} - ${getLoanTypeDisplayName(bankKey, loanTypeKey)}`, 'success');
}

// Update Workflow Loan Types based on selected bank
function updateWorkflowLoanTypes() {
  const bankEl = document.getElementById('workflowBank');
  const loanTypeEl = document.getElementById('workflowLoanType');

  if (!bankEl || !loanTypeEl) return;

  const bankKey = bankEl.value;

  if (!bankKey || !BANK_LOAN_WORKFLOWS[bankKey]) {
    loanTypeEl.innerHTML = '<option value="">Select Bank First</option>';
    loanTypeEl.disabled = true;
    renderWorkflowConfig(); // Clear stages display
    return;
  }

  // Get loan types for this bank
  const bankLoanTypes = getBankLoanTypes(bankKey);

  loanTypeEl.innerHTML = '<option value="">Select Loan Type</option>';
  loanTypeEl.disabled = false;

  Object.keys(bankLoanTypes).forEach(loanTypeKey => {
    const loanType = bankLoanTypes[loanTypeKey];
    const option = document.createElement('option');
    option.value = loanTypeKey;
    option.textContent = loanType.displayName;
    loanTypeEl.appendChild(option);
  });
}

// Document Selection Functions
function selectDocuments() {
  if (!currentTask) return;

  const documentScreen = document.getElementById('documentScreen');
  const docTaskNumber = document.getElementById('docTaskNumber');
  const documentTitle = document.getElementById('documentTitle');
  const checkboxesContainer = document.getElementById('documentCheckboxes');
  const documentNextBtn = document.getElementById('documentNextBtn');
  const documentsCollectedBtn = document.getElementById('documentsCollectedBtn');

  docTaskNumber.textContent = currentTask.id;

  // Check if we're in document collection stage
  const isCollectionStage = currentTask.currentStage === 'DOCUMENT_COLLECTION';
  const hasSelectedDocuments = currentTask.documents && currentTask.documents.length > 0;
  const hasCompletedStage = currentTask.completedStages.includes('DOCUMENT_COLLECTION');

  // Initialize documents array if it doesn't exist
  if (!currentTask.documents) {
    currentTask.documents = [];
  }

  // Initialize document collection status
  if (!currentTask.documentCollection) {
    currentTask.documentCollection = {};
  }

  // Get document template for this loan type
  console.log('Loading documents for loan type:', currentTask.loanType);
  console.log('Available document templates:', Object.keys(DOCUMENT_TEMPLATES));
  const allDocuments = DOCUMENT_TEMPLATES[currentTask.loanType] || [];

  // If no documents found for this loan type, use a default set
  if (allDocuments.length === 0) {
    console.warn(`No document template found for loan type: ${currentTask.loanType}. Using default documents.`);
    // Use home-loan documents as default
    const defaultDocuments = DOCUMENT_TEMPLATES['home-loan'] || [
      { id: 'pan', name: 'PAN Card', required: true },
      { id: 'aadhaar', name: 'Aadhaar Card', required: true },
      { id: 'income-proof', name: 'Income Proof', required: true },
      { id: 'bank-statement', name: 'Bank Statement', required: true }
    ];
    allDocuments.push(...defaultDocuments);
  }

  console.log('Documents to display:', allDocuments);

  // Set title and button states
  documentTitle.textContent = 'Document Collection';
  // documentNextBtn.style.display = 'inline-flex';
  documentNextBtn.style.display = '';
  documentsCollectedBtn.style.display = 'none'; // Hide documents collected button initially

  if (!hasSelectedDocuments) {
    // PHASE 1: Document Requirement Selection
    documentTitle.textContent = 'Document Requirements';
    documentNextBtn.textContent = 'Done';
    documentNextBtn.disabled = false;
    documentNextBtn.onclick = saveDocumentSelection;

    // Show selection mode
    checkboxesContainer.classList.add('edit-mode');
    checkboxesContainer.style.display = 'block';

    // Show checkboxes for all documents (all are editable) using same design as collection
    checkboxesContainer.innerHTML = allDocuments.map(doc => {
      // Check if this document is already selected
      const isSelected = currentTask.documents.find(d => d.id === doc.id);
      return `
        <div class="document-status-item clickable" onclick="toggleDocCheckbox('doc-${doc.id}')">
          <div class="doc-info">
            <input type="checkbox" id="doc-${doc.id}" ${isSelected ? 'checked' : ''}
                   onchange="updateDocumentSelection('${doc.id}', this.checked)">
            <div>
              <div class="doc-name">
                ${doc.name} ${doc.required ? '<span class="doc-required"><sup>Suggested</sup></span>' : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Show the document screen
    documentScreen.classList.add('active');

  } else {
    // PHASE 2: Document Collection
    documentTitle.textContent = 'Document Collection';

    // Show collection mode
    checkboxesContainer.classList.remove('edit-mode');
    checkboxesContainer.style.display = 'block';

    // Show document collection interface with checkboxes to mark collected documents
    checkboxesContainer.innerHTML = `
      <div class="document-progress mb-3">
        <small class="text-muted">Document Collection Progress</small>
        <div class="progress mt-1" style="height: 8px;">
          <div class="progress-bar" role="progressbar" style="width: 0%" id="docProgressBar"></div>
        </div>
        <div class="mt-1">
          <small id="documentProgress">0/${currentTask.documents.length}</small> documents collected
        </div>
      </div>
      ${currentTask.documents.map(doc => {
        const isCollected = currentTask.documentCollection[doc.id] || false;
        return `
          <div class="document-status-item ${isCollected ? 'collected' : 'pending'} clickable" id="doc-status-${doc.id}"
               onclick="toggleDocumentCollection('${doc.id}', ${!isCollected})">
            <div class="doc-info">
              <input type="checkbox" ${isCollected ? 'checked' : ''}
                     onchange="event.stopPropagation(); toggleDocumentCollection('${doc.id}', this.checked)">
              <div class="doc-name">
                ${doc.name} ${doc.required ? '<span class="doc-required">*</span>' : ''}
              </div>
            </div>
            <div class="doc-status">
              <div class="doc-status-badge ${isCollected ? 'collected' : 'pending'}">
                ${isCollected ? '<i class="bi bi-check-circle-fill"></i> Collected' : 'Pending'}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    `;

    // Update progress
    const collectedDocs = Object.entries(currentTask.documentCollection).filter(([id, collected]) => collected).length;
    const totalDocs = currentTask.documents.length;
    const progressPercent = totalDocs > 0 ? (collectedDocs / totalDocs) * 100 : 0;

    document.getElementById('documentProgress').textContent = `${collectedDocs}/${totalDocs}`;
    const progressBar = document.getElementById('docProgressBar');
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    // Check if all REQUIRED documents are collected
    const requiredDocs = currentTask.documents.filter(doc => doc.required);
    const allRequiredCollected = requiredDocs.length === 0 || requiredDocs.every(doc =>
      currentTask.documentCollection[doc.id]
    );

    // Show/hide Documents Collected button based on collection status
    if (allRequiredCollected && !hasCompletedStage) {
      // documentsCollectedBtn.style.display = 'inline-flex';
      documentsCollectedBtn.style.display = '';
      documentNextBtn.style.display = 'none';
      // Don't show edit button when all docs are collected
      document.getElementById('editDocumentsBtn') && (document.getElementById('editDocumentsBtn').style.display = 'none');
    } else {
      documentsCollectedBtn.style.display = 'none';
      // documentNextBtn.style.display = 'inline-flex';
      documentNextBtn.style.display = '';
      documentNextBtn.textContent = 'Done';
      documentNextBtn.disabled = false;
      documentNextBtn.onclick = closeDocumentScreen;

      // Show Edit Documents button until all required docs are collected
      let editBtn = document.getElementById('editDocumentsBtn');
      if (!editBtn) {
        editBtn = document.createElement('button');
        editBtn.id = 'editDocumentsBtn';
        editBtn.className = 'btn btn-secondary me-2';
        editBtn.innerHTML = '<i class="bi bi-pencil-square me-1"></i>Edit Documents';
        editBtn.onclick = enterEditMode;
        documentNextBtn.parentNode.insertBefore(editBtn, documentNextBtn);
      }
      editBtn.style.display = '';
    }

    documentScreen.classList.add('active');
  }
}

// Save Document Selection
function saveDocumentSelection() {
  if (!currentTask) return;

  const checkboxes = document.querySelectorAll('#documentCheckboxes input[type="checkbox"]');
  const selectedDocs = [];

  checkboxes.forEach(checkbox => {
    const docId = checkbox.id.replace('doc-', '');
    const doc = DOCUMENT_TEMPLATES[currentTask.loanType].find(d => d.id === docId);
    if (checkbox.checked && doc) {
      selectedDocs.push(doc);
      // Initialize collection status for selected documents
      currentTask.documentCollection[docId] = false;
    }
  });

  // Validate that at least one document is selected
  if (selectedDocs.length === 0) {
    alert('Please select at least one document');
    return;
  }

  currentTask.documents = selectedDocs;
  saveToStorage();

  // Refresh the screen to show collection view
  selectDocuments();
}

// Toggle Document Collection
function toggleDocumentCollection(docId, isCollected) {
  if (!currentTask || !currentTask.documentCollection) return;

  currentTask.documentCollection[docId] = isCollected;
  saveToStorage();

  // Update UI - Refresh the entire document screen to show updated states
  selectDocuments();
}

// Mark Documents as Collected
function markDocumentsAsCollected() {
  if (!currentTask) return;

  // Mark document collection as complete
  if (!currentTask.completedStages.includes('DOCUMENT_COLLECTION')) {
    currentTask.completedStages.push('DOCUMENT_COLLECTION');
  }

  // Move to DATA_ENTRY stage
  currentTask.currentStage = 'DATA_ENTRY';
  currentTask.currentAssignee = getAssigneeForStage('DATA_ENTRY');

  // Add to history
  addToHistory('DOCUMENT_COLLECTION', 'All required documents collected');

  saveToStorage();
  renderTasks();

  // Show application number screen
  showApplicationNumberScreen();
}

// Complete Document Collection and Show Application Number
function completeDocumentCollectionAndShowAppNumber() {
  if (!currentTask) return;

  // Mark document collection as complete
  if (!currentTask.completedStages.includes('DOCUMENT_COLLECTION')) {
    currentTask.completedStages.push('DOCUMENT_COLLECTION');
  }

  saveToStorage();

  // Show application number screen
  showApplicationNumberScreen();
}

// Toggle Edit Mode
function toggleEditMode() {
  const checkboxesContainer = document.getElementById('documentCheckboxes');
  if (!checkboxesContainer) return;

  if (checkboxesContainer.classList.contains('edit-mode')) {
    // Moving FROM edit mode TO collection mode
    checkboxesContainer.classList.remove('edit-mode');

    // Refresh document screen to show collection mode
    selectDocuments();
  } else {
    // Moving FROM collection mode TO edit mode
    checkboxesContainer.style.display = 'block';
    checkboxesContainer.classList.add('edit-mode');
  }
}

// Toggle Document Checkbox
function toggleDocCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    // Trigger the onchange event
    checkbox.dispatchEvent(new Event('change'));
  }
}

// Enter Edit Mode
function enterEditMode() {
  if (!currentTask || !currentTask.documents) return;

  // Get all available documents for this loan type
  const allDocuments = DOCUMENT_TEMPLATES[currentTask.loanType] || [];
  const checkboxesContainer = document.getElementById('documentCheckboxes');

  // Show selection mode with pre-selected documents
  checkboxesContainer.classList.add('edit-mode');
  checkboxesContainer.style.display = 'block';

  // Update title
  document.getElementById('documentTitle').textContent = 'Edit Document Requirements';

  // Show all available documents with checkboxes
  checkboxesContainer.innerHTML = allDocuments.map(doc => {
    // Check if this document is currently selected
    const isSelected = currentTask.documents.find(d => d.id === doc.id);
    return `
      <div class="document-status-item clickable" onclick="toggleDocCheckbox('doc-${doc.id}')">
        <div class="doc-info">
          <input type="checkbox" id="doc-${doc.id}" ${isSelected ? 'checked' : ''}
                 onchange="updateDocumentSelection('${doc.id}', this.checked)">
          <div>
            <div class="doc-name">
              ${doc.name} ${doc.required ? '<span class="doc-required"><sup>Suggested</sup></span>' : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update button
  const documentNextBtn = document.getElementById('documentNextBtn');
  documentNextBtn.textContent = 'Update Documents';
  documentNextBtn.onclick = saveDocumentSelection;

  // Hide edit documents button
  const editBtn = document.getElementById('editDocumentsBtn');
  if (editBtn) {
    editBtn.style.display = 'none';
  }
}

// Update Document Selection (when checkbox is changed in edit mode)
function updateDocumentSelection(docId, isChecked) {
  const doc = DOCUMENT_TEMPLATES[currentTask.loanType].find(d => d.id === docId);

  if (isChecked && doc) {
    // Add to documents if not already there
    if (!currentTask.documents.find(d => d.id === docId)) {
      currentTask.documents.push(doc);
    }
    // Initialize collection status
    if (!(docId in currentTask.documentCollection)) {
      currentTask.documentCollection[docId] = false;
    }
  } else {
    // Remove from documents
    currentTask.documents = currentTask.documents.filter(d => d.id !== docId);
    // Remove collection status
    if (docId in currentTask.documentCollection) {
      delete currentTask.documentCollection[docId];
    }
  }

  saveToStorage();
}

// Handle Document Next Button
function handleDocumentNext() {
  if (!currentTask) return;

  // If current stage is INITIATION, move to DOCUMENT_COLLECTION
  if (currentTask.currentStage === 'INITIATION') {
    // Add to history
    addToHistory('INITIATION', 'Loan initiation completed');

    // Move to DOCUMENT_COLLECTION stage
    currentTask.currentStage = 'DOCUMENT_COLLECTION';
    // Keep the same assignee (loan advisor)
    currentTask.currentAssignee = currentTask.createdBy;

    saveToStorage();
    renderTasks();
  }

  // Close the screen and return to task detail
  closeDocumentScreen();
  openTaskDetail(currentTask.id);
}

// Close Document Screen
function closeDocumentScreen() {
  const documentScreen = document.getElementById('documentScreen');
  if (documentScreen) {
    documentScreen.classList.remove('active');
    // Reset UI
    const checkboxesContainer = document.getElementById('documentCheckboxes');
    if (checkboxesContainer) {
      checkboxesContainer.classList.remove('edit-mode');
      checkboxesContainer.style.display = 'block';
    }
    const documentNextBtn = document.getElementById('documentNextBtn');
    if (documentNextBtn) {
      documentNextBtn.textContent = 'Next';
      documentNextBtn.onclick = handleDocumentNext;
    }
  }
}

// Show Application Number Screen
function showApplicationNumberScreen() {
  if (!currentTask) return;

  const appNumberScreen = document.getElementById('applicationNumberScreen');
  const appTaskNumber = document.getElementById('appTaskNumber');
  const appNumberInput = document.getElementById('applicationNumberInput');
  const validationAlert = document.getElementById('validationAlert');

  appTaskNumber.textContent = currentTask.id;
  appNumberInput.value = currentTask.applicationNumber || '';

  // Clear any previous validation errors
  [appNumberInput, document.getElementById('bsmOsvAssignee'),
    document.getElementById('legalAssignee'),
    document.getElementById('technicalAssignee')].forEach(el => {
      el.classList.remove('is-invalid');
      hideValidationError(el);
    });
  validationAlert.classList.add('d-none');

  // Load assignment dropdowns
  loadAssignmentDropdowns();

  // Add event listeners for real-time validation clearing
  setupValidationListeners();

  // Close document screen first
  closeDocumentScreen();

  // Show application number screen
  appNumberScreen.classList.add('active');

  // Focus on input
  setTimeout(() => {
    appNumberInput.focus();
  }, 300);
}

// Setup validation listeners to clear errors on user input
function setupValidationListeners() {
  const appNumberInput = document.getElementById('applicationNumberInput');
  const bsmOsvSelect = document.getElementById('bsmOsvAssignee');
  const legalSelect = document.getElementById('legalAssignee');
  const technicalSelect = document.getElementById('technicalAssignee');

  // Clear validation on input
  appNumberInput.addEventListener('input', function () {
    if (this.value.trim() && /^[A-Z0-9]{3,}$/i.test(this.value.trim())) {
      this.classList.remove('is-invalid');
      hideValidationError(this);
    }
  });

  // Clear validation on blur (when clicking away)
  appNumberInput.addEventListener('blur', function () {
    if (this.value.trim() && /^[A-Z0-9]{3,}$/i.test(this.value.trim())) {
      this.classList.remove('is-invalid');
      hideValidationError(this);
    }
  });

  // Clear validation on select change
  [bsmOsvSelect, legalSelect, technicalSelect].forEach(select => {
    select.addEventListener('change', function () {
      if (this.value) {
        this.classList.remove('is-invalid');
        hideValidationError(this);
      }
    });
  });
}

// Close Application Number Screen
function closeApplicationNumberScreen() {
  const appNumberScreen = document.getElementById('applicationNumberScreen');
  if (appNumberScreen) {
    appNumberScreen.classList.remove('active');
  }
  // Only return to document screen if we have a current task
  if (currentTask) {
    selectDocuments();
  }
}

// Save Application Number and Assignments
function saveApplicationNumberAndAssignments() {
  if (!currentTask) return;

  // Get form elements
  const appNumberInput = document.getElementById('applicationNumberInput');
  const bsmOsvSelect = document.getElementById('bsmOsvAssignee');
  const legalSelect = document.getElementById('legalAssignee');
  const technicalSelect = document.getElementById('technicalAssignee');
  const validationAlert = document.getElementById('validationAlert');
  const validationErrorMessage = document.getElementById('validationErrorMessage');

  // Reset validation states
  [appNumberInput, bsmOsvSelect, legalSelect, technicalSelect].forEach(el => {
    el.classList.remove('is-invalid');
    hideValidationError(el);
  });
  validationAlert.classList.add('d-none');

  // Get values
  const appNumber = appNumberInput.value.trim();
  const bsmOsvAssignee = bsmOsvSelect.value;
  const legalAssignee = legalSelect.value;
  const technicalAssignee = technicalSelect.value;

  // Validation errors array
  const validationErrors = [];

  // Validate application number
  if (!appNumber) {
    appNumberInput.classList.add('is-invalid');
    validationErrors.push('Application number is required');
  } else if (!/^[A-Z0-9]{3,}$/.test(appNumber.toUpperCase())) {
    appNumberInput.classList.add('is-invalid');
    validationErrors.push('Application number must be at least 3 alphanumeric characters (e.g., HL20250113001 or APP123456)');
  }

  // Validate BSM OSV assignment (Required)
  if (!bsmOsvAssignee) {
    bsmOsvSelect.classList.add('is-invalid');
    validationErrors.push('Please assign a bank employee for BSM OSV');
  }

  // Legal and Technical assignments are now optional
  // Only validate if they are selected (but not required to be selected)

  // If there are validation errors, show them
  if (validationErrors.length > 0) {
    validationErrorMessage.innerHTML = validationErrors.map(error => `<div>• ${error}</div>`).join('');
    validationAlert.classList.remove('d-none');

    // Scroll to the first error
    const firstInvalid = document.querySelector('.is-invalid');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Show loading state
  const saveButton = event.target;
  const originalText = saveButton.innerHTML;
  saveButton.innerHTML = '<i class="bi bi-spinner-border-spin me-2"></i>Saving...';
  saveButton.disabled = true;

  // Simulate a small delay for better UX
  setTimeout(() => {
    // Save application number
    currentTask.applicationNumber = appNumber;
    currentTask.completedStages.push('DOCUMENT_COLLECTION');
    currentTask.completedStages.push('DATA_ENTRY');

    // Set the bank employee (BSM OSV assignee)
    currentTask.bankEmployee = bsmOsvAssignee;

    // Initialize parallel stages
    currentTask.parallelStages = {
      'BSM_OSV': {
        assignee: bsmOsvAssignee,
        status: 'pending',
        completed: false,
        queries: []
      }
    };

    // Add Legal stage only if assigned
    if (legalAssignee) {
      currentTask.parallelStages.LEGAL = {
        assignee: legalAssignee,
        status: 'pending',
        completed: false
      };
    }

    // Add Technical stage only if assigned
    if (technicalAssignee) {
      currentTask.parallelStages.TECHNICAL = {
        assignee: technicalAssignee,
        status: 'pending',
        completed: false
      };
    }

    // Move to parallel processing stage
    currentTask.currentStage = 'PARALLEL_PROCESSING';
    currentTask.currentAssignee = currentTask.createdBy; // Loan Advisor oversees

    addToHistory('DATA_ENTRY', `Application Number: ${appNumber}`);

    // Log which stages were initiated
    const initiatedStages = ['BSM OSV'];
    if (legalAssignee) initiatedStages.push('Legal');
    if (technicalAssignee) initiatedStages.push('Technical');
    addToHistory('PARALLEL_PROCESSING', `Initiated parallel processing: ${initiatedStages.join(', ')}`);

    saveToStorage();

    // Show success feedback
    validationAlert.className = 'alert alert-success';
    validationAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Assignments saved successfully!';
    validationAlert.classList.remove('d-none');

    // Reset button state
    saveButton.innerHTML = originalText;
    saveButton.disabled = false;

    // Close screens and open task detail after a short delay
    setTimeout(() => {
      closeApplicationNumberScreen();
      openTaskDetail(currentTask.id);

      // Refresh the page to update UI with new stage and parallel assignments
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  }, 500);
}

// Get User's Branch
function getUserBranch(user) {
  if (!user) return 'main';

  // For users with multiple branches (loan advisors, legal advisors, admins)
  if (user.branches && user.branches.length > 0) {
    return user.branches[0]; // Return first assigned branch
  }

  // For users with single branch (branch managers, office employees)
  if (user.branch) {
    return user.branch;
  }

  // Default fallback
  return 'main';
}

// Load Assignment Dropdowns
function loadAssignmentDropdowns() {
  if (!currentTask) return;

  const bsmOsvSelect = document.getElementById('bsmOsvAssignee');
  const legalSelect = document.getElementById('legalAssignee');
  const technicalSelect = document.getElementById('technicalAssignee');

  // Get current user's branch
  const currentUserBranch = getUserBranch(currentUser);

  // Load bank employees for BSM OSV (based on loan's bank, not branch)
  const bankEmployees = getUsersByRole('bank-employee', { bank: currentTask.bank });
  bsmOsvSelect.innerHTML = '<option value="">Select Bank Employee</option>';
  bankEmployees.forEach(user => {
    bsmOsvSelect.innerHTML += `<option value="${user.id}">${user.name} (${user.employeeId || user.id})</option>`;
  });

  // Load legal advisors (based on current user's branch)
  const legalAdvisors = getUsersByRole('legal-advisor', { branch: currentUserBranch });
  legalSelect.innerHTML = '<option value="">Select Legal Advisor</option>';
  legalAdvisors.forEach(user => {
    legalSelect.innerHTML += `<option value="${user.id}">${user.name}</option>`;
  });

  // Load branch manager (current user's branch manager)
  const branchManagers = getUsersByRole('branch-manager', { branch: currentUserBranch });
  technicalSelect.innerHTML = '<option value="">Select Branch Manager</option>';
  branchManagers.forEach(user => {
    const branchName = BRANCHES[user.branch]?.name || user.branch;
    technicalSelect.innerHTML += `<option value="${user.id}">${user.name} (${branchName})</option>`;
  });

  // Set default selections if available
  if (currentTask.bankEmployee) {
    bsmOsvSelect.value = currentTask.bankEmployee;
  }
}

// Application Number Input (for backward compatibility)
function showApplicationNumberInput() {
  showApplicationNumberScreen();
}

// =============================================================================
// PARALLEL STAGE FUNCTIONS
// =============================================================================

// BSM OSV Functions
function openBsmOsvScreen(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  currentTask = task;

  const bsmScreen = document.getElementById('bsmOsvScreen');
  const bsmTaskNumber = document.getElementById('bsmTaskNumber');
  const bsmCustomerName = document.getElementById('bsmCustomerName');
  const bsmLoanAmount = document.getElementById('bsmLoanAmount');

  bsmTaskNumber.textContent = task.id;
  bsmCustomerName.textContent = task.customerName;
  bsmLoanAmount.textContent = `₹${task.loanAmount.toLocaleString('en-IN')}`;

  // Check for active queries
  const bsmStage = task.parallelStages?.BSM_OSV;
  if (bsmStage && bsmStage.queries && bsmStage.queries.length > 0) {
    const activeQuery = bsmStage.queries.find(q => q.status === 'active');
    if (activeQuery) {
      // Show query section
      const querySection = document.getElementById('bsmQuerySection');
      const queryHistory = document.getElementById('bsmQueryHistory');
      const queryBtn = document.getElementById('bsmQueryBtn');
      const completeBtn = document.getElementById('bsmCompleteBtn');

      if (querySection && queryHistory) {
        querySection.style.display = 'block';
        queryHistory.innerHTML = `
          <div class="query-item">
            <div class="query-header">
              <strong>Query by ${activeQuery.raisedByName}</strong>
              <span class="text-muted">${formatDateTime(activeQuery.raisedAt)}</span>
            </div>
            <div class="query-text">${activeQuery.text}</div>
          </div>
        `;
      }

      if (queryBtn) queryBtn.style.display = 'none';
      if (completeBtn) completeBtn.style.display = 'none';
    }
  }

  // Show appropriate section based on user role
  if (currentUser.role === 'bank-employee' && bsmStage && bsmStage.assignee === currentUser.id) {
    document.getElementById('bsmActionSection').style.display = 'block';
    document.getElementById('bsmLoanAdvisorSection').style.display = 'none';
  } else if ((currentUser.role === 'loan-advisor' || currentUser.role === 'admin' || currentUser.role === 'super-admin') && bsmStage && bsmStage.queries && bsmStage.queries.some(q => q.status === 'active')) {
    document.getElementById('bsmActionSection').style.display = 'none';
    document.getElementById('bsmLoanAdvisorSection').style.display = 'block';
    loadBsmQueryHistory();
  }

  closeTaskDetail();
  bsmScreen.classList.add('active');
}

function closeBsmOsvScreen() {
  const bsmScreen = document.getElementById('bsmOsvScreen');
  if (bsmScreen) {
    bsmScreen.classList.remove('active');
  }
  // Don't open task detail when switching tabs
}

function completeBsmOsv() {
  if (!currentTask || !currentTask.parallelStages) return;

  const remarks = document.getElementById('bsmRemarks').value.trim();
  const remarksInput = document.getElementById('bsmRemarks');

  // Reset validation
  remarksInput.classList.remove('is-invalid');

  if (!remarks) {
    remarksInput.classList.add('is-invalid');
    // Show Bootstrap toast or alert
    showToast('Please enter remarks before completing BSM OSV', 'warning');
    return;
  }

  // Mark BSM OSV as completed
  currentTask.parallelStages.BSM_OSV.completed = true;
  currentTask.parallelStages.BSM_OSV.status = 'completed';
  currentTask.parallelStages.BSM_OSV.completedDate = new Date().toISOString();
  currentTask.parallelStages.BSM_OSV.remarks = remarks;

  addToHistory('BSM_OSV', 'BSM OSV completed');

  // Check if all parallel stages are completed
  checkParallelStageCompletion();

  saveToStorage();
  renderTasks();
  closeBsmOsvScreen();
}

// Show BSM OSV Query Modal
function showBsmQueryInput() {
  console.log('showBsmQueryInput called');
  const modal = document.getElementById('bsmQueryModal');
  const queryInput = document.getElementById('bsmQueryDetails');

  console.log('Modal element:', modal);
  console.log('Query input element:', queryInput);

  if (modal) {
    modal.style.display = 'block';
    console.log('Modal display set to block');
    if (queryInput) {
      queryInput.value = '';
      queryInput.classList.remove('is-invalid');
      setTimeout(() => queryInput.focus(), 100);
    }
  } else {
    console.error('BSM Query Modal not found!');
  }
}

// Direct BSM Query Input from task detail (without opening BSM screen)
function showBsmQueryInputDirect(taskId) {
  console.log('showBsmQueryInputDirect called for task:', taskId);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  currentTask = task;

  // Show the query modal directly
  const modal = document.getElementById('bsmQueryModal');
  const queryInput = document.getElementById('bsmQueryDetails');

  if (modal) {
    modal.style.display = 'block';
    if (queryInput) {
      queryInput.value = '';
      queryInput.classList.remove('is-invalid');
      setTimeout(() => queryInput.focus(), 100);
    }
  } else {
    console.error('BSM Query Modal not found!');
  }
}

// Close BSM Query Modal
function closeBsmQueryModal() {
  const modal = document.getElementById('bsmQueryModal');
  const queryInput = document.getElementById('bsmQueryDetails');

  if (modal) {
    modal.style.display = 'none';
  }

  if (queryInput) {
    queryInput.value = '';
    queryInput.classList.remove('is-invalid');
  }
}

// Submit BSM Query
function submitBsmQuery() {
  console.log('submitBsmQuery called');
  console.log('currentTask:', currentTask);

  // Try to find currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('bsmTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
      console.log('Found currentTask from screen:', currentTask);
    }
  }

  if (!currentTask) {
    console.error('No current task found');
    showToast('Error: No task loaded. Please open the task from the task list first.', 'error');
    return;
  }

  if (!currentTask.parallelStages) {
    console.error('Task has no parallel stages');
    showToast('Error: Task not in parallel processing stage', 'error');
    return;
  }

  const queryText = document.getElementById('bsmQueryDetails').value.trim();
  const queryInput = document.getElementById('bsmQueryDetails');

  console.log('Query text:', queryText);

  // Reset validation
  queryInput.classList.remove('is-invalid');

  if (!queryText) {
    queryInput.classList.add('is-invalid');
    showToast('Please enter query details', 'warning');
    return;
  }

  const query = {
    id: 'Q' + Date.now(),
    text: queryText,
    raisedBy: currentUser.id,
    raisedByName: currentUser.name,
    raisedAt: new Date().toISOString(),
    status: 'active',
    responses: []
  };

  // Add query to BSM OSV stage
  if (!currentTask.parallelStages.BSM_OSV.queries) {
    currentTask.parallelStages.BSM_OSV.queries = [];
  }
  currentTask.parallelStages.BSM_OSV.queries.push(query);

  // Update stage status
  currentTask.parallelStages.BSM_OSV.status = 'query';
  currentTask.parallelStages.BSM_OSV.queryRaised = true;
  currentTask.parallelStages.BSM_OSV.queryRaisedAt = new Date().toISOString();
  currentTask.parallelStages.BSM_OSV.queryRaisedBy = currentUser.id;

  // Update assignee to loan advisor
  currentTask.currentAssignee = currentTask.createdBy;

  addToHistory('BSM_OSV', `Query raised: ${queryText.substring(0, 100)}${queryText.length > 100 ? '...' : ''}`);

  // Send notification to loan advisor
  addNotification({
    taskId: currentTask.id,
    type: 'query',
    title: 'Query Raised',
    message: `BSM OSV query on ${currentTask.customerName}'s loan`,
    action: 'openTaskDetail',
    data: { taskId: currentTask.id }
  });

  saveToStorage();
  renderTasks();

  // Close modal and show success
  closeBsmQueryModal();
  showToast('Query sent successfully', 'success');

  // Refresh BSM OSV screen to show query status
  openBsmOsvScreen(currentTask.id);
}

// Raise BSM Query (now just shows the input form)
function raiseBsmQuery() {
  showBsmQueryInput();
}

function respondBsmQuery() {
  // Try to get currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('bsmTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
    }
  }

  if (!currentTask || !currentTask.parallelStages) {
    showToast('Error: No task loaded', 'error');
    return;
  }

  const responseInput = document.getElementById('bsmQueryResponse');
  const response = responseInput.value.trim();

  // Reset validation
  responseInput.classList.remove('is-invalid');

  if (!response) {
    responseInput.classList.add('is-invalid');
    showToast('Please enter your response', 'warning');
    return;
  }

  const bsmStage = currentTask.parallelStages.BSM_OSV;
  const activeQuery = bsmStage.queries.find(q => q.status === 'active');

  if (activeQuery) {
    activeQuery.responses.push({
      text: response,
      respondedBy: currentUser.id,
      respondedByName: currentUser.name,
      respondedAt: new Date().toISOString()
    });
    activeQuery.status = 'responded';
  }

  // Assign back to loan advisor
  currentTask.currentAssignee = currentTask.createdBy;

  addToHistory('BSM_OSV', `Query responded: ${response.substring(0, 50)}...`);

  saveToStorage();
  renderTasks();
  closeBsmOsvScreen();
}

function resolveBsmQueryAsLoanAdvisor() {
  console.log('resolveBsmQueryAsLoanAdvisor called');

  // Try to get currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('bsmTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
      console.log('Found currentTask from screen:', currentTask);
    }
  }

  if (!currentTask || !currentTask.parallelStages) {
    console.error('No current task or parallel stages');
    alert('Error: No task loaded');
    return;
  }

  const responseInput = document.getElementById('bsmLoanAdvisorResponse');
  console.log('Response input element:', responseInput);

  const response = responseInput ? responseInput.value.trim() : '';
  console.log('Response value:', response);

  if (!response) {
    if (responseInput) {
      responseInput.classList.add('is-invalid');
      showToast('Please enter your response', 'warning');
    } else {
      alert('Please enter your response');
    }
    return;
  }

  const bsmStage = currentTask.parallelStages.BSM_OSV;
  console.log('BSM Stage:', bsmStage);
  console.log('BSM Queries:', bsmStage.queries);

  const activeQuery = bsmStage.queries && bsmStage.queries.find(q => q.status === 'active');
  console.log('Active query found:', activeQuery);

  if (activeQuery) {
    console.log('Updating query with response:', response);
    activeQuery.status = 'resolved';
    activeQuery.resolvedBy = currentUser.id;
    activeQuery.resolvedByName = currentUser.name;
    activeQuery.resolvedAt = new Date().toISOString();
    activeQuery.response = response;
    console.log('Query updated:', activeQuery);
  } else {
    console.error('No active query found to resolve');
  }

  // Reset stage status
  bsmStage.status = 'pending';
  bsmStage.queryRaised = false;

  // Assign back to bank employee
  currentTask.currentAssignee = bsmStage.assignee;

  addToHistory('BSM_OSV', `Query resolved by loan advisor: ${response.substring(0, 50)}...`);

  console.log('Saving to storage...');
  saveToStorage();
  renderTasks();
  closeBsmOsvScreen();
  openTaskDetail(currentTask.id);
  showToast('Query resolved successfully', 'success');
}

function rejectLoanFromBsm() {
  if (!confirm('Are you sure you want to reject this loan? This action cannot be undone.')) {
    return;
  }

  currentTask.status = 'rejected';
  currentTask.rejectedAt = new Date().toISOString();
  currentTask.rejectedBy = currentUser.id;
  currentTask.rejectionReason = 'Rejected during BSM OSV query process';

  addToHistory('REJECTED', 'Loan rejected during BSM OSV process');

  saveToStorage();
  renderTasks();
  closeBsmOsvScreen();
}

// Legal Stage Functions
function openLegalScreen(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  currentTask = task;

  const legalScreen = document.getElementById('legalScreen');
  const legalTaskNumber = document.getElementById('legalTaskNumber');
  const legalCustomerName = document.getElementById('legalCustomerName');
  const legalLoanType = document.getElementById('legalLoanType');

  legalTaskNumber.textContent = task.id;
  legalCustomerName.textContent = task.customerName;
  legalLoanType.textContent = formatLoanType(task.loanType);

  closeTaskDetail();
  legalScreen.classList.add('active');
}

function closeLegalScreen() {
  const legalScreen = document.getElementById('legalScreen');
  if (legalScreen) {
    legalScreen.classList.remove('active');
  }
  // Don't open task detail when switching tabs
}

function completeLegal() {
  if (!currentTask || !currentTask.parallelStages) return;

  const remarks = document.getElementById('legalRemarks').value.trim();
  const remarksInput = document.getElementById('legalRemarks');

  // Reset validation
  remarksInput.classList.remove('is-invalid');

  if (!remarks) {
    remarksInput.classList.add('is-invalid');
    showToast('Please enter legal verification remarks', 'warning');
    return;
  }

  // Mark Legal as completed
  currentTask.parallelStages.LEGAL.completed = true;
  currentTask.parallelStages.LEGAL.status = 'completed';
  currentTask.parallelStages.LEGAL.completedDate = new Date().toISOString();
  currentTask.parallelStages.LEGAL.remarks = remarks;

  addToHistory('LEGAL', 'Legal verification completed');

  // Check if all parallel stages are completed
  checkParallelStageCompletion();

  saveToStorage();
  renderTasks();
  closeLegalScreen();
}

// Show Legal Query Modal
function showLegalQueryInput() {
  console.log('showLegalQueryInput called');
  const modal = document.getElementById('legalQueryModal');
  const queryInput = document.getElementById('legalQueryDetails');

  console.log('Modal element:', modal);
  console.log('Query input element:', queryInput);

  if (modal) {
    modal.style.display = 'block';
    console.log('Modal display set to block');
    if (queryInput) {
      queryInput.value = '';
      queryInput.classList.remove('is-invalid');
      setTimeout(() => queryInput.focus(), 100);
    }
  } else {
    console.error('Legal Query Modal not found!');
  }
}

// Close Legal Query Modal
function closeLegalQueryModal() {
  const modal = document.getElementById('legalQueryModal');
  const queryInput = document.getElementById('legalQueryDetails');

  if (modal) {
    modal.style.display = 'none';
  }

  if (queryInput) {
    queryInput.value = '';
    queryInput.classList.remove('is-invalid');
  }
}

// Submit Legal Query
function submitLegalQuery() {
  console.log('submitLegalQuery called');
  console.log('currentTask:', currentTask);

  // Try to find currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('legalTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
      console.log('Found currentTask from screen:', currentTask);
    }
  }

  if (!currentTask) {
    console.error('No current task found');
    showToast('Error: No task loaded. Please open the task from the task list first.', 'error');
    return;
  }

  if (!currentTask.parallelStages) {
    console.error('Task has no parallel stages');
    showToast('Error: Task not in parallel processing stage', 'error');
    return;
  }

  const queryText = document.getElementById('legalQueryDetails').value.trim();
  const queryInput = document.getElementById('legalQueryDetails');

  console.log('Query text:', queryText);

  // Reset validation
  queryInput.classList.remove('is-invalid');

  if (!queryText) {
    queryInput.classList.add('is-invalid');
    showToast('Please enter query details', 'warning');
    return;
  }

  const query = {
    id: 'Q' + Date.now(),
    text: queryText,
    raisedBy: currentUser.id,
    raisedByName: currentUser.name,
    raisedAt: new Date().toISOString(),
    status: 'active',
    responses: []
  };

  // Add query to Legal stage
  if (!currentTask.parallelStages.LEGAL.queries) {
    currentTask.parallelStages.LEGAL.queries = [];
  }
  currentTask.parallelStages.LEGAL.queries.push(query);

  // Update stage status
  currentTask.parallelStages.LEGAL.status = 'query';
  currentTask.parallelStages.LEGAL.queryRaised = true;
  currentTask.parallelStages.LEGAL.queryRaisedAt = new Date().toISOString();
  currentTask.parallelStages.LEGAL.queryRaisedBy = currentUser.id;

  // Update assignee to loan advisor
  currentTask.currentAssignee = currentTask.createdBy;

  addToHistory('LEGAL', `Query raised: ${queryText.substring(0, 100)}${queryText.length > 100 ? '...' : ''}`);

  // Send notification to loan advisor
  addNotification({
    taskId: currentTask.id,
    type: 'query',
    title: 'Legal Query Raised',
    message: `Legal verification query on ${currentTask.customerName}'s loan`,
    action: 'openTaskDetail',
    data: { taskId: currentTask.id }
  });

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();

  // Close modal and show success
  closeLegalQueryModal();
  showToast('Query sent successfully', 'success');

  // Refresh Legal screen to show query status
  openLegalScreen(currentTask.id);
}

// Respond to Legal Query
function respondLegalQuery() {
  // Try to get currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('legalTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
    }
  }

  if (!currentTask || !currentTask.parallelStages) {
    showToast('Error: No task loaded', 'error');
    return;
  }

  const responseInput = document.getElementById('legalQueryResponse');
  const response = responseInput.value.trim();

  // Reset validation
  responseInput.classList.remove('is-invalid');

  if (!response) {
    responseInput.classList.add('is-invalid');
    showToast('Please enter your response', 'warning');
    return;
  }

  // Add response to the latest query
  const legalStage = currentTask.parallelStages.LEGAL;
  if (legalStage.queries && legalStage.queries.length > 0) {
    const latestQuery = legalStage.queries[legalStage.queries.length - 1];
    latestQuery.responses.push({
      text: response,
      respondedBy: currentUser.id,
      respondedByName: currentUser.name,
      respondedAt: new Date().toISOString()
    });
    latestQuery.status = 'resolved';
  }

  // Update stage status
  legalStage.status = 'pending';
  legalStage.queryRaised = false;

  // Return assignee to legal advisor
  const legalAssignee = getEmployeeForRole('legal-advisor', currentTask.bank);
  currentTask.currentAssignee = legalAssignee;
  legalStage.assignee = legalAssignee;

  addToHistory('LEGAL', `Query responded: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`);

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();
  showToast('Query response sent', 'success');

  // Refresh Legal screen
  openLegalScreen(currentTask.id);
}

// Resolve Legal Query as Loan Advisor
function resolveLegalQueryAsLoanAdvisor() {
  // Try to get currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('legalTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
    }
  }

  if (!currentTask || !currentTask.parallelStages) {
    alert('Error: No task loaded');
    return;
  }

  const responseInput = document.getElementById('legalLoanAdvisorResponse');
  const response = responseInput ? responseInput.value.trim() : '';

  if (responseInput) {
    responseInput.classList.remove('is-invalid');
  }

  if (!response) {
    if (responseInput) {
      responseInput.classList.add('is-invalid');
      showToast('Please enter your response', 'warning');
    } else {
      alert('Please enter your response');
    }
    return;
  }

  const legalStage = currentTask.parallelStages.LEGAL;

  // Mark query as resolved and return to legal advisor
  if (legalStage.queries && legalStage.queries.length > 0) {
    const activeQuery = legalStage.queries.find(q => q.status === 'active');
    if (activeQuery) {
      activeQuery.status = 'resolved';
      activeQuery.resolvedAt = new Date().toISOString();
      activeQuery.response = response;
      activeQuery.resolvedBy = currentUser.id;
      activeQuery.resolvedByName = currentUser.name;
    }
  }

  legalStage.status = 'pending';
  legalStage.queryRaised = false;

  // Return assignee to legal advisor
  const legalAssignee = getEmployeeForRole('legal-advisor', currentTask.bank);
  currentTask.currentAssignee = legalAssignee;
  legalStage.assignee = legalAssignee;

  addToHistory('LEGAL', 'Query resolved by loan advisor');

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();
  showToast('Query resolved and returned to Legal Advisor', 'success');

  // Refresh screen
  closeLegalScreen();
  openTaskDetail(currentTask.id);
}

function rejectLegal() {
  if (!currentTask || !currentTask.parallelStages) return;

  if (!confirm('Are you sure you want to reject the legal verification? This will reject the loan application.')) {
    return;
  }

  currentTask.status = 'rejected';
  currentTask.rejectedAt = new Date().toISOString();
  currentTask.rejectedBy = currentUser.id;
  currentTask.rejectedStage = 'LEGAL';

  addToHistory('LEGAL', 'Legal verification rejected');

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();
  showToast('Legal verification rejected. Loan rejected.', 'error');
  closeLegalScreen();
}

// Technical Stage Functions
function openTechnicalScreen(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) {
    showToast('Task not found', 'error');
    return;
  }

  // Save currentTask before closing task detail
  const savedCurrentTask = currentTask;

  const techScreen = document.getElementById('technicalScreen');
  if (techScreen) {
    closeTaskDetail();
    // Restore currentTask after closeTaskDetail clears it
    currentTask = task;
  } else {
    currentTask = task;
  }

  const techTaskNumber = document.getElementById('technicalTaskNumber');
  const techRequestedAmount = document.getElementById('techRequestedAmount');
  const techPropertyType = document.getElementById('techPropertyType');

  techTaskNumber.textContent = task.id;
  techRequestedAmount.textContent = `₹${task.loanAmount.toLocaleString('en-IN')}`;
  techPropertyType.textContent = getPropertyType(task.loanType);

  // Show/hide buttons based on user role
  const queryBtn = document.getElementById('technicalQueryBtn');
  const rejectBtn = document.querySelector('button[onclick="rejectValuation()"]');
  const completeBtn = document.querySelector('button[onclick="completeValuation()"]');

  if (currentUser.role === 'branch-manager') {
    // Branch Manager can only raise query and complete valuation
    if (queryBtn) queryBtn.style.display = 'inline-block';
    if (rejectBtn) rejectBtn.style.display = 'none';
    if (completeBtn) completeBtn.style.display = 'inline-block';
  } else if (currentUser.role === 'admin' || currentUser.role === 'super-admin') {
    // Admin/Super Admin can do everything
    if (queryBtn) queryBtn.style.display = 'inline-block';
    if (rejectBtn) rejectBtn.style.display = 'inline-block';
    if (completeBtn) completeBtn.style.display = 'inline-block';
  }

  techScreen.classList.add('active');
}

function closeTechnicalScreen() {
  const techScreen = document.getElementById('technicalScreen');
  if (techScreen) {
    techScreen.classList.remove('active');
  }
  // Don't open task detail when switching tabs
}

function completeValuation() {
  if (!currentTask) {
    showToast('No task selected', 'error');
    return;
  }

  const valuationInput = document.getElementById('valuationAmount');
  const remarksInput = document.getElementById('technicalRemarks');

  if (!valuationInput) {
    showToast('Valuation input field not found', 'error');
    return;
  }

  const valuationAmount = parseFloat(valuationInput.value);
  const remarks = remarksInput ? remarksInput.value.trim() : '';

  // Reset validation
  valuationInput.classList.remove('is-invalid');
  valuationInput.setCustomValidity('');

  // Validate valuation amount
  if (!valuationAmount || valuationAmount <= 0 || isNaN(valuationAmount)) {
    valuationInput.classList.add('is-invalid');
    valuationInput.setCustomValidity('Please enter a valid valuation amount greater than 0');
    showToast('Please enter a valid valuation amount', 'error');
    valuationInput.focus();
    return;
  }

  // Initialize parallel stages if it doesn't exist
  if (!currentTask.parallelStages) {
    currentTask.parallelStages = {};
  }
  if (!currentTask.parallelStages.TECHNICAL) {
    currentTask.parallelStages.TECHNICAL = {};
  }

  // Mark Technical as completed
  currentTask.parallelStages.TECHNICAL.completed = true;
  currentTask.parallelStages.TECHNICAL.status = 'completed';
  currentTask.parallelStages.TECHNICAL.completedDate = new Date().toISOString();
  currentTask.parallelStages.TECHNICAL.valuationAmount = valuationAmount;
  currentTask.parallelStages.TECHNICAL.remarks = remarks;
  currentTask.parallelStages.TECHNICAL.completedBy = currentUser.id;

  // Save valuation amount to task for display everywhere
  currentTask.valuation = valuationAmount;

  // Add to history
  addToHistory('TECHNICAL', `Technical valuation completed: ₹${valuationAmount.toLocaleString('en-IN')}`);
  currentTask.updatedAt = new Date().toISOString();

  // Check if all parallel stages are completed
  checkParallelStageCompletion();

  // Save and refresh
  saveToStorage();
  renderTasks();

  showToast('Valuation completed successfully', 'success');
  closeTechnicalScreen();

  // Reopen task detail to show updated valuation
  openTaskDetail(currentTask.id);
}

function rejectValuation() {
  if (!confirm('Are you sure you want to reject this valuation? This will reject the entire loan application.')) {
    return;
  }

  currentTask.status = 'rejected';
  currentTask.rejectedAt = new Date().toISOString();
  currentTask.rejectedBy = currentUser.id;
  currentTask.rejectionReason = 'Technical valuation rejected';

  addToHistory('REJECTED', 'Loan rejected - Technical valuation failed');
  currentTask.updatedAt = new Date().toISOString();

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();
  closeTechnicalScreen();
}

// Show Technical Query Modal
function showTechnicalQueryInput() {
  console.log('showTechnicalQueryInput called');
  const modal = document.getElementById('technicalQueryModal');
  const queryInput = document.getElementById('technicalQueryDetails');

  console.log('Modal element:', modal);
  console.log('Query input element:', queryInput);

  if (modal) {
    modal.style.display = 'block';
    console.log('Modal display set to block');
    if (queryInput) {
      queryInput.value = '';
      queryInput.classList.remove('is-invalid');
      setTimeout(() => queryInput.focus(), 100);
    }
  } else {
    console.error('Technical Query Modal not found!');
  }
}

// Direct Technical Query Input from task detail (without opening Technical screen)
function showTechnicalQueryInputDirect(taskId) {
  console.log('showTechnicalQueryInputDirect called for task:', taskId);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  currentTask = task;

  // Show the query modal directly
  const modal = document.getElementById('technicalQueryModal');
  const queryInput = document.getElementById('technicalQueryDetails');

  if (modal) {
    modal.style.display = 'block';
    if (queryInput) {
      queryInput.value = '';
      queryInput.classList.remove('is-invalid');
      setTimeout(() => queryInput.focus(), 100);
    }
  } else {
    console.error('Technical Query Modal not found!');
  }
}

// Close Technical Query Modal
function closeTechnicalQueryModal() {
  const modal = document.getElementById('technicalQueryModal');
  const queryInput = document.getElementById('technicalQueryDetails');

  if (modal) {
    modal.style.display = 'none';
  }

  if (queryInput) {
    queryInput.value = '';
    queryInput.classList.remove('is-invalid');
  }
}

// Submit Technical Query
function submitTechnicalQuery() {
  console.log('submitTechnicalQuery called');
  console.log('currentTask:', currentTask);

  // Try to find currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('technicalTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
      console.log('Found currentTask from screen:', currentTask);
    }
  }

  if (!currentTask) {
    console.error('No current task found');
    showToast('Error: No task loaded. Please open the task from the task list first.', 'error');
    return;
  }

  if (!currentTask.parallelStages) {
    console.error('Task has no parallel stages');
    showToast('Error: Task not in parallel processing stage', 'error');
    return;
  }

  const queryText = document.getElementById('technicalQueryDetails').value.trim();
  const queryInput = document.getElementById('technicalQueryDetails');

  console.log('Query text:', queryText);

  // Reset validation
  queryInput.classList.remove('is-invalid');

  if (!queryText) {
    queryInput.classList.add('is-invalid');
    showToast('Please enter query details', 'warning');
    return;
  }

  const query = {
    id: 'Q' + Date.now(),
    text: queryText,
    raisedBy: currentUser.id,
    raisedByName: currentUser.name,
    raisedAt: new Date().toISOString(),
    status: 'active',
    responses: []
  };

  // Add query to Technical stage
  if (!currentTask.parallelStages.TECHNICAL.queries) {
    currentTask.parallelStages.TECHNICAL.queries = [];
  }
  currentTask.parallelStages.TECHNICAL.queries.push(query);

  // Update stage status
  currentTask.parallelStages.TECHNICAL.status = 'query';
  currentTask.parallelStages.TECHNICAL.queryRaised = true;
  currentTask.parallelStages.TECHNICAL.queryRaisedAt = new Date().toISOString();
  currentTask.parallelStages.TECHNICAL.queryRaisedBy = currentUser.id;

  // Update assignee to loan advisor
  currentTask.currentAssignee = currentTask.createdBy;

  addToHistory('TECHNICAL', `Query raised: ${queryText.substring(0, 100)}${queryText.length > 100 ? '...' : ''}`);

  // Send notification to loan advisor
  addNotification({
    taskId: currentTask.id,
    type: 'query',
    title: 'Technical Query Raised',
    message: `Technical valuation query on ${currentTask.customerName}'s loan`,
    action: 'openTaskDetail',
    data: { taskId: currentTask.id }
  });

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();

  // Close modal and show success
  closeTechnicalQueryModal();
  showToast('Query sent successfully', 'success');

  // Refresh Technical screen to show query status
  openTechnicalScreen(currentTask.id);
}

// Respond to Technical Query
function respondTechnicalQuery() {
  // Try to get currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('technicalTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
    }
  }

  if (!currentTask || !currentTask.parallelStages) {
    showToast('Error: No task loaded', 'error');
    return;
  }

  const responseInput = document.getElementById('technicalQueryResponse');
  const response = responseInput.value.trim();

  // Reset validation
  responseInput.classList.remove('is-invalid');

  if (!response) {
    responseInput.classList.add('is-invalid');
    showToast('Please enter your response', 'warning');
    return;
  }

  // Add response to the latest query
  const technicalStage = currentTask.parallelStages.TECHNICAL;
  if (technicalStage.queries && technicalStage.queries.length > 0) {
    const latestQuery = technicalStage.queries[technicalStage.queries.length - 1];
    latestQuery.responses.push({
      text: response,
      respondedBy: currentUser.id,
      respondedByName: currentUser.name,
      respondedAt: new Date().toISOString()
    });
    latestQuery.status = 'resolved';
  }

  // Update stage status
  technicalStage.status = 'pending';
  technicalStage.queryRaised = false;

  // Return assignee to branch manager (who handles technical valuation)
  const branchManager = getEmployeeForRole('branch-manager', currentTask.bank);
  currentTask.currentAssignee = branchManager;
  technicalStage.assignee = branchManager;

  addToHistory('TECHNICAL', `Query responded: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`);

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();
  showToast('Query response sent', 'success');

  // Refresh Technical screen
  openTechnicalScreen(currentTask.id);
}

// Resolve Technical Query as Loan Advisor
function resolveTechnicalQueryAsLoanAdvisor() {
  // Try to get currentTask if not set
  if (!currentTask) {
    // Try to get it from the currently displayed screen
    const taskNumberElement = document.getElementById('technicalTaskNumber');
    if (taskNumberElement) {
      const taskNumber = taskNumberElement.textContent;
      currentTask = tasks.find(t => t.id === taskNumber);
    }
  }

  if (!currentTask || !currentTask.parallelStages) {
    alert('Error: No task loaded');
    return;
  }

  const responseInput = document.getElementById('technicalLoanAdvisorResponse');
  const response = responseInput ? responseInput.value.trim() : '';

  if (responseInput) {
    responseInput.classList.remove('is-invalid');
  }

  if (!response) {
    if (responseInput) {
      responseInput.classList.add('is-invalid');
      showToast('Please enter your response', 'warning');
    } else {
      alert('Please enter your response');
    }
    return;
  }

  const technicalStage = currentTask.parallelStages.TECHNICAL;

  // Mark query as resolved and return to branch manager
  if (technicalStage.queries && technicalStage.queries.length > 0) {
    const activeQuery = technicalStage.queries.find(q => q.status === 'active');
    if (activeQuery) {
      activeQuery.status = 'resolved';
      activeQuery.resolvedAt = new Date().toISOString();
      activeQuery.response = response;
      activeQuery.resolvedBy = currentUser.id;
      activeQuery.resolvedByName = currentUser.name;
    }
  }

  technicalStage.status = 'pending';
  technicalStage.queryRaised = false;

  // Return assignee to branch manager
  const branchManager = getEmployeeForRole('branch-manager', currentTask.bank);
  currentTask.currentAssignee = branchManager;
  technicalStage.assignee = branchManager;

  addToHistory('TECHNICAL', 'Query resolved by loan advisor');

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  saveToStorage();
  renderTasks();
  showToast('Query resolved and returned to Branch Manager', 'success');

  // Refresh screen
  closeTechnicalScreen();
  openTaskDetail(currentTask.id);
}

// Check Parallel Stages Completion
function checkParallelStagesCompletion() {
  if (!currentTask || !currentTask.parallelStages) return;

  const stages = ['BSM_OSV', 'LEGAL', 'TECHNICAL'];
  const completedStages = stages.filter(stage => {
    const stageData = currentTask.parallelStages[stage];
    if (!stageData) return false;

    // Handle both object and string structures
    if (typeof stageData === 'object' && stageData !== null) {
      // New structure with object
      return stageData.completed || stageData.status === 'completed';
    }
    // Old structure - check if stage is in completedStages array
    return currentTask.completedStages && currentTask.completedStages.includes(stage);
  });

  // If any stage is completed, move to Rate & PF stage
  if (completedStages.length > 0 && currentTask.currentStage === 'PARALLEL_PROCESSING') {
    currentTask.currentStage = 'RATE_PF';
    currentTask.currentAssignee = currentTask.createdBy; // Back to Loan Advisor
    currentTask.parallelCompletedStages = completedStages;

    addToHistory('RATE_PF', `Parallel stages completed: ${completedStages.join(', ')}`);
  }
}

// Helper Functions
function showBsmQuerySection(query) {
  document.getElementById('bsmQuerySection').style.display = 'block';
  document.getElementById('bsmActionSection').style.display = 'none';

  // Display query history
  const queryHistory = document.getElementById('bsmQueryHistory');
  queryHistory.innerHTML = `
    <div class="query-message query">
      <strong>Query:</strong> ${query.text}
      <div class="query-meta">Raised by ${query.raisedByName} on ${formatDate(query.raisedAt)}</div>
    </div>
  `;

  query.responses.forEach(response => {
    queryHistory.innerHTML += `
      <div class="query-message response">
        <strong>Response:</strong> ${response.text}
        <div class="query-meta">By ${response.respondedByName} on ${formatDate(response.respondedAt)}</div>
      </div>
    `;
  });
}

function loadBsmQueryHistory() {
  if (!currentTask || !currentTask.parallelStages) return;

  const bsmStage = currentTask.parallelStages.BSM_OSV;
  const activeQuery = bsmStage.queries.find(q => q.status === 'responded');

  if (!activeQuery) return;

  const queryHistory = document.getElementById('bsmLoanQueryHistory');
  queryHistory.innerHTML = `
    <div class="query-message query">
      <strong>Query:</strong> ${activeQuery.text}
      <div class="query-meta">Raised by ${activeQuery.raisedByName} on ${formatDate(activeQuery.raisedAt)}</div>
    </div>
  `;

  activeQuery.responses.forEach(response => {
    queryHistory.innerHTML += `
      <div class="query-message response">
        <strong>Response:</strong> ${response.text}
        <div class="query-meta">By ${response.respondedByName} on ${formatDate(response.respondedAt)}</div>
      </div>
    `;
  });
}

function formatLoanType(type) {
  const types = {
    'home-loan': 'Home Loan',
    'personal-loan': 'Personal Loan',
    'business-loan': 'Business Loan',
    'vehicle-loan': 'Vehicle Loan',
    'education-loan': 'Education Loan',
    'lap': 'Loan Against Property'
  };
  return types[type] || type;
}

function getPropertyType(loanType) {
  if (loanType === 'home-loan' || loanType === 'lap') return 'Property';
  if (loanType === 'vehicle-loan') return 'Vehicle';
  return 'Asset';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// User Helper Functions
function getUsersById(userId) {
  const users = typeof USERS !== 'undefined' ? USERS : {};
  return users[userId];
}

// Toast Helper Function
function showToast(message, type = 'info') {
  // Check if toast container exists, if not create one
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type === 'error' ? 'danger' : type === 'warning' ? 'warning' : type === 'success' ? 'success' : 'primary'} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  // Initialize Bootstrap toast
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  // Remove from DOM after hidden
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}

function getUsersByRole(role, filters = {}) {
  const users = typeof USERS !== 'undefined' ? USERS : {};
  const { bank, branch, includeAll = false } = filters;

  return Object.values(users).filter(user => {
    // Check role match
    if (user.role !== role) return false;

    // If includeAll is true (for admins/super-admins), return all users of this role
    if (includeAll) return true;

    // For loan advisors and legal advisors - check branch assignment
    if (role === 'loan-advisor' || role === 'legal-advisor' || role === 'admin' || role === 'super-admin') {
      if (branch && user.branches && !user.branches.includes(branch)) {
        return false;
      }
    }

    // For branch managers and office employees - check single branch assignment
    if (role === 'branch-manager' || role === 'office-employee') {
      if (branch && user.branch && user.branch !== branch) {
        return false;
      }
    }

    // For bank employees - check bank assignment (not branch)
    if (role === 'bank-employee') {
      if (bank && user.bank && user.bank !== bank) {
        return false;
      }
      // Don't filter by branch for bank employees
    }

    return true;
  });
}

// Check Approval Permission
function checkApprovalPermission(stage, userRole) {
  // Define role permissions for each stage
  const stagePermissions = {
    'INITIATION': ['loan-advisor', 'admin', 'super-admin', 'branch-manager'],
    'DOCUMENT_COLLECTION': ['loan-advisor', 'admin', 'super-admin', 'branch-manager'],
    'DATA_ENTRY': ['loan-advisor', 'admin', 'super-admin', 'branch-manager'],
    'BSM_OSV': ['bank-employee', 'admin', 'super-admin'],  // Only bank employee, admin, or super-admin
    'LEGAL': ['legal-advisor', 'admin', 'super-admin'],      // Only legal advisor, admin, or super-admin
    'TECHNICAL': ['branch-manager', 'admin', 'super-admin'], // Only branch manager, admin, or super-admin
    'RATE_PF': ['loan-advisor', 'bank-employee', 'admin', 'super-admin', 'branch-manager'],
    'SANCTION_LETTER': ['loan-advisor', 'bank-employee', 'admin', 'super-admin', 'branch-manager'],
    'DOCKET_LOGIN': ['office-employee', 'admin', 'super-admin', 'branch-manager'],
    'KFS_GENERATION': ['office-employee', 'loan-advisor', 'admin', 'super-admin', 'branch-manager'],
    'ECS_ESIGN': ['bank-employee', 'loan-advisor', 'admin', 'super-admin', 'branch-manager'],
    'DISBURSEMENT': ['loan-advisor', 'admin', 'super-admin', 'branch-manager']
  };

  const allowedRoles = stagePermissions[stage] || [];
  return allowedRoles.includes(userRole);
}

// Approve Stage
function approveStage(stage) {
  if (!currentTask) return;

  // Check if user has permission to approve this stage
  const stageConfig = WORKFLOW_STAGES[stage];
  if (!stageConfig) {
    showToast('Invalid stage configuration', 'error');
    return;
  }

  // Role-based permission check
  const canApprove = checkApprovalPermission(stage, currentUser.role);
  if (!canApprove) {
    showToast(`You don't have permission to approve ${stageConfig.name || stage} tasks`, 'error');
    return;
  }

  // Check if task is assigned to current user (except for branch managers who can override)
  if (currentUser.role !== 'branch-manager' &&
    currentUser.role !== 'admin' &&
    currentUser.role !== 'super-admin' &&
    currentTask.currentAssignee !== currentUser.id) {
    showToast('You can only approve tasks assigned to you', 'error');
    return;
  }

  // Handle parallel stages
  if (WORKFLOW_STAGES[stage].parallel) {
    // Mark this parallel stage as complete
    if (!currentTask.completedParallelStages) {
      currentTask.completedParallelStages = [];
    }
    currentTask.completedParallelStages.push(stage);

    // Check if all parallel stages are complete
    const parallelStages = Object.entries(WORKFLOW_STAGES)
      .filter(([key, s]) => s.order === WORKFLOW_STAGES[stage].order)
      .map(([key]) => key);

    const allCompleted = parallelStages.every(s =>
      currentTask.completedParallelStages.includes(s)
    );

    if (allCompleted) {
      // Add all parallel stages to completed
      currentTask.completedStages.push(...parallelStages);
      currentTask.currentStage = getNextStage(stage);
      currentTask.currentAssignee = getAssigneeForStage(currentTask.currentStage);
    }
  } else {
    currentTask.completedStages.push(stage);
    currentTask.currentStage = getNextStage(stage);
    currentTask.currentAssignee = getAssigneeForStage(currentTask.currentStage);
  }

  addToHistory(stage, 'Approved');
  currentTask.updatedAt = new Date().toISOString();
  saveToStorage();
  renderTasks();
  openTaskDetail(currentTask.id);
}

// Approve Parallel Stage
function approveParallelStage(stageKey) {
  if (!currentTask || !currentTask.parallelStages) return;

  // Check if user has permission to approve this stage
  const stageData = currentTask.parallelStages[stageKey];
  if (!stageData) {
    showToast('Invalid parallel stage', 'error');
    return;
  }

  // Get assignee ID (handle both object and string structures)
  const assigneeId = typeof stageData === 'object' ? stageData.assignee : stageData;

  // Check permissions
  const canOverride = currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin';

  if (assigneeId !== currentUser.id && !canOverride) {
    showToast('You can only approve stages assigned to you', 'error');
    return;
  }

  // Mark the parallel stage as completed
  if (typeof stageData === 'object') {
    stageData.completed = true;
    stageData.status = 'completed';
    stageData.completedAt = new Date().toISOString();
    stageData.completedBy = currentUser.id;
  } else {
    // Convert to object structure
    currentTask.parallelStages[stageKey] = {
      assignee: stageData,
      status: 'completed',
      completed: true,
      completedAt: new Date().toISOString(),
      completedBy: currentUser.id
    };
  }

  // Add to completed stages
  if (!currentTask.completedStages.includes(stageKey)) {
    currentTask.completedStages.push(stageKey);
  }

  addToHistory(stageKey, `Approved by ${currentUser.name}`);
  currentTask.updatedAt = new Date().toISOString();

  // Check if all parallel stages are completed
  checkParallelStageCompletion();

  saveToStorage();
  renderTasks();
  openTaskDetail(currentTask.id);
}

// Check if all parallel stages are completed and move to next stage
function checkParallelStageCompletion() {
  if (!currentTask || !currentTask.parallelStages) return;

  // Get only the stages that were actually assigned
  const assignedStages = Object.keys(currentTask.parallelStages);

  // All assigned parallel stages must be completed
  const allCompleted = assignedStages.every(stage => {
    const stageData = currentTask.parallelStages[stage];
    if (!stageData) return false;

    if (typeof stageData === 'object') {
      return stageData.completed === true || stageData.status === 'completed';
    } else {
      // Old structure - check completedStages array
      return currentTask.completedStages.includes(stage);
    }
  });

  if (allCompleted) {
    // All parallel stages completed, move to next stage
    showToast('All parallel stages completed! Moving to Rate & PF stage.', 'success');

    // Add to history
    addToHistory('PARALLEL_PROCESSING', 'All parallel stages completed');

    // Since PARALLEL_PROCESSING is not in the workflow stages, we need to find
    // the stage that comes after DATA_ENTRY (which is RATE_PF)
    // Get the workflow for the current task's bank and loan type
    const bankWorkflow = BANK_LOAN_WORKFLOWS[currentTask.bank];
    const loanWorkflow = bankWorkflow ? bankWorkflow.loanTypes[currentTask.loanType] : null;
    const stages = loanWorkflow ? loanWorkflow.stages : Object.entries(WORKFLOW_STAGES)
      .sort((a, b) => a[1].order - b[1].order)
      .map(([key]) => key);

    const dataEntryIndex = stages.indexOf('DATA_ENTRY');

    if (dataEntryIndex !== -1 && dataEntryIndex < stages.length - 1) {
      // Move to RATE_PF stage
      currentTask.currentStage = 'RATE_PF';
      currentTask.currentAssignee = currentTask.createdBy; // Back to loan advisor
    } else {
      // Fallback - move to COMPLETED
      currentTask.currentStage = 'COMPLETED';
      currentTask.status = 'completed';
      currentTask.completedAt = new Date().toISOString();
    }

    saveToStorage();
    renderTasks();

    // If we have the task detail screen open, refresh it
    if (document.getElementById('taskDetailScreen').classList.contains('active')) {
      openTaskDetail(currentTask.id);
    }
  }
}

// Reject Parallel Stage
function rejectParallelStage(stageKey) {
  if (!currentTask || !currentTask.parallelStages) return;

  const reason = prompt(`Enter rejection reason for ${stageKey}:`);
  if (!reason) return;

  // Get stage data
  const stageData = currentTask.parallelStages[stageKey];
  const assigneeId = typeof stageData === 'object' ? stageData.assignee : stageData;

  // Check permissions
  const canOverride = currentUser.role === 'branch-manager' || currentUser.role === 'admin' || currentUser.role === 'super-admin';

  if (assigneeId !== currentUser.id && !canOverride) {
    showToast('You can only reject stages assigned to you', 'error');
    return;
  }

  // Mark as rejected
  if (typeof stageData === 'object') {
    stageData.status = 'rejected';
    stageData.rejectedAt = new Date().toISOString();
    stageData.rejectedBy = currentUser.id;
    stageData.rejectionReason = reason;
  }

  // Add to history
  addToHistory(stageKey, `Rejected: ${reason}`);

  // Update task status
  currentTask.status = 'rejected';
  currentTask.updatedAt = new Date().toISOString();

  saveToStorage();
  renderTasks();
  closeTaskDetail();
}

// Reject Stage
function rejectStage(stage) {
  if (!currentTask) return;

  // Check if user has permission to reject this stage
  const stageConfig = WORKFLOW_STAGES[stage];
  if (!stageConfig) {
    showToast('Invalid stage configuration', 'error');
    return;
  }

  // Role-based permission check
  const canReject = checkApprovalPermission(stage, currentUser.role);
  if (!canReject) {
    showToast(`You don't have permission to reject ${stageConfig.name || stage} tasks`, 'error');
    return;
  }

  // Check if task is assigned to current user (except for branch managers who can override)
  if (currentUser.role !== 'branch-manager' &&
    currentUser.role !== 'admin' &&
    currentUser.role !== 'super-admin' &&
    currentTask.currentAssignee !== currentUser.id) {
    showToast('You can only reject tasks assigned to you', 'error');
    return;
  }

  const reason = prompt('Enter rejection reason:');
  if (!reason) return;

  currentTask.status = 'rejected';
  addToHistory(stage, `Rejected: ${reason}`);
  currentTask.updatedAt = new Date().toISOString();
  saveToStorage();
  renderTasks();
  closeTaskDetail();
}

// Get Next Stage
function getNextStage(currentStage, task = currentTask) {
  // If task has custom workflow stages, use them
  if (task && task.workflowStages) {
    const stageKeys = Object.keys(task.workflowStages);
    const currentIndex = stageKeys.indexOf(currentStage);

    if (currentIndex < stageKeys.length - 1) {
      return stageKeys[currentIndex + 1];
    }

    return 'COMPLETED';
  }

  // Fallback to default workflow stages
  const stages = Object.entries(WORKFLOW_STAGES)
    .sort((a, b) => a[1].order - b[1].order);

  const currentIndex = stages.findIndex(([key]) => key === currentStage);

  // Check if this is a parallel stage
  if (WORKFLOW_STAGES[currentStage].parallel) {
    // Return to the same stage until all parallel stages are complete
    return currentStage;
  }

  if (currentIndex < stages.length - 1) {
    return stages[currentIndex + 1][0];
  }

  return 'COMPLETED';
}

// Get Assignee for Stage
function getAssigneeForStage(stage, task = currentTask) {
  if (stage === 'COMPLETED') {
    return currentUser.id;
  }

  // Helper function to get user's branch
  function getUserBranch(userOrTask) {
    // If a task is passed, get the branch from task properties
    if (userOrTask.currentStage || userOrTask.id) {
      const task = userOrTask;
      // Try different ways to get branch
      if (task.branch) return task.branch;

      // Get branch from task creator
      const creator = USERS[task.createdBy];
      if (creator) {
        if (creator.branch) return creator.branch;
        if (creator.branches && creator.branches.length > 0) return creator.branches[0];
      }

      // Default to main
      return 'main';
    }

    // If a user is passed
    const user = userOrTask;
    if (user.branches && user.branches.length > 0) {
      return user.branches[0];
    }
    if (user.branch) {
      return user.branch;
    }

    return 'main';
  }

  // First check if task has custom workflow stages
  if (task && task.workflowStages && task.workflowStages[stage]) {
    const stageConfig = task.workflowStages[stage];
    const assigneeRole = stageConfig.role || stageConfig.assignee;

    switch (assigneeRole) {
      case 'loan-advisor':
        return task.createdBy;
      case 'bank-employee':
        // Get the default bank employee for the task's bank
        const bank = task.bank;
        const bankConfig = BANKS[bank];
        return task.bankEmployee || (bankConfig ? bankConfig.defaultEmployee : currentUser.id);
      case 'branch-manager':
        // Find a branch manager for the task's branch
        const branchManagers = Object.values(USERS).filter(u => u.role === 'branch-manager');
        if (branchManagers.length > 0) {
          const taskBranch = getUserBranch(task);
          const bmForBranch = branchManagers.find(bm =>
            (bm.branch === taskBranch) ||
            (bm.branches && bm.branches.includes(taskBranch))
          );
          return bmForBranch ? bmForBranch.id : branchManagers[0].id;
        }
        return currentUser.id;
      case 'office-employee':
        // Find an office employee
        const officeEmployees = Object.values(USERS).filter(u => u.role === 'office-employee');
        if (officeEmployees.length > 0) {
          const taskBranch = getUserBranch(task);
          const oeForBranch = officeEmployees.find(oe =>
            (oe.branch === taskBranch) ||
            (oe.branches && oe.branches.includes(taskBranch))
          );
          return oeForBranch ? oeForBranch.id : officeEmployees[0].id;
        }
        return currentUser.id;
      case 'legal-advisor':
        // Find a legal advisor for the task's branch
        const legalAdvisors = Object.values(USERS).filter(u => u.role === 'legal-advisor');
        if (legalAdvisors.length > 0) {
          const taskBranch = getUserBranch(task);
          const laForBranch = legalAdvisors.find(la =>
            (la.branch === taskBranch) ||
            (la.branches && la.branches.includes(taskBranch))
          );
          return laForBranch ? laForBranch.id : legalAdvisors[0].id;
        }
        return currentUser.id;
      default:
        return currentUser.id;
    }
  }

  // Fallback to default workflow stages
  const stageConfig = WORKFLOW_STAGES[stage];
  if (!stageConfig) return currentUser.id;

  switch (stageConfig.assignee) {
    case 'loan-advisor':
      return task.createdBy;
    case 'bank-employee':
      // Get the default bank employee for the task's bank
      const bank = task.bank;
      const bankConfig = BANKS[bank];
      return task.bankEmployee || (bankConfig ? bankConfig.defaultEmployee : currentUser.id);
    case 'branch-manager':
      // Find a branch manager for the task's branch
      const branchManagers = Object.values(USERS).filter(u => u.role === 'branch-manager');
      if (branchManagers.length > 0) {
        const taskBranch = getUserBranch(task);
        const bmForBranch = branchManagers.find(bm =>
          (bm.branch === taskBranch) ||
          (bm.branches && bm.branches.includes(taskBranch))
        );
        return bmForBranch ? bmForBranch.id : branchManagers[0].id;
      }
      return currentUser.id;
    case 'office-employee':
      // Find an office employee
      const officeEmployees = Object.values(USERS).filter(u => u.role === 'office-employee');
      if (officeEmployees.length > 0) {
        const taskBranch = getUserBranch(task);
        const oeForBranch = officeEmployees.find(oe =>
          (oe.branch === taskBranch) ||
          (oe.branches && oe.branches.includes(taskBranch))
        );
        return oeForBranch ? oeForBranch.id : officeEmployees[0].id;
      }
      return currentUser.id;
    case 'legal-advisor':
      // Find a legal advisor for the task's branch
      const legalAdvisors = Object.values(USERS).filter(u => u.role === 'legal-advisor');
      if (legalAdvisors.length > 0) {
        const taskBranch = getUserBranch(task);
        const laForBranch = legalAdvisors.find(la =>
          (la.branch === taskBranch) ||
          (la.branches && la.branches.includes(taskBranch))
        );
        return laForBranch ? laForBranch.id : legalAdvisors[0].id;
      }
      return currentUser.id;
    default:
      return currentUser.id;
  }
}

// Move to Next Stage
function moveToNextStage() {
  if (!currentTask) return;

  const nextStage = getNextStage(currentTask.currentStage, currentTask);
  currentTask.currentStage = nextStage;
  currentTask.currentAssignee = getAssigneeForStage(nextStage, currentTask);

  if (nextStage === 'COMPLETED') {
    currentTask.status = 'completed';
    currentTask.completedAt = new Date().toISOString();
  }

  saveToStorage();
  renderTasks();
}

// Add to History
function addToHistory(stage, action, actionType = null, details = null) {
  if (!currentTask) return;

  // Update last updated time
  currentTask.lastUpdatedTime = new Date().toISOString();

  currentTask.history.push({
    stage: stage,
    action: action,
    actionType: actionType || action.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20),
    details: details,
    user: currentUser.name,
    timestamp: new Date().toISOString()
  });
}

// Rates & PF Functions
function setRatesAndPF() {
  if (!currentTask) return;

  const interest = prompt('Enter Interest Rate (%):');
  if (!interest) return;

  const processingFee = prompt('Enter Processing Fee (%):');
  if (!processingFee) return;

  const adminCharges = prompt('Enter Admin Charges (₹):');
  if (!adminCharges) return;

  currentTask.rates = {
    interest: parseFloat(interest),
    processingFee: parseFloat(processingFee),
    adminCharges: parseInt(adminCharges)
  };

  addToHistory('RATE_PF', `Rates set: ${interest}% interest, ${processingFee}% PF, ₹${adminCharges} admin`);
  moveToNextStage();
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// Raise Query
function raiseQuery() {
  if (!currentTask) return;

  const query = prompt('Enter your query:');
  if (!query) return;

  if (!currentTask.queries) {
    currentTask.queries = [];
  }

  currentTask.queries.push({
    from: currentUser.role,
    message: query,
    timestamp: new Date().toISOString()
  });

  // Reassign back to loan advisor
  currentTask.currentAssignee = currentTask.createdBy;

  addToHistory('RATE_PF', `Query raised: ${query}`);
  saveToStorage();
  renderTasks();
  closeTaskDetail();
}

// Sanction Letter Functions
function generateSanctionLetter() {
  if (!currentTask || !currentTask.applicationNumber) {
    alert('Application number is required');
    return;
  }

  addToHistory('SANCTION_LETTER', 'Sanction letter generated');
  currentTask.currentAssignee = currentTask.bankEmployee;
  saveToStorage();
  openTaskDetail(currentTask.id);
}

function confirmSanctionLetter() {
  if (!currentTask) return;

  addToHistory('SANCTION_LETTER', 'Sanction letter confirmed');
  moveToNextStage();
  saveToStorage();
  openTaskDetail(currentTask.id);
}

function rejectSanctionLetter() {
  if (!currentTask) return;

  const reason = prompt('Enter rejection reason:');
  if (!reason) return;

  addToHistory('SANCTION_LETTER', `Rejected: ${reason}`);
  currentTask.currentAssignee = currentTask.createdBy;
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// Docket Login
function loginDocket() {
  if (!currentTask) return;

  const docketNumber = prompt('Enter Docket Number:');
  if (!docketNumber) return;

  currentTask.docketNumber = docketNumber;
  addToHistory('DOCKET_LOGIN', `Docket logged: ${docketNumber}`);
  moveToNextStage();
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// KFS Generation
function generateKFS() {
  if (!currentTask) return;

  addToHistory('KFS_GENERATION', 'KFS generated');
  currentTask.currentAssignee = currentTask.createdBy;
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// Complete KFS
function completeKFS() {
  if (!currentTask) return;

  addToHistory('KFS_GENERATION', 'KFS completed');
  moveToNextStage();
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// ECS & E-Sign
function generateECSEsign() {
  if (!currentTask) return;

  addToHistory('ECS_ESIGN', 'ECS & E-Sign generated');
  currentTask.currentAssignee = currentTask.createdBy;
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// Complete ECS & E-Sign
function completeECSEsign() {
  if (!currentTask) return;

  addToHistory('ECS_ESIGN', 'ECS & E-Sign completed');
  moveToNextStage();
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// Fund Disbursement
function processFundTransfer() {
  if (!currentTask) return;

  if (confirm('Process fund transfer? This will complete the loan.')) {
    currentTask.disbursementMode = 'fund-transfer';
    addToHistory('DISBURSEMENT', 'Fund Transfer Completed');
    moveToNextStage();
    saveToStorage();
    renderTasks();
    closeTaskDetail();
    showNotification('Loan disbursed successfully', 'success');
  }
}

function uploadCheque() {
  if (!currentTask) return;

  const chequeNumber = prompt('Enter Cheque Number:');
  if (!chequeNumber) return;

  currentTask.disbursementMode = 'cheque';
  currentTask.chequeNumber = chequeNumber;
  currentTask.status = 'otc-pending';

  addToHistory('DISBURSEMENT', `Cheque uploaded: ${chequeNumber}`);
  saveToStorage();
  openTaskDetail(currentTask.id);
}

// Branch Manager Functions
function showReassignOptions() {
  if (!currentTask || currentUser.role !== 'branch-manager') return;

  const users = Object.values(USERS).filter(u =>
    u.role === 'loan-advisor' || u.role === 'bank-employee'
  );

  const options = users.map(u =>
    `<option value="${u.id}">${u.name} (${ROLES[u.role].name})</option>`
  ).join('');

  const html = `
    <div class="form-group">
      <label class="form-label">Reassign to:</label>
      <select class="form-select" id="reassignUser">
        <option value="">Select User</option>
        ${options}
      </select>
    </div>
    <div class="action-buttons">
      <button class="btn btn-primary" onclick="executeReassign()">Reassign</button>
      <button class="btn btn-secondary" onclick="openTaskDetail('${currentTask.id}')">Cancel</button>
    </div>
  `;

  document.getElementById('taskDetailContent').innerHTML = html;
}

function executeReassign() {
  const userId = document.getElementById('reassignUser').value;
  if (!userId || !currentTask) return;

  const user = USERS[userId];
  if (!user) return;

  currentTask.currentAssignee = userId;
  if (user.role === 'bank-employee') {
    currentTask.bankEmployee = userId;
  }

  addToHistory(currentTask.currentStage, `Reassigned to ${user.name}`);
  saveToStorage();
  renderTasks();
  openTaskDetail(currentTask.id);
  showNotification('Task reassigned successfully', 'success');
}

// Technical Valuation
function setTechnicalValuation() {
  if (!currentTask) {
    showToast('No task selected', 'error');
    return;
  }

  const valuation = prompt('Enter Property Valuation (₹):');
  if (!valuation) return;

  currentTask.valuation = parseInt(valuation);
  addToHistory('TECHNICAL', `Property Valuation: ₹${parseInt(valuation).toLocaleString('en-IN')}`);

  // Handle as parallel stage approval
  approveStage('TECHNICAL');
}

// Assign Legal Stage
function assignLegalStage(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // Check permissions
  const canAssign = ['branch-manager', 'admin', 'super-admin'].includes(currentUser.role) || currentUser.id === task.createdBy;
  if (!canAssign) {
    showToast('You don\'t have permission to assign stages', 'error');
    return;
  }

  // Get legal advisors
  const legalAdvisors = USERS.filter(u => u.role === 'legal-advisor' && u.bank === task.bank);
  if (legalAdvisors.length === 0) {
    showToast('No legal advisors available for this bank', 'error');
    return;
  }

  // Create select dialog
  const options = legalAdvisors.map((advisor, index) =>
    `${index + 1}. ${advisor.name} (${advisor.branch})`
  ).join('\n');

  const selection = prompt(`Select Legal Advisor:\n\n${options}\n\nEnter number (1-${legalAdvisors.length}):`);
  if (!selection) return;

  const selectedIndex = parseInt(selection) - 1;
  if (selectedIndex < 0 || selectedIndex >= legalAdvisors.length) {
    showToast('Invalid selection', 'error');
    return;
  }

  const selectedAdvisor = legalAdvisors[selectedIndex];

  // Initialize parallelStages if it doesn't exist
  if (!task.parallelStages) {
    task.parallelStages = {};
  }

  // Assign legal advisor
  task.parallelStages.LEGAL = {
    assignee: selectedAdvisor.id,
    status: 'pending',
    completed: false
  };

  // Update task
  task.updatedAt = new Date().toISOString();
  addToHistory('LEGAL', `Assigned to ${selectedAdvisor.name}`);

  saveToStorage();
  showToast(`Legal verification assigned to ${selectedAdvisor.name}`, 'success');

  // Refresh task detail if open
  if (document.getElementById('taskDetailScreen').classList.contains('active') && currentTask && currentTask.id === taskId) {
    openTaskDetail(taskId);
  }
}

// Assign Technical Stage
function assignTechnicalStage(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  // Check permissions
  const canAssign = ['branch-manager', 'admin', 'super-admin'].includes(currentUser.role) || currentUser.id === task.createdBy;
  if (!canAssign) {
    showToast('You don\'t have permission to assign stages', 'error');
    return;
  }

  // Get branch managers
  const branchManagers = USERS.filter(u => u.role === 'branch-manager' && u.bank === task.bank);
  if (branchManagers.length === 0) {
    showToast('No branch managers available for this bank', 'error');
    return;
  }

  // Create select dialog
  const options = branchManagers.map((manager, index) =>
    `${index + 1}. ${manager.name} (${manager.branch})`
  ).join('\n');

  const selection = prompt(`Select Branch Manager for Technical Valuation:\n\n${options}\n\nEnter number (1-${branchManagers.length}):`);
  if (!selection) return;

  const selectedIndex = parseInt(selection) - 1;
  if (selectedIndex < 0 || selectedIndex >= branchManagers.length) {
    showToast('Invalid selection', 'error');
    return;
  }

  const selectedManager = branchManagers[selectedIndex];

  // Initialize parallelStages if it doesn't exist
  if (!task.parallelStages) {
    task.parallelStages = {};
  }

  // Assign branch manager
  task.parallelStages.TECHNICAL = {
    assignee: selectedManager.id,
    status: 'pending',
    completed: false
  };

  // Update task
  task.updatedAt = new Date().toISOString();
  addToHistory('TECHNICAL', `Assigned to ${selectedManager.name}`);

  saveToStorage();
  showToast(`Technical valuation assigned to ${selectedManager.name}`, 'success');

  // Refresh task detail if open
  if (document.getElementById('taskDetailScreen').classList.contains('active') && currentTask && currentTask.id === taskId) {
    openTaskDetail(taskId);
  }
}

// =============================================================================
// NOTIFICATION MANAGEMENT FUNCTIONS (notifications.js)
// =============================================================================

// Add Notification
function addNotification(notification) {
  notifications.unshift({
    ...notification,
    id: notification.id || Date.now()
  });

  // Keep only last 50 notifications
  if (notifications.length > 50) {
    notifications = notifications.slice(0, 50);
  }

  if (typeof saveToStorage === 'function') saveToStorage();
  renderNotifications();
  updateNotificationBadge();
}

// Render Notifications
function renderNotifications() {
  const notificationList = document.getElementById('notificationList');
  const userNotifications = notifications.filter(n =>
    !n.userId || n.userId === currentUser.id
  );

  if (userNotifications.length === 0) {
    notificationList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔔</div>
        <div class="empty-title">No notifications</div>
        <div class="empty-desc">You're all caught up!</div>
      </div>
    `;
    return;
  }

  notificationList.innerHTML = userNotifications.map(notification => `
    <div class="notification-item ${!notification.read ? 'unread' : ''}"
         onclick="handleNotificationClick('${notification.id}')">
      <div class="notification-message">${notification.message}</div>
      <div class="notification-time">${formatNotificationTime(notification.timestamp)}</div>
    </div>
  `).join('');
}

// Handle Notification Click
function handleNotificationClick(notificationId) {
  const notification = notifications.find(n => n.id == notificationId);
  if (!notification) return;

  // Mark as read
  notification.read = true;
  if (typeof saveToStorage === 'function') saveToStorage();
  renderNotifications();
  updateNotificationBadge();

  // Navigate to task if task ID exists
  if (notification.taskId) {
    if (typeof showTab === 'function') showTab('tasks');
    setTimeout(() => {
      if (typeof openTaskDetail === 'function') openTaskDetail(notification.taskId);
    }, 300);
  }
}

// Update Notification Badge
function updateNotificationBadge() {
  const badge = document.querySelector('.notification-badge');

  // Return early if badge element doesn't exist
  if (!badge) {
    console.warn('Notification badge element not found');
    return;
  }

  const unreadCount = notifications.filter(n =>
    !n.read && (!n.userId || n.userId === currentUser.id)
  ).length;

  if (unreadCount > 0) {
    badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
    badge.style.display = 'block';
  } else {
    badge.style.display = 'none';
  }
}

// Format Notification Time
function formatNotificationTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  });
}

// Show Notification (Toast)
function showNotification(message, type = 'info') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `notification-toast ${type}`;
  toast.textContent = message;

  // Style the toast
  Object.assign(toast.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: type === 'success' ? '#10b981' :
      type === 'error' ? '#ef4444' :
        type === 'warning' ? '#f59e0b' : '#667eea',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: '9999',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    maxWidth: '320px',
    textAlign: 'center'
  });

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

// Open Notification Panel
function openNotificationPanel() {
  document.getElementById('notificationPanel').classList.add('active');
  renderNotifications();
}

// Close Notification Panel
function closeNotificationPanel() {
  const notificationPanel = document.getElementById('notificationPanel');
  if (notificationPanel) {
    notificationPanel.classList.remove('active');
  }
}

// Show Notifications (additional function)
function showNotifications() {
  openNotificationPanel();
}

// Hide Notifications (additional function)
function hideNotifications() {
  closeNotificationPanel();
}

// Mark all notifications as read
function markAllAsRead() {
  notifications.forEach(n => {
    if (!n.userId || n.userId === currentUser.id) {
      n.read = true;
    }
  });
  if (typeof saveToStorage === 'function') saveToStorage();
  renderNotifications();
  updateNotificationBadge();
}

// =============================================================================
// EXPORT FUNCTIONS TO GLOBAL SCOPE (exports.js)
// =============================================================================

// Export all functions to global scope
// This ensures all functions are available for HTML onclick handlers

// Workflow functions
window.loadWorkflowConfigurations = typeof loadWorkflowConfigurations !== 'undefined' ? loadWorkflowConfigurations : function () { };
window.renderWorkflowConfig = typeof renderWorkflowConfig !== 'undefined' ? renderWorkflowConfig : function () { };
window.toggleWorkflowStage = typeof toggleWorkflowStage !== 'undefined' ? toggleWorkflowStage : function () { };
window.saveWorkflowConfig = typeof saveWorkflowConfig !== 'undefined' ? saveWorkflowConfig : function () { };
window.updateWorkflowLoanTypes = typeof updateWorkflowLoanTypes !== 'undefined' ? updateWorkflowLoanTypes : function () { };
window.checkApprovalPermission = typeof checkApprovalPermission !== 'undefined' ? checkApprovalPermission : function () { };
window.selectDocuments = typeof selectDocuments !== 'undefined' ? selectDocuments : function () { };
window.saveDocumentRequirements = typeof saveDocumentRequirements !== 'undefined' ? saveDocumentRequirements : function () { };
window.saveDocumentSelection = typeof saveDocumentSelection !== 'undefined' ? saveDocumentSelection : function () { };
window.closeDocumentScreen = typeof closeDocumentScreen !== 'undefined' ? closeDocumentScreen : function () { };
window.toggleDocumentCollection = typeof toggleDocumentCollection !== 'undefined' ? toggleDocumentCollection : function () { };
window.toggleEditMode = typeof toggleEditMode !== 'undefined' ? toggleEditMode : function () { };
window.updateDocumentSelection = typeof updateDocumentSelection !== 'undefined' ? updateDocumentSelection : function () { };
window.toggleDocCheckbox = typeof toggleDocCheckbox !== 'undefined' ? toggleDocCheckbox : function () { };
window.enterEditMode = typeof enterEditMode !== 'undefined' ? enterEditMode : function () { };
window.handleDocumentNext = typeof handleDocumentNext !== 'undefined' ? handleDocumentNext : function () { };
window.showApplicationNumberInput = typeof showApplicationNumberInput !== 'undefined' ? showApplicationNumberInput : function () { };
window.showApplicationNumberScreen = typeof showApplicationNumberScreen !== 'undefined' ? showApplicationNumberScreen : function () { };
window.closeApplicationNumberScreen = typeof closeApplicationNumberScreen !== 'undefined' ? closeApplicationNumberScreen : function () { };
window.saveApplicationNumber = typeof saveApplicationNumber !== 'undefined' ? saveApplicationNumber : function () { };
window.markDocumentsAsCollected = typeof markDocumentsAsCollected !== 'undefined' ? markDocumentsAsCollected : function () { };
window.completeDocumentCollectionAndShowAppNumber = typeof completeDocumentCollectionAndShowAppNumber !== 'undefined' ? completeDocumentCollectionAndShowAppNumber : function () { };
window.approveStage = typeof approveStage !== 'undefined' ? approveStage : function () { };
window.rejectStage = typeof rejectStage !== 'undefined' ? rejectStage : function () { };
window.approveParallelStage = typeof approveParallelStage !== 'undefined' ? approveParallelStage : function () { };
window.rejectParallelStage = typeof rejectParallelStage !== 'undefined' ? rejectParallelStage : function () { };
window.checkParallelStageCompletion = typeof checkParallelStageCompletion !== 'undefined' ? checkParallelStageCompletion : function () { };
window.getNextStage = typeof getNextStage !== 'undefined' ? getNextStage : function () { };
window.getAssigneeForStage = typeof getAssigneeForStage !== 'undefined' ? getAssigneeForStage : function () { };
window.getWorkflowStages = typeof getWorkflowStages !== 'undefined' ? getWorkflowStages : function () { };
window.getBankLoanTypes = typeof getBankLoanTypes !== 'undefined' ? getBankLoanTypes : function () { };
window.getBankName = typeof getBankName !== 'undefined' ? getBankName : function () { };
window.getLoanTypeDisplayName = typeof getLoanTypeDisplayName !== 'undefined' ? getLoanTypeDisplayName : function () { };
window.getStageDisplayName = typeof getStageDisplayName !== 'undefined' ? getStageDisplayName : function () { };
window.getUserById = typeof getUserById !== 'undefined' ? getUserById : function () { };
window.getParallelStagesInfo = typeof getParallelStagesInfo !== 'undefined' ? getParallelStagesInfo : function () { };
window.getStageIcon = typeof getStageIcon !== 'undefined' ? getStageIcon : function () { };
window.moveToNextStage = typeof moveToNextStage !== 'undefined' ? moveToNextStage : function () { };
window.addToHistory = typeof addToHistory !== 'undefined' ? addToHistory : function () { };
window.setRatesAndPF = typeof setRatesAndPF !== 'undefined' ? setRatesAndPF : function () { };
window.raiseQuery = typeof raiseQuery !== 'undefined' ? raiseQuery : function () { };
window.generateSanctionLetter = typeof generateSanctionLetter !== 'undefined' ? generateSanctionLetter : function () { };
window.confirmSanctionLetter = typeof confirmSanctionLetter !== 'undefined' ? confirmSanctionLetter : function () { };
window.rejectSanctionLetter = typeof rejectSanctionLetter !== 'undefined' ? rejectSanctionLetter : function () { };
window.loginDocket = typeof loginDocket !== 'undefined' ? loginDocket : function () { };
window.generateKFS = typeof generateKFS !== 'undefined' ? generateKFS : function () { };
window.completeKFS = typeof completeKFS !== 'undefined' ? completeKFS : function () { };
window.generateECSEsign = typeof generateECSEsign !== 'undefined' ? generateECSEsign : function () { };
window.completeECSEsign = typeof completeECSEsign !== 'undefined' ? completeECSEsign : function () { };
window.processFundTransfer = typeof processFundTransfer !== 'undefined' ? processFundTransfer : function () { };
window.uploadCheque = typeof uploadCheque !== 'undefined' ? uploadCheque : function () { };
window.showReassignOptions = typeof showReassignOptions !== 'undefined' ? showReassignOptions : function () { };
window.executeReassign = typeof executeReassign !== 'undefined' ? executeReassign : function () { };
window.setTechnicalValuation = typeof setTechnicalValuation !== 'undefined' ? setTechnicalValuation : function () { };
window.assignLegalStage = typeof assignLegalStage !== 'undefined' ? assignLegalStage : function () { };
window.assignTechnicalStage = typeof assignTechnicalStage !== 'undefined' ? assignTechnicalStage : function () { };

// Task functions
window.createNewTask = typeof createNewTask !== 'undefined' ? createNewTask : function () { };
window.openCreateTaskModal = typeof openCreateTaskModal !== 'undefined' ? openCreateTaskModal : function () { };
window.closeCreateTaskModal = typeof closeCreateTaskModal !== 'undefined' ? closeCreateTaskModal : function () { };

// Notification functions
window.addNotification = typeof addNotification !== 'undefined' ? addNotification : function () { };
window.renderNotifications = typeof renderNotifications !== 'undefined' ? renderNotifications : function () { };
window.handleNotificationClick = typeof handleNotificationClick !== 'undefined' ? handleNotificationClick : function () { };
window.updateNotificationBadge = typeof updateNotificationBadge !== 'undefined' ? updateNotificationBadge : function () { };
window.showNotification = typeof showNotification !== 'undefined' ? showNotification : function () { };
window.showNotifications = typeof showNotifications !== 'undefined' ? showNotifications : function () { };
window.hideNotifications = typeof hideNotifications !== 'undefined' ? hideNotifications : function () { };
window.openNotificationPanel = typeof openNotificationPanel !== 'undefined' ? openNotificationPanel : function () { };
window.closeNotificationPanel = typeof closeNotificationPanel !== 'undefined' ? closeNotificationPanel : function () { };
window.markAllAsRead = typeof markAllAsRead !== 'undefined' ? markAllAsRead : function () { };

// App functions
window.switchUser = typeof switchUser !== 'undefined' ? switchUser : function () { };
window.toggleUserSwitcher = typeof toggleUserSwitcher !== 'undefined' ? toggleUserSwitcher : function () { };
window.setupUserSwitcher = typeof setupUserSwitcher !== 'undefined' ? setupUserSwitcher : function () { };
window.populateUserSwitcher = typeof populateUserSwitcher !== 'undefined' ? populateUserSwitcher : function () { };
window.showTab = typeof showTab !== 'undefined' ? showTab : function () { };
window.openTaskDetail = typeof openTaskDetail !== 'undefined' ? openTaskDetail : function () { };
window.closeTaskDetail = typeof closeTaskDetail !== 'undefined' ? closeTaskDetail : function () { };
window.init = typeof init !== 'undefined' ? init : function () { };

// Parallel stage functions
window.saveApplicationNumberAndAssignments = typeof saveApplicationNumberAndAssignments !== 'undefined' ? saveApplicationNumberAndAssignments : function () { };
window.openBsmOsvScreen = typeof openBsmOsvScreen !== 'undefined' ? openBsmOsvScreen : function () { };
window.closeBsmOsvScreen = typeof closeBsmOsvScreen !== 'undefined' ? closeBsmOsvScreen : function () { };
window.completeBsmOsv = typeof completeBsmOsv !== 'undefined' ? completeBsmOsv : function () { };
window.raiseBsmQuery = typeof raiseBsmQuery !== 'undefined' ? raiseBsmQuery : function () { };
window.showBsmQueryInput = typeof showBsmQueryInput !== 'undefined' ? showBsmQueryInput : function () { };
window.showBsmQueryInputDirect = typeof showBsmQueryInputDirect !== 'undefined' ? showBsmQueryInputDirect : function () { };
window.submitBsmQuery = typeof submitBsmQuery !== 'undefined' ? submitBsmQuery : function () { };
window.cancelBsmQuery = typeof cancelBsmQuery !== 'undefined' ? cancelBsmQuery : function () { };
window.closeBsmQueryModal = typeof closeBsmQueryModal !== 'undefined' ? closeBsmQueryModal : function () { };
window.respondBsmQuery = typeof respondBsmQuery !== 'undefined' ? respondBsmQuery : function () { };
window.resolveBsmQueryAsLoanAdvisor = typeof resolveBsmQueryAsLoanAdvisor !== 'undefined' ? resolveBsmQueryAsLoanAdvisor : function () { };
window.rejectLoanFromBsm = typeof rejectLoanFromBsm !== 'undefined' ? rejectLoanFromBsm : function () { };
window.openLegalScreen = typeof openLegalScreen !== 'undefined' ? openLegalScreen : function () { };
window.closeLegalScreen = typeof closeLegalScreen !== 'undefined' ? closeLegalScreen : function () { };
window.completeLegal = typeof completeLegal !== 'undefined' ? completeLegal : function () { };
window.showLegalQueryInput = typeof showLegalQueryInput !== 'undefined' ? showLegalQueryInput : function () { };
window.submitLegalQuery = typeof submitLegalQuery !== 'undefined' ? submitLegalQuery : function () { };
window.closeLegalQueryModal = typeof closeLegalQueryModal !== 'undefined' ? closeLegalQueryModal : function () { };
window.resolveLegalQueryAsLoanAdvisor = typeof resolveLegalQueryAsLoanAdvisor !== 'undefined' ? resolveLegalQueryAsLoanAdvisor : function () { };
window.openTechnicalScreen = typeof openTechnicalScreen !== 'undefined' ? openTechnicalScreen : function () { };
window.closeTechnicalScreen = typeof closeTechnicalScreen !== 'undefined' ? closeTechnicalScreen : function () { };
window.completeValuation = typeof completeValuation !== 'undefined' ? completeValuation : function () { };
window.rejectValuation = typeof rejectValuation !== 'undefined' ? rejectValuation : function () { };
window.showTechnicalQueryInput = typeof showTechnicalQueryInput !== 'undefined' ? showTechnicalQueryInput : function () { };
window.showTechnicalQueryInputDirect = typeof showTechnicalQueryInputDirect !== 'undefined' ? showTechnicalQueryInputDirect : function () { };
window.submitTechnicalQuery = typeof submitTechnicalQuery !== 'undefined' ? submitTechnicalQuery : function () { };
window.closeTechnicalQueryModal = typeof closeTechnicalQueryModal !== 'undefined' ? closeTechnicalQueryModal : function () { };
window.resolveTechnicalQueryAsLoanAdvisor = typeof resolveTechnicalQueryAsLoanAdvisor !== 'undefined' ? resolveTechnicalQueryAsLoanAdvisor : function () { };
window.handleQueryResponse = typeof handleQueryResponse !== 'undefined' ? handleQueryResponse : function () { };
window.openParallelStageScreen = typeof openParallelStageScreen !== 'undefined' ? openParallelStageScreen : function () { };
window.openTaskScreen = typeof openTaskScreen !== 'undefined' ? openTaskScreen : function () { };
window.openReassignModal = typeof openReassignModal !== 'undefined' ? openReassignModal : function () { };
window.closeReassignModal = typeof closeReassignModal !== 'undefined' ? closeReassignModal : function () { };
window.updateReassignUserOptions = typeof updateReassignUserOptions !== 'undefined' ? updateReassignUserOptions : function () { };
window.executeReassign = typeof executeReassign !== 'undefined' ? executeReassign : function () { };
window.updateFloatingReassignButton = typeof updateFloatingReassignButton !== 'undefined' ? updateFloatingReassignButton : function () { };

// Update current time
function updateCurrentTime() {
  const now = new Date();
  // Use Asia/Kolkata timezone with AM/PM
  const timeString = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    timeElement.textContent = timeString;
  }
}

// Update battery status
function updateBatteryStatus() {
  const batteryElement = document.getElementById('batteryLevel');
  if (batteryElement) {
    // Check if the Battery Status API is available
    if ('getBattery' in navigator) {
      navigator.getBattery().then(function (battery) {
        function updateBatteryInfo() {
          const level = Math.round(battery.level * 100);
          const charging = battery.charging ? '⚡' : '';
          batteryElement.textContent = `${level}%${charging}`;
        }

        // Update battery info initially
        updateBatteryInfo();

        // Add event listeners for battery changes
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);
      }).catch(function (error) {
        // Fallback if Battery API is not available
        batteryElement.textContent = '100%';
      });
    }
  }
}

// Reassign Task Functions
function openReassignModal() {
  if (!currentTask) {
    showToast('No task selected', 'error');
    return;
  }

  // Check if user has permission to reassign (only branch manager, admin, super-admin)
  if (!['branch-manager', 'admin', 'super-admin'].includes(currentUser.role)) {
    showToast('You don\'t have permission to reassign tasks', 'error');
    return;
  }

  const modal = document.getElementById('reassignModal');
  const taskIdInput = document.getElementById('reassignTaskId');
  const stageSelect = document.getElementById('reassignStage');
  const userSelect = document.getElementById('reassignUser');

  // Set task ID
  taskIdInput.value = currentTask.id;

  // Remove any existing context info to prevent duplicates
  const existingContext = modal.querySelector('.alert.alert-info');
  if (existingContext) {
    existingContext.remove();
  }

  // Populate stage options
  stageSelect.innerHTML = '<option value="">Select Stage</option>';

  // Add role options for reassignment
  stageSelect.innerHTML = `
    <option value="">Select Role to Reassign</option>
    <option value="loan-advisor">Loan Advisor</option>
    <option value="branch-manager">Branch Manager</option>
    <option value="bank-employee">Bank Employee</option>
  `;

  // Show context information
  const banks = typeof BANKS !== 'undefined' ? BANKS : {};
  const bankName = banks[currentTask.bank]?.name || currentTask.bank;
  const modalBody = modal.querySelector('.modal-body');

  // Add context info after the Task ID
  const contextInfo = document.createElement('div');
  contextInfo.className = 'alert alert-info mb-3';
  contextInfo.style.fontSize = '13px';
  contextInfo.innerHTML = `
    <small class="d-block">
      <strong>Bank:</strong> ${bankName}<br>
      <strong>Branch:</strong> ${currentTask.branch || 'Main'}
    </small>
  `;

  // Insert after the Task ID field
  const taskIdField = document.getElementById('reassignTaskId').parentNode;
  taskIdField.insertAdjacentElement('afterend', contextInfo);

  modal.style.display = 'flex';
  modal.classList.add('active');
}

function closeReassignModal() {
  const modal = document.getElementById('reassignModal');
  modal.style.display = 'none';
  modal.classList.remove('active');
}

function updateReassignUserOptions() {
  const stageSelect = document.getElementById('reassignStage');
  const userSelect = document.getElementById('reassignUser');
  const selectedStage = stageSelect.value;

  userSelect.innerHTML = '<option value="">Select User</option>';

  if (!selectedStage || !currentTask) return;

  // Use the selected role directly
  const requiredRole = selectedStage;

  if (!requiredRole) return;

  if (requiredRole) {
    let users = [];

    // Filter users based on role and loan details
    if (requiredRole === 'loan-advisor') {
      // Filter loan advisors by the same branch as the loan
      const taskBranch = currentTask.branch || 'main';
      users = getUsersByRole(requiredRole, { branch: taskBranch });
    }
    else if (requiredRole === 'bank-employee') {
      // Filter bank employees by the same bank as the loan
      users = getUsersByRole(requiredRole, { bank: currentTask.bank });
    }
    else if (requiredRole === 'branch-manager') {
      // Filter branch managers by the same branch as the loan
      const taskBranch = currentTask.branch || 'main';
      users = getUsersByRole(requiredRole, { branch: taskBranch });
    }
    else {
      // For other roles, get all users of that role
      users = getUsersByRole(requiredRole);
    }

    // Get current assignee to avoid reassigning to the same person
    const currentAssigneeId = currentTask.currentAssignee;

    if (users.length === 0) {
      userSelect.innerHTML = '<option value="">No users available for this stage</option>';
    } else {
      users.forEach(user => {
        // Skip if user is already assigned to this stage
        if (user.id !== currentAssigneeId) {
          userSelect.innerHTML += `<option value="${user.id}">${user.name}</option>`;
        }
      });
    }
  }
}

function executeReassign() {
  const stageSelect = document.getElementById('reassignStage');
  const userSelect = document.getElementById('reassignUser');
  const selectedStage = stageSelect.value;
  const selectedUser = userSelect.value;

  if (!selectedStage || !selectedUser) {
    showToast('Please select stage and user', 'error');
    return;
  }

  // Find the task
  const taskIndex = tasks.findIndex(t => t.id === currentTask.id);
  if (taskIndex === -1) {
    showToast('Task not found', 'error');
    return;
  }

  // Update task assignment based on selected role
  if (selectedStage === 'bank-employee') {
    // Update bank employee assignment
    tasks[taskIndex].bankEmployee = selectedUser;
    // Also update parallel stage if it exists
    if (tasks[taskIndex].parallelStages && tasks[taskIndex].parallelStages['BSM_OSV']) {
      tasks[taskIndex].parallelStages['BSM_OSV'].assignee = selectedUser;
    }
  }
  else if (selectedStage === 'branch-manager') {
    // Update branch manager assignment in parallel stages
    if (!tasks[taskIndex].parallelStages) {
      tasks[taskIndex].parallelStages = {};
    }
    if (!tasks[taskIndex].parallelStages['TECHNICAL']) {
      tasks[taskIndex].parallelStages['TECHNICAL'] = {};
    }
    tasks[taskIndex].parallelStages['TECHNICAL'].assignee = selectedUser;
  }
  else {
    // For loan advisor and other roles, update current assignee
    tasks[taskIndex].currentAssignee = selectedUser;
  }

  // Add to history
  const userName = getUserById(selectedUser)?.name || selectedUser;
  tasks[taskIndex].history.push({
    timestamp: new Date().toISOString(),
    action: 'Task reassigned',
    stage: selectedStage,
    user: currentUser.name,
    details: `Reassigned to ${userName}`
  });

  // Save changes
  saveToStorage();

  // Update current task reference
  currentTask = tasks[taskIndex];

  // Close modal and refresh
  closeReassignModal();
  showToast('Task reassigned successfully', 'success');
  renderTasks();

  // If in detail view, refresh it
  const detailScreen = document.getElementById('taskDetailScreen');
  if (detailScreen && detailScreen.classList.contains('active')) {
    openTaskDetail(currentTask.id);
  }
}

// Show/hide floating reassign button based on user role and screen
function updateFloatingReassignButton() {
  const floatingBtn = document.getElementById('floatingReassignBtn');

  if (!floatingBtn) return;

  // Only show for branch manager, admin, or super-admin
  if (!['branch-manager', 'admin', 'super-admin'].includes(currentUser.role)) {
    floatingBtn.style.display = 'none';
    return;
  }

  // Only show when viewing task details
  const detailScreen = document.getElementById('taskDetailScreen');
  if (detailScreen && detailScreen.classList.contains('active')) {
    floatingBtn.style.display = 'flex';
  } else {
    floatingBtn.style.display = 'none';
  }
}

// Update time on page load and every second
updateCurrentTime();
updateBatteryStatus();
setInterval(updateCurrentTime, 1000);

// Show floating reassign button when appropriate
setInterval(updateFloatingReassignButton, 500);

console.log('All functions exported to global scope');
console.log('Loan Processing Task Management System - Combined JavaScript loaded successfully');