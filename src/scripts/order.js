function orderComplete() {
    // https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/placeorder?email=abcTest@gmail.com&
    // cost=25&recipeQty=pizza-2,pasta-1&ingredients=tomato-flour-basil,salt-pasta-onion
    var emailId = sessionStorage.getItem('email');
    var totalPrice = sessionStorage.getItem('totalPrice');
    var ingredients = "";
    if (sessionStorage.getItem('ingredients').substring(0, 9) === "undefined") {
        ingredients = sessionStorage.getItem('ingredients').substring(9, sessionStorage.getItem('ingredients').length + 1);
        console.log(sessionStorage.getItem('ingredients').substring(9, sessionStorage.getItem('ingredients').length + 1));
    }
    else {
        ingredients = sessionStorage.getItem('ingredients');
        console.log(sessionStorage.getItem('ingredients'));
    }

    
    console.log(sessionStorage.getItem('email'));
    console.log(sessionStorage.getItem('totalPrice'));
    
    //send all ingredients appended by commas
    // console.log(sessionStorage.getItem('ingredients').substring(0,9))
    // console.log(sessionStorage.getItem('ingredients').substring(0,9) === "undefined")
    // if (sessionStorage.getItem('ingredients').substring(0, 9) === "undefined") {
    //     console.log(sessionStorage.getItem('ingredients').substring(9, sessionStorage.getItem('ingredients').length + 1));
    // }
    // else {
    //     console.log(sessionStorage.getItem('ingredients'));
    // }
    var recipeDetails = "";
    // console.log(document.getElementsByClassName("pname"));
    var pn = document.getElementsByClassName("pname");
    var pqty = document.getElementsByClassName("pqty");
    var pprice = document.getElementsByClassName("pprice");
    console.log(pn);
    for (var i = 0; i < pn.length; i++) {
        recipeDetails += pn[i].innerHTML + "-" + pqty[i].innerHTML + "-" + pprice[i].innerHTML + ",";
        console.log(recipeDetails);
    }
    // console.log(pn[0].innerText);
    // console.log(pn[0].innerHTML);

    //get recipe-respective quantities
    // console.log(sessionStorage.getItem('nameqty'));
    awsCall(emailId,totalPrice,recipeDetails,ingredients);

}
function awsCall(emailId,totalPrice,recipeDetails,ingredients) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aHVuZ3J5aGVhZHM6UGFzc3dvcmQxMjM=");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    var url = "https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/placeorder?cost="+totalPrice+"&recipeQty="+recipeDetails+"&ingredients="+ingredients+"&email="+emailId;
    console.log(url);
    // fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/placeorder?cost=25&recipeQty=pizza-2,pasta-1&ingredients=tomato-flour-basil,salt-pasta-onion&email=abcTest@gmail.com", requestOptions)
    fetch(url, requestOptions)
        .then(response => response.text())
        .then((result) => {console.log(result)
            window.location.assign("/Users/amanideepthimatta/HungryHeads/src/views/thankyou.html");

        
        })
        .catch(error => console.log('error', error));
}

