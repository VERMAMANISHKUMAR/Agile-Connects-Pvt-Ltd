import React, { useState } from 'react';

const SiteVisitForm = () => {
  const [formData, setFormData] = useState({
    sideId: '',
    sideName: '',
    sideAddress: '',
    visitDate: '',
    visitDay: '',
    visitTimeIssue: '',
    issueAfterVisit: '',
    asansQuantity: '',
    mqqtQuantity: '',
    lastVisit: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.sideId.trim()) newErrors.sideId = 'Side ID is required';
    if (!formData.sideName.trim()) newErrors.sideName = 'Side Name is required';
    if (!formData.sideAddress.trim()) newErrors.sideAddress = 'Side Address is required';
    if (!formData.visitDate) newErrors.visitDate = 'Visit Date is required';
    if (!formData.visitDay.trim()) newErrors.visitDay = 'Visit Day is required';
    if (!formData.visitTimeIssue.trim()) newErrors.visitTimeIssue = 'Visit Time Issue is required';
    if (!formData.issueAfterVisit.trim()) newErrors.issueAfterVisit = 'Issue After Visit is required';
    if (!formData.asansQuantity.trim()) newErrors.asansQuantity = 'Asans Quantity is required';
    if (!formData.mqqtQuantity.trim()) newErrors.mqqtQuantity = 'MQTT Quantity is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    console.log('Submitting Form Data:', formData); // Log the data being sent

    try {
      const response = await fetch('http://localhost:5000/api/sitevisits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to submit form: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Form Data Submitted Successfully:', result);
      alert('Form submitted successfully!');
      setFormData({
        sideId: '',
        sideName: '',
        sideAddress: '',
        visitDate: '',
        visitDay: '',
        visitTimeIssue: '',
        issueAfterVisit: '',
        asansQuantity: '',
        mqqtQuantity: '',
        lastVisit: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Submission Error:', error);
      setSubmitError(error.message || 'Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-indigo-700">Site Visit Form</h2>
        {submitError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'sideId', label: 'Side ID', placeholder: 'Enter side ID', required: true },
              { name: 'sideName', label: 'Side Name', placeholder: 'Enter side name', required: true },
              { name: 'sideAddress', label: 'Side Address', placeholder: 'Enter side address', required: true },
              { name: 'visitDate', label: 'Side Visit Date', type: 'date', required: true },
              { name: 'visitDay', label: 'Side Visit Day', placeholder: 'e.g., Monday', required: true },
              { name: 'visitTimeIssue', label: 'Visit Time Issue', placeholder: 'Enter time issue', required: true },
              { name: 'issueAfterVisit', label: 'Issues After Visit', placeholder: 'Describe any issues', required: true },
              { name: 'asansQuantity', label: 'Asans Quantity', placeholder: 'Enter asans quantity', required: true },
              { name: 'mqqtQuantity', label: 'MQTT Quantity', placeholder: 'Enter MQTT quantity', required: true },
              { name: 'lastVisit', label: 'Last Time Visited', placeholder: 'Enter last visit date' },
            ].map(({ name, label, type = 'text', placeholder, required = false }) => (
              <div key={name} className="relative">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                  {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={required}
                  className={`block w-full rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-300'} py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out`}
                />
                {errors[name] && (
                  <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-48 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SiteVisitForm;