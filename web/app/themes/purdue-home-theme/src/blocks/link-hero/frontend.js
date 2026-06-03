const arrows = document.querySelectorAll('.hero-down-arrow');
const height = window.innerHeight - 80;
if(arrows && arrows.length>0){
    arrows.forEach((arrow)=>{
        arrow.addEventListener('click', () => {
            window.scroll({
                top: height,
                behavior: 'smooth',
            });
        });
    })
}

const expandSelect = (select) =>{
    select.size = select.options.length;
    select.classList.add('has-select-expand');
    select.addEventListener("click", ()=>{
        select.size = 1;
        select.classList.remove('has-select-expand');
    })
}
let id=window.location.hash;

if(id){
    id = id.replace("#", "");
    const el = document.getElementById(id);
    if(el){
        el.focus();
        const select=el.querySelector("select");
        if(select){
            expandSelect(select)
        }
    }
}

const links=document.querySelectorAll(".purdue-home-link-hero__list--desktop .purdue-home-button");
const href=window.location.href.replace(location.hash,"")
if(links.length>0){
    links.forEach((link)=>{
        if(link.href.includes(href)){
            const hash=link.href.replace(href, "");
            if(hash){
                link.addEventListener("click", (e)=>{

                    const el = document.querySelector(hash);
                    if(el){
                        const select=el.querySelector("select");
                        if(select){
                            expandSelect(select)
                        }
                    }
                })
            }

        }

})
}
