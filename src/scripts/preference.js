var arr = []
function submitV(){
    // $("#loading").load("../views/dashboard.html",arr);
    alert('success');
    window.location.assign("/Users/amanideepthimatta/HungryHeads/src/views/dashboard.html");
    // return true;
}
function changeButton(id){
        // let ids = id;
        // console.log(ids);
        let element = document.getElementById(id);
        let isChecked = JSON.parse(element.getAttribute('aria-checked'));
        element.setAttribute('aria-checked', !isChecked);
        var span = element.children[0];
        console.log(element.children[1].children[0].children[0])
        if(!isChecked == true){
            element.children[1].children[0].children[0].setAttribute('d','M12.57 2H15L6 15l-5-5 1.41-1.41 3.31 3.3z');
            element.style.backgroundColor='green';

        }
        else{
            element.children[1].children[0].children[0].setAttribute('d','M14 9H9v5H7V9H2V7h5V2h2v5h5z');
            element.style.backgroundColor='blue'

        }
        console.log(span.textContent);
        arr.push(span.textContent);
        console.log(arr);
    }
    function showInput(){
        console.log(document.getElementById("insertButtonHere").style);
        document.getElementById("insertButtonHere").style = "display: block !important";
        console.log(document.getElementById("insertButtonHere").style);

        console.log("Hello");
    }
    function insertButton(ingredient){
        //var my_text=prompt('Enter another ingredient:');
        //alert(my_text);
        var idGenerator = "ember"+ Date.now().toString(36) + Math.random().toString(36).substring(2);
        document.getElementById("buttonsEntered").innerHTML = `<button role="checkbox" aria-checked="false" aria-label="DevOps" id="`+idGenerator+`" onclick="changeButton(this.id)" type="button"><span class="artdeco-pill__text">`+ingredient+`</span>

        <li-icon aria-hidden="true" type="plus-icon" class="artdeco-pill__icon" size="small"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" class="mercado-match" width="16" height="16" focusable="false">
                <path d="M14 9H9v5H7V9H2V7h5V2h2v5h5z"></path>
            </svg></li-icon>
    </button>`;
        console.log(ingredient);
    }
    function getIngredient(){
        var ingredient = document.getElementById("enterIng").value;
        insertButton(ingredient);
    }


