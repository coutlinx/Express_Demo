window.onload=function() {
	var ups=document.getElementsByClassName("upBtn");//升序按钮集合
	var downs=document.getElementsByClassName("downBtn");//降序按钮集合

	//注册升序排列处理程序
	for(var i=0,len=ups.length;i<len;i++)
		ups[i].onclick=ascOrder;

	//注册降序排列处理程序
	for(var i=0,len=downs.length;i<len;i++)
		downs[i].onclick=desOrder;
}

function ascOrder() {
	var col=this.parentNode.cellIndex;//需要排序的列序号

	var  tbody=document.getElementsByTagName("tbody");
	for(var i=0,len=tbody[0].children.length,trs=tbody[0].children;i<len-1;i++)
		for(var j=i+1;j<len;j++) {
			var x=Number(trs[i].children[col].innerText),y=Number(trs[j].children[col].innerText);
			if(x>y) {
				var t=trs[i].innerHTML;
				trs[i].innerHTML=trs[j].innerHTML;
				trs[j].innerHTML=t;
			}
		}
}

function desOrder() {
	var col=this.parentNode.cellIndex;//需要排序的列序号

	var  tbody=document.getElementsByTagName("tbody");
	for(var i=0,len=tbody[0].children.length,trs=tbody[0].children;i<len-1;i++)
		for(var j=i+1;j<len;j++) {
			var x=Number(trs[i].children[col].innerText),y=Number(trs[j].children[col].innerText);
			if(x<y) {
				var t=trs[i].innerHTML;
				trs[i].innerHTML=trs[j].innerHTML;
				trs[j].innerHTML=t;
			}
		}
}

function deletTr(e){
	var myForm = document.createElement("form");
  	myForm.method="post" ;
	myForm.action="demo1/delet";
	let vaule =  e.parentElement.parentElement.children;
	var myInput = document.createElement("input");
	myInput.setAttribute('name','name');
	myInput.setAttribute("value", vaule[0].innerText);	
	myForm.appendChild(myInput);
	document.body.appendChild(myForm) ;
	myForm.submit() ;
	document.body.removeChild(myForm) ;
	e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement)
	}

function change(e){
	let values =[]; 
	let ele = e.parentElement.parentElement.children;
	for (i of ele){
		values.push(i.innerText)
	}
	let div = document.getElementById('change');
	div.style.display="block";
	console.log(div.children[0].children[1].children)
	for (let i=0 ; i<values.length ; i++){
		if (i<4){
			div.children[0].children[1].children[i].value=values[i]
		}else{
			console.log(values[i])
		}
		
	}
	var myForm = document.createElement("form");
	myForm.method="post" ;
  myForm.action="";
  let vaule =  e.parentElement.parentElement.children;
  var myInput = document.createElement("input");
  myInput.setAttribute('name','oldName');
  myInput.setAttribute("value", vaule[0].innerText);	
  myForm.appendChild(myInput);
  document.body.appendChild(myForm) ;
  myForm.submit() ;
  document.body.removeChild(myForm) ;
}
let quit = document.getElementById('false')
quit.onclick=function(){
	let div = document.getElementById('change');
	div.style.display="none";
}
