let employeePayrollList;
window.addEventListener('DOMContentLoaded',(event)=>{
    employeePayrollList=getEmpPayrollFromLocalStorage();
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
})
const getEmpPayrollFromLocalStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>" +
        "<th>Salary</th><th>State Date</th><th>Actions</th>";
    if (employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const empPayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
    <tr>
        <td>
            <img class="profile" src="${empPayrollData._profilePic}" alt=""
                style="width: 40px; border-radius: 50%; margin-left: 12px;">
        </td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>
            ${getDetpHtml(empPayrollData._department)}
        </td>
        <td>${empPayrollData._salary}</td>
        <td>${stringfyDate(empPayrollData._startDate)}</td>
        <td>
            <img name="${empPayrollData._name}" onclick="remove(this)" alt="Delete" src="assets/delete.svg"
                style="width: 20px; border-radius: 0%; margin-left: 12px;">
            <img name="${empPayrollData._name}" onclick="update(this)" alt="Edit" src="assets/edit.png"
                style="width: 20px; border-radius: 0%; margin-left: 12px;">
        </td>
    </tr>
    `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}
const getDetpHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData._name === node.name);
    if (!employeePayrollData) return;
    const index = employeePayrollList
        .map(empData => empData._name)
        .indexOf(employeePayrollData._name);
        employeePayrollList.splice(index, 1);
    localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
}
