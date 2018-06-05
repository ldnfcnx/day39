var svg=document.getElementById("s1");//document.createElement("svg");
    svgBox=document.getElementById("svg-wrapper");

function drawSvgBg(){
    svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
    svg.setAttribute("width",600);
    svg.setAttribute("height",320);
    svg.setAttribute("version",1.1);

    let xline=document.createElementNS('http://www.w3.org/2000/svg','line');
        yline=document.createElementNS('http://www.w3.org/2000/svg','line');
        style1="stroke:rgb(0,0,0);stroke-width:2";
        style2="stroke:rgba(0,0,0,.2);stroke-width:1;";
    xline.setAttribute("x1",40);
    xline.setAttribute("y1",280);
    xline.setAttribute("x2",560);
    xline.setAttribute("y2",280);
    xline.setAttribute("style",style1);

    yline.setAttribute("x1",40);
    yline.setAttribute("y1",280);
    yline.setAttribute("x2",40);
    yline.setAttribute("y2",40);
    yline.setAttribute("style",style1);

    for(let i=1;i<=12;i++){
        let xScale=document.createElementNS('http://www.w3.org/2000/svg','line');
        xScale.setAttribute("x1",40+40*i);
        xScale.setAttribute("y1",280);
        xScale.setAttribute("x2",40+40*i);
        xScale.setAttribute("y2",285);
        xScale.setAttribute("style",style1);
        svg.appendChild(xScale);
    }
    for(let i=1;i<=6;i++){
        let yScale=document.createElementNS('http://www.w3.org/2000/svg','line');
        yScale.setAttribute("x1",40);
        yScale.setAttribute("y1",280-40*i);
        yScale.setAttribute("x2",35);
        yScale.setAttribute("y2",280-40*i);
        yScale.setAttribute("style",style1);
        svg.appendChild(yScale);
    }
    for(let i=1;i<=6;i++){
        let scale=document.createElementNS('http://www.w3.org/2000/svg','line');
        scale.setAttribute("x1",40);
        scale.setAttribute("y1",280-40*i);
        scale.setAttribute("x2",560);
        scale.setAttribute("y2",280-40*i);
        scale.setAttribute("style",style2);
        svg.appendChild(scale);
    }

    svg.appendChild(xline);
    svg.appendChild(yline);
}


function drawBar(data,h){
    for(let j=0,n=data.length;j<n;j++){
        let sale=data[j].sale;

        style="fill:"+data[j].color;
      for(let i=0;i<sale.length;i++){
        let rect=document.createElementNS('http://www.w3.org/2000/svg','rect');
        rect.setAttribute("style",style);
        rect.setAttribute("width",36/n);
        rect.setAttribute("height",240*sale[i]/h);
        rect.setAttribute("x",61+40*i+36/n*j);
        rect.setAttribute("y",39+240*(1-sale[i]/h));
        svg.appendChild(rect);
       }
    }

}

function heigthMax(data){
    let max=data[0]["sale"][0];
    for(let i=0;i<data.length;i++){
        for(let j=0;j<12;j++){
            if(data[i]["sale"][j]>max){
                max=data[i]["sale"][j];
            }
        }
    }
    var x=Math.pow(10,max.toString().length-1);
    height=Math.ceil(max/x)*x;
    return height;
}
