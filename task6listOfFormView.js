let fetchstoredDataControls = JSON.parse(localStorage.getItem('controlsData')) || [];
let fetchstoredViewData = JSON.parse(localStorage.getItem('viewFormData')) || [];
console.log(fetchstoredViewData, "fetchstoredViewData");
let fetchViewData = [];
for (let i = 0; i < fetchstoredDataControls.length; i++) {
    let form = fetchstoredDataControls[i];
    for (let j = 0; j < form.Controls.length; j++) {
        let control = form.Controls[j];
        console.log("control", control)
        if (control !== null) {
            if (control.FormName === fetchstoredViewData[0].FormName) {
                fetchViewData.push(form)
                console.log("fetchViewData1", fetchViewData)
            }
            break;
        }
    }
}

fetchViewData.forEach((form) => {
    form.Controls.sort((a, b) => {
        let controlPositionA = parseInt(a.ControlPosition);
        let controlPositionB = parseInt(b.ControlPosition);
        return controlPositionA - controlPositionB;
    });
});

let viewelementsdata = document.getElementById('elemts');
viewelementsdata.length > 0 && viewelementsdata?.viewelementsdata;
console.log("viewelementsdata", viewelementsdata)

let renderViewData = () => {
    viewelementsdata.innerHTML = '';
    console.log("fetchViewData", fetchViewData)
    fetchViewData.forEach((el) => {
        console.log("eled", el);
        let formName = document.createElement('h1');
        formName.innerHTML = el.FormName;
        viewelementsdata.appendChild(formName);

        el.Controls.forEach((control) => {
            let controlElement = document.createElement('div');
            controlElement.style.border = '1px solid black';
            controlElement.style.padding = '5px';
            controlElement.style.width = '100%';
            controlElement.style.display = "flex";
            controlElement.style.justifyContent = "start";

            switch (control.ControlType) {
                case 'Email':
                    controlElement.innerHTML = `
                        <label>${control.ControlName}:</label><input type="email" id='emailId' placeholder="Enter the Email">
                        <p id="fetchemail_error" class="error"></p>
                        <p id="fetchemail_success" class="success"></p><br>
                    `;
                    break;
                case 'CheckBox':
                    controlElement.innerHTML = `
                        <label>${control.ControlName}:</label><input type="checkbox" id='checkId' ${control.IsRequired === 'true' ? 'checked' : ''}>
                        <p id="check_error" class="error"></p>
                        <p id="check_success" class="success"></p><br>
                    `;
                    break;
                case 'Radio':
                    let options = control.Attribute.split(',');
                    let radioInputs = options.map(option => {
                        return `
                            <input type="radio" id="${option}" name="${control.ControlName}" value="${option}">
                            <label for="${option}">${option}</label>
                        `;
                    }).join('');
                    controlElement.innerHTML = `
                            <label>${control.ControlName}:</label>
                            ${radioInputs}
                            <p id="${control.ControlName}_error" class="error"></p>
                            <p id="${control.ControlName}_success" class="success"></p><br>
                        `;

                    let radioGroup = controlElement.querySelectorAll(`input[name="${control.ControlName}"]`);
                    radioGroup.forEach(radio => {
                        radio.addEventListener('change', function() {
                            validateRadio(control.ControlName);
                        });
                    });
                    break;

                case 'Submit':
                    controlElement.innerHTML = `
                        <button type="submit" id="submitButton">${control.ControlName}</button>&nbsp;
                        <button type="button" id="enableButton" onclick="enableFields()">Enable Fields</button> <!-- Changed ID to enableButton -->
                    `;
                    break;
                case 'Password':
                    controlElement.innerHTML = `
                        <label>${control.ControlName}:</label><input type="password" id='passwordId' placeholder="Enter the password">
                        <p id="password_error" class="error"></p>
                        <p id="password_success" class="success"></p><br>
                    `;
                    break;
                case 'Text':
                    controlElement.innerHTML = `
                        <label>${control.ControlName}:</label><input type="text" id='textId' placeholder="Enter the text">
                        <p id="text_error" class="error"></p>
                        <p id="text_success" class="success"></p><br>
                    `;
                    break;
                    case 'Dropdown':
                        let dropdownOptions = control.Attribute.split(',');
                        let dropdownSelect = document.createElement('select');
                        dropdownSelect.setAttribute('id', `dropdownId_${control.ControlName}`);
                        dropdownSelect.setAttribute('name', control.ControlName); 
                    
                        let dropdownLabel = document.createElement('label');
                        dropdownLabel.textContent = `${control.ControlName}: `;
                    
                        controlElement.appendChild(dropdownLabel);
                    
                        let defaultOption = document.createElement('option');
                        defaultOption.textContent = "--- Select Option ---";
                        defaultOption.value = "";
                        dropdownSelect.appendChild(defaultOption);
                    
                        dropdownOptions.forEach(option => {
                            let dropdownOption = document.createElement('option');
                            dropdownOption.textContent = option;
                            dropdownOption.value = option;
                            dropdownSelect.appendChild(dropdownOption);
                        });
                    
                        controlElement.appendChild(dropdownSelect);
                    
                        let dropdownError = document.createElement('p');
                        dropdownError.id = `${control.ControlName}_error`;
                        dropdownError.classList.add('error');
                        dropdownError.textContent = "Please select an option from the dropdown."; 
                        controlElement.appendChild(dropdownError);
                        
                        let dropdownSuccess = document.createElement('p');
                        dropdownSuccess.id = `${control.ControlName}_success`;
                        dropdownSuccess.classList.add('success');
                        dropdownSuccess.textContent = ""; 
                        controlElement.appendChild(dropdownSuccess);
                        
                    
                        
                        dropdownSelect.addEventListener('change', function () {
                            validateDropdown(this.value, control.ControlName);
                        });
                    
                        break;
                    

                case 'Reset':
                    controlElement.innerHTML = `
                        <label>${control.ControlName}:</label><button onclick="reset()">${control.ControlType}</button>
                    `;
                    break;
                default:
                    break;
            }

            viewelementsdata.appendChild(controlElement);
        });
    });
}

function validateEmail(email) {
    let emailError = document.getElementById('fetchemail_error');
    let emailSuccess = document.getElementById('fetchemail_success');

    if (!emailError || !emailSuccess) {
        return;
    }

    if (!email) {
        setError(emailError, "Email field is required.", emailSuccess);
    } else if (!isValidEmail(email)) {
        setError(emailError, "Invalid email format.", emailSuccess);
    } else {
        clearError(emailError, emailSuccess);
    }
}

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateCheckId(check) {
    let checkError = document.getElementById('check_error');
    let checkSuccess = document.getElementById('check_success');

    if (!checkError || !checkSuccess) {
        return;
    }

    if (!check) {
        setError(checkError, "CheckBox field is required.", checkSuccess);
    } else {
        clearError(checkError, checkSuccess);
    }
}

function validatePassword(password) {
    let passwordError = document.getElementById('password_error');
    let passwordSuccess = document.getElementById('password_success');

    if (!passwordError || !passwordSuccess) {
        return;
    }

    if (!password) {
        setError(passwordError, "Password field is required.", passwordSuccess);
    } else if (password.length < 6) {
        setError(passwordError, "Password must be at least 6 characters.", passwordSuccess);
    } else {
        clearError(passwordError, passwordSuccess);
    }
}

function validateText(text) {
    let textError = document.getElementById('text_error');
    let textSuccess = document.getElementById('text_success');

    if (!textError || !textSuccess) {
        return;
    }

    if (!text) {
        setError(textError, "Text field is required.", textSuccess);
    } else {
        clearError(textError, textSuccess);
    }
}

function validateRadio(controlName) {
    let radioError = document.getElementById(`${controlName.toLowerCase()}_error`);
    let radioSuccess = document.getElementById(`${controlName.toLowerCase()}_success`);

    if (!radioError || !radioSuccess) {
        return;
    }

    let radioInputs = document.querySelectorAll(`input[name="${controlName}"]:checked`);
    if (radioInputs.length === 0) {
        setError(radioError, `Please select an option for ${controlName}.`, radioSuccess);
    } else {
        clearError(radioError, radioSuccess);
    }
}

function validateDropdown(value, controlName) {
    let dropdownError = document.getElementById(`${controlName}_error`);
    let dropdownSuccess = document.getElementById(`${controlName}_success`);

    if (!dropdownError || !dropdownSuccess) {
        return;
    }

    if (!value || value === "--- Select Option ---") {
        setError(dropdownError, "Please select an option from the dropdown.", dropdownSuccess);
    } else {
        clearError(dropdownError, dropdownSuccess);
    }
}


function setError(errorElement, message,successElement) {
    console.log("errorElement",errorElement, message)
    errorElement.textContent="";
    errorElement.textContent = message;
    errorElement.style.display = "block";
    successElement.textContent = ""; 
    
   
}

function clearError(errorElement, successElement) {
    console.log("successElement",errorElement, successElement)
    errorElement.textContent = "";
    errorElement.style.display = "none";
    successElement.textContent = "Field is valid.";
    errorElement.textContent = "";
    
}
function toggleFields(disable) {
    let inputs = viewelementsdata.querySelectorAll('input, select, button:not(#enableButton),button:not(#enableButton)');
    inputs.forEach(input => {
        input.disabled = disable;
    });
}

function enableFields() {
    toggleFields(false); 
}

function disableFields() {
    toggleFields(true);
}

let enableButton = document.createElement('button');
enableButton.textContent = 'Enable Fields';
enableButton.id = 'enableButton';
enableButton.addEventListener('click', function() {
    enableFields();
});

viewelementsdata.appendChild(enableButton);

let formElement = document.querySelector('form');
formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('emailId') ? document.getElementById('emailId').value.trim() : '';
    let check = document.getElementById('checkId') ? document.getElementById('checkId').checked : false;
    let password = document.getElementById('passwordId') ? document.getElementById('passwordId').value.trim() : '';
    let text = document.getElementById('textId') ? document.getElementById('textId').value.trim() : '';
    let dropdown = document.getElementById('dropdownId') ? document.getElementById('dropdownId').value.trim() : '';

    validateEmail(email);
    validateCheckId(check);
    validatePassword(password);
    validateText(text);
    validateDropdown(dropdown, 'dropdownId');

    let valid = true;
    document.querySelectorAll('.error').forEach(errorElement => {
        if (errorElement.textContent !== '') {
            valid = false;
        }
    });
console.log("valid",valid)
    if (valid) {
        alert('Form submitted successfully!');
        disableFields(); 
    } else {
        alert('Please fill in all required fields correctly.');
    }
});

window.onload = function() {
    renderViewData();
    enableFields();
};

