document.addEventListener("DOMContentLoaded",function(){
const animateHeader=document.querySelectorAll('.purdue-home-cta-hero__header-animate')
if(animateHeader.length>0){
    animateHeader.forEach(item=>{
        const content= item.querySelectorAll('span.purdue-home-cta-hero__header-animate-item');
        if(content.length>0){
            let start = 0;
            carousel();
            function carousel() {
                for (let i = 0; i < content.length; i++) {
                    content[i].classList.remove("slide-out");  
                    setTimeout(()=>{
                        content[i].classList.add("hide"); 
                      }, 200);                   
                 
                  }
                  start++;
                  if (start > content.length) {start = 1}   
                  content[start-1].classList.remove("hide");
                    content[start-1].classList.add("slide-in");  
                    setTimeout(()=>{
                        content[start-1].classList.remove("slide-in");  
                        content[start-1].classList.add("slide-out");  

                    }, 3500);
                  setTimeout(carousel, 4000); // Change image every 2 seconds
            }
        }

    })

}
})
