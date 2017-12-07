$.extend(verge);
$(window).resize(function(){
  if ($.viewportW() >= 500){
    closeNav(getNav());
  }
});
function getNav(){
  return document.getElementById("main-nav");
}
function openNav(nav){
  nav.className += " nav-open";
}

function closeNav(nav){
  nav.className = "nav nav-bar-top";
}

function toggleNav(){
  const nav = getNav();
  if (nav.className === "nav nav-bar-top"){
    openNav(nav);
  } else{
    closeNav(nav);
  }
}

document.getElementById("menu-toggle").addEventListener('click', function(){
  toggleNav();
});
