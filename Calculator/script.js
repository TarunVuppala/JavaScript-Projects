function calc(a) {
    let x = document.getElementsByClassName("calc")[0];
    let resultField = x.querySelector(".result");
    resultField.value += a;
}
function res() {
    let x = document.getElementsByClassName("calc")[0];
    let resultField = x.querySelector(".result");
    let result = eval(resultField.value); 
    
    if (isNaN(result) || !isFinite(result)) {
        resultField.value = "Error";
    } 
    else {
        resultField.value = result;
    }
}
function clearResult() {
    let x = document.getElementsByClassName("calc")[0];
    let resultField = x.querySelector(".result");
    resultField.value = " ";
}

function del() {
    let x = document.getElementsByClassName("calc")[0];
    let resultField = x.querySelector(".result");
    resultField.value = resultField.value.slice(0, -1);
}
