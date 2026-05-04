window.addEventListener('load', () => {
    const storylines=[...document.querySelectorAll(".purdue-home-path-way.purdue-home-path-way--has-connector .purdue-home-path-way__connector")]
    const wH=window.innerHeight;
    if(storylines&&storylines.length>0){
        window.addEventListener('scroll', () => {
            storylines.forEach((t)=>{
                const thisTop = t.getBoundingClientRect().top;
                const thisBottom = t.getBoundingClientRect().bottom;
                if(thisTop<=wH*0.6){
                    t.classList.add('animate')
                }   
           if(thisBottom<=wH*0.5){
                    t.classList.add('no-animate')
                }
            })
        })
    }
})