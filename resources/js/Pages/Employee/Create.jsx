import { useForm } from '@inertiajs/react';

export default function Create({ departments }) {
    const { data, setData, post, errors } = useForm({
        first_name: '',
        last_name: '',
        birth_date: '',
        hire_date: '',  // ฟิลด์ hire_date ถูกกำหนดใน useForm
        gender: '',
        dept_no: '', // ฟิลด์ dept_no ถูกกำหนดใน useForm
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employees'); // ส่งข้อมูลไปยัง EmployeeController/store
    };

    const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-gray-600 font-medium">First Name:</label>
                    <input
                        id="first_name"
                        type="text"
                        value={data.first_name}
                        required
                        onChange={(e) => setData('first_name', e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-gray-600 font-medium">Last Name:</label>
                    <input
                        id="last_name"
                        type="text"
                        value={data.last_name}
                        required
                        onChange={(e) => setData('last_name', e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="birth_date" className="block text-gray-600 font-medium">Birth Date:</label>
                    <input
                        id="birth_date"
                        type="date"
                        value={data.birth_date}
                        required
                        onChange={(e) => setData('birth_date', e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.birth_date && <span className="text-red-500 text-sm">{errors.birth_date}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="hire_date" className="block text-gray-600 font-medium">Hire Date:</label>
                    <input
                        id="hire_date"
                        type="date"
                        value={data.hire_date}
                        required
                        onChange={(e) => setData('hire_date', e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.hire_date && <span className="text-red-500 text-sm">{errors.hire_date}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-600 font-medium">Gender:</label>
                    <select
                        id="gender"
                        value={data.gender}
                        required
                        onChange={(e) => setData('gender', e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="dept_no" className="block text-gray-600 font-medium">Department:</label>
                    <select
                        id="dept_no"
                        value={data.dept_no}
                        required
                        onChange={(e) => setData('dept_no', e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.dept_no} value={dept.dept_no}>
                                {dept.dept_name}
                            </option>
                        ))}
                    </select>
                    {errors.dept_no && <span className="text-red-500 text-sm">{errors.dept_no}</span>}
                </div>
                {/* เพิ่มฟิลด์สำหรับอัปโหลดรูปภาพ */}
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-gray-600 font-medium">Photo:</label>
                    <input
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setData('photo', e.target.files[0])} // เก็บไฟล์ใน state
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.photo && <span className="text-red-500 text-sm">{errors.photo}</span>}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add Employee
                </button>
            </form>
        </div>
    );
}
