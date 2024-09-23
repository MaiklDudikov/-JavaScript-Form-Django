let subbliBtn = document.getElementById("submit-btn");
subbliBtn.onclick = function(){
    let nameValue = document.getElementById("name-inp").value;
    let phonValue = document.getElementById("phone-inp").value;
    let data = "name=" + encodeURIComponent(nameValue) + "&phone=" + encodeURIComponent(phonValue);
    let request;

    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // http://localhost:8000/

    request.open("POST", "http://localhost:8000/");

    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200) {
            alert("Здравствуйте " + nameValue + "! Мы перезвоним вам через 1 минуту" );
            }
        }

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(data);
}


// let request;

// if(window.XMLHttpRequest){
//     request = new XMLHttpRequest();
// }
// else{
//     request = new ActiveXObject("Microsoft.XMLHTTP");
// }

// request.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=Kiev&units=metric&APPID=b03a2cfad336d11bd9140ffd92074504");

// request.onload = function(){
//     if(request.status === 200){
//         console.log(request.response);
//     }
// }

// request.send();


// let request;

// if(window.XMLHttpRequest){
//     request = new XMLHttpRequest();
// }
// else{
//     request = new ActiveXObject("Microsoft.XMLHTTP");
// }

// request.open("GET", "tex.txt");
// request.onloadend = function(event){
//     alert('Загужено ${event.loaded}');
// }

// request.onerror = function(){
//     alert("Ошибка");
// }

// request.onload = function(){
//     if(request.status === 404){
//         alert(request.response);
//     }
// }

// request.send();


// let request;

// if(window.XMLHttpRequest){
//     request = new XMLHttpRequest();
// }
// else{
//     request = new ActiveXObject("Microsoft.XMLHTTP");
// }

// request.open("GET", "person.json");
// request.onload = function(){
//     if(request.status === 200){
//         alert(request.response);
//     }
// }

// request.send();
