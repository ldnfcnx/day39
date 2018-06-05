function drawCtxBg(){
    var canvas=document.getElementById("s2");
        ctx=canvas.getContext('2d');
    canvas.setAttribute("width",600);
    canvas.setAttribute("height",320);
    ctx.strokeStyle = "#000";
        
        ctx.beginPath();
        ctx.moveTo(40,40);
        ctx.lineTo(40,280);
        ctx.lineTo(560,280);
        ctx.stroke();
    for(let i=1;i<=12;i++){
        ctx.beginPath();
        ctx.moveTo(40+40*i,280);
        ctx.lineTo(40+40*i,285);
        ctx.stroke();
    }
    for(let i=1;i<=6;i++){
        ctx.beginPath();
        ctx.moveTo(40,40*i);
        ctx.lineTo(35,40*i);
        ctx.stroke();
    }
    for(let i=1;i<=6;i++){
        ctx.strokeStyle = "rgba(0,0,0,.2)"
        ctx.beginPath();
        ctx.moveTo(40,40*i);
        ctx.lineTo(560,40*i);
        ctx.stroke();
    }

}
function drawLine(data,h){
    var canvas=document.getElementById("s2");
        ctx=canvas.getContext('2d');
    ctx.strokeStyle = data.color;
    ctx.fillStyle = "#fff";
    let sale=data.sale;

    ctx.beginPath();
    for(let i=0;i<sale.length;i++){
        ctx.lineWidth = 2;
        if(i==0){
            ctx.moveTo(80+40*i,39+240*(1-sale[i]/h));
        }else{
            ctx.lineTo(80+40*i,39+240*(1-sale[i]/h));
        }
    }
    ctx.stroke();
    ctx.lineWidth = 3;
    for(let i=0;i<sale.length;i++){
        ctx.beginPath();
        ctx.arc(80+40*i,39+240*(1-sale[i]/h),3,0,Math.PI*2,true);
        ctx.stroke();
        ctx.fill();
    }
}

function colorData(data){       //图表颜色管理
    for(let i=0;i<data.length;i++){
        data[i].color=color[i];
    }
    return data;
}