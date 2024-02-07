let password = document.getElementById('password')
let confirmPassword = document.getElementById('confirm-password')


password.onchange=()=>{
    if(confirmPassword.value != password.value){
        confirmPassword.setCustomValidity('Your password does not match with confirm password please try again')
    }else{
        confirmPassword.setCustomValidity('')
    }
}
confirmPassword.onchange=()=>{
    if(confirmPassword.value != password.value){
        confirmPassword.setCustomValidity('Your confirm password does not match with password please try again')
    }else{
        confirmPassword.setCustomValidity('')
    }
}