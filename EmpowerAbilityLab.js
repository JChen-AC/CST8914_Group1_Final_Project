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

    function loadPage() {
        console.log("Loading New content")
        let template = document.getElementById("service-template");
        let main = document.getElementById("main-content");
        console.log(template)

        main.appendChild(template.content.cloneNode(true))
    }
    function loadStart(){
        console.log("Loading main page")
        let start_template = document.getElementById("main-template");
        let main = document.getElementById("main-content");
        console.log("Template: ")
        console.log(start_template)
        console.log("main: ")
        console.log(main)

        main.appendChild(start_template.content.cloneNode(true))
    }

    $(document).on('click', 'a', function (e) {
        e.preventDefault();
        clearPage();
        loadPage();
        const heading = document.getElementsByTagName("h1")
        console.log(heading)
        heading.focus()
    });

    loadStart();
}


knowledgeRunner()