import React, { useState, useMemo } from 'react';

// Define the steps for the multi-step form
const STEPS = [
  { id: 1, title: 'General Information' },
  { id: 2, title: 'Staffing & Trade Experts' },
  { id: 3, title: 'Financial Details' },
  { id: 4, title: 'Building & Infrastructure' },
  { id: 5, title: 'Equipment & Furniture' },
  { id: 6, title: 'Declaration & Owners' },
];

const totalSteps = STEPS.length;

// Main Application Component
const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    instituteName: '',
    address: '',
    dateStartClasses: '',
    requiredTrade: '',

    // Staffing (Step 2)
    staffStatementAttached: 'No',
    proposedAppointments: '',
    teachersAgreement: 'No',
    salaryScalesAttached: 'No',

    // Finance (Step 3)
    endowmentFundSufficient: 'No',
    endowmentFundBalance: '',
    annualIncomeSources: '',
    expectedFeeIncomeCalculation: '',
    annualExpenditureEstimate: '',

    // Building (Step 4)
    buildingOwned: 'No',
    linePlanAttached: 'No',
    longLease: 'No',
    classRoomCount: '',
    classRoomsEquipped: 'No',
    electricLightFitted: 'No',

    // Equipment (Step 5)
    labEquipmentListAttached: 'No',
    appliedTradesEquipmentListAttached: 'No',
    libraryBooksListAttached: 'No',
    amountSpent: '',
    futureBudget: '',

    // Declaration (Step 6)
    partner1Name: '',
    partner1CNIC: '',
    partner2Name: '',
    partner2CNIC: '',
    declarationPlace: '',
    declarationDate: new Date().toISOString().split('T')[0],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Universal handler for all input types
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // Basic validation check before moving to the next step (can be expanded)
      // For this example, we simply advance the step.
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep !== totalSteps) return; // Only allow submit on the last step

    setIsSubmitting(true);
    setSubmitMessage('');

    // --- Mock Submission Logic ---
    console.log("Form Data Submitted:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Application submitted successfully! A representative will contact you shortly.');
      // Optional: Reset form or show a success screen
    }, 2000);
  };

  // Utility component for consistent input styling
  const InputField = ({ label, name, type = 'text', placeholder, required = false, rows = 1 }) => (
    <div className="flex flex-col text-left">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {rows > 1 ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-3 border focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          required={required}
        />
      )}
    </div>
  );

  // Utility component for Yes/No Radio Buttons
  const RadioGroup = ({ label, name, options = ['Yes', 'No'] }) => (
    <div className="flex flex-col text-left">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="mt-1 flex space-x-4 p-3 bg-gray-50 rounded-lg">
        {options.map(option => (
          <label key={option} className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={formData[name] === option}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-indigo-600 border-gray-300 transition duration-150"
            />
            <span className="ml-2 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  // Utility component for Section Headers
  const SectionHeader = ({ title, description }) => (
    <div className="mb-6 pb-2 border-b-2 border-indigo-100">
      <h2 className="text-2xl font-extrabold text-indigo-700">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );

  // Component to display the progress indicator
  const StepIndicator = () => (
    <div className="flex justify-between items-center mb-8">
      {STEPS.map((step) => (
        <div key={step.id} className="flex-1 flex flex-col items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
              currentStep > step.id
                ? 'bg-green-500 text-white'
                : currentStep === step.id
                ? 'bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-300'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step.id}
          </div>
          <p className={`mt-2 text-xs text-center hidden sm:block ${currentStep === step.id ? 'font-bold text-indigo-700' : 'text-gray-500'}`}>
            {step.title}
          </p>
          {step.id < totalSteps && (
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-full h-1 bg-gray-300 -z-10`} />
          )}
        </div>
      ))}
    </div>
  );


  // Function to render the content for the current step
  const renderStepContent = useMemo(() => {
    const currentStepData = STEPS.find(s => s.id === currentStep);
    
    // Default structure for a step
    const StepWrapper = ({ children, description }) => (
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
            <SectionHeader 
                title={`${currentStepData.id}. ${currentStepData.title}`} 
                description={description} 
            />
            {children}
        </div>
    );
    
    switch (currentStep) {
        case 1:
            return (
                <StepWrapper description="Basic details about the institute and proposed trade.">
                    <InputField 
                        label="Name of Institute / Centre" 
                        name="instituteName" 
                        placeholder="e.g., Peshawar Technical College" 
                        required 
                    />
                    <InputField 
                        label="Located and Address (Full)" 
                        name="address" 
                        placeholder="Street, City, District" 
                        rows={2} 
                        required 
                    />
                    <div className="grid sm:grid-cols-2 gap-6">
                        <InputField 
                            label="Date Proposed to Start Classes" 
                            name="dateStartClasses" 
                            type="date" 
                            required 
                        />
                        <InputField 
                            label="Indicate Trade Which is Required" 
                            name="requiredTrade" 
                            placeholder="e.g., Electrician, Welding, Plumbing" 
                            required 
                        />
                    </div>
                </StepWrapper>
            );

        case 2:
            return (
                <StepWrapper description="Information regarding current and proposed teaching staff.">
                    <RadioGroup 
                        label="Is the Staff statement (with qualification/number) attached/available?" 
                        name="staffStatementAttached" 
                    />
                    <InputField 
                        label="If no statement provided, describe institution's proposed appointments." 
                        name="proposedAppointments" 
                        placeholder="Describe your plan for hiring qualified staff." 
                        rows={3} 
                    />
                    <RadioGroup 
                        label="Are the teachers employed on written agreement (if so, copy required)?" 
                        name="teachersAgreement" 
                    />
                    <RadioGroup 
                        label="Is the statement showing salary scales of pay and allowances attached/available?" 
                        name="salaryScalesAttached" 
                    />
                </StepWrapper>
            );

        case 3:
            return (
                <StepWrapper description="Assessment of the institute's financial stability and sources of income.">
                    <RadioGroup 
                        label="Does the institute possess sufficient amount in endowment fund?" 
                        name="endowmentFundSufficient" 
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                        <InputField 
                            label="Balance available in the fund (PKR)" 
                            name="endowmentFundBalance" 
                            type="number"
                            placeholder="e.g., 500000"
                        />
                        <InputField 
                            label="Estimate Annual Expenditure of Institute (PKR)" 
                            name="annualExpenditureEstimate" 
                            type="number"
                            placeholder="e.g., 1500000"
                        />
                    </div>

                    <InputField 
                        label="What are the sources of annual income and assets?" 
                        name="annualIncomeSources" 
                        placeholder="e.g., Tuition fees, Government grants, Donations." 
                        rows={2} 
                        required 
                    />
                    <InputField 
                        label="How has the expected annual income from fees been worked out?" 
                        name="expectedFeeIncomeCalculation" 
                        placeholder="e.g., (Number of students * Average fee per student) x 12 months." 
                        rows={3} 
                        required 
                    />
                </StepWrapper>
            );

        case 4:
            return (
                <StepWrapper description="Details concerning the physical facilities of the centre.">
                    <RadioGroup 
                        label="Does the institute / centre possess building of its own?" 
                        name="buildingOwned" 
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                        <RadioGroup 
                            label="Is the line plan of the building attached/available?" 
                            name="linePlanAttached" 
                        />
                        <RadioGroup 
                            label="Is the building acquired on long lease (if so, copy required)?" 
                            name="longLease" 
                        />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-6">
                        <InputField 
                            label="Number of Class Rooms" 
                            name="classRoomCount" 
                            type="number"
                            placeholder="e.g., 5"
                            required
                        />
                        <RadioGroup 
                            label="Are class rooms properly equipped?" 
                            name="classRoomsEquipped" 
                        />
                        <RadioGroup 
                            label="Are buildings fitted with electric light?" 
                            name="electricLightFitted" 
                        />
                    </div>
                </StepWrapper>
            );

        case 5:
            return (
                <StepWrapper description="Information on resources for practical and theoretical instruction.">
                    <p className="text-gray-700 font-semibold mb-4">Please confirm attachment/availability of the following lists:</p>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <RadioGroup 
                            label="Laboratory Equipments List" 
                            name="labEquipmentListAttached" 
                        />
                        <RadioGroup 
                            label="Applied Trades Equipments List" 
                            name="appliedTradesEquipmentListAttached" 
                        />
                        <RadioGroup 
                            label="Library Books List (for relevant trades)" 
                            name="libraryBooksListAttached" 
                        />
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6 pt-4">
                        <InputField 
                            label="Amount already spent on assets (PKR)" 
                            name="amountSpent" 
                            type="number"
                            placeholder="e.g., 300000"
                            required
                        />
                        <InputField 
                            label="Future Estimated Budget for assets (PKR)" 
                            name="futureBudget" 
                            type="number"
                            placeholder="e.g., 100000"
                            required
                        />
                    </div>
                </StepWrapper>
            );

        case 6:
            return (
                <StepWrapper description="Required details for the institute's principal partners and final declaration.">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Partner 1 */}
                        <div className="space-y-4 border p-4 rounded-lg bg-indigo-50/50">
                            <h3 className="font-bold text-lg text-indigo-700">Partner / Owner 1</h3>
                            <InputField 
                                label="Full Name" 
                                name="partner1Name" 
                                required 
                            />
                            <InputField 
                                label="C.N.I.C. No." 
                                name="partner1CNIC" 
                                placeholder="e.g., 17301-xxxxxxx-x" 
                                required 
                            />
                            <p className="pt-2 text-xs text-gray-500 italic">
                                (Signature will be required on the physical form or verified digitally upon submission.)
                            </p>
                        </div>

                        {/* Partner 2 */}
                        <div className="space-y-4 border p-4 rounded-lg bg-indigo-50/50">
                            <h3 className="font-bold text-lg text-indigo-700">Partner / Owner 2</h3>
                            <InputField 
                                label="Full Name" 
                                name="partner2Name" 
                            />
                            <InputField 
                                label="C.N.I.C. No." 
                                name="partner2CNIC" 
                                placeholder="e.g., 17301-xxxxxxx-x" 
                            />
                            <p className="pt-2 text-xs text-gray-500 italic">
                                (Fields optional if only one partner.)
                            </p>
                        </div>
                    </div>

                    {/* Final Declaration Fields */}
                    <div className="mt-8 grid sm:grid-cols-2 gap-6">
                        <InputField 
                            label="Place of Declaration" 
                            name="declarationPlace" 
                            placeholder="City Name" 
                            required 
                        />
                        <InputField 
                            label="Date of Application" 
                            name="declarationDate" 
                            type="date" 
                            required 
                        />
                    </div>
                    
                    <p className="mt-8 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-sm border-l-4 border-yellow-500">
                        <span className="font-bold">Important:</span> This online application must be supplemented with all required physical documents/statements as mentioned in sections 2, 4, and 5.
                    </p>
                </StepWrapper>
            );

        default:
            return <p className="text-center text-red-500">Error: Invalid step.</p>;
    }
  }, [currentStep, formData]);


  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-800">
            Affiliation & Registration Application
          </h1>
          <p className="mt-2 text-md text-gray-600">
            GOVT OF KHYBER PAKHTUKHWA TRADE TESTING BOARD
          </p>
        </header>
        
        {/* Step Progress Bar */}
        <div className="relative mb-12 px-2">
            <StepIndicator />
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Current Step Content */}
          <div className="mb-8 min-h-[400px]">
            {renderStepContent}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md">
            {/* Previous Button */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1 || isSubmitting}
              className="px-6 py-3 text-md font-semibold rounded-lg text-gray-600 border border-gray-300 bg-gray-50 hover:bg-gray-100 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &larr; Previous
            </button>

            {/* Next / Submit Button */}
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 text-md font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-lg font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 transition duration-150 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
          
          {/* Submission Message */}
          {submitMessage && (
            <div className="text-center mt-6">
                <p className="p-4 bg-green-100 text-green-700 rounded-xl font-medium shadow-md">
                    {submitMessage}
                </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
