//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner(){

}

document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('scheduleCallForm');
    const notificationArea = document.getElementById('form-notification');
    const emailInput = document.getElementById('email');
    const speakerCheckbox = document.getElementById('check2');
    const phoneInput = document.getElementById('phoneNumber');
    const eventDetailsGroup = document.getElementById('eventDetailsGroup');
    const eventDetailsInput = document.getElementById('eventDetails');

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    let errors = [];

    // 1. Toggle Logic for "Invite a Speaker" 
    speakerCheckbox.addEventListener('change', function () {
        if (this.checked) {
            
            eventDetailsGroup.style.display = 'block';
            this.setAttribute('aria-expanded', 'true');
            eventDetailsInput.setAttribute('required', 'required');
            eventDetailsInput.setAttribute('aria-required', 'true');
        } else {
            
            eventDetailsGroup.style.display = 'none';
            this.setAttribute('aria-expanded', 'false');
            eventDetailsInput.removeAttribute('required');
            eventDetailsInput.removeAttribute('aria-required');
            eventDetailsInput.value = ''; 
        }
    });

   // 2. Form Submission Logic 
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        
        notificationArea.innerHTML = '';
        emailInput.classList.remove('is-invalid');
        phoneInput.classList.remove('is-invalid');
        let currentErrors = []; 

        // Email Validation Check
        if (!emailInput.value || !emailInput.checkValidity()) {
            emailInput.classList.add('is-invalid');
            currentErrors.push("Please provide a valid email address.");
        }

        // Phone Validation Check (Format Check)
        if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
            phoneInput.classList.add('is-invalid');
            currentErrors.push("Phone number must follow the format: 613-123-1234.");
        }

        
        if (currentErrors.length > 0) {
        
        const errorListItems = currentErrors.map(msg => `<li>${msg}</li>`).join('');
        
       
 if (currentErrors.length > 0) {
    const errorListItems = currentErrors.map(msg => `<li>${msg}</li>`).join('');
    
    notificationArea.innerHTML = `
        <div class="alert alert-danger" 
             id="error-summary-container" 
             tabindex="-1" 
             aria-label="Submission Errors" 
             style="outline: none;">
            
            <div style="font-weight: bold; font-size: 1.25rem; margin-bottom: 0.5rem;" aria-hidden="true">
                Submission Errors:
            </div>
            
            <ul>${errorListItems}</ul>
        </div>`;
    
    
    document.getElementById('error-summary-container').focus();
}
    } else {
             // Success State 
            notificationArea.innerHTML = '<div class="alert alert-success" role="status">Thank you! Your request has been submitted. Our sales team will contact you soon.</div>';
            
            // Complete Reset
            form.reset();
            eventDetailsGroup.style.display = 'none';
            speakerCheckbox.setAttribute('aria-expanded', 'false');
        }
    });
});



knowledgeRunner()