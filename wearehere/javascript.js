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

var images=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg"]
var i=0;
function next(){
  i=(i==12)?0:i+1;
  var img=document.getElementById("gallery");
  img.src="assets/images/"+images[i];
}
function prev(){
  i=(i==0)?12:i-1;
  var img=document.getElementById("gallery");
  img.src="assets/images/"+images[i];
}
var photos=["000.jpg","001.jpg","002.jpg","003.jpg","004.jpg","005.jpg","006.jpg","007.jpg","008.jpg"]
var j=0;
function nextPhoto(){
  j=(j==8)?0:j+1;
  var img=document.getElementById("images");
  img.src="assets/images/"+photos[j];
}
function prevPhoto(){
  j=(j==8)?8:j-1;
  var img=document.getElementById("images");
  img.src="assets/images/"+photos[j];
}