let Table_content = document.getElementById('Table_content');

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let tasksArray = JSON.parse(localStorage.getItem(key));
    createTable(key);
    console.log(`Key: ${key}`);
}

function createTable(key) {
    let tasksArray = JSON.parse(localStorage.getItem(key));
    let table = document.createElement('table');
    
    let thead = document.createElement('thead');
    let th = document.createElement('th');
    th.colSpan = 3; // Assuming two columns
    th.innerHTML = key;
    thead.appendChild(th);
    table.appendChild(thead);

    let tbody = document.createElement('tbody');
    for (let i = 0; i < tasksArray.length; i++) {


 
        let tr = document.createElement('tr');
        
        let td1 = document.createElement('td');

 
        let td2 = document.createElement('td');
        td2.innerText = tasksArray[i].TaskName;


        

        let td3= document.createElement('td');

        td3.innerText=tasksArray[i].status? 'Complite':'Uncomplite';
        

   
        


        tr.appendChild(td1);
        tr.appendChild(td2);
       
        tr.appendChild(td3);
        tbody.appendChild(tr);

         // Example input



// Create a Date object from the timestamp
const date = new Date( tasksArray[i].Input_time);

// Extract the hours, minutes, and seconds
let hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

// Determine AM or PM
const ampm = hours >= 12 ? 'PM' : 'AM';

// Convert hours from 24-hour to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // The hour '0' should be '12'

// Format minutes and seconds to always be two digits
const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

console.log(`${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`);
    td1.innerText =`${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    }

    table.appendChild(tbody);
    Table_content.appendChild(table);


// Assuming you have a date input


}



