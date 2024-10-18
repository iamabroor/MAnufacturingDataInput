import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormData {
  operation: string;
  equipment: string;
  product: string;
  production: number;
  location: string;
  waste: number;
  wasteUnit: string;
  downtime: { hours: number; minutes: number; cause: string };
}

const initialFormData: FormData = {
  operation: '',
  equipment: '',
  product: '',
  production: 0,
  location: '',
  waste: 0,
  wasteUnit: 'No.',
  downtime: { hours: 'hours', minutes: 'minutes', cause: '' },
};

const operations = [
  'Moulding',
  'Extrusion',
  'Spring',
  'Assembly',
  'Final Assembly',
  'Packaging/Palletizing',
];

const equipmentOptions: { [key: string]: string[] } = {
  Moulding: [
    'Injection Molding Machine 1 (IMM1)',
    'Injection Molding Machine 2 (IMM2)',
    'Injection Molding Machine 3 (IMM3)',
  ],
  Extrusion: ['Dip Tube Extrusion'],
  Spring: ['Spring Machine'],
  Assembly: ['Sub-Assembly Machine (SAM)'],
  'Final Assembly': ['Final Assembly Machine (FAM)'],
  'Packaging/Palletizing': ['Packaging'],
};

const productOptions: { [key: string]: string[] } = {
  Moulding: ['Nozzles', 'Chaplets', 'Piston', 'Skirt', 'Housing'],
  Extrusion: [
    '82mm Dip Tube',
    '114mm Dip Tube',
    '150mm Dip Tube',
    'Dip Tube 4',
    'Dip Tube 5',
    'Dip Tube 6',
  ],
  Spring: ['0.9mm Spring', '1.0mm Spring'],
  Assembly: ['Sub-Assembly'],
  FinalAssembly: ['Final Assembly'],
  PackagingPalletizing: ['Packaged Product'],
};

const locationOptions = [
  'Clean Room Storage',
  'Warehouse Storage',
  'Used Rightaway',
];

const DataInputForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [downtimeCauses, setDowntimeCauses] = useState<string[]>([]);

  useEffect(() => {
    // Simulating fetching downtime causes from an API
    setDowntimeCauses([
      'Machine Breakdown',
      'Material Shortage',
      'Changeover',
      'Maintenance',
      'Other',
    ]);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleDowntimeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      downtime: {
        ...prev.downtime,
        [name]: name === 'cause' ? value : Number(value),
      },
    }));
    setErrors((prev) => ({ ...prev, downtime: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.operation) newErrors.operation = 'Operation is required';
    if (!formData.equipment) newErrors.equipment = 'Equipment is required';
    if (!formData.product) newErrors.product = 'Product is required';
    if (formData.production <= 0)
      newErrors.production = 'Production must be greater than 0';
    if (!formData.location) newErrors.location = 'Location is required';
    if (formData.waste < 0) newErrors.waste = 'Waste cannot be negative';
    if (
      formData.downtime.hours < 0 ||
      formData.downtime.minutes < 0 ||
      formData.downtime.minutes > 59
    ) {
      newErrors.downtime = 'Invalid downtime';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData(initialFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="operation"
            className="block text-sm font-medium text-gray-700"
          >
            Operation*
          </label>
          <select
            id="operation"
            name="operation"
            value={formData.operation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Operation</option>
            {operations.map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
          {errors.operation && (
            <p className="mt-1 text-sm text-red-600">{errors.operation}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="equipment"
            className="block text-sm font-medium text-gray-700"
          >
            Equipment*
          </label>
          <select
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Equipment</option>
            {formData.operation &&
              equipmentOptions[formData.operation].map((eq) => (
                <option key={eq} value={eq}>
                  {eq}
                </option>
              ))}
          </select>
          {errors.equipment && (
            <p className="mt-1 text-sm text-red-600">{errors.equipment}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="product"
            className="block text-sm font-medium text-gray-700"
          >
            Product*
          </label>
          <select
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Product</option>
            {formData.operation &&
              productOptions[formData.operation].map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
          </select>
          {errors.product && (
            <p className="mt-1 text-sm text-red-600">{errors.product}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="production"
            className="block text-sm font-medium text-gray-700"
          >
            Production*
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="production"
              id="production"
              value={formData.production}
              onChange={handleInputChange}
              className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">units</span>
            </div>
          </div>
          {errors.production && (
            <p className="mt-1 text-sm text-red-600">{errors.production}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location*
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Location</option>
            {locationOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="waste"
            className="block text-sm font-medium text-gray-700"
          >
            Waste
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="waste"
              id="waste"
              value={formData.waste}
              onChange={handleInputChange}
              className="block w-full pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <select
                name="wasteUnit"
                value={formData.wasteUnit}
                onChange={handleInputChange}
                className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="No.">No.</option>
                <option value="kg">kg</option>
                <option value="L">L</option>
              </select>
            </div>
          </div>
          {errors.waste && (
            <p className="mt-1 text-sm text-red-600">{errors.waste}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Downtime
        </label>
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="number"
              name="hours"
              value={formData.downtime.hours}
              onChange={handleDowntimeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Hours"
              min="0"
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              name="minutes"
              value={formData.downtime.minutes}
              onChange={handleDowntimeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Minutes"
              min="0"
              max="59"
            />
          </div>
          <div className="flex-1">
            <select
              name="cause"
              value={formData.downtime.cause}
              onChange={handleDowntimeChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select Cause</option>
              {downtimeCauses.map((cause) => (
                <option key={cause} value={cause}>
                  {cause}
                </option>
              ))}
            </select>
          </div>
        </div>
        {errors.downtime && (
          <p className="mt-1 text-sm text-red-600">{errors.downtime}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm text-gray-600">
            Fields marked with * are required
          </span>
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Data
        </button>
      </div>
    </form>
  );
};

export default DataInputForm;
