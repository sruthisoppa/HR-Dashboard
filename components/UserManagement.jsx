import { useState, useCallback } from 'react';
import UserCard from '../components/UserCard';

function CreateUserModal({ isOpen, onClose, onCreate }) {
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    category: '',
    address: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const validate = useCallback(() => {
    const errs = {};

    // Validation for First Name
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    else if (formData.firstName.trim().length < 2)
      errs.firstName = 'First name must be at least 2 characters';

    // Validation for Last Name
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    else if (formData.lastName.trim().length < 2)
      errs.lastName = 'Last name must be at least 2 characters';

    // Existing email validation
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Email is invalid';

    // Age validation
    if (formData.age && (isNaN(formData.age) || formData.age < 0))
      errs.age = 'Age must be a positive number';

    // Phone validation
    if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone))
      errs.phone = 'Invalid phone number';

    return errs;
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length === 0) {
        onCreate({ ...formData, id: Date.now() });
        setFormData(initialFormData);
        setErrors({});
        onClose();
      } else {
        setErrors(errs);
      }
    },
    [formData, onCreate, onClose, validate]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="createUserTitle">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full shadow-lg dark:bg-gray-800" role="document">
        <h2 id="createUserTitle" className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">Create New User</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 " noValidate>
          
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 font-medium text-gray-700 dark:text-white">First Name</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.firstName ? 'border-red-500' : ''}`}
              aria-invalid={errors.firstName ? "true" : "false"}
              aria-describedby="firstName-error"
            />
            {errors.firstName && <p id="firstName-error" className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1 font-medium text-gray-700 dark:text-white">Last Name</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${errors.lastName ? 'border-red-500' : ''}`}
              aria-invalid={errors.lastName ? "true" : "false"}
              aria-describedby="lastName-error"
            />
            {errors.lastName && <p id="lastName-error" className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700 dark:text-white">Email</label>
            <input
              id="email"
              type="email"
              placeholder="example@domain.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <label htmlFor="age" className="mb-1 font-medium text-gray-700 dark:text-white">Age</label>
            <input
              id="age"
              type="number"
              placeholder="e.g., 30"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              aria-invalid={errors.age ? "true" : "false"}
              aria-describedby="age-error"
            />
            {errors.age && <p id="age-error" className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-1 font-medium text-gray-700 dark:text-white">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            >
              <option value="">Select Category</option>
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="mb-1 font-medium text-gray-700 dark:text-white">Address</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              placeholder="Street, City, Zip"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
            ></textarea>
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-1 font-medium text-gray-700 dark:text-white">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby="phone-error"
            />
            {errors.phone && <p id="phone-error" className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UserManagement() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  const handleCreateUser = useCallback((user) => {
    setUsers(prev => [...prev, user]);
  }, []);

  return (
    
   <div>
      
<div className="fixed bottom-4 right-4 z-50">
  <button
    onClick={() => setCreateModalOpen(true)}
    className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition shadow-lg"
    aria-label="Create User"
  >
    {/* Plus icon */}
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
    </svg>
  </button>
</div>

      {/* Button to open modal */}
      
      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateUser}
      />

      {/* User List */}
      <div >
  {users.map((user) => (
    <UserCard key={user.id} user={user} />
  ))}
</div>

    </div>
  );
}