let request;

if(window.XMLHttpRequest){
    request = new XMLHttpRequest();
}
else{
    request = new ActiveXObject("Microsoft.XMLHTTP");
}

request.open("GET", "person.json");
request.onload = function(){
    if(request.status === 200){
        alert(request.response);
    }
}

request.send();
