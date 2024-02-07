let deleteBtn = document.querySelectorAll('.delete')

deleteBtn.forEach((btn)=>{
   
    btn.onclick=()=>{
        let id = btn.id.split('-')[1]
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `/tasks/${id}`, true);
    
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        xhr.onreadystatechange = () => {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
               const res = JSON.parse(xhr.response)
               if(res.status){
                    window.location.href = window.location.href
               }
            }
        }
      
        xhr.send();
    }
})