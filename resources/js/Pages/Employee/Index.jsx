import { router } from '@inertiajs/react';
import React, { useState } from 'react';

const EmployeeList = ({ employees, query, sort, direction }) => {
    const [search, setSearch] = useState(query || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/employees', { search });
    };

    const handleSort = (column) => {
        router.get('/employees', {
            search,
            sort: column,
            direction: sort === column && direction === 'asc' ? 'desc' : 'asc',
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                Employee List
            </h1>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6 flex justify-center">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search by first or last name"
                />
                <button
                    type="submit"
                    className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </form>

            {/* Table */}
            {employees.data.length === 0 ? (
                <div className="text-center text-gray-600 text-lg mt-8">No results found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border border-gray-200 shadow-md bg-white rounded-lg">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <tr>
                                <th
                                    className="py-3 px-6 text-left cursor-pointer hover:text-blue-500"
                                    onClick={() => handleSort('emp_no')}
                                >
                                    ID
                                </th>
                                <th
                                    className="py-3 px-6 text-left cursor-pointer hover:text-blue-500"
                                    onClick={() => handleSort('first_name')}
                                >
                                    First Name
                                </th>
                                <th
                                    className="py-3 px-6 text-left cursor-pointer hover:text-blue-500"
                                    onClick={() => handleSort('last_name')}
                                >
                                    Last Name
                                </th>
                                <th
                                    className="py-3 px-6 text-left cursor-pointer hover:text-blue-500"
                                    onClick={() => handleSort('birth_date')}
                                >
                                    Age
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {employees.data.map((employee, index) => (
                                <tr
                                    key={index}
                                    className={`border-b ${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                                >
                                    <td className="py-3 px-6 text-left">{employee.emp_no}</td>
                                    <td className="py-3 px-6 text-left">{employee.first_name}</td>
                                    <td className="py-3 px-6 text-left">{employee.last_name}</td>
                                    <td className="py-3 px-6 text-left">{employee.birth_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                {employees.links &&
                    employees.links.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => router.get(link.url)}
                            className={`px-3 py-2 mx-1 border rounded-md ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
            </div>
        </div>
    );
};

export default EmployeeList;
