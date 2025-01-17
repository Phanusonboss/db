<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
//use Inertia\Response;
class EmployeeController extends Controller
{
    public function index(Request $request)

{
    $query = $request->input('search');
$sort = $request->input('sort', 'emp_no'); // Default sorting column
$direction = $request->input('direction', 'asc'); // Default direction is 'asc'

$employees = DB::table("employees")
    ->where(function($q) use ($query) {
        $q->where('first_name', 'like', '%' . $query . '%')
          ->orWhere('last_name', 'like', '%' . $query . '%')
          ->orWhere('emp_no', 'like', '%' . $query . '%');
    })
    ->orderBy($sort, $direction)
    ->paginate(20);

return Inertia::render('Employee/Index', [
    'employees' => $employees,
    'query' => $query,
    'sort' => $sort,
    'direction' => $direction,
]);

}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      // ดึงรายชื่อแผนกจากฐานข%อมูล เพื่อไปแสดงให%เลือกรายการในแบบฟอร,ม

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
