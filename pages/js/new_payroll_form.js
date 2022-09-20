window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;;
            textError.textContent = "";
        }
        catch (e) {
            textError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});

const save = ()=>{
    try{
        let employeePayrollData=createEmployeePayroll();
        createAndUpdateStorege(employeePayrollData);
    }catch(e){
        return
    }
}

const createEmployeePayroll=()=>{
    let employeePayrollData=new EmployeePayroll();
    try{
        employeePayrollData._name=getInputValueById('#name');
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData._profilePic=getSelectedValues('[name=profile]').pop();
    employeePayrollData._gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData._department=getSelectedValues('[name=department]');
    employeePayrollData._salary=getInputValueById('#salary');
    employeePayrollData._note=getInputValueById('#notes');
    let date=getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData._startDate=Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    let setItems=[];
    allItems.forEach(item=>{
        if(item.checked)
        setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById=(id)=>{
    let value=document.querySelector(id).value;
    return value;
}

const getInputElementValue=(id)=>{
    let value=document.getElementById(id).value;
    return value;
}

function createAndUpdateStorege(employeePayrollData){
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList=[employeePayrollData]
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}