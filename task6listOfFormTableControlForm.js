

document.getElementById('controlevnt').addEventListener('submit', function (event) {
    event.preventDefault();
    let formname = document.getElementById('formname').value.trim();
    var isValid = true;
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
        if(!formname){
          alert('Form field is required');
        } else {
         alert('Input field or fields are mismatched, please check once again given data');
     } 
  } else {
    saveFormsData();
  }
});
function setError(id, message) {
    //console.log(id, message,"id")
    var errorElement = document.getElementById(id + "_error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
    document.getElementById(id + "_success").textContent = "";
  }

function clearError(id) {
console.log(id,'clr')
var element = document.getElementById(id);

  document.getElementById(id + "_error").textContent = "";
 if (element.value !== "") {
    document.getElementById(id + '_success').textContent = `Successfully filled ${id}`;
  } else {
    document.getElementById(id + "_success").textContent = '';
  }

}

function saveFormsData() {
    let fetchStoredData = JSON.parse(localStorage.getItem('formsData')) || [];
    console.log("fetchStoredData",fetchStoredData)
    let formname = document.getElementById('formname').value.trim();
    let existingUser = false;
    for (let i = 0; i < fetchStoredData.length; i++) {
        if (fetchStoredData[i].FormName === formname) {
          alert("Form Name already exists");
          existingUser = true;
          break; 
        }
    } 
    if(!existingUser) {
    //let formname = document.getElementById('formname').value.trim();
    const createdObjetData = {
        FormName: formname,
    };
    //let fetchstoredData = JSON.parse(localStorage.getItem('formsData')) || [];
    fetchStoredData.push(createdObjetData);
    localStorage.setItem('formsData', JSON.stringify(fetchStoredData));
    alert("Form data saved successfully!");
    document.getElementById("controlevnt").reset();
    window.location.href = "task6listOfFormTable.html";
}
}

function reset() {
    document.getElementById('controlevnt').reset();
}

function updateForm() {
    let formname = document.getElementById('formname').value.trim();
    
    let fetchStoredData = JSON.parse(localStorage.getItem('formsData'))||[];
     console.log(fetchStoredData,"fetchStoredData1"); 
   
  
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('editIndex');
    console.log(urlParams,editIndex,"urlParams")
    if (editIndex !== null) {
        fetchStoredData[editIndex].FormName = formname;
        localStorage.setItem('formsData', JSON.stringify(fetchStoredData));
        alert("Form data updated successfully!");
        window.location.href = 'task6listOfFormTable.html';
    } else {
        alert("No form data to update!");
    }
}

// const urlParams = new URLSearchParams(window.location.search);
//     const editIndex = urlParams.get('editIndex');
//     console.log(urlParams,editIndex,"urlParams")
    let editIndexElement = JSON.parse(localStorage.getItem('editFormData'))||[]
    console.log('editIndexElement',editIndexElement)
    if ((editIndexElement!==undefined||editIndexElement!== null)&&(editIndex!==null)) {
     
        document.getElementById('formname').value = editIndexElement.FormName;
    } else {
        console.error("editIndex element not found.");
    }

