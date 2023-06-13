var selectedRow = null;
var emp_id_data = [];


function onFormSubmit(){
    if(validate()){
    formData=readFormData();
    empIdCheck();
    checkDuplicate();   
    if(selectedRow==null )
    insertNewRecord(formData);
    else
    updateRecord(formData);
        resetForm();    
    }
 }

function readFormData(){
    var formData = {}; // empty object
    formData["emp_id"] = document.getElementById("emp_id").value;
    formData["emp_name"] = document.getElementById("emp_name").value;
    formData["emp_age"] = document.getElementById("emp_age").value;
    formData["emp_gender"] = document.getElementById("emp_gender").value;
    // console.log(formData);
    return formData;

}

function insertNewRecord(data) {
    var table = document.getElementById("emp_list").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();
    // newRow.setAttribute('data-id', data.emp_id); // Add data-id attribute for sorting
  
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.emp_id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.emp_name;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.emp_age;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.emp_gender;
  
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a class="edit-link" onClick="onEdit(this)">Edit</a>
                      <a class="delete-link" onClick="onDelete(this)">Delete</a>`;
}

function resetForm(){
    document.getElementById("emp_id").value="";
    document.getElementById("emp_name").value="";
    document.getElementById("emp_age").value="";
    document.getElementById("emp_gender").value="";
    selectedRow=null;
}
function onEdit(td){
    selectedRow=td.parentElement.parentElement;
    document.getElementById("emp_id").value=selectedRow.cells[0].innerHTML;
    document.getElementById("emp_name").value=selectedRow.cells[1].innerHTML;
    document.getElementById("emp_age").value=selectedRow.cells[2].innerHTML;
    document.getElementById("emp_gender").value=selectedRow.cells[3].innerHTML;
   
    
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML=formData.emp_id;
    selectedRow.cells[1].innerHTML=formData.emp_name;
    selectedRow.cells[2].innerHTML=formData.emp_age;
    selectedRow.cell3[3].innerHTML=formData.emp_gender;
    resetForm();

}

function onDelete(td){
    if(confirm('Are you sure to delete this record ?')){
        row=td.parentElement.parentElement;
        var deleted_id=row.cells[0].innerHTML;
        //store deleted id in emp_id_data array
        emp_id_data.push(deleted_id);
        console.log(emp_id_data);
      
        document.getElementById("emp_list").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate(){
    isValid=true;
    
    if(document.getElementById("emp_id").value=="" 
    || document.getElementById("emp_id").value<0 
    || isNaN(document.getElementById("emp_id").value
    )){
        isValid=false;
        document.getElementById("id_validation_error").classList.remove("hide");
    }

    if(document.getElementById("emp_name").value==""){
        isValid=false;
        document.getElementById("name_validation_error").classList.remove("hide");
    }

    if(document.getElementById("emp_age").value==""
            || document.getElementById("emp_age").value<18 
                || document.getElementById("emp_age").value>65){
        isValid=false;
        document.getElementById("age_validation_error").classList.remove("hide");
    }
    if(document.getElementById("emp_gender").value==""){
        isValid=false;
        document.getElementById("gender_validation_error").classList.remove("hide");
    }
    
    // else{
    //     isValid=true;
    //     if(!document.getElementById("validation_error").classList.contains("hide"))
    //     document.getElementById("validation_error").classList.add("hide");
    // }
    return isValid;
}
function checkDuplicate(){
    var id=document.getElementById("emp_id").value;
    var table=document.getElementById("emp_list");
    var arr=[];
    for(var i=0;i<table.rows.length;i++){
        arr[i]=table.rows[i].cells[0].innerHTML;   
    }
    for(var i=0;i<arr.length;i++){
        if(id==arr[i] || id==emp_id_data[i]){
            // console.log(arr[i]);
            alert("Employee id already exists");
            // document.getElementById("emp_list").deleteRow(row.rowIndex); 
            updateRecord(formData);
            return arr[i];
        }
    }
    return true;
}

// make a function to check duplicate id in emp_id_data array

// function empIdCheck(){
//     var id=document.getElementById("emp_id").value;
//     for(var i=0;i<emp_id_data.length;i++){
//         if(id==emp_id_data[i]){
//             alert("Employee id already exists");
//             return emp_id_data[i];
//         }
//     }
//     return true;
// }

function empIdCheck(){
    var id=document.getElementById("emp_id").value;
    // emp_id_data.push(formData.emp_id);
    // console.log(emp_id_data);
    if(emp_id_data.includes(id)){
        alert("This id was previously used");
        updateRecord(formData);
        // return emp_id_data[i];
    }
           
    // for(var i=0;i<emp_id_data.length;i++){
    //     console.log("upper loop");

    //     if(id==emp_id_data[i]){
    //         console.log("in loop");
            
    //         // alert("Employee id already exists");
    //         updateRecord(formData);
    //         return emp_id_data[i];
    //         break;
            
    //     }
    //     console.log("out of loop");
    // }
    // return true;
}

function sortTable(){
    var table, rows, switching, i, shouldSwitch;
    table=document.getElementById("emp_list");
    switching=true;
    while(switching){
        switching=false;
        rows=table.rows;
        // for(i=1;i<(rows.length+1);i++){
            for(i=1;i<(rows.length-1);i++){
            shouldSwitch=false;
            var x=rows[i].getElementsByTagName("TD")[0];
            var y=rows[i+1].getElementsByTagName("TD")[0];
            if(x.innerHTML>y.innerHTML){
                shouldSwitch=true;
                break;
            }
        }
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
            switching=true;
        }
    }
}

// function searchTable() {
//     var input = document.getElementById("searchInput").value.toLowerCase();
//     var table = document.getElementById("emp_list");
//     var rows = table.getElementsByTagName("tr");

//     for (var i = 0; i < rows.length; i++) {
//         var rowData = rows[i].textContent.toLowerCase();

//         if (rowData.includes(input)) {
//             rows[i].style.display = "";
//         } else {
//             rows[i].style.display = "none";
//         }
//     }
// }

// implement search function

function searchTable() {
    var input = document.getElementById("searchInput").value.toLowerCase();
    var table = document.getElementById("emp_list");
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var rowData = rows[i].textContent.toLowerCase();

        if (rowData.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}
