let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.text-error', "");
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;
            setTextValue('.text-error', "");
        }
        catch (e) {
            setTextValue('.text-error', e)
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});


// window.addEventListener('DOMContentLoaded', (event) => {
//     const name = document.querySelector('#name');
//     name.addEventListener('input', function () {
//         if (name.value.length == 0) {
//             setTextValue('.text-error', " ");
//             return;
//         }
//         try {
//             (new EmployeePayroll()).name = name.value;
//             setTextValue('.text-error', " ");
//         }
//         catch (e) {
//             setTextValue('.text-error', e);
//         }
//     })

//     const date = document.querySelector('#date');
//     date.addEventListener('input', function () {
//         const startDate = new Date(Date.parse(getInputValueById('#day') + " " +
//             getInputValueById('#month') + "" +
//             getInputValueById('#year')));

//         try {
//             (new EmployeePayroll()).startDate = startDate;
//             setTextValue('.date-error', " ");
//         } catch (e) {
//             setTextValue('.date-error', e);
//         }
//     });

//     const salary = document.querySelector('#salary');
//     setTextValue('.salary-output', salary.value);
//     salary.addEventListener('input', function () {
//         setTextValue('.salary-output', salary.value);
//     })
//     checkForUpdate();
// })

// const save=()=>{
//     try{
//         let employeePayrollData=createEmployeePayroll();
//         createAndUpdateStorage(employeePayrollData);
//     }catch(e){
//         return
//     }
// }


const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }
    catch (e) {
        return;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayroll();
    try {
        employeePayrollData._name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData._department = getSelectedValues('[name=department]');
    employeePayrollData._salary = getInputValueById('#salary');
    employeePayrollData._note = getInputValueById('#notes');
    // let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    // employeePayrollData._startDate = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

// const createAndUpdateStorage = (employeePayrollData) => {
//     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
//     if (employeePayrollList != undefined) {
//         employeePayrollList.push(employeePayrollData);
//     } else {
//         employeePayrollList = [employeePayrollData]
//     }
//     alert(employeePayrollList.toString());
//     localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
// }

const createAndUpdateStorage=()=>{
   let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
   if(employeePayrollList){
    let employeePayrollData=employeePayrollList.
                            find(empDate=> empDate._name == employeePayrollObj._name);
    if(!employeePayrollData){
        employeePayrollList.push(createEmployeePayrollData());
    }else{
        const index=employeePayrollList
                    .map(empData=>empData._name)
                    .indexOf(employeePayrollData._name);
        employeePayrollList.splice(index,1,createEmployeePayrollData(employeePayrollData._name));
    }
   }else{
    employeePayrollList=[createEmployeePayroll()]
   }
   localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}


const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
}




const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked)
            setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}



const createEmployeePayrollData = (name) => {
    let employeePayrollData = new EmployeePayroll();
    if (!name) employeePayrollData._name = createEmployeeName();
    else employeePayrollData._name = name;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData._name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData._profilePic = employeePayrollObj._profilePic;
    employeePayrollData._gender = employeePayrollObj._gender;
    employeePayrollData._department = employeePayrollObj._department;
    employeePayrollData._salary = employeePayrollObj._salary;
    employeePayrollData._note = employeePayrollObj._note;
    // try {
    //     employeePayrollData._startDate = new Date(Date.parse(employeePayrollObj._startDate));
    // } catch (e) {
    //     setTextValue('.date-error', e);
    //     throw e;
    // }
    alert(employeePayrollData.toString());
}

const createEmployeeName = () => {
    let empName = localStorage.getItem("EmployeeName");
    empName = !empName ? 1 : (parseInt(empName) + 1).toString();
    localStorage.setItem("EmployeeName", empName);
    return empName;
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    // let date=stringfyDate(employeePayrollObj._startDate).split(" ");
    // setValue('#day', date[0]);
    // setValue('#month', date[1]);
    // setValue('#year', date[2]);
}

const resetForm = () => {
    setValue('#name');
    unSetSelectedValues('[name=profile]');
    unSetSelectedValues('[name=gender]');
    unSetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    // setSelectedIndex('#day', 0);
    // setSelectedIndex('#month', 0);
    // setSelectedIndex('#year', 0);
}

const unSetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
