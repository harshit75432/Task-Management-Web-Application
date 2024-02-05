

let alertBox = document.getElementById('alert-box')
confirmPassword.onchange=()=>{
    if(confirmPassword.value != password.value){
        confirmPassword.setCustomValidity('Your confirm password does not match with password please try again')
    }else{
        confirmPassword.setCustomValidity('')
    }
}