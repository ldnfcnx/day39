function makeDate(){
    let data=parseUrl();
        regionArr=data[0].split(",");
        productArr=data[1].split(",");
        result=[];
    if(regionArr==""&&productArr==""){
        return false;
    }
    if(regionArr==""||productArr==""){
      for(let i=0;i<sourceData.length;i++){
        if(productArr.indexOf(sourceData[i].product)!=-1||regionArr.indexOf(sourceData[i].region)!=-1){
               result.push(sourceData[i]);
           }
      }
    }else{
      for(let i=0;i<sourceData.length;i++){
        if(regionArr.indexOf(sourceData[i].region)!=-1&&
           productArr.indexOf(sourceData[i].product)!=-1){
               result.push(sourceData[i]);
           }
      }
    }
    colorData(result);
   return result;
}
function makeRegionArr(){
    let checkNode=regionDiv.getElementsByTagName("input");
        arr=[];
    optionArr(checkNode,arr);
    return arr;    
}
function makeProductArr(){
    let  checkNode=productDiv.getElementsByTagName("input");
         arr=[];
    optionArr(checkNode,arr);
    return arr;    
}
function optionArr(arr1,arr2){
    for(let i=1;i<arr1.length;i++){
        if(arr1[i].checked){
            arr2.push(arr1[i].value);
        }
    }
}
function tableJudge(){
    let regionArr=makeRegionArr();
        productArr=makeProductArr();
        if(regionArr.length==1&&productArr.length>1){
            return true;
        }else if(productArr.length==0){
            return true;
        } else{return false;}
}

function objToArr(obj){
    let arr=[];
    if(tableJudge()){
        arr.push(obj.region);
        arr.push(obj.product);
    }else{
        arr.push(obj.product);
        arr.push(obj.region);
    }
    for(let i=0;i<12;i++){
        arr.push(obj.sale[i]);
    }
    return arr;
}

function makeTable(data){
    let table=document.createElement("table");
        arrData=[];
    for(let i=0;i<data.length;i++){
        arrData.push(objToArr(data[i]));
    }
        arrData.sort();
    if(tableJudge()){
        var tableHear=["地区","商品","一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",];
    }else{
        var tableHear=["商品","地区","一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",]
    }
    arrData.unshift(tableHear);
    for(let i=0;i<arrData.length;i++){
        let tr=document.createElement("tr");
            row=1;
        tr.id=arrData[i][0]+"_"+arrData[i][1];
        for(let j=0;j<arrData[i].length;j++){
            if(i==0){
                var cell=document.createElement("th"); 
             }else{
                var cell=document.createElement("td"); 
            }
           if(j==0&&i>0){   //合并单元格 
                 let y=i-1;
                if(arrData[i][j]==arrData[y][j]){
                         continue;  
                }
                for(let x=i+1;x<arrData.length;x++){
                    if(arrData[i][j]==arrData[x][j]){
                        row++;
                    }
                }
                cell.rowSpan=row;
            }
            if(j>1&&i>0){
                cell.setAttribute("class","saleNum");
            }
            cell.innerHTML=arrData[i][j];
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }
    table.addEventListener("mouseover",function(ev){  //鼠标滑过tr绘制图表
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "td"){
            let sign=target.parentNode.id.split("_");
            console.log(sign)
                data=makeTableData();
                console.log(heigthMax(data))
            for(let i=0;i<data.length;i++){
                if(sign.indexOf(data[i].product)!=-1&&sign.indexOf(data[i].region)!=-1){
                    console.log(data[i].product,data[i].region)
                    let arr=[];
                    arr.push(data[i]);
                    svg.innerHTML="";
                    drawSvgBg();
                    drawCtxBg();
                    drawBar(arr,heigthMax(data));
                    drawLine(data[i],heigthMax(data));
                }
            }
        }
      });
      table.addEventListener("mouseout",function(){
        drawCtxBg();
        let data=makeTableData();
        svg.innerHTML="";
        drawSvgBg();
        drawBar(data,heigthMax(data));
        if(data){
            for(let i=0;i<data.length;i++){
                drawLine(data[i],heigthMax(data));
            }
        }
      })
      table.addEventListener("click",function(ev){  //表格编辑
        var target = ev.target || ev.srcElement;
        if(document.querySelector(".table_cel")){    //设置不能同时编辑两个数据
            document.querySelector(".table_cel").click();
        }
        if(target.className== "saleNum"){
            let oldNum=target.innerHTML;
                input=document.createElement("input");
                sub=document.createElement("button");
                cel=document.createElement("button");
            input.value=oldNum;
            input.addEventListener("keyup",function(e){
                if(e.keyCode==13){               //按 enter模拟点击确认
                    document.querySelector(".table_sub").click();
                }else if(e.keyCode==27){         //按 esc模拟点击取消
                    document.querySelector(".table_cel").click();
                }
            })
            sub.innerHTML="确认";
            sub.setAttribute("class","table_sub");
            sub.addEventListener("click",function(){
                let val=input.value;
                if(isNaN(val)){
                    alert("请填写数字");
                    input.focus();
                }else{
                    target.innerHTML=val;
                    target.setAttribute("class","saleNum");
                    
                }
            })
            cel.innerHTML="取消";
            cel.setAttribute("class","table_cel");
            cel.addEventListener("click",function(){
                target.innerHTML=oldNum;
                target.setAttribute("class","saleNum");
            })
            target.innerHTML="";
            target.setAttribute("class","");   //编辑时取消hover效果
            target.append(input,sub,cel);
            input.focus();
            ev.stopPropagation();              //点击表格外猝发取消编辑（阻止事件冒泡）
        }
      });
  return table;
}
function makeTableData(){
    let data=makeDate()||JSON.parse(localStorage.getItem("data"));
        trs=document.getElementsByTagName("tr");
    for(let i=1;i<trs.length;i++){
        let tds=trs[i].querySelectorAll(".saleNum");
            arr=[];
        for(let j=0;j<tds.length;j++){
            arr.push(Number(tds[j].innerHTML));
        }
        let sign=trs[i].id.split("_");
        for(let j=0;j<data.length;j++){
            if(sign.indexOf(data[j].product)!=-1&&sign.indexOf(data[j].region)!=-1){
                    data[j].sale=arr;
            }
        }
    }
    return data;
}
