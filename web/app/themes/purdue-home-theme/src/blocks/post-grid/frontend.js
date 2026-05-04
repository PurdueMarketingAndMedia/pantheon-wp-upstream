document.addEventListener("DOMContentLoaded", () => {
  const postGrids = document.querySelectorAll(".purdue-home-post-grid");
  const url = window.location.href;
  const regex = /[?&]([^=#]+)=([^&#]*)/g;

  if (postGrids.length > 0) {
    postGrids.forEach((grid) => {
      const forms = grid.querySelectorAll(".purdue-home-post-grid__filter");
      const searchForm = grid.querySelector(".search-form");
      const selectedTermsContainer = grid.querySelector(
        ".purdue-home-cta-grid__grid__filters-selected"
      );
      const postsContainer = grid.querySelector(
        ".purdue-home-cta-grid__cards .columns"
      );
      const paginationContainer = grid.querySelector(
        ".purdue-home-pagination .nav-links"
      );
      const message = grid.querySelector(".purdue-home-cta-grid__message");
      const loadPostsBtn =  grid.querySelector('.load');
      const width = window.innerWidth;
      const queryArg = JSON.parse(
        grid.querySelector(".purdue-home-cta-grid__grid").dataset.args
      );
      let args = JSON.parse(JSON.stringify(queryArg));

      const excludeCat = args["excludeCat"];    

      args["requestURL"] = window.location.href;
      const fields = grid.querySelectorAll(
        ".purdue-home-post-grid__filter-field"
      );
      const buttonContainer = grid.querySelector(
        ".purdue-home-post-grid__filter-button"
      );
      const submitButton = grid.querySelector(
        ".purdue-home-post-grid__filter-button .purdue-home-button"
      );
      const clearButton = grid.querySelector(
        ".purdue-home-post-grid__filter-button .form-clear-button"
      );
      // const filterButton=grid.querySelector('.purdue-home-post-grid__filter-control')
      const controlButtons = grid.querySelectorAll(".field-control");

      const collapseButtons = grid.querySelectorAll(".field-title.collapse");

      const alphaFilter = grid.querySelectorAll(".filter-letter:not(.is-disabled)");

      const addAutoComplete = args["addAutoComplete"];

      const post_per_page = args['posts_per_page'];

      let orgPage = args["paged"];


      
    if(alphaFilter){
      alphaFilter.forEach((letter) => {
        letter.addEventListener("click", (e) => {
          e.preventDefault();
          alphaFilter.forEach((letter) => {
            if(letter.classList.contains('active')){
              letter.classList.remove('active');
            }
          })

          letter.classList.add('active');          
          args['alpha'] = letter.dataset.alpha;
          args = updateArgs(grid, fields, queryArg, args, 1);
          args['orgPaged'] = 1;
          args['paged'] = 1;
          getPosts(
                postsContainer,
                paginationContainer,
                message,
                queryArg,
                args,
                grid
              );
          selectItems(
            grid,
            postsContainer,
            paginationContainer,
            message,
            fields,
            queryArg,
            args,
            selectedTermsContainer,
            buttonContainer
          );
    })
      })
    }
    
      const isInfinite = args["infiniteScroll"];
      const pagePattern = /\/page\/\d+\b/;
      let load = "";

      if (forms && forms.length > 0) {
       
        let match;
        let urlPara = [];
        let tax_query = [];
        while ((match = regex.exec(url))) {

          args = updateArgsFromURL(match[1], match[2], grid, args, 1, tax_query);

          if(isInfinite){      
            if (pagePattern.test(url)) {
               load = "infinite";
               args['orgPaged'] = orgPage;
               args['orgpost_Per_Page'] = post_per_page;
            }else{
              load="infinite"
              args['orgPaged'] = orgPage;
              args['paged'] = 1;
            }
          }


          urlPara.push(match[1]);
          tax_query = args['tax_query'];
        }
   
        if (urlPara.length > 0) {
          getPosts(
            postsContainer,
            paginationContainer,
            message,
            queryArg,
            args,
            grid,
            load
          );
        }
        if (fields.length > 0) {
          selectItems(
            grid,
            postsContainer,
            paginationContainer,
            message,
            fields,
            queryArg,
            args,
            selectedTermsContainer,
            buttonContainer
          );


          fields.forEach((field) => {
            field.addEventListener("change", () => {
              if (
                field && (field.classList.contains("search-field") ||
                field.classList.contains("order-field"))
              ) {
                args['autocomplete'] = false;
                args = updateArgs(grid, fields, queryArg, args, 1);             
                getPosts(
                  postsContainer,
                  paginationContainer,
                  message,
                  queryArg,
                  args,
                  grid
                );
              }
              checkClearButton(grid, buttonContainer);
            });            

            if (field && field.classList.contains("search-field")) {

              let resultsContainer = "";

              if(addAutoComplete){

                resultsContainer = document.createElement("ul");
                resultsContainer.classList.add("autocomplete-results", "hide");
                searchForm.appendChild(resultsContainer);

                field.addEventListener("input", () => {

                  if (field.value.length < 2) {
                      resultsContainer.innerHTML = "";
                      return;
    
                  }else{
                    resultsContainer.classList.remove("hide");
                    args['p'] = field.value.trim();                
                    args['post_per_page'] = 16;
                    args = updateArgs(grid, fields, queryArg, args, 1);
                    args['autocomplete'] = true;
                    autoComplete(
                      resultsContainer,
                      field,
                      message,
                      queryArg,
                      args,
                      grid
                    );     
                    
                  }   
    
                  const observer = new MutationObserver(() => {
                    args = updateArgs(grid, fields, queryArg, args, 1);
                    getPosts(
                      postsContainer,
                      paginationContainer,
                      message,
                      queryArg,
                      args,
                      grid
                    );
                  });
    
                  observer.observe(field, { attributes: true, attributeFilter: ["value"] });
    
                });
                
              }

            let searchField = grid.querySelector(".search-field");
            let pos = 0;

            searchField.addEventListener("keydown", function (event){   
                if (["ArrowLeft", "ArrowRight", "Backspace", "Delete", "Home", "End"].includes(event.key)) {             
                  pos = this.selectionStart;     
               }        
            });    
              
              searchField.addEventListener("input", function (event){                
                pos = this.selectionStart; 
              });     

              // Add event listener for the 'keyup' event
              field.addEventListener("keyup", function (event) {
                // Check if the 'Enter' key is pressed
                if (event.keyCode === 13) {
                  // Blur the focus from the input field to hide the keyboard
                  field.blur();
                  if(!addAutoComplete) return;
                  resultsContainer.classList.add("hide");
                }
                if (event.key === "ArrowDown") {
                  //(pos)
                  if(!addAutoComplete) return;
                  resultsContainer.firstElementChild.focus();
                }
              });              

              if(addAutoComplete && resultsContainer){
                resultsContainer.addEventListener("keyup", function (event) {                
                  //searchField.blur();
  
                  if (event.key === "Escape") {
                    searchField.focus();
                    resultsContainer.classList.add("hide");
                  }
  
                  if (event.key === "ArrowDown") {
                    
                    let focused = document.activeElement;
                    let nextItem = focused.nextElementSibling; 
                    if (nextItem) {
                      nextItem.focus(); // Move focus to the next item
                    }else{
                      resultsContainer.firstElementChild.focus();
                    }
                  }
  
                  if (event.key === "ArrowUp") {
                    let focused = document.activeElement;
                    let previousItem = focused.previousElementSibling; 
                    if (previousItem) {
                      previousItem.focus(); // Move focus to the next item
                    }else{
                      resultsContainer.lastElementChild.focus();
                    }
                  }
  
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft"){         
                     searchField.focus();                  
                     searchField.setSelectionRange(pos, pos); // Restore cursor position  
                  }

              });

              resultsContainer.addEventListener("keydown", function (event) {

                if (event.key === "Home"){   
                  event.preventDefault();  
                  pos = 0;        
                  searchField.focus();       
                  searchField.setSelectionRange(pos, pos); // Restore cursor position  
                }

               if (event.key === "End"){   
                event.preventDefault(); 
                //pos = "";        
                searchField.focus();       
                //searchField.setSelectionRange(pos, pos); // Restore cursor position  
                }

              })

              }

            }
          });

          if (submitButton) {
            submitButton.addEventListener("click", () => {
              args = updateArgs(grid, fields, queryArg, args, 1);
              args['orgPaged'] = 1;
              args['paged'] = 1;
              orgPage = 1;
              page = 2;
              getPosts(
                postsContainer,
                paginationContainer,
                message,
                queryArg,
                args,
                grid
              );
              selectItems(
                grid,
                postsContainer,
                paginationContainer,
                message,
                fields,
                queryArg,
                args,
                selectedTermsContainer,
                buttonContainer
              );
            });
          }
          if (grid.querySelector(".search-button")) {
            grid
              .querySelector(".search-button")
              .addEventListener("click", () => {
                args = updateArgs(grid, fields, queryArg, args, 1);
                getPosts(
                  postsContainer,
                  paginationContainer,
                  message,
                  queryArg,
                  args,
                  grid
                );
              });
          }

          let resultsContainer = grid.querySelector(".autocomplete-results");
          
          if (grid.querySelector(".clear-button")) {
            grid
              .querySelector(".clear-button")
              .addEventListener("click", () => {                
                args = updateArgs(grid, fields, queryArg, args, 1);
                getPosts(
                  postsContainer,
                  paginationContainer,
                  message,
                  queryArg,
                  args,
                  grid
                );
                if(resultsContainer){
                  resultsContainer.classList.add("hide");
                }
              });
          }
          if (clearButton) {
            clearButton.addEventListener("click", () => {

              if(isInfinite && pagePattern.test(url)){
                const modifiedUrl = url.replace(/\/page\/\d+\b.*/, "");
                window.location.href = modifiedUrl;
              }

              if(alphaFilter){

                alphaFilter.forEach((letter) => {
                  if(letter.classList.contains('active')){
                    letter.classList.remove('active');
                  }
                })

                args['alpha'] = "";

              }

              if(resultsContainer){
                resultsContainer.classList.add("hide");
              }
             
              const checkedFields = grid.querySelectorAll(
                `input[type=checkbox]:checked`
              );
              const selects = grid.querySelectorAll("select");

              if (checkedFields.length > 0) {
                checkedFields.forEach((field) => {
                  field.checked = false;
                });
              }

          
              if (selects.length > 0) {
                selects.forEach((field) => {                 
                  field.value = "";                 
                });
              }

          
              queryArg['paged'] = 1;

              args = updateArgs(grid, fields, queryArg, args, 1);

      

              getPosts(
                postsContainer,
                paginationContainer,
                message,
                queryArg,
                args,
                grid
              );
              selectItems(
                grid,
                postsContainer,
                paginationContainer,
                message,
                fields,
                queryArg,
                args,
                selectedTermsContainer,
                buttonContainer
              );

            

            });

          }
          

          if (controlButtons.length > 0) {
            controlButtons.forEach((button) => {
              if (width < 1024) {
                button.setAttribute("aria-diabled", "false");
                button.setAttribute("aria-expanded", "false");
                if (button.nextElementSibling) {
                  button.nextElementSibling.classList.add("hide");
                }
              }
              button.addEventListener("click", () => {
                const width = window.innerWidth;
                if (width < 1024) {
                  toggleAccordion(button);
                }
              });
            });
          }

          if (collapseButtons.length > 0) {
            collapseButtons.forEach((button) => {
              if (width > 1024 && !button.classList.contains("is-open")) {
                button.setAttribute("aria-disabled", "false");
                button.setAttribute("aria-expanded", "false");
                if (button.nextElementSibling) {
                  button.nextElementSibling.classList.add("hide");
                }
              }
              button.addEventListener("click", () => {
                const width = window.innerWidth;
                if (width > 1024) {
                  toggleAccordion(button);
                }
              });
            });
          }

          window.addEventListener("resize", () => {
            const width = window.innerWidth;
            if (width >= 1024) {
              if (controlButtons.length > 0) {

                let filterControlButtons = Array.from(controlButtons).filter(el => !el.classList.contains('collapse'));

                filterControlButtons.forEach((button) => {
                  if(button)
                  button.setAttribute("aria-disabled", "true");
                  button.setAttribute("aria-expanded", "true");
                  if (button.nextElementSibling) {
                    button.nextElementSibling.classList.remove("hide");
                  }
                  button.classList.remove("is-open");
                });
              }
            } else {
              if (controlButtons.length > 0) {
                controlButtons.forEach((button) => {
                  button.setAttribute("aria-disabled", "false");
                  button.setAttribute("aria-expanded", "false");
                  if (button.nextElementSibling) {
                    button.nextElementSibling.classList.add("hide");
                  }
                  button.classList.remove("is-open");
                });
              }
            }
          });
        }
        forms.forEach((form) => {
          if (
            form.parentElement.classList.contains(
              "purdue-home-cta-grid__grid__filters-checkbox"
            ) &&
            form.offsetHeight + 150 > window.innerHeight
          ) {
            form.style.position = "relative";
            form.style.top = "0";
          }
        });
      }
      

      if(isInfinite){
        const container = document.querySelector('.purdue-home-cta-grid__grid__content');
        let page = ""
        
       // let page = 2; // Start from page 2 as the first page is already loaded
        let isFetching = false;

         if(parseInt(orgPage) >= parseInt(args['paged']) && pagePattern.test(url)){
              page = orgPage + 1
              args['paged'] = args['orgPaged']
              args['posts_per_page'] = post_per_page;
              args['orgPaged'] = page;
              args = updateArgs(grid, fields, queryArg, args, page);
              loadPostsBtn.classList.remove("hide");
              orgPage = "1";
            }else{
              
              page = 2
              args = updateArgs(grid, fields, queryArg, args, page);
            }

            if (submitButton) {
              submitButton.addEventListener("click", () => {
                  page = 2;
              })
            }

            if(alphaFilter){
                 alphaFilter.forEach((letter) => {
                  letter.addEventListener("click", (e) => {
                     page = 2;
                  })
                })
              }

      const loadPosts = () => {
         if (isFetching) return;
         isFetching = true;
            
           //page
           args['orgPaged'] = page;
           args = updateArgs(grid, fields, queryArg, args, page);
            load = "infinite";
                  getPosts(
                    postsContainer,
                    paginationContainer,
                    message,
                    queryArg,
                    args,
                    grid,
                    load
                  );
            page++;
            isFetching = false;
      };

     loadPostsBtn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
       loadPosts();
    });
    
      }

      if (paginationContainer && !isInfinite) {
        const paginationLinks = paginationContainer.querySelectorAll("a");
        if (paginationLinks.length > 0) {
          const current = parseInt(
            paginationContainer.querySelector(".current").innerHTML,
            10
          );
          paginationLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              let paged = 1;
              if (link.classList.contains("prev")) {
                paged = current - 1;
              } else if (link.classList.contains("next")) {
                paged = current + 1;
              } else {
                paged = parseInt(link.innerHTML, 10);
              }
              args = updateArgs(grid, fields, queryArg, args, paged);
              getPosts(
                postsContainer,
                paginationContainer,
                message,
                queryArg,
                args,
                grid
              );
              let sectionTop = grid.offsetTop;
              scrollTo(sectionTop, 300);
            });
          });
        }
      }
    });
  }

});


const updateArgs = (grid, fields, queryArg, args, paged) => {
  const oldArgs = JSON.parse(JSON.stringify(queryArg));
  const newArgs = JSON.parse(JSON.stringify(args));
  
  if (fields) {
    fields.forEach((field) => {
      const value = field.value;
      const name = field.name;
      if (value) {
        if (field.classList.contains("search-field")) {
          newArgs["p"] = value;
        } else if (field.classList.contains("postType-field")) {
          if (field.checked) {
            if (!newArgs["post_type"].includes(value)) {
              newArgs["post_type"].push(value);
            }
          } else {
            if (
              grid.querySelectorAll(
                `input[type=checkbox][name=${name}]:checked`
              ).length === 0
            ) {
              if (oldArgs["post_type"] !== "") {
                newArgs["post_type"] = [...oldArgs["post_type"]];
              } else {
                newArgs["post_type"] = "";
              }
            } else {
              if (newArgs["post_type"].includes(value)) {
                newArgs["post_type"] = newArgs["post_type"].filter(
                  (item) => item !== value
                );
              }
            }
          }
        } else if (field.classList.contains("tax-field")) {

          const isSelect = field.tagName === "SELECT";
          const isChecked = field.checked;
          const hasValue = value !== "";
          const taxonomy = field.name;
          
           if (isChecked  && hasValue) { 
              
            let hasCat = false;
            let count = 0;
            for (const prop in newArgs["tax_query"]) {
              if (
                newArgs["tax_query"][prop]["taxonomy"] &&
                newArgs["tax_query"][prop]["taxonomy"] === name
              ) {
                if (!newArgs["tax_query"][prop]["terms"].includes(value)) {
                  newArgs["tax_query"][prop]["terms"].push(value);
                }
                hasCat = true;
              }
              count++;
            }
            
            if (!hasCat) {
              newArgs["tax_query"][count] = {
                taxonomy: name,
                field: "slug",
                terms: [value],
              };
            }
          }else if (isSelect && hasValue){

             for (const prop in newArgs["tax_query"]) {
              if (newArgs["tax_query"][prop]["taxonomy"] === taxonomy) {
                delete newArgs["tax_query"][prop];
              }
            }

             newArgs["tax_query"] = Object.values(newArgs["tax_query"]);

             newArgs["tax_query"].push({
              taxonomy: taxonomy,
              field: "slug",
              terms: [value],
            });


          } else {
            if (
              grid.querySelectorAll(
                `input[type=checkbox][name=${name}]:checked`
              ).length === 0
            ) {
              let hasCat = false;
              for (const prop in oldArgs["tax_query"]) {
                if (
                  oldArgs["tax_query"][prop]["taxonomy"] &&
                  oldArgs["tax_query"][prop]["taxonomy"] === name
                ) {
                  for (const newprop in newArgs["tax_query"]) {
                    if (
                      newArgs["tax_query"][newprop]["taxonomy"] &&
                      newArgs["tax_query"][newprop]["taxonomy"] === name
                    ) {
                      newArgs["tax_query"][newprop] = {
                        ...oldArgs["tax_query"][prop],
                      };
                    }
                  }
                  hasCat = true;
                }
              }
              if (!hasCat) {
                for (const newprop in newArgs["tax_query"]) {
                  if (
                    newArgs["tax_query"][newprop]["taxonomy"] &&
                    newArgs["tax_query"][newprop]["taxonomy"] === name
                  ) {
                    newArgs["tax_query"][newprop] = {};
                  }
                }
              }
            } else {
              for (const prop in newArgs["tax_query"]) {
                if (
                  newArgs["tax_query"][prop]["taxonomy"] &&
                  newArgs["tax_query"][prop]["taxonomy"] === name
                ) {
                  if (newArgs["tax_query"][prop]["terms"].includes(value)) {
                    newArgs["tax_query"][prop]["terms"] = newArgs["tax_query"][
                      prop
                    ]["terms"].filter((item) => item !== value);
                  }
                }
              }
            }
          }
        } else if (field.classList.contains("order-field")) {
          if (field.checked) {
            newArgs["order"] = value;
          }
        } else if (field.classList.contains("year-field")) {
          if (value) {
            newArgs["year"] = value;
          }
        } else if (field.classList.contains("month-field")) {
          if (value) {
            newArgs["month"] = value;
          }
        }
      } else {
        if (field.classList.contains("search-field")) {  
          newArgs["p"] = "";
        } else if (field.classList.contains("year-field")) {
          newArgs["year"] = "";
        } else if (field.classList.contains("month-field")) {
          newArgs["month"] = "";
        }else if (field.classList.contains("tax-field")) {
            // Remove related taxonomy from tax_query
            for (const prop in newArgs["tax_query"]) {
              if (
                newArgs["tax_query"][prop]["taxonomy"] === field.name
              ) {
                delete newArgs["tax_query"][prop];
              }
            }
            // Re-index tax_query
            newArgs["tax_query"] = Object.values(newArgs["tax_query"]);
          }
      }
    });
  }
  newArgs["paged"] = paged ? paged : 1;
 // newArgs['autocomplete'] = autocomplete ? autoComplete : false;

  return newArgs;


};

const updateArgsFromURL = (name, value, grid, args, paged, existingTaxQuery = []) => {


  const newArgs = JSON.parse(JSON.stringify(args));

  let taxArgs = [];

  let utm = args.utm ? [...args.utm] : [];

  if (existingTaxQuery.length > 0) {

    taxArgs = [...existingTaxQuery.filter(q => q.taxonomy !== name && !q.relation)];

  }

  if (name === "p") {
    const searchField = grid.querySelector(
      ".purdue-home-post-grid__filter-field.search-field"
    );
    if (searchField) {
      //Replace '&' with &amp;
      const decodedValue = decodeURIComponent(value).replace(/&/g, "&amp;");
      searchField.value = decodeURIComponent(value);
      newArgs["p"] = decodedValue;
    }
  } else if (name === "custom_post_type") {
    const postTypeField = grid.querySelectorAll(
      ".purdue-home-post-grid__filter-field.postType-field"
    );
    const post_types = value.replace(/%2C/g, ",").split(",");
    if (postTypeField.length > 0) {
      postTypeField.forEach((field) => {
        field.checked = false;
        post_types.forEach((type) => {
          if (field.value === type) {
            field.checked = true;
          }
        });
      });
      newArgs["post_type"] = post_types;
    }
  } else if (name === "order") {
    const orderField = grid.querySelectorAll(
      ".purdue-home-post-grid__filter-field.order-field"
    );
    if (orderField.length > 0) {
      orderField.forEach((field) => {
        if (field.value === value) {
          field.checked = true;
        } else {
          field.checked = false;
        }
      });
      newArgs["order"] = value;
    }
  } else if (name === "filter_year") {

    const yearField = grid.querySelector(`select[name=year-field]`);
    if (yearField) {
      yearField.value = value;
      newArgs["year"] = value;
    }
  } else if (name === "filter_month") {
    const monthField = grid.querySelector(`select[name=month-field]`);
    if (monthField) {
      monthField.value = convertToMonth(value);
      newArgs["month"] = convertToMonth(value);
    }
  } else if (name === "paged") {
    newArgs["paged"] = paged ? paged : 1;
  }else if ( name === "alpha" ){
    const alphaFilter = grid.querySelectorAll(".filter-letter:not(.is-disabled)");

    alphaFilter.forEach((letter) => {
      if(letter.dataset.alpha.match(value)){
        letter.classList.add("active");
      }
    })

    newArgs["alpha"] = value;
  } else if (name === "orderby") {

  }else if (name.includes("utm_") || name.includes("gtm_") || name.includes("_gl") || name.includes("_ga")){
    // Skip UTM parameters
    utm.push("&" + name + "=" + value);
    newArgs['utm'] = utm;

  }
  else {

    const elements = grid.querySelectorAll(`input[name=${name}]`);
    let tax_terms = value.replace(/%2C/g, ",").split(",");
    tax_terms = tax_terms.filter(item => item !== "date");
   
   // if (elements && elements.length > 0) {    
      

     /* elements.forEach((field) => {
        field.checked = false;
        tax_terms.forEach((type) => {
          if (field.value === type) {
            field.checked = true;
          }else{
            field.value = value;
          }
        });
      });*/

        const checkboxFields = grid.querySelectorAll(`input[type=checkbox][name=${name}]`);
        if (checkboxFields.length > 0) {
          checkboxFields.forEach((field) => {
            field.checked = tax_terms.includes(field.value);
           
          });
        }

        const selectFields = grid.querySelectorAll(`select.tax-field`);
       // const tax_terms_new = value.replace(/%2C/g, ",").split(",").map(decodeURIComponent);
      
        if (selectFields && tax_terms.length > 0) {

          selectFields.forEach((selectField) => {
          const matchedTerm = tax_terms.find(term =>
            Array.from(selectField.options).some(opt => opt.value === term)
          );

          if (matchedTerm) {
          
            selectField.value = matchedTerm;
          }
        });
        
        }

      let hasTax = false;
      let count = 0;
      
      
    
      

      for (const prop in newArgs["tax_query"]) {
        if (newArgs["tax_query"][prop]["taxonomy"] === name) {
          newArgs["tax_query"][prop]["terms"] = tax_terms;
          hasTax = true;
        }
        count++;
      }
      if (!hasTax) {
        taxArgs.push({
          taxonomy: name,
          field: "slug",
          terms: tax_terms,
        });
      /*  newArgs["tax_query"][count] = {
          taxonomy: name,
          field: "slug",
          terms: tax_terms,
        };*/
      }
   // }
  }   

  newArgs["tax_query"] = [...taxArgs];


  if (!newArgs["tax_query"].some(q => q.relation)) {
  newArgs["tax_query"].unshift({ relation: "AND" });
}


  const isInfinite = args["infiniteScroll"];
  const post_per_page = args['posts_per_page'];


  if(isInfinite){     
          newArgs["posts_per_page"] =  (parseInt(args["paged"]) * parseInt(post_per_page));
          newArgs["paged"] = 1;    
  }


  return newArgs;

  
};


const autoComplete = async (
  resultsContainer,
  searchInput,
  message,
  queryArg,
  args,
  grid,
  load
) => {

  const excludeCats = queryArg.excludeCat;
  let queryArgs = JSON.parse(JSON.stringify(args));
  queryArgs.excludeCat = excludeCats;
  const response = await fetch(
    siteHomeURL + "/wp-json/purdue-home/v1/post-select/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryArgs),
    }
  );

  const result = await response
  .json()
  .catch((error) => console.error("Error parsing JSON:", error));
  const total = result.find(item => item.total !== undefined)?.total;
  
  resultsContainer.innerHTML = "";

  if(total > 0 ){

    const removeTotal = (array, total) => {
      return array.filter(item => item.total !== total);
    };

    const updatedResult = removeTotal(result, total);

    Object.entries(updatedResult).forEach(([key, value]) => {
      const li = document.createElement("li");
      li.setAttribute("tabindex", "0");
      li.textContent = value.title;
      resultsContainer.appendChild(li);
      
      function updateSearch(){
        searchInput.setAttribute("value", li.innerHTML);
        searchInput.value = li.textContent;
        resultsContainer.classList.add("hide");
      }
          li.addEventListener("click", (e) => {
            e.preventDefault();
            updateSearch();
          })
          li.addEventListener("keypress", (event) => {
            if( event.key === "Enter"){
              updateSearch();
            }
          })
    });

  }else{
    const p = document.createElement("p");
    resultsContainer.appendChild(p);
    p.innerHTML = "No results found.";
  }
}

const getPosts = async (
  postsContainer,
  paginationContainer,
  message,
  queryArg,
  args,
  grid,
  load
) => {

  const excludeCats = queryArg.excludeCat;
  const infiniteScroll = queryArg.infiniteScroll;

  let queryArgs = JSON.parse(JSON.stringify(args));

  queryArgs.excludeCat = excludeCats;

  const response = await fetch(
    siteHomeURL + "/wp-json/purdue-home/v1/post-select/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryArgs),
    }
    
  );
  
  const result = await response
    .json()
    .catch((error) => console.error("Error parsing JSON:", error));
  const html = result["html"] || "";
  const pagination = result.pagination || "";
  const newURL = result.url || false;
  const excludeCatResult = result.excludeCat;
  let loadPostsBtn =  grid.querySelector('.load');
  let postTotal = grid.querySelector('.post-total');
  
  if(postTotal){
    postTotal.innerHTML = result.total;
  }
 
 

  if(infiniteScroll && (parseInt(queryArgs['posts_per_page']) > parseInt(queryArgs['orgpost_Per_Page'])) && load == "infinite"){
    
    postsContainer.innerHTML = html;

  }else if(infiniteScroll && load == "infinite" && queryArgs['paged'] !== 1 ){

    postsContainer.insertAdjacentHTML("beforeend", html);

  }else{

    postsContainer.innerHTML = html;

  }
 
  let currentPage = "";
  if (queryArgs['orgPaged']){
    currentPage = queryArgs['orgPaged'];
  }else{
    currentPage = result.current;
  }


  if(loadPostsBtn){
    if (currentPage >= result.pages || !html){
      loadPostsBtn.classList.add("hide");
    }else{
      loadPostsBtn.classList.remove("hide");
    }

    if((parseInt(queryArgs['posts_per_page']) > parseInt(queryArgs['orgpost_Per_Page'])) && parseInt(queryArgs['posts_per_page']) < result.total){
      loadPostsBtn.classList.remove("hide");
    }

  }


  if (!html) {
    message.classList.remove("hide");
  } else {
    message.classList.add("hide");
  }

  if (paginationContainer) {
    paginationContainer.innerHTML = pagination;
    const paginationLinks = paginationContainer.querySelectorAll("a");
    if (paginationLinks.length > 0) {
      const current = parseInt(
        paginationContainer.querySelector(".current").innerHTML,
        10
      );      

      const fields = grid.querySelectorAll(
        ".purdue-home-post-grid__filter-field"
      );
      paginationLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          let paged = 1;
          if (link.classList.contains("prev")) {
            paged = current - 1;
          } else if (link.classList.contains("next")) {
            paged = current + 1;
          } else {
            paged = parseInt(link.innerHTML, 10);
          }
          args = updateArgs(grid, fields, queryArg, args, paged);
          args["requestURL"] = window.location.href;
          getPosts(
            postsContainer,
            paginationContainer,
            message,
            queryArg,
            args,
            grid
          );
          let sectionTop = grid.offsetTop;
          scrollTo(sectionTop, 300);
        });
      });
    }
  }

  let utmParams = args["utm"];

  let paramURL = newURL;

  if(utmParams && utmParams.length > 0){
    if(paramURL){
      let separator = newURL.includes('?') ? '&' : '?';
      paramURL += separator + utmParams.map(param => param.replace(/^&/, '')).join('&');
    }
  }

  history.pushState(null, "post archive", paramURL);
  
  return response;
};

const toggleAccordion = (header) => {
  const content = header.nextElementSibling;
  header.classList.toggle("is-open");
  if (header.getAttribute("aria-expanded") === "false") {
    header.setAttribute("aria-expanded", "true");
  } else {
    header.setAttribute("aria-expanded", "false");
  }
  if (content) {
    content.classList.toggle("hide");
  }
};

const selectItems = (
  grid,
  postsContainer,
  paginationContainer,
  message,
  fields,
  queryArg,
  args,
  selectedTermsContainer,
  clearButton
) => {
  const checkboxes = Array.from(
    grid.querySelectorAll("input[type=checkbox]:checked")
  );
  const selects = Array.from(grid.querySelectorAll("select")).filter(
    (select) => select.value !== ""
  );

  const letters = Array.from(grid.querySelectorAll('.filter-letter.active')); 

  const terms = [...checkboxes, ...selects, ...letters];

  const buttons = selectedTermsContainer
    ? selectedTermsContainer.querySelectorAll("button")
    : [];
  if (buttons && buttons.length > 0) {
    buttons.forEach((button) => button.remove());
  }
  if (terms && terms.length > 0) {
    selectedTermsContainer.classList.remove("p-0");
    terms.forEach((term) => {
      let newButton = document.createElement("button");
      newButton.classList.add("filter-elected-term");
      if(term.tagName === "A"){
        newButton.setAttribute("data-value", term.dataset.alpha);
      }else{
        newButton.setAttribute("data-value", term.value);
      }
      
      if (term.tagName === "SELECT") {

        let tagName = term.value.replaceAll("-"," ");
        let titleCase = tagName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

        newButton.innerHTML = titleCase;
      } else if (term.tagName === "A"){
        newButton.innerHTML = term.dataset.alpha;
      } else {
        newButton.innerHTML = term.parentElement.textContent;
      }
      newButton.addEventListener("click", () => {
        if (term.tagName === "SELECT") {
          term.value = "";
        } else {
          term.checked = false;
        }

        if (term.tagName === "A"){             
          const letter = grid.querySelector(".filter-letter.active");
          if(letter){
            letter.classList.remove('active'); 
          }     
          args['alpha'] = "";
        }

        newButton.remove();
       
        args = updateArgs(grid, fields, queryArg, args, 1);
        queryArg['orgPaged'] = 1;
        args['orgPaged'] = 1;
        getPosts(
          postsContainer,
          paginationContainer,
          message,
          queryArg,
          args,
          grid
        );
        checkClearButton(grid, clearButton, selectedTermsContainer);
      });
      selectedTermsContainer.appendChild(newButton);
    });
  }else{
    if (selectedTermsContainer) {
      selectedTermsContainer.classList.add("p-0");
    }
  }

  if (selectedTermsContainer) {
    checkClearButton(grid, clearButton, selectedTermsContainer)
  }
};

const checkClearButton = (grid, clearButton, selectedTermsContainer) => {
  const checkboxes = Array.from(
    grid.querySelectorAll("input[type=checkbox]:checked")
  );
  const selects = Array.from(grid.querySelectorAll("select")).filter(
    (select) => select.value !== ""
  );
  const letters = Array.from(grid.querySelectorAll('.filter-letter.active')); 

  const terms = [...checkboxes, ...selects, ...letters];

  if (terms && terms.length > 0) {
    clearButton ? clearButton.classList.remove("hide") : "";
  } else {
    selectedTermsContainer ? selectedTermsContainer.classList.add("p-0"): "";
    clearButton ? clearButton.classList.add("hide") : "";
  }
};


// Helper function for smooth scrolling
function scrollTo(to, duration) {
  var start = window.scrollY || window.pageYOffset;
  var change = to - start;
  var startTime = new Date().getTime();

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animateScroll() {
    var currentTime = new Date().getTime();
    var elapsed = currentTime - startTime;

    window.scrollTo(0, easeInOutQuad(elapsed, start, change, duration));

    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  animateScroll();
}
function convertToMonth(monthNumber) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    10: "October",
    11: "November",
    12: "December",
  };

  return months[monthNumber];
}