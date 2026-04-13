//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner(){

}

document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('scheduleCallForm');
    const notificationArea = document.getElementById('form-notification');
    const emailInput = document.getElementById('email');
    const speakerCheckbox = document.getElementById('check2');
    const eventDetailsGroup = document.getElementById('eventDetailsGroup');
    const eventDetailsInput = document.getElementById('eventDetails');

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

        // Validation Check
        if (!emailInput.value || !emailInput.checkValidity()) {
            // Error State
            emailInput.classList.add('is-invalid');
            
            
            notificationArea.innerHTML = '<div class="alert alert-danger" role="alert">Error: Please provide a valid email address.</div>';
            
            // Jump to the error for keyboard users
            emailInput.focus(); 
        } else {
            // Success State
            notificationArea.innerHTML = '<div class="alert alert-success">Thank you! Your request has been submitted. Our sales team will contact you soon.</div>';
            
            // Complete Reset
            form.reset();
            eventDetailsGroup.style.display = 'none';
            speakerCheckbox.setAttribute('aria-expanded', 'false');
        }
    });
});



knowledgeRunner()