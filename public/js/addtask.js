let title = document.getElementById('title')
let description = document.getElementById('description')
let taskStatus = document.getElementById('status')
let startDate = document.getElementById('start-date')
let endDate = document.getElementById('end-date')
let addTaskForm = document.getElementById('add-task-form')

addTaskForm.onsubmit=()=>{
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '', true);
    
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
           const res = JSON.parse(xhr.response)
           if(res.status){
                window.location.href = window.location.href
           }
        }
    }

    let json = JSON.stringify({
       type : 'add-task',
       title : title.value,
       description : description.value,
       task_status : taskStatus.value,
        start_date : startDate.value,
        end_date : endDate.value
   });
  
    xhr.send(json);
}


