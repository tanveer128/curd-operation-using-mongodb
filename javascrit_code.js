
document.getElementById('add').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const age = document.getElementById('age').value;
    console.log(name+" "+age+" "+id);
    const url = 'http://localhost:3000/addstu'; 

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id,name, age })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Data added successfully');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
});

document.getElementById('dis').addEventListener('click', function() {
    const url = 'http://localhost:3000/display';
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Traverse through the array using a for loop
        for (let i = 0; i < data.length; i++) {
            const obj = data[i];
            
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                   if(key=="name" || key=="age"){
                    console.log(`${key}: ${obj[key]}`);
                    
                   }
                }
            }
            console.log('-----------------------');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});

document.getElementById('findstudent').addEventListener('click',function(){
    const id = document.getElementById('number').value;
const url=`http://localhost:3000/find/${id}`;
fetch(url)
    .then(response => response.json())
    .then(data => {
       for(let i=0;i<data.length;i++){
        const obj=data[i];
        for(let key in obj){
            if(key=="name" || key=="age"|| key=="id")
            {
                console.log(`${key}: ${obj[key]}`);
            }
            
        }
       }
    })
    .catch(error => {
        console.error('Error:', error);
    });

})


document.getElementById('update').addEventListener('click',function(){
    const id=document.getElementById('id1').value;
    const name=document.getElementById('name1').value;
    const age=document.getElementById('age1').value;
    const url=`http://localhost:3000/up/${id}`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Data updated successfully');
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })
})



document.getElementById('delete').addEventListener('click',function(){
    const id=document.getElementById('delid').value;
    console.log(id)
    const url=`http://localhost:3000/del/${id}`;
    fetch(url,{
        method: 'DELETE'
    })
    .then(response=>{
        console.log("deleted successfully");
    }).catch(err=>{
        console.log("not delete");
    })
})