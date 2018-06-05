var regionDiv=document.getElementById("region-radio-wrapper");
    productDiv=document.getElementById("product-radio-wrapper");
    tableWrap=document.getElementById("table-wrapper");
    color=["#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7","#d4ec59","#d660a8","#6370de"];
    
var sourceData;    //Ajax请求数据
var Util={
  ajax:function(url){
    let xhr=new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.send();
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4&&xhr.status==200){
        sourceData=JSON.parse(xhr.responseText)["sourceData"];
      }
    }
  }
}
Util.ajax("js/111.json");


//localStorage.removeItem("data");
window.onload=function(){
  makeCheckBox(regionDiv,["华东","华北","华南"]);
  makeCheckBox(productDiv,["手机","笔记本","智能音箱"]);
  if(this.localStorage&& localStorage.getItem("data")){
    let data=JSON.parse(localStorage.getItem("data"));
    render(data);
  }
  if(window.location.hash){
    let data=makeDate();
    render(data);
    hashCheck();
  }
}
window.onhashchange=function(){
  let data=makeDate();
  render(data);
}
document.getElementById("save-data").addEventListener("click",function(){
    let data=makeTableData();
    localStorage.setItem("data",JSON.stringify(data));   //localStorage储存字符串
})
document.addEventListener("click",function(){
  if(document.querySelector(".table_cel")){    //点击表格外触发取消编辑
    document.querySelector(".table_cel").click();
  }
})
function render(data){
  tableWrap.innerHTML="";
  svg.innerHTML="";
  drawSvgBg();
  drawCtxBg();
  if(data){
      table= makeTable(data);
      tableWrap.appendChild(table);
      drawBar(data,heigthMax(data));
      for(let i=0;i<data.length;i++){
          drawLine(data[i],heigthMax(data));
      }
  }
}
function setHash(){
  let regionArr=makeRegionArr();
      productArr=makeProductArr();
  window.location.hash="&r"+regionArr.toString()+"&r"+"&p"+productArr.toString()+"&p";
}
function parseHash(){
 let arr= [];
     str=decodeURIComponent(window.location.hash);   //字符转码（火狐浏览器会将中文URL转化为UTF-8字符，需转化）
 arr[0]=str.match(/&r(\S*)&r/)[1];    //正则表达式匹配两指定字符之间
 arr[1]=str.match(/&p(\S*)&p/)[1];
 return arr;
}
function hashCheck(){
  let str=decodeURIComponent(window.location.hash);
      input=document.getElementsByTagName("input");
  for(let i=0;i<input.length;i++){
    if(str.indexOf(input[i].value)!=-1){
      input[i].checked=true;
    }
  }
}