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
Log::info(session('success')); // ตรวจสอบว่ามีค่าใน session หรือไม่

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
    'direction' => $direction,]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
      // ดึงรายชื่อแผนกจากฐานข%อมูล เพื่อไปแสดงให%เลือกรายการในแบบฟอร์ม
        $departments = DB::table('departments')->select('dept_no', 'dept_name')->get();

         // ส่งข้อมูลไปยังหน้า Inertia
        return inertia('Employee/Create', ['departments' => $departments]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // เพิ่ม validation สำหรับไฟล์ภาพ
    $validated = $request->validate([
        'first_name' => 'required|string|max:255',
        'last_name' => 'required|string|max:255',
        'birth_date' => 'required|date',
        'hire_date' => 'required|date',
        'gender' => 'required|in:M,F', // Assuming gender is either M or F
        'dept_no' => 'required|exists:departments,dept_no', // Ensure the department exists
        'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Validation สำหรับรูปภาพ
    ]);

    DB::transaction(function () use ($validated, $request) {
        // สร้างหมายเลขพนักงานใหม่
        $latestEmpNo = DB::table('employees')->max('emp_no') ?? 0;
        $newEmpNo = $latestEmpNo + 1;

        // ตรวจสอบและบันทึกรูปภาพถ้ามีการอัปโหลด
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public'); // บันทึกในโฟลเดอร์ storage/public/photos
        }

        // บันทึกข้อมูลพนักงานในตาราง employees
        DB::table('employees')->insert([
            'emp_no' => $newEmpNo,
            'birth_date' => $validated['birth_date'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'gender' => $validated['gender'],
            'hire_date' => $validated['hire_date'],
            'photo' => $photoPath, // เพิ่มฟิลด์ photo (ถ้ามีในฐานข้อมูล)
        ]);

        // บันทึกข้อมูลในตาราง dept_emp
        DB::table('dept_emp')->insert([
            'emp_no' => $newEmpNo,
            'dept_no' => $validated['dept_no'],
            'from_date' => now(),
            'to_date' => '9999-01-01',
        ]);
    });

    try {
        // ส่งกลับไปหน้ารายการพนักงานพร้อมข้อความแจ้งเตือน
        return redirect()->route('employees.index')
            ->with('success', 'Employee created successfully.');
    } catch (\Exception $e) {
        return back()->with('error', 'Failed to create employee. Please try again.');


    }
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
