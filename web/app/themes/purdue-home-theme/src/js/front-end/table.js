const tables = document.querySelectorAll("figure.wp-block-table");
const newNodes = new Set();
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && !newNodes.has(node)) { 
              newNodes.add(node); // Add the new node to the array
              console.log("node added")
            }
          }); 
      }
  });
});

tables.forEach((table) => {
  if(table.classList.contains('no-collapse')){
    return;
  }
  const thead = [...table.getElementsByTagName("thead")];
  const tfoot = [...table.getElementsByTagName("tfoot")];
  const tbody = [...table.getElementsByTagName("tbody")];
  let tableRowlength;
  const tableRows = [...tbody[0].getElementsByTagName("tr")];

  let tableHead;
  
  if (thead.length > 0) {
    headerCell = [...thead[0].getElementsByTagName("th")];
  }

  if (tfoot.length > 0) {
    footerCell = [...tfoot[0].getElementsByTagName("td")];
  }

  if (tableRows.length > 0) {
    tableRowlength = tableRows[0].getElementsByTagName("td").length;
    console.log(tableRows)
  }

  tableRows.forEach((tableRow, index, array) => {

    let mobileTable = document.createElement("div");
    mobileTable.classList.add("wp-block-table-mobile");

    for (i = 0; i < tableRowlength; i++) {

      let mobileRow = document.createElement("div");
      const tableCell = tableRow.getElementsByTagName("td");

      if (tableCell[i] != null) {
        let mobileTableHead = document.createElement("div");
        mobileRow.classList.add("table-body", "columns", "is-mobile");

        if (thead && thead.length > 0 && headerCell[i].innerText !== "") {
          let mobileTableHeadSpan = document.createElement("span");
          mobileTableHeadSpan.classList.add("mobile-table-header");
          mobileTableHeadSpan.innerHTML = headerCell[i].innerHTML;
         
          mobileTableHead.classList.add("column");
          mobileRow.appendChild(mobileTableHead);
          mobileTableHead.appendChild(mobileTableHeadSpan);
        }

        let newContent = tableCell[i].innerHTML;
        let mobileTd = document.createElement("div");
        mobileTd.classList.add("column", "is-half");
        mobileTd.insertAdjacentHTML("beforeend", newContent);
        mobileRow.appendChild(mobileTd)
        mobileTable.appendChild(mobileRow);

      }else{
       
      }

      table.parentElement.insertBefore(mobileTable, table);
      
    }
    observer.observe(table.parentElement, { childList: true });

    if(index === array.length -1){
      let nodesArray = [];
      setTimeout(() => {
        nodesArray = [...newNodes]   
    }, 500);

    setTimeout(() => {
    if(tfoot.length > 0){
       for (i = 0; i < footerCell.length; i++) {
      if (tfoot && tfoot.length > 0 && footerCell[i].innerText !== ""){
        let mobileRow = document.createElement("div");
        mobileRow.classList.add("table-footer")
        mobileRow.innerHTML = footerCell[i].innerHTML;
        nodesArray[nodesArray.length -1].appendChild(mobileRow);
      }
    }

    }
   
   }, 600); 
      
    }

  });

});
