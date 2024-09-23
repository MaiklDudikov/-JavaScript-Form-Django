let model = {
    name: "BMW",
    autopilot : undefined,
    toJSON(){
        let jsonStr = `{"name": "${this.name}", "autopilot": `;
    if(this.autopilot === undefined){
        jsonStr += `"Not"}`
    }
    else{
        jsonStr += `"${this.autopilot}"}`
    }
    return jsonStr;
    }
}

let car = {
    color: "Black",
    date : new Date(2019, 7, 21),
    model
}

let carJSON = JSON.stringify(car);
alert(carJSON);

// let personStr = `{
//     "firstName": "Andrey",
//     "lastName": "Ivanov",
//     "age": 20,
//     "isStudent": true,
//     "contactInfo": {
//     "phone": "098-556-33-41",
//     "email": "AndreyIvanov@gmail.com"
//     },
//     "disciplines": [
//     "Programming",
//     "Machine engineering",
//     "English"
//     ]
// }`

// let person = JSON.parse(personStr);
// alert(person.firstName)
// alert(person.contactInfo.phone);

// let person = {
//     firstName: "Andrey",
//     lastName: "Ivanov",
//     age: 20,
//     isStudent: true,
//     сontactInfo: {
//     "phone": "098-556-33-41",
//     "email": "AndreyIvanov@gmail.com"
//     },
//     disciplines: [
//     "Programming", "Machine engineering", "English"
//     ]
// }

// function checkAge(key, value) {
//     if (key === "age" && value >= 18) {
//     return undefined;
//     }
//     return value;
// }

// let jsonPerson2 = JSON.stringify(person, null, 2);  // checkAge
// alert(jsonPerson2);

// let jsonPerson3 = JSON.stringify(person, ["firstName", "lastName"]);
// alert(jsonPerson3);

// let person = {
//     firstName: "Andrey",
//     lastName: "Ivanov",
//     age: 20,
//     isStudent: true,

//     contactInfo: {
//         "phone": "098-556-33-41",
//         "email": "AndreyIvanov@gmail.com"
//     },

//     disciplines: [
//         "Programming", "Machine engineering", "English"
//     ]
// }

// let jsonPerson = JSON.stringify(person);
// console.log(jsonPerson);
// alert(jsonPerson);

// let badExample = {
//     [Symbol("id")]: 1,
//     property: undefined,
//     Foo() {
//         console.log("Hi!");
//     }
// }

// let emptyStr = JSON.stringify(badExample);
// alert(emptyStr);
