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
        let template = document.getElementById("service-template");
        let main = document.getElementById("main-content");
        console.log(template)

        main.appendChild(template.content.cloneNode(true))
    }

    $(document).on('click', 'a', function (e) {
        e.preventDefault();
        clearPage();
        loadPage();
        
    });
}


knowledgeRunner()