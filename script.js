let students = JSON.parse(localStorage.getItem("students")) || [];

function getGrade(score){
    if(score >= 70) return {grade:"A", point:5};
    if(score >= 60) return {grade:"B", point:4};
    if(score >= 50) return {grade:"C", point:3};
    if(score >= 45) return {grade:"D", point:2};
    if(score >= 40) return {grade:"E", point:1};
    return {grade:"F", point:0};
}

function addStudent(){
    let name = document.getElementById("name").value;
    let score = parseInt(document.getElementById("score").value);
    let credit = parseInt(document.getElementById("credit").value);

    if(!name || isNaN(score) || isNaN(credit)){
        alert("Fill all fields correctly");
        return;
    }

    let result = getGrade(score);

    students.push({
        name: name,
        score: score,
        credit: credit,
        grade: result.grade,
        point: result.point
    });

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}

function displayStudents(){
    let tableBody = document.getElementById("tableBody");
    let gpaDisplay = document.getElementById("gpa");

    if(!tableBody || !gpaDisplay) return;

    tableBody.innerHTML = "";

    let totalPoints = 0;
    let totalCredits = 0;

    students.forEach(function(student){

        let row = "<tr>" +
                  "<td>" + student.name + "</td>" +
                  "<td>" + student.score + "</td>" +
                  "<td>" + student.credit + "</td>" +
                  "<td>" + student.grade + "</td>" +
                  "<td>" + (student.point * student.credit) + "</td>" +
                  "</tr>";

        tableBody.innerHTML += row;

        totalPoints += student.point * student.credit;
        totalCredits += student.credit;
    });

    let gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;

    gpaDisplay.innerHTML = "GPA: " + gpa;
}

function clearAll(){
    students = [];
    localStorage.removeItem("students");
    displayStudents();
}

window.onload = function(){
    displayStudents();
}