window.onload=function(){
    var el=document.getElementById("intro");
    var str ='WE ARE HERE';
    var i=0;
    el.innerHTML="";
    var text=setInterval(function(){if(i==(str.length)){clearInterval(text);}else{el.innerHTML=el.innerHTML+str[i];i++;}},500);
    var ele=document.getElementById("intro1");
    var stri="World is fighting covid. We are not only losing lives. But also jobs, health, education. At wearehere, our organization, we try to provide others a mean to fight these. We want to impact the world, help the world, make it better. We want to be the HOPE.";
    var j=0;
    el.innerHTML="";
    var test=setInterval(function(){if(j==(stri.length)){clearInterval(test);}else{ele.innerHTML=ele.innerHTML+stri[j];j++;}},100);
}

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop >50) {
    document.getElementById("main").style.width = "45px";
    document.getElementById("main").style.top = "30%";
    var cols = document.getElementsByClassName("bttn");
    for(i=0; i<cols.length; i++) {
      cols[i].style.width = "100px";
    }
      
  } else {
    document.getElementById("main").style.top = "85%";
    document.getElementById("main").style.left = "15px";
    document.getElementById("main").style.width = "90%";
  }
}
function leftImage(){
    var address="assets/images/";

}
function needWork(){
    var needwork = '<div class=" Card"><h1>WANT TO WORK</h1><form><div class="form-group"><label for="skil1">Skills:</label></div><div class="form-group"><label for="qualification">Qualification:</label></div><div class="form-group"><label for="experience">Experience:</label></div></form></div>' ;
    var div = document.createElement("div");
    div.className +="Card";
    var h1 = document.createElement("h1");
    var form = document.createElement("form");
    form.className+="form-group";
    var node = document.createTextNode("WANT TO WORK");
    h1.appendChild(node)
    div.appendChild(h1);
    document.body.appendChild(div);
}

var images=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg"]
var i=0;
var img=document.getElementById("image");
var Scr="assets/images/";
function next(){
  i++;
  Src+=images[i];
  img.src=Src;
}
function prev(){
  i--;
  Src+=images[i];
  img.src=Src;
}