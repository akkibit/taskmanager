var dt = new Date();
document.getElementById("date").innerHTML = dt.toLocaleDateString();

var tm = new Date();
document.getElementById("time").innerHTML = tm.toLocaleTimeString();

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners(){
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', removeAllTasks);
	filter.addEventListener('keyup', filterTask);
	//DOM load event
	document.addEventListener('DOMContentLoaded', getTasks);
}

function getTasks(){
	if(localStorage.getItem('tasks')=== null){
		tasks=[];
	}
	else{
		tasks=JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
	const li=document.createElement('li');
	//add classname
	li.className='collection-item';
	//add text node
	li.appendChild(document.createTextNode(task));
	//create delete icon link
	const link=document.createElement('a');
	//add classname
	link.className='delete-item secondary-content';
	//adding <i> element ti link
	link.innerHTML='<i class="fa fa-remove"></i>';
	//append link to list item
	li.appendChild(link);
	//append li to ul
	taskList.appendChild(li);

	});
}

function addTask(e){
	if(taskInput.value === ''){
		alert('Add a Task');
	}
	else{
	//create li element
	const li=document.createElement('li');
	//add classname
	li.className='collection-item';
	//add text node
	li.appendChild(document.createTextNode(taskInput.value));
	//create delete icon link
	const link=document.createElement('a');
	//add classname
	link.className='delete-item secondary-content';
	//adding <i> element ti link
	link.innerHTML='<i class="fa fa-remove"></i>';
	//append link to list item
	li.appendChild(link);
	//append li to ul
	taskList.appendChild(li);
	//add it to local storage
	addItemToLocalStorage(taskInput.value);
}
    taskInput.value='';
	e.preventDefault();
}

function addItemToLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks')=== null){
		tasks=[];
	}
	else{
		tasks=JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
	if(confirm('Are you Sure?')){
		e.target.parentElement.parentElement.remove();
	}
	removeItemFromLS(e.target.parentElement.parentElement);
	e.preventDefault();
}

function removeItemFromLS(taskItem){
	let tasks;
	if(localStorage.getItem('tasks')=== null){
		tasks=[];
	}
	else{
		tasks=JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task,index){
		if(taskItem.textContent===task){
			tasks.splice(index,1);
		}
	});
	localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeAllTasks(e){
	if(confirm('Are you Sure?')){
	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild);
	}
}

	//another method
	/*
	var selectAllItems=document.querySelectorAll('.collection-item');
	for(var i=0;i<selectAllItems.length;i++){
		selectAllItems[i].remove();
	}
	*/
	e.preventDefault();
}

function filterTask(e){
	const text=e.target.value.toLowerCase();
	document.querySelectorAll('.collection-item').forEach
	(function(task){
		const item=task.firstChild.textContent;
		if(item.toLowerCase().indexOf(text)!=-1){
			task.style.display='block';
		}
		else{
			task.style.display='none';
		}
	} );
  e.preventDefault();
}

