<?php

$method = $_SERVER['REQUEST_METHOD'];
if($method=="POST"){
    echo "200";
    http_response_code(200);
}
else{
    echo "204";
    http_response_code(204);
}
