const controlars=['Email','CheckBox','Radio','Text','Password','Submit','Reset','Dropdown',]
console.log(controlars,'controlars')
let controlDropDown=document.getElementById('cntrl')
console.log(controlDropDown,"controlDropDown")
for(const controls of controlars ){
let controlPostion=document.createElement('option')
controlPostion.text=controls;
controlDropDown.add(controlPostion)
}


document.getElementById('controlevntt').addEventListener('submit',function(event){
    event.preventDefault();
let formname=document.getElementById('formname').value.trim();
let controlname=document.getElementById('controlname').value.trim();
let controltype=controlDropDown.value.trim();
console.log("controltype",controltype)
let controlposition=document.getElementById('controlposition').value.trim();
let attrtibute=document.getElementById('attrtibute').value.trim();
let checkbox = document.querySelector('input[id="checkbox"]');
let selectCheckbox = checkbox.checked ? checkbox.value : "false";
console.log(formname,controlname,controltype,controlposition, checkbox.checked,"result")
var isValid = true;
if (selectCheckbox.length === 0) {
    isValid = false;
    setError("selectCheckbox", "Please select checkbox");
  } else {
    clearError("selectCheckbox");
  }
  if (!controlposition) {
    isValid = false;
    setError("controlposition", "Control Position field is required.");
  }else if(!(controlposition >= 48 || controlposition <= 57)) {
    isValid = false;
        alert("Control Position field is required only numbers");
    }  
  else if (controlposition.length > 15 || isNaN(controlposition)) {
    isValid = false;
    setError("controlposition", "Control Position must be between 1 and 15 numbers.");
  } else {
    clearError("controlposition");
  }
if (!controltype) {
    isValid = false;
    setError("controltypee", "Control Type field is required.");
  }
   else {
    clearError("controltypee");
  }
if(!controlname){
    isValid = false;
    setError("controlname", "Control Name field is required.");
  }
  else if ( controlname.length > 15) {
    isValid = false;
    setError("controlname","Control Name must be between 1 and 15 characters.");
  } else {
    clearError("controlname");
  }
  if(!attrtibute&&(controltype==="CheckBox"||controltype==="Radio")){
    isValid = false;
    setError("attrtibute", "Attrtibute Name field is required.");
  }
  else if ( attrtibute.length > 30&&(controltype==="CheckBox"||controltype==="Radio")) {
    isValid = false;
    setError("attrtibute","Attrtibute Name must be between 1 and 30 characters.");
  } else {
    clearError("attrtibute");
  }
  if(!formname){
    isValid = false;
    setError("formname", "Form Name field is required.");
  }
  else if ( formname.length > 15) {
    isValid = false;
    setError("formname","Form Name must be between 1 and 15 characters.");
  } else {
    clearError("formname");
  }
  if (!isValid) {
    if(!formname||!selectCheckbox.length === 0||!controlposition||!controltype||!controlname){
      alert('All field are required');
    } else {
     alert('Input field or fields are mismatched, please check once again given data');
 } 
} else {
    saveDataForm();
}
});

function setError(id, message) {
    console.log(id, message,"id")
    var errorElement = document.getElementById(id + "_error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
    document.getElementById(id + "_success").textContent = "";
  }

function clearError(id) {
console.log(id,'clr')
var element = document.getElementById(id);

  document.getElementById(id + "_error").textContent = "";
  if (id === "selectCheckbox"||id==='controltypee') {
    var checked = document.querySelector('input[name="' + id.toLowerCase() + '"]:checked');
    //console.log("controltypee",controltype)
    if (checked||id==='controltypee') {
      document.getElementById(id + '_success').textContent = `Successfully filled ${id.toLowerCase()}`;
    } else {
      document.getElementById(id + '_success').textContent = '';
    }
  } else if (element !== "") {
    document.getElementById(id + '_success').textContent = `Successfully filled ${id}`;
  } else {
    document.getElementById(id + "_success").textContent = '';
  }

}






// let defaultFormName = "form1"; // Get the default form name
// console.log("defaultFormName",defaultFormName)
// updateControlPosition(defaultFormName);
// let defaultFormName2 = "form2"; // Get the default form name
// console.log("defaultFormName",defaultFormName2)
// updateControlPosition(defaultFormName2);

function saveDataForm() {
  //let fetchstoredData=JSON.parse(localStorage.getItem('controlsData'))||[];
  let fetchStoredData = JSON.parse(localStorage.getItem('controlsData')) || [];
  console.log("fetchStoredData",fetchStoredData)
  let controlposition=document.getElementById('controlposition').value.trim();
  let formname=document.getElementById('formname').value.trim();
  let existingUser = false;
  // for (let i = 0; i < fetchStoredData.length; i++) {
  //     if (fetchStoredData[i].FormName === formname&&fetchStoredData[i].Controls[i].ControlPosition === controlposition) { 
  //       alert("Control Position Value already exists");
  //       existingUser = true;
  //       break; 
  //     }
  // } 
  
for (let i = 0; i < fetchStoredData.length; i++) {
  if (fetchStoredData[i].FormName === formname) {
      // Loop through the Controls array of the current object
      for (let j = 0; j < fetchStoredData[i].Controls.length; j++) {
          if (fetchStoredData[i].Controls[j].ControlPosition === controlposition) {
              alert("Control Position Value already exists");
              existingUser = true;
              break;
          }
      }
    }
  }
  if(!existingUser){
//     let id= new Date().getMilliseconds();
//     let formname=document.getElementById('formname').value.trim();
// let controlname=document.getElementById('controlname').value.trim();
// let controltype=controlDropDown.value.trim();
// let controlposition=document.getElementById('controlposition').value.trim();
// let attrtibute=document.getElementById('attrtibute').value.trim();
// let checkbox = document.querySelector('input[id="checkbox"]');
// let selectCheckbox = checkbox.checked ? checkbox.value : "false";
//     const createdObjetData={
//         Id:id,
//         FormName:formname,
//         Controls:[ {
//           ControlName:controlname,
//           ControlType:controltype,
//           ControlPosition:controlposition,
//           Attribute:attrtibute,
//           IsRequired :selectCheckbox
//       }]
       
//     }
//     fetchstoredData.push(createdObjetData);
//     localStorage.setItem('controlsData',JSON.stringify(fetchstoredData))
//     //localStorage.setItem('controlsData',JSON.stringify(fetchstoredData))
//     alert("Form data saved successfully!");
//     document.getElementById("controlevntt").reset();
//     window.location.href = "task6listOfControlTypeTable.html";

let formName = document.getElementById('formname').value.trim();
let controlPosition = document.getElementById('controlposition').value.trim();
let controlName = document.getElementById('controlname').value.trim();
let controlType = controlDropDown.value.trim();
let attribute = document.getElementById('attrtibute').value.trim();
console.log("attrtibute",attribute)
let checkbox = document.querySelector('input[id="checkbox"]');
let selectCheckbox = checkbox.checked ? checkbox.value : "false";
let id = new Date().getMilliseconds();



let newControlData = {
    Id: id,
    FormName: formName,
    ControlName: controlName,
    ControlType: controlType,
    ControlPosition: controlPosition,
    Attribute: attribute,
    IsRequired: selectCheckbox
};



let existingFormData = fetchStoredData.find(data => data.FormName === formName);
console.log("existingFormData",existingFormData)

if (existingFormData) {
  
    existingFormData.Controls.push(newControlData);
} else {
    
    fetchStoredData.push({ FormName: formName, Controls: [newControlData] });
}


localStorage.setItem('controlsData', JSON.stringify(fetchStoredData));



alert("Form data saved successfully!");
document.getElementById("controlevntt").reset();
window.location.href = "task6listOfControlTypeTable.html";
  }
}

// function resetFun(){
//     document.getElementById('controlevnt').reset();
// }
function updateForm() {
    console.log("updater")
    let formname=document.getElementById('formname').value.trim();
let controlname=document.getElementById('controlname').value.trim();
let controltype=controlDropDown.value.trim();
console.log("controltype",controltype);
let controlposition=document.getElementById('controlposition').value.trim();
let checkbox = document.querySelector('input[id="checkbox"]');
let selectCheckbox = checkbox.checked ? checkbox.value : "false";
console.log(formname,controlname,controltype,controlposition, checkbox.checked,"result")
var isValid = true;
if (selectCheckbox.length === 0) {
    isValid = false;
    setError("selectCheckbox", "Please select checkbox");
  } else {
    clearError("selectCheckbox");
  }
  if (!controlposition) {
    isValid = false;
    setError("controlposition", "Control Position field is required.");
  }else if(!(controlposition >= 48 || controlposition <= 57)) {
    isValid = false;
        alert("Control Position field is required only numbers");
    }  
  else if (controlposition.length > 15 || isNaN(controlposition)) {
    isValid = false;
    setError("controlposition", "Control Position must be between 1 and 15 numbers.");
  } else {
    clearError("controlposition");
  }
if (!controltype) {
    isValid = false;
    setError("controltypee", "Control Type field is required.");
  }
   else {
    clearError("controltypee");
  }
if(!controlname){
    isValid = false;
    setError("controlname", "Control Name field is required.");
  }
  else if ( controlname.length > 15) {
    isValid = false;
    setError("controlname","Control Name must be between 1 and 15 characters.");
  } else {
    clearError("controlname");
  }
  if(!formname){
    isValid = false;
    setError("formname", "Form Name field is required.");
  }
  else if ( formname.length > 15) {
    isValid = false;
    setError("formname","Form Name must be between 1 and 15 characters.");
  } else {
    clearError("formname");
  }
  if (!isValid) {
    if(!formname||!selectCheckbox.length === 0||!controlposition||!controltype||!controlname){
      alert('All field are required');
    } else {
     alert('Input field or fields are mismatched, please check once again given data');
 } 
} else {
    updateDataForm();
}
   function updateDataForm(){
    let fetchStoredData=JSON.parse(localStorage.getItem('controlsData'))||[];
    console.log("fetchStoredData",fetchStoredData)
    //let formname = document.getElementById('formname').value.trim();
    let controlposition=document.getElementById('controlposition').value.trim();
    let editIndexElement = JSON.parse(localStorage.getItem('editFormData'))||[]
    console.log('editIndexElement2',editIndexElement)
    let existingUser = false;
    // for (let i = 0; i < fetchStoredData.length; i++) {
    //     if (fetchStoredData[i].Controls[0].ControlPosition===controlposition&&fetchStoredData[i].FormName === editIndexElement.FormName&&
    //       fetchStoredData[i].Controls[0].ControlPosition===editIndexElement.Controls[0].ControlPosition) { 
    //       existingUser = false;
    //       //alert("Control Position Value already exists");
         
    //       break; 
    //     }
    //     else if (fetchStoredData[i].FormName === editIndexElement.FormName&&fetchStoredData[i].Controls[0].ControlPosition===controlposition) { 
    //       alert("Control Position Value already exists");
    //       existingUser = true;
    //       //alert("Control Position Value already exists");
         
    //       break; 
    //     }
    // } 
    
for (let i = 0; i < fetchStoredData.length; i++) {
  if (fetchStoredData[i].FormName === editIndexElement.FormName) {
      for (let j = 0; j < fetchStoredData[i].Controls.length; j++) {
        console.log("fetchStoredData[i].Controls[j].ControlPosition",fetchStoredData[i].Controls[j].FormName, editIndexElement.FormName )
          if (fetchStoredData[i].Controls[j].ControlPosition === controlposition&&
            fetchStoredData[i].Controls[j].ControlPosition === editIndexElement.ControlPosition&&
            fetchStoredData[i].Controls[j].FormName === editIndexElement.FormName) {
              existingUser = false;
              break;
          }else if (fetchStoredData[i].Controls[j].ControlPosition === controlposition&&
            fetchStoredData[i].Controls[j].FormName === editIndexElement.FormName) {
              alert("Control Position Value already exists");
              existingUser = true;
              break;
          }
      }
    }
  }
    if(!existingUser){
    let formname = document.getElementById('formname').value.trim();
    let controlname = document.getElementById('controlname').value.trim();
    let controltype = controlDropDown.value.trim();
    let controlposition = document.getElementById('controlposition').value.trim();
    let attrtibute=document.getElementById('attrtibute').value.trim();
    let checkbox = document.querySelector('input[id="checkbox"]');
    let selectCheckbox = checkbox.checked ? checkbox.value : "false";
    // let fetchStoredData = JSON.parse(localStorage.getItem('controlsData'))||[];
    //  console.log(fetchStoredData,"controlsTypeData"); 
  

const urlParams = new URLSearchParams(window.location.search);
const editIndex = parseInt(urlParams.get('editIndex'));
console.log(urlParams, editIndex, "urlParams");

if (fetchStoredData.length > 0) {
    for (let i = 0; i < fetchStoredData.length; i++) {
        const editItem = fetchStoredData[i];
        const controlToUpdate = editItem.Controls.find(control => control.Id === editIndex);
        
        if (controlToUpdate) {
            controlToUpdate.FormName = formname;
            controlToUpdate.ControlName = controlname;
            controlToUpdate.ControlType = controltype;
            controlToUpdate.ControlPosition = controlposition;
            controlToUpdate.Attribute = attrtibute;
            controlToUpdate.IsRequired = selectCheckbox;
    
            localStorage.setItem('controlsData', JSON.stringify(fetchStoredData));
    
            alert("Form data updated successfully!");
            window.location.href = 'task6listOfControlTypeTable.html';
            break; 
        }
    }
} else {
    alert("Invalid edit index or no form data to update!");
}
    


    // const urlParams = new URLSearchParams(window.location.search);
    // const editIndex = urlParams.get('editIndex');
    // console.log(urlParams,editIndex,"urlParams")
   
     
    // if (editIndex !== null) {
    //     fetchStoredData[editIndex].FormName = formname;
    //     fetchStoredData[editIndex].Controls[0].ControlName = controlname;
    //     fetchStoredData[editIndex].Controls[0].ControlType = controltype;
    //     fetchStoredData[editIndex].Controls[0].ControlPosition = controlposition;
    //     fetchStoredData[editIndex].Controls[0].Attribute = attrtibute;
    //     fetchStoredData[editIndex].Controls[0].IsRequired = selectCheckbox;
    
    //     localStorage.setItem('controlsData', JSON.stringify(fetchStoredData));
     
    //     alert("Form data updated successfully!");
    //     window.location.href = 'task6listOfControlTypeTable.html';
    // } else {
    //     alert("No form data to update!");
    // }
  }
} 
}

const urlParams = new URLSearchParams(window.location.search);
const editIndex = urlParams.get('editIndex');
console.log("editIndex12",editIndex)
let editIndexElement = JSON.parse(localStorage.getItem('editFormData'))||[]
console.log('editIndexElement1',editIndexElement,editIndex)

let fetchStoredData = JSON.parse(localStorage.getItem('controlsData')) || [];


function updateControlPosition(formname) {
    let maxPosition = 0;
    for (let i = 0; i < fetchStoredData.length; i++) {
        if (fetchStoredData[i].FormName === formname) {
          console.log("formname",formname)
            for (let j = 0; j < fetchStoredData[i].Controls.length; j++) {
                const position = parseInt(fetchStoredData[i].Controls[j].ControlPosition);
                console.log("position",position)
                if (position > maxPosition) {
                    maxPosition = position;
                }
            }
        }
    }
   
    let controlposition = (maxPosition + 1).toString();
    console.log("controlposition", controlposition);
    
    document.getElementById('controlposition').value = controlposition;
}




document.getElementById('formname').addEventListener('input', function() {
    let formname = this.value.trim();
    console.log("formname", formname);
    updateControlPosition(formname);
});


let formNames = Array.from(new Set(fetchStoredData.map(data => data.FormName)));

formNames.forEach(formname => {
//   console.log("formNames",formname)
//   let formname1=document.getElementById('formname').value.trim();
//   if(formname===formname1){
// console.log("formname1",formname)
//   }
    updateControlPosition(formname);
});
let formNames1 = Array.from(new Set(fetchStoredData.map(data => data.FormName)));

formNames1.forEach(formname => {
  console.log("formNames",formname)
    updateControlPosition(formname);
});

window.onload=function(){
  updateControlPosition(editIndex);
}

if((editIndex!==null)&&(editIndexElement.Attribute!=="")){
  document.getElementById("attrtibute").disabled = false;
}else{
  document.getElementById("attrtibute").disabled = true;
}

   
    if ((editIndexElement!==undefined||editIndexElement!== null)&&(editIndex!==null)) {
     
        document.getElementById('formname').value = editIndexElement.FormName;
        document.getElementById('controlname').value = editIndexElement.ControlName;
        document.getElementById('cntrl').value = editIndexElement.ControlType;
        document.getElementById('controlposition').value = editIndexElement.ControlPosition;
        document.getElementById('attrtibute').value = editIndexElement.Attribute;
        var isChecked = editIndexElement.IsRequired=== "true";
        console.log("isChecked",isChecked)
        document.getElementById('checkbox').checked = isChecked;

    } else {
        console.error("editIndex element not found.");
    }

    

    const addButton = document.getElementById('addId');
    const updateButton = document.getElementById('updateId');

    if (editIndex) {
        addButton.style.display = 'none'; 
        updateButton.style.display = 'inline-block';
       
    }else{
        addButton.style.display = 'inline-block'; 
        updateButton.style.display = 'none'; 
    }

    let formFieldsData = [];
    let fetchstoredDataForms = JSON.parse(localStorage.getItem('controlsData')) || [];
    fetchstoredDataForms.forEach(element => {
      if(element.FormName===editIndexElement.FormName){
        formFieldsData.push(element.FormName);
      }
      console.log("formFieldsData",formFieldsData)
    });

    window.onload = function() {
        let latestFormField = formFieldsData&&formFieldsData.length > 0 ? formFieldsData: '';
        let dynmicFormValue = document.getElementById('formname');
       
        if(editIndex!==null){
            dynmicFormValue.value =editIndexElement.FormName
 ;
        }else{
        dynmicFormValue.value = latestFormField;
        }
       // console.log(formFieldsData,"formFieldsData",latestFormField)
    };


    function handleRadioCheckboxChange() {
      var checkboxRadio = document.getElementById("cntrl");
      console.log("controltype",checkboxRadio.value)
      if ((checkboxRadio.value==='CheckBox'||checkboxRadio.value==='Radio'||checkboxRadio.value==='Dropdown')) {
          document.getElementById("attrtibute").disabled = false;
      } else {
          document.getElementById("attrtibute").disabled = true;
      }
  }
  


    // let hasStartIndexElementt = startIndexElementt && startIndexElementt.length > 0;

    // switch (true) {
    //     case !editIndex:
    //         if (hasStartIndexElementt) {
    //             console.log("startIndexElementt", startIndexElementt, hasStartIndexElementt);
    //             mergedData = fetchstoredDataControls.filter(el => el.FormName === startIndexElementt[0].FormName);
    //         } else if (!hasStartIndexElementt&&fetchstoredDataControl.length>0) {
    //             mergedData = fetchstoredDataControls.filter(el => el.FormName === fetchstoredDataControl[0].FormName);
    //         } else {
    //             mergedData = fetchstoredDataControls.filter(el => el.FormName === editIndexElement.FormName);
    //         }
    //         if (!hasStartIndexElementt&&fetchstoredDataControl.length>0) {
    //             mergedData = fetchstoredDataControls.filter(el => el.FormName === fetchstoredDataControl[0].FormName);
    //         } else if (hasStartIndexElementt) {
    //             // Handle the case where fetchstoredDataControl is empty
    //             mergedData = fetchstoredDataControls.filter(el => el.FormName === editIndexElement.FormName);
    //         }
    //         break;
    //     default:
    //         mergedData = fetchstoredDataControls.filter(el => el.FormName === editIndexElement.FormName);
    //         break;
    // }
//     let fetchstoredDataControls = JSON.parse(localStorage.getItem('controlsData'))||[];
//     let editIndexElement = JSON.parse(localStorage.getItem('editFormData'))||[]
//     let fetchstoredDataForms = JSON.parse(localStorage.getItem('formsData'))||[];
//     let startIndexElement = JSON.parse(localStorage.getItem('startIdxForm'))||[]
//     console.log("startIndexElement",startIndexElement)
//     //let formname = document.getElementById('formname').value.trim();
//     console.log('editIndexElement2',editIndexElement.FormName)
//     console.log("fetchstoredDataForms",fetchstoredDataForms)
//     const urlParams = new URLSearchParams(window.location.search);
//     const editIndex = urlParams.get('editIndexx');
//     console.log(urlParams,editIndex,"urlParams")
//     let store=fetchstoredDataForms[fetchstoredDataForms.length-1].FormName;
//     console.log(store,"store")
// // if(fetchstoredDataForms[fetchstoredDataForms.length-1].FormName){
// //     fetchstoredDataControls=fetchstoredDataControls.find((el)=>el.FormName===fetchstoredDataForms[fetchstoredDataForms.length-1].FormName)      
// //   }  
//   // function filterControlsData() {


//   let isFormFieldsFilled = fetchstoredDataForms.length > 0;
    
//   let fetchstoredDataControl=[];
//     if (isFormFieldsFilled) {
//         let latestFormName = fetchstoredDataForms[fetchstoredDataForms.length - 1].FormName;
//         fetchstoredDataControl = fetchstoredDataControls.filter(el => el.FormName === latestFormName);
//         localStorage.setItem('startIdxForm',JSON.stringify(fetchstoredDataControl))
//         console.log(fetchstoredDataControl,"fetchstoredDataControls1")
//     } 

//     if(startIndexElement){
//         startIndexElement=fetchstoredDataControls.filter(el => el.FormName === startIndexElement.FormName); 
//         //localStorage.setItem('controlsData',JSON.stringify(startIndexElement))
//         console.log("startIndexElement",startIndexElement)
//     }else{
//      fetchstoredDataControls = JSON.parse(localStorage.getItem('controlsData'))||[];
//     }
//     let  startIndexElementt = JSON.parse(localStorage.getItem('startIdxForm'))||[]
//      console.log("startIndexElement",startIndexElementt)
//     //let mergedData = [...startIndexElement,...startIndexElementt];
//      mergedData=[...fetchstoredDataControls]
//     console.log("mergedData",mergedData)