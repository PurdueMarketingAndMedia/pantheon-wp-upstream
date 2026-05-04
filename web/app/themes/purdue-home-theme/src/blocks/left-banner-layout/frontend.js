const moveImage=()=>{
    const leftBanner = document.querySelectorAll('.purdue-home-layout--left-banner');
    if(leftBanner.length>0){
        leftBanner.forEach((item)=>{
                const image=item.querySelector('.purdue-home-layout--left-banner__image img');
                if(image){
                    const imgHeight=image.clientHeight;
                    const contentHeight=item.clientHeight;
                    const top=item.parentElement.offsetTop;
                    if(imgHeight<contentHeight){
                        const posY=Math.round( (window.scrollY-top)*(contentHeight-imgHeight)/(contentHeight-window.innerHeight))
                        if(window.scrollY >= top && window.scrollY <top+contentHeight-window.innerHeight){
                            image.style.transform="translate3d(0px, " + posY + "px, 0px)";
                        }else if(window.scrollY <= top){
                            image.style.transform="translate3d(0px, 0px, 0px)";
                        }else if(window.scrollY >=top+contentHeight-window.innerHeight){
                            image.style.transform="translate3d(0px, "+(contentHeight-imgHeight)+"px, 0px)";
                        }
                    }
                
                }
            


        })
    }
}
let waiting=false;
window.addEventListener("scroll", ()=>{
    if (waiting) {
        return;
    }
    waiting = true;
    setTimeout(function () {
        moveImage();
        waiting = false;
    }, 50);
},{ passive: true });
window.addEventListener("load", ()=>{
    moveImage();
});
window.addEventListener("resize", ()=>{
    moveImage();
});
