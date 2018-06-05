function makeCheckBox(div,arr){
    let checkAll=document.createElement('input');
        label=document.createElement('label');
        checkAll.type="checkbox";
        checkAll.value="checkall";
        label.innerHTML="全选"
    label.appendChild(checkAll);
    div.appendChild(label);
    for(let i=0;i<arr.length;i++){
        let input=document.createElement('input');
            label=document.createElement('label');
            input.type="checkbox";
            input.value=arr[i];
            label.innerHTML=arr[i];
        label.appendChild(input,arr[i]);
        div.appendChild(label);
    }  
    div.addEventListener("click",function(ev){
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "input"){
           let val=target.value;
               checknode=div.getElementsByTagName("input");
            if(val=="checkall"){
                if(checknode[0].checked){
                    for(let i=1;i<checknode.length;i++){
                    checknode[i].checked=true;
                  }
                }else{
                    for(let i=1;i<checknode.length;i++){
                    checknode[i].checked=false;
                    }
                }
            }else{
               if(checknode[0].checked){
                  checknode[0].checked=false;
                 }
            }
        setUrl();
        let data=makeDate();
        render(data);
    }
  })
}
