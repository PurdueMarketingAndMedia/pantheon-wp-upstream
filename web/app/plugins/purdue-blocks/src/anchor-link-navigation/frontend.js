const headers=document.querySelectorAll("h2, h3, h4, h5, h6")
let anchorHeaders=[]
headers.forEach((header)=>{
    if(header.id){
        anchorHeaders.push(header)
    }
})
const anchorLinkBlocks=document.querySelectorAll(".anchor-link-block-links")
const href=window.location.href
function is_IE() {
    return (window.navigator.userAgent.match(/MSIE|Trident/) !== null);
}
if(anchorLinkBlocks&&anchorLinkBlocks.length>0&&anchorHeaders&&anchorHeaders.length>0){
    anchorLinkBlocks.forEach((block)=>{
            anchorHeaders.forEach((header)=>{
                let anchor=document.createElement('a')
                let text = document.createTextNode(header.innerHTML)
                anchor.appendChild(text)
                anchor.title=header.innerHTML
                anchor.href="#"+header.id
                anchor.classList.add("anchor-link-block-link")
                block.appendChild(anchor)
            })
    })
    const links=document.querySelectorAll('a.anchor-link-block-link')
    links.forEach((link)=>{
        link.addEventListener('click',(e)=>{
            is_IE()?'':e.preventDefault( );
            const topY=document.querySelector(link.hash).getBoundingClientRect().top + window.pageYOffset -20;
            window.scroll({
                top: topY,
                behavior: 'smooth'
                })
            links.forEach((el)=>{
                el===link?el.classList.add("is-active"):el.classList.remove("is-active")
            })
        })
    })
    window.addEventListener('scroll', () => {
        setTimeout(function(){
            anchorHeaders.forEach((header)=>{ 
                if ( header.getBoundingClientRect().top <= 30 ) {
                    const id = "#"+header.id
                    links.forEach((el)=>{
                        el.hash===id?el.classList.add("is-active"):el.classList.remove("is-active")
                    })
                }
            })
        }, 100)
    })
    const toTop = document.querySelector('#to-top-sidebar')
    if(toTop){
        toTop.addEventListener('click', () => {
            window.scroll({
            top: 0,
            behavior: 'smooth'
            })
        })
    }
}


