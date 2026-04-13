//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner() {
    const originalURL = window.location.href;
    function clearPage() {
        const main = document.getElementById("main-content");
        console.log(main)
        console.log(main.firstElementChild)
        // CAN USE THE JQUERY LIKE DEQUE to remove instead 
        if (main.firstElementChild) {
            main.removeChild(main.firstElementChild);
        }
    }

    function loadPage(page_id) {
        console.log("Loading New content")
        console.log(page_id)
        let template = document.getElementById(page_id);
        let main = document.getElementById("main-content");
        console.log(template)

        main.appendChild(template.content.cloneNode(true))
    }
    function loadStart() {
        console.log("Loading main page")
        let start_template = document.getElementById("main-template");
        let main = document.getElementById("main-content");
        console.log("Template: ")
        console.log(start_template)
        console.log("main: ")
        console.log(main)
        let base_url =window.location.href
        let stored_url = sessionStorage.getItem("currentURL");
        if(stored_url){
            base_url = stored_url;
            sessionStorage.removeItem("currentURL");

        }


        if(base_url.includes("home") || base_url.includes("services") || base_url.includes("schedule")){
            console.log("Refresh")
            let old_route = get_route(base_url);
            console.log("old route: ",old_route)
            let page_details = get_page_detail(old_route)
            loadPage(page_details.template_id);
            return
        }

        console.log("First start")

        let home_data = get_page_detail("Home");
        console.log("home_data");
        console.log(home_data);
        updateTitle(home_data.title);
        main.appendChild(start_template.content.cloneNode(true))
        
        console.log("href: ",window.location.href)
        
        // For Live Server: use clean URLs like /home
        let currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath.endsWith('.html')) {
            // Replace with clean route URL
            
            let base = window.location.href;
            let newURL = base;
            if (base.endsWith('/')){
               newURL = `${base}${home_data.url}`;
            }
            else{
                newURL = `${base}/${home_data.url}`;
            }
            
            history.replaceState({}, home_data.title, newURL);
        }

        
    }

    function updateHistory(newURL, newTitle) {
        console.log("Updating history");
        history.pushState({ url: newURL, title: newTitle }, newTitle, newURL);
    };
    function updateTitle(newTitle) {
        console.log("Updating title");
        document.title = newTitle;
    };

    function get_route(base){
        // Parse route from URL pathname for Live Server
        //let path = window.location.pathname;
        let path = base;
        if (path === '/home' || path.endsWith('/home')) {
            return "home";
        }
        else if (path === '/services' || path.endsWith('/services')) {
            return "services";
        }
        else if (path === '/schedule' || path.endsWith('/schedule')) {
            return "schedule";
        }
        return "NONE"; // Default
    }

    function updateURL(route,title) {
        updateTitle(title);
        
        // For Live Server: create clean URLs like /home, /services
        let base = window.location.href;
        let newURL = base;
        let current_route = get_route(base);
        console.log("cur route: ",current_route)
        console.log("new route: ",route);
        if(current_route !== "NONE"){
            newURL = base.replace(current_route,route)
        }
        else{
            if (base.endsWith('/')){
               newURL = `${base}${route}`;
            }
            else{
                newURL = `${base}/${route}`;
            }           
        }
        console.log("Updating URL to:", newURL);
        updateHistory(newURL, title);
        
    };


    function get_page_detail(route) {
        console.log(route)
        let page_data;
        if (route == "Home" || route == "home") {
            console.log("Link clicked is home")
            page_data = {
                title: "Empower Ability Labs",
                url: "home",
                template_id: "main-template"
            };

        }
        else if (route == "Services" || route == "services") {
            console.log("link clicked is services")
            page_data = {
                title: "Services - Empower Ability Labs",
                url: "services",
                template_id: "service-template"
            };

        }
        else if (route == "Schedule a call" || route == "schedule") {
            console.log("link clicked is Schedule a call")
            page_data = {
                title:"Schedule a call - Empower Ability Labs",
                url:"schedule",
                template_id:"schedule-template"
            };
        }
        return page_data
    }

    $(document).on('click', 'a.nav-link', function (e) {
        //console.log(e);
        //console.log(e.target.text);
        //console.log(window.location.href)
        let page_details = get_page_detail(e.target.text);
        console.log("Page details")
        console.log(page_details)

        e.preventDefault();
        console.log("Getting page details")
        //console.log(e.target.text);
        clearPage();
        loadPage(page_details.template_id);
        let heading = document.getElementsByTagName("h1")[0];
        heading.focus();
        console.log("focus: ", heading);

        updateURL(page_details.url, page_details.title);
        if(page_details.url === "schedule"){
            load_webform_javascript() 
        }
    });

    $(document).on('click', 'a.skiplink', function (e) {
        e.preventDefault();
        console.log("Skipping content")
        let heading = document.getElementsByTagName("h1")[0];
        heading.focus();
        console.log("focus: ", heading);
    });



    $(window).on('popstate', function (e) {
        console.log("back or forward")
        let base = window.location.href;
        let current_route = get_route(base);
        console.log("route: ", current_route)
        let page_details = get_page_detail(current_route);
        console.log("page details: ", page_details)
        clearPage();
        loadPage(page_details.template_id);
        let heading = document.getElementsByTagName("h1")[0];
        heading.focus();
        //updateURL(page_details.url, page_details.title);
        console.log("focus: ", heading);
        console.log("style: ", heading.style);
        if(page_details.url === "schedule"){
            load_webform_javascript() 
        }
    });

    loadStart();
    
    // Handle direct navigation to routes (e.g., /services)
    $(document).ready(function() {
        let currentPath = window.location.pathname;
        if (currentPath !== '/' && !currentPath.endsWith('.html')) {
            let current_route = get_route(window.location.href);
            let page_details = get_page_detail(current_route);
            if (page_details && current_route !== 'home') {
                console.log("Loading route from URL:", current_route);
                updateTitle(page_details.title);
                clearPage();
                loadPage(page_details.template_id);
                if(page_details.url === "schedule"){
                    load_webform_javascript() 
                }
            }
        }
    });
    window.addEventListener('beforeunload',()=>{
        console.log("Fixing url for refresh");
        sessionStorage.setItem("currentURL",window.location.href);
        console.log("Stored url: ",sessionStorage.getItem("currentURL"));
        console.log(originalURL)
        history.replaceState(originalURL);
    });
}

function load_webform_javascript() {
    console.log("DOMContentLoaded")
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
        console.log("Submitting thing")
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
            
            <div style="font-weight: bold; font-size: 1.25rem; margin-bottom: 0.5rem;">
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
};
/*
What might not be needed
- add aria live to show that the section has been updated
- todo
    - fix it so that it is more general (programatically determine which link is being chosen and load the correct one )
    - update the history 
    - be able to go back 
    - need to change title 
        - need to change url 

*/
knowledgeRunner()

function setupMobileHeaderMenu() {
    const toggler = document.querySelector('.navbar-toggler');
    const nav = document.getElementById('mainNav');

    if (!toggler || !nav) {
        return;
    }

    const closeMenu = () => {
        nav.classList.remove('show');
        toggler.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
        nav.classList.add('show');
        toggler.setAttribute('aria-expanded', 'true');
    };

    toggler.addEventListener('click', () => {
        const isOpen = nav.classList.contains('show');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    nav.addEventListener('click', (event) => {
        if (event.target.closest('a.nav-link') && window.innerWidth < 768) {
            closeMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (window.innerWidth >= 768) {
            return;
        }

        const clickedInsideNav = nav.contains(event.target);
        const clickedToggler = toggler.contains(event.target);

        if (!clickedInsideNav && !clickedToggler) {
            closeMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMenu();
        }
    });
}

setupMobileHeaderMenu();

// Modal code
let activeModalTrigger = null;

function openDialog(dialogId, triggerElement) {
    const dialog = document.getElementById(dialogId);

    if (!dialog) {
        return;
    }

    activeModalTrigger = triggerElement || null;
    dialog.hidden = false;
    dialog.classList.add('is-open');
    dialog.setAttribute('aria-hidden', 'false');

    const closeButton = dialog.querySelector('.community-modal__close');
    const focusTarget = closeButton || dialog.querySelector('.community-modal__panel');

    if (focusTarget) {
        focusTarget.focus();
    }
    trapFocus(dialog);
}

function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);

    if (!dialog) {
        return;
    }

    dialog.classList.remove('is-open');
    dialog.setAttribute('aria-hidden', 'true');
    dialog.hidden = true;

    if (activeModalTrigger) {
        activeModalTrigger.focus();
        activeModalTrigger = null;
    }
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

document.addEventListener('click', (event) => {
    const closeTarget = event.target.closest('[data-modal-close]');

    if (!closeTarget) {
        return;
    }

    const modal = closeTarget.closest('.community-modal');

    if (modal) {
        closeDialog(modal.id);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') {
        return;
    }

    const openModal = document.querySelector('.community-modal.is-open');

    if (openModal) {
        closeDialog(openModal.id);
    }
});


