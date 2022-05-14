// // https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/searchrecipe?recipeName=pizza
// var searchButton = document.getElementById("button-addon2");

function searchByRecipe() {
    var searchtype = document.getElementById('dropdown').value

    var search = document.getElementById("searchInput").value;
    console.log(searchtype);
    console.log("Search" + search);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aHVuZ3J5aGVhZHM6UGFzc3dvcmQxMjM=");

    // const headers = {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
    // }
    // myHeaders.append('Access-Control-Allow-Origin','*');
    // myHeaders.append('Content-Type','application/json');
    // myHeaders.append('Access-Control-Allow-Methods','GET,POST,PATCH,OPTIONS')
    // const response = {
    //     statusCode: 200,
    //     headers: headers,
    //     body: JSON.stringify(X),
    // };
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // mode: 'no-cors',
        redirect: 'follow',

    };
    if (searchtype === 'Recipe') {
        fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/findrecipe?recipeName=" + search, requestOptions)
            .then(response => response.json())
            .then((result) => {
                iteraterecipes(result.display_list);
            })
            .catch(error => console.log('error', error));
    }
    else if (searchtype === 'Ingredient') {
        // https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/lookupingredient?ingredients=mushroom,onion
        // fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/lookupingredient?ingredients="+search, requestOptions)
        fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/searchingredient?ingredientsList=" + search, requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(result);
                iteraterecipes(result.display_list);
            })
            .catch(error => console.log('error', error));
    }
}
function iteraterecipes(recipeArray) {
    const length = recipeArray.length;
    console.log(recipeArray);
    console.log(recipeArray[0]);
    console.log(recipeArray[0]['name'])
    for (var i = 0; i < length; i++) {
        recipeCreator(recipeArray[i]['name'], recipeArray[i]['url'])
    }
    var element = document.getElementById('body');

    const script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "../scripts/otherScripts.js";

    element.appendChild(script);
}
function recipeCreator(recipename, url) {
    let randomNum = (Math.floor(Math.random() * (20 - 5 + 1) + 20)).toString();
    let products = document.getElementById('products');
    const ulist = document.createElement('ul');
    const list = document.createElement('li');
    const pd = document.createElement('div');
    pd.setAttribute('class', 'product-description');
    pd.setAttribute('data-name', recipename);
    pd.setAttribute('data-price', randomNum);

    // list.appendChild(pd);

    const h3 = document.createElement('h3');
    h3.setAttribute('class', 'product-name');
    h3.innerHTML = recipename;

    pd.appendChild(h3);

    const pp = document.createElement('p');
    pp.setAttribute('class', 'product-price');
    pp.innerHTML = "&dollar; " + randomNum;

    pd.appendChild(pp);

    const form = document.createElement('form');
    form.setAttribute('class', 'add-to-cart');
    form.setAttribute('action', 'cart.html');
    form.setAttribute('method', 'post');

    const div = document.createElement('div');

    const label = document.createElement('label');
    var qtyID = "qty" + Math.floor(Math.random() * Date.now()).toString();
    label.setAttribute('for', qtyID);
    label.innerHTML = "Quantity"

    div.appendChild(label);

    const qty = document.createElement('input');
    qty.setAttribute('type', 'text');
    qty.setAttribute('name', qtyID);
    qty.setAttribute('id', qtyID);
    qty.setAttribute('class', 'qty');
    qty.setAttribute('value', '1');

    div.appendChild(qty);

    form.appendChild(div);

    const p = document.createElement('p');
    const addtocart = document.createElement('input');
    addtocart.setAttribute('type', 'submit');
    addtocart.setAttribute('value', 'Add to cart');
    addtocart.setAttribute('class', 'btn');

    p.appendChild(addtocart);

    form.appendChild(p);

    const expandrecipe = document.createElement('a');
    expandrecipe.setAttribute('href', url);
    expandrecipe.setAttribute('target', '_blank');
    expandrecipe.setAttribute('class', 'btn btn-primary');
    expandrecipe.innerHTML = "Expand the recipe"

    form.appendChild(expandrecipe);

    pd.appendChild(form);

    list.appendChild(pd);

    ulist.appendChild(list);

    products.appendChild(ulist);

    // var key = "test" + Date.now() + Math.random();
    // localStorage.setItem(key,document.getElementsByTagName('ul').outerHTML);
    // }
    // document.location.reload(false);
    // recipeshopping($);

}
