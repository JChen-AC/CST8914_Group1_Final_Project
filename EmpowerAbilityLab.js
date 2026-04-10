//Template Function that can be used to run JavaScript on the page
//Note: This can be changed to whatever JavaScript formatting you would like
function knowledgeRunner() {
    function clearPage() {
        const main = document.getElementById("main-content");
        console.log(main)
        console.log(main.firstElementChild)
        // CAN USE THE JQUERY LIKE DEQUE to remove instead 
        main.removeChild(main.firstElementChild);
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

        main.appendChild(start_template.content.cloneNode(true))
    }

    function updateHistory() {
        let newURL = "";
        let newTitle = "";
        history.pushState({ url: newURL, title: newTitle }, newURL, newTitle);
    };
    function updateTitle() {

    };
    function updateURL() {

    };

    function get_page_detail(e) {
        console.log(e)
        let page_data;
        if (e.target.text == "Home") {
            console.log("Link clicked is home")
            page_data = {
                title:"Empower Ability Labs",
                url:"home",
                template_id:"main-template"
            };

        }
        else if (e.target.text == "Services") {
            console.log("link clicked is services")
            page_data = {
                title:"Services - Empower Ability Labs",
                url:"services",
                template_id:"service-template"
            };

        }
        else if (e.target.text == "Schedule a call") {
            console.log("link clicked is Schedule a call")
            page_data = {
                title:"Scehdule a call - Empower Ability Labs",
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
        let page_details = get_page_detail(e);
        console.log("Page details")
        console.log(page_details)

        e.preventDefault();
        console.log("Getting page details")
        //console.log(e.target.text);
        clearPage();
        loadPage(page_details.template_id);
        let heading = document.getElementsByTagName("h1")[0];
        heading.focus();
    });

    loadStart();
}

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