alert("I just learned it from sololearn course!!!\nI have tried to learn make it using e56!!\nI have Tried my best.Hope u will like it ");
let cvs,ctx,w,h,drops=[];
const {random,floor}=Math;
window.onload=()=>{
    cvs = document.createElement("canvas");
    document.body.appendChild(cvs)
    w = cvs.width = window.innerWidth;
    h = cvs.height = window.innerHeight;
    ctx = cvs.getContext("2d");
    draw();
}
const draw=()=>{
  requestAnimationFrame(draw);
  ctx.clearRect(0,0,w,h);
  drops.push(new Rain(random()*w,-50,random()*3));
  drops.forEach(k=>k.show());
}
function Rain(x,y,dy){
    this.x = x;
    this.y = y;
    this.dy= dy;
    this.emojies= ['😂','👮','🤗','😪','🍔','😍','❤️'];
    this.curText = this.emojies[floor(random()*this.emojies.length)];
    this.show = ()=>{
        ctx.fillText(this.curText,this.x,this.y);
        this.update();
        this.freeUp();
    }
    this.update=()=>(this.y+=this.dy+=0.1); 
    this.freeUp=()=>((this.y>h+100)?drops.splice(this,1):"");
}