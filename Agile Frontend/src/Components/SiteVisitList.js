import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import xlsx library

const SiteVisitList = () => {
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch site visits
  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/sitevisits');
        if (!response.ok) {
          throw new Error('Failed to fetch site visits');
        }
        const data = await response.json();
        setVisits(data);
        setFilteredVisits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVisits();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchId(value);
    if (value.trim() === '') {
      setFilteredVisits(visits);
    } else {
      const filtered = visits.filter((visit) =>
        visit.sideId.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVisits(filtered);
    }
  };

  const clearSearch = () => {
    setSearchId('');
    setFilteredVisits(visits);
  };

  // Function to download Excel file
  const downloadExcel = () => {
    // Prepare data for Excel
    const data = filteredVisits.map((visit) => ({
      'Side ID': visit.sideId,
      'Side Name': visit.sideName,
      'Side Address': visit.sideAddress,
      'Visit Date': new Date(visit.visitDate).toLocaleDateString(),
      'Visit Day': visit.visitDay || '-',
      'Visit Time Issue': visit.visitTimeIssue || '-',
      'Issues After Visit': visit.issueAfterVisit || '-',
      'Asans Quantity': visit.asansQuantity || '-',
      'MQTT Quantity': visit.mqqtQuantity || '-',
      'Last Visit': visit.lastVisit || '-',
      'Created At': new Date(visit.createdAt).toLocaleDateString(),
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Site Visits');

    // Set column widths (optional, for better readability)
    const wscols = [
      { wch: 15 }, // Side ID
      { wch: 20 }, // Side Name
      { wch: 30 }, // Side Address
      { wch: 15 }, // Visit Date
      { wch: 15 }, // Visit Day
      { wch: 20 }, // Visit Time Issue
      { wch: 20 }, // Issues After Visit
      { wch: 15 }, // Asans Quantity
      { wch: 15 }, // MQTT Quantity
      { wch: 15 }, // Last Visit
      { wch: 15 }, // Created At
    ];
    worksheet['!cols'] = wscols;

    // Generate and download the Excel file
    XLSX.writeFile(workbook, 'Site_Visits.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 tracking-tight">
          Site Visit Records
        </h2>

        {/* Search Box and Download Button */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <label htmlFor="searchId" className="block text-sm font-medium text-gray-700 mb-2">
              Search by Side ID
            </label>
            <div className="relative">
              <input
                type="text"
                id="searchId"
                value={searchId}
                onChange={handleSearch}
                placeholder="Enter Side ID"
                className="block w-full rounded-lg border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {searchId && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <button
            onClick={downloadExcel}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150 ease-in-out"
            disabled={filteredVisits.length === 0 || loading}
          >
            Download Excel
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
            <span className="ml-4 text-gray-600 text-lg">Loading site visits...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <p className="font-medium">Error: {error}</p>
            <p>Please check the backend server and try again.</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
              <thead className="bg-indigo-50">
                <tr>
                  {[
                    'Side ID',
                    'Side Name',
                    'Side Address',
                    'Visit Date',
                    'Visit Day',
                    'Visit Time Issue',
                    'Issues After Visit',
                    'Asans Quantity',
                    'MQTT Quantity',
                    'Last Visit',
                    'Created At',
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVisits.length > 0 ? (
                  filteredVisits.map((visit, index) => (
                    <tr
                      key={visit._id}
                      className={`transition duration-150 ease-in-out ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-indigo-100`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.sideId}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.sideName}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.sideAddress}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(visit.visitDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.visitDay || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.visitTimeIssue || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.issueAfterVisit || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.asansQuantity || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.mqqtQuantity || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{visit.lastVisit || '-'}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(visit.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="px-6 py-6 text-center text-sm text-gray-500">
                      No site visits found. Try adjusting your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteVisitList;