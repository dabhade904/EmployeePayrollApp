const stringfyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" :
        new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

const update = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._name == node.name)
    if (!employeePayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayrollData))
    window.location.replace(site_properties.add_emp_payroll_page);
}