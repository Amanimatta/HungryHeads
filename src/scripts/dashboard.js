function searchByRecipe() {
    var searchtype = document.getElementById('dropdown').value

    var search = document.getElementById("searchInput").value;
    console.log(sessionStorage.getItem('email'));

    console.log(searchtype);
    console.log("Search" + search);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aHVuZ3J5aGVhZHM6UGFzc3dvcmQxMjM=");

    
    if (searchtype === 'Recipe') {
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
        fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/findrecipe?recipeName=" + search, requestOptions)
            .then(response => response.json())
            .then((result) => {
                iteraterecipes(result.display_list,result.display_list.length);
            })
            .catch(error => console.log('error', error));
    }
    else if (searchtype === 'Ingredient') {
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
          };
        fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/findingredients?ingredientsList=" + search, requestOptions)
            .then(response => response.json())
            .then((result) => {
                console.log(JSON.parse(result.display_list));
                
                iteraterecipes(JSON.parse(result.display_list),Object.keys(JSON.parse(result.display_list)).length);
            })
            .catch(error => console.log('error', error));
    }
}
function iteraterecipes(recipeArray,length) {
    // const length = recipeArray.length;
    console.log(length)
    console.log(recipeArray);
    console.log(recipeArray[0]);
    console.log(recipeArray[0]['name'])
    var allIngredients;
    for (var i = 0; i < length; i++) {
        allIngredients += recipeArray[i]['all_ingredients'];
        recipeCreator(recipeArray[i]['name'], recipeArray[i]['url'],recipeArray[i]['price'])
    }
    sessionStorage.setItem('ingredients',allIngredients);
    var element = document.getElementById('body');

    const script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "../scripts/otherScripts.js";

    element.appendChild(script);
}
function recipeCreator(recipename, url,price) {
    let randomNum = price;//(Math.floor(Math.random() * (20 - 5 + 1) + 20)).toString();
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
}
