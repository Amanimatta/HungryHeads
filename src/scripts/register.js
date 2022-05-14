var temp = false;
function formValidation() {

    if (verifyPassword()) {
        if (verifyPhoneNumber()) {
            var password = document.getElementById("password").value;
            var phone = document.getElementById("phno").value;
            var name = document.getElementById("fname").value + " " + document.getElementById("lname").value;;
            var email = document.getElementById("emailId").value;
            var address = document.getElementById("address").value;
            console.log("Form success!");
            console.log("ALL DETAILS: " + name, email, password, address, phone)
            awsCall(name, email, password, address, phone)
            console.log("Phone Number:" + flag);
            
        }
        else {
            alert("Please fix the issues with phone number!!")

        }
    }
    else {
        alert("Please fix the issues with password!!")

    }
}

function verifyPassword() {
    flag = false;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    console.log(password.length);
    if (password.length >= 8 && password.length <= 16) {
        if (password === confirmPassword) {
            document.getElementById("check-password").innerHTML = "Passwords match!";
            document.getElementById("check-password").style = "color:green;";
            flag = true;
        }
        else {
            // alert("Passwords do not match!");
            document.getElementById("check-password").innerHTML = "Passwords do not match!";
            document.getElementById("check-password").style = "color:red;"
        }
    }
    else {
        alert("Password's length should be greater than 8 and less than 16!")
    }
    return flag;
}
function verifyPhoneNumber() {
    flag = false;
    var element = document.getElementById("phno");
    var label = document.getElementById("check-phnum");
    var phnum = element.value;
    var phlen = phnum.length;

    if (phlen < 10 || phlen > 10) {
        label.innerHTML = "Phone Number should have length equal to 10!";
        label.style = "color:red;";
        flag = false;
        return flag;
    }
    else {
        label.innerHTML = "Phone Number is of correct format!";
        label.style = "color:green;";
        flag = true;

        return flag;
    }
}
function awsCall(name, email, password, address, phone) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic aHVuZ3J5aGVhZHM6UGFzc3dvcmQxMjM=");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    print(name, email, password, address, phone)
    fetch("https://j57w4caona.execute-api.us-east-1.amazonaws.com/alpha/register?name=" + name + "&email=" + email + "&password=" + password + "&address=" + address + "&phone=" + phone, requestOptions)
        .then(response => response.json())
        .then((result) => 
        // console.log(result))
        {
            if (result['statusCode'] === 200) {
                console.log("HERE!!");
                console.log("Phone Number:");
                sessionStorage.setItem('email', email);
                alert(sessionStorage.getItem('email'));
                window.location.assign("/Users/amanideepthimatta/HungryHeads/src/views/preference.html");
                
            }
            else {
                console.log("false!!")
                alert('Registration was not successful!!')
            }
        })
        // .then(response => response.text())
        // .then(result => console.log(result))
        .catch(error => console.log('error', error));
}