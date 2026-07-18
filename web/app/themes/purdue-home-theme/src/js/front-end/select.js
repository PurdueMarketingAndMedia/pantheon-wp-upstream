const expandSelect = (select) =>{
    select.size = select.options.length;
    select.classList.add('has-select-expand');
    select.addEventListener("click", ()=>{
        select.size = 1;
        select.classList.remove('has-select-expand');
    })
}
const urlSelects=[...document.querySelectorAll('.purdue-home-select')];
if(urlSelects && urlSelects.length>0){
    urlSelects.forEach((urlSelect)=>{
        const select = urlSelect.querySelector("select")
        const button = urlSelect.querySelector(".purdue-home-button")
        let value = select.value;
        if(button){
            button.addEventListener("click",()=>{
                const value = select.value
                const selected = select.options[select.selectedIndex];
                const external = selected.dataset.external;
                if(external==="1"){
                    window.open(value)
                }else{
                    window.location.href = value
                }
            })
            if(value === ""){
                button.classList.add("hide")
            }else{
                button.classList.remove("hide")
            }
            select.addEventListener("change",()=>{
                value = select.value;
                if(value === ""){
                    button.classList.add("hide")
                }else{
                    button.classList.remove("hide")
                }
            })
        }else{
            select.addEventListener("change",()=>{
                value = select.value
                const selected = select.options[select.selectedIndex];
                const external = selected.dataset.external;
                if(external==="1"){
                    window.open(value)
                } else if (value.startsWith("#")) {
                    const el = document.querySelector(value);
                    if(el){
                        const select=el.querySelector("select");
                        if(select){
                            expandSelect(select)
                        }
                        el.setAttribute("tabindex", "-1");
                        el.focus();
                        el.scrollIntoView({behavior: "instant", block: "start", inline: "nearest"});
                    }
                }
                window.location.href = value;
            })
        }
    })

}
