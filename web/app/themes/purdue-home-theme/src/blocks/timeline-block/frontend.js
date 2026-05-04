
    const wH=window.innerHeight;
    const cards = [...document.querySelectorAll(".purdue-home-timeline__card")]

    if(cards && cards.length>0){
        window.addEventListener('scroll', () => {
            cards.forEach((c)=>{
                const thisTop = c.getBoundingClientRect().top;
                const thisBottom = c.getBoundingClientRect().bottom;

                if(thisTop<=wH*0.6){
                    c.classList.add('animate')
                }   
            if(thisBottom<=wH*0.5){
                    c.classList.add('no-animate')
                }
            })
        })
    }



