//https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/login?emailId=abcTest@gmail.com&pwd=Amani123!

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
let flag = false;
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    awsCall(username,password)

    if(!flag){
        alert("You have successfully logged in.");
        window.location.assign("/Users/amanideepthimatta/HungryHeads/src/views/dashboard.html");

        // location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

function awsCall(username,password){
    var requestOptions = {
        method: 'POST',
        redirect: 'follow'
      };
      console.log("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/login?pwd="+password+"&emailId="+username)
      fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/login?pwd="+password+"&emailId="+username, requestOptions)
        .then(response => response.json())
        .then((result)=>{
            if(result.statusCode===200){
                console.log("true!!");
                flag=true;
                sessionStorage.setItem('email', username)
                // $.session.set('email', username);
                console.log(sessionStorage.getItem('email'));
            } 
                else{
                    console.log("false!!")
                }})
        .catch(error => console.log('error', error));
}