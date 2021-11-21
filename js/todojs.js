var todos=[];
var todoForm=document.querySelector("#form");
var todoList=document.querySelector(".list-group");

function createTodosItem(todovalue,todoIndex){
	
//create list
	var li=document.createElement("li");
	li.setAttribute("class","list-group-item d-flex justify-content-between");
	
//create span
	var span=document.createElement("span");
	span.setAttribute("class","col-md-8");
	span.innerHTML=todovalue;

//create edit icon and update the item
	var editIcon=document.createElement("i");
	editIcon.setAttribute("class","far fa-edit col-md-2");
	editIcon.addEventListener("click",function(){
	var storeTdos=localStorage.getItem("todos");
	stableTodos=JSON.parse(storeTdos);
	todoForm.txt.value=stableTodos[todoIndex].value;
	var addbtn=document.getElementById("addbtn");
	var savebtn=document.getElementById("savebtn");
	addbtn.style.display="none";
	savebtn.style.display="block";
	var saveindex=document.getElementById("saveindex");
	saveindex.value=todoIndex;
	savebtn.addEventListener("click",function(){
		var saveindex=document.getElementById("saveindex").value;
		todos[saveindex].value=todoForm.txt.value;
		localStorage.setItem("todos",JSON.stringify(todos));
		addbtn.style.display="block";
		savebtn.style.display="none";
		todoForm.txt.value="";
		todosrender();
		
	});

	});
	// delete icon and process
	var icon=document.createElement("i");
	icon.setAttribute("class","fas fa-trash col-md-2");
	icon.addEventListener("click",function(event){
		event.target.parentElement.remove();
		todos.splice(todoIndex,1);
		localStorage.setItem("todos",JSON.stringify(todos));
	});
	li.appendChild(span);
	li.appendChild(editIcon);
	li.appendChild(icon);
	return li;
}
function todosrender(todos){
	todos.forEach(function(todo,index){
		var li=createTodosItem(todo.value,index);
		todoList.appendChild(li);
	});
}

/*for show data
	function todosrender(todos){          
	todos.forEach(function(todo){
	var li=document.createElement("li");
	li.setAttribute("class","list-group-item");
	li.innerHTML=todo.value;
	todoList.appendChild(li);
	});
}*/

 //for get data from localstorage
var storeTdos=localStorage.getItem("todos"); 
if (storeTdos){
	stableTodos=JSON.parse(storeTdos);
	todos=stableTodos;
	todosrender(todos);
	
}
//for add data
todoForm.addEventListener("submit",function(){
	//event.preventDefault();
	todovalue=todoForm.txt.value;
	todos.push({
		value:todovalue,
		completed:false
	});
	todoForm.txt.value="";
	localStorage.setItem("todos",JSON.stringify(todos));
	var li=createTodosItem(todovalue);
	todoList.appendChild(li);
});