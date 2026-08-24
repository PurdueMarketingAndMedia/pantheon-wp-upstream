import { __ } from "@wordpress/i18n";

import {
  PanelBody,
  PanelRow,
  CheckboxControl,
  TextControl,
  ToggleControl,
  SelectControl,
  Button,
  TextareaControl,
  RadioControl,
} from "@wordpress/components";

import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
const { useEffect, useState, useRef, useMemo} = wp.element;
import ServerSideRender from "@wordpress/server-side-render";
import { ReactSortable } from "react-sortablejs";
import { filter } from "@wordpress/icons";
const { apiFetch } = wp;

const edit = (props) => {
  const { className, setAttributes, clientId } = props;
  const {
    blockType,
    linkText,
    linkURL,
    external,
    cardType,
    background,
    header,
    orderBy,
    showExcerpt,
    showDate,
    showThumbnail,
    hasSelectedPostType,
    hasSelectedTax,
    hasSelectedCatTerms,
    selectedPostType,
    selectedTax,
    postTypeTag,
    selectedTaxTerms,
    selectedTaxFilters,
    selectedCatTerms,
    excludeCat,
    addTaxFilter,
    addCatFilter,
    addPostTypeFilter,
    addOrderFilter,
    addSearch,
    addYearFilter,
    postTypeFilterName,
    catFilterName,
    taxFilterName,
    postsPerPage,
    columns,
    rows,
    headerStyle,
    buttonText,
    paddingTop,
    paddingBottom,
    id,
    blockId,
    infiniteScroll,
    addPostTotal,
    postTotalType,
    sortAlpha,
    addAutoComplete,
    filterOrder,
    postPanelCollapse,
    catPanelCollapse,
    taxPanelCollapse,
    datePanelCollapse,
    resultsMessage,
    postIsDropdown,
    catIsDropdown,
    taxIsDropdown,
    queryName,
  } = props.attributes;
  const blockProps = useBlockProps();

  const fetchPath = "/wp/v2/";
  const [postType, setPostType] = useState([]);
  const [taxes, setTax] = useState([]);
  const [taxTerms, setTaxTerms] = useState([]);
  const [catTerms, setCatTerms] = useState([]);


  const handleTaxFilterNameChange = (name, key) => {
    setAttributes({
      taxFilterName: {
        ...taxFilterName,
        [key]: name,
      },
    });
  };

  const handleTaxPanelChange = (name, key) => {
    setAttributes({
      taxPanelCollapse: {
        ...taxPanelCollapse,
        [key]: name,
      },
    });
  };

  const handleTaxDropDownChange = (name, key) => {
    setAttributes({
      taxIsDropdown: {
        ...taxIsDropdown,
        [key]: name,
      },
    });
  };

  const isEqual = (a, b) => {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    return a.every((item, index) => {
        return (
            item.slug === b[index]?.slug &&
            item.type === b[index]?.type &&
            item.index === b[index]?.index
        );
    });
};


const sortableItems = useMemo(() => {
  let items = [];

  if (selectedTaxFilters?.length && addTaxFilter) {
      items = selectedTaxFilters.map((slug, index) => ({
          slug,
          type: "taxonomy",
          index: index + (postTypeFilterName?.trim() ? 1 : 0),
          chosen: false, 
          selected: false 
      }));
  }

  if (postTypeFilterName?.trim() && addPostTypeFilter) {
      items = [
          { slug: postTypeFilterName, type: "postType", index: 0, chosen: false, selected: false  },
          ...items,
      ];
  }

  if (catFilterName?.trim() && addCatFilter) {
    items = [
        { slug: catFilterName, type: "category", index: 1, chosen: false, selected: false  },
        ...items,
    ];
}


  return items;
  
}, [selectedTaxFilters, postTypeFilterName, addPostTypeFilter, addTaxFilter, addCatFilter, catFilterName]);

useEffect(() => {
  if (typeof filterOrder === 'undefined') {
      // Don't touch until filterOrder is loaded
      return;
  }
  const idealSlugs = sortableItems.map(item => item.slug).sort();
  const currentSlugs = filterOrder.map(item => item.slug).sort();

  const isMismatch =
    idealSlugs.length !== currentSlugs.length ||
    idealSlugs.some((slug, index) => slug !== currentSlugs[index]);

  if (isMismatch) {
     setAttributes({ filterOrder: [...sortableItems] });
  }
}, [sortableItems, setAttributes]);


const handleSort = (newOrder) => {  
  console.log('handlesort', newOrder);
  setAttributes({
    filterOrder: newOrder,
  });

};


function toTitleCase(str){  

  let words = str.replace(/_/g, " ");

  let newstring = words.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  return newstring;

};
    
  useEffect(() => {
    if ( ! blockId ) {
      setAttributes( { blockId: clientId } );
    }
  }, []);
  
  useEffect(() => {
    Promise.all([apiFetch({ path: `${fetchPath}types` })])
      .then((terms) => {
        let options = [];
        for (const postType in terms[0]) {
          if (terms[0].hasOwnProperty(postType)) {
            if (
              postType != "page" &&
              postType != "attachment" &&
              postType != "nav_menu_item" &&
              postType != "wp_block" &&
              postType != "wp_template" &&
              postType != "wp_template_part" &&
              postType != "wp_font_family" &&
              postType != "wp_font_face" &&
              postType != "guest-author" &&
              postType != "wp_navigation"
            ) {
              let term = {
                label: terms[0][postType].name,
                value: postType,
              };
              options.push(term);
            }
          }
        }
        setPostType(options);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Promise.all([apiFetch({ path: `${fetchPath}taxonomies` })])
      .then((taxonomies) => {
        let taxes = [],
          taxTerms = [];
        for (const tax in taxonomies[0]) {
          if (
            tax != "category" &&
            tax != "nav_menu" &&
            tax != "post_tag" &&
            tax != "wp_pattern_category"
          ) {
            let tempt = {
              label: taxonomies[0][tax].name,
              value: tax,
            };
            taxes.push(tempt);
            apiFetch({ path: `${fetchPath}${tax}?per_page=100` })
              .then((terms) => {
                terms.forEach((term) => {
                  let temptTerm = {
                    label: term.name,
                    value: term.slug,
                    taxonomy: taxonomies[0][tax].name,
                    taxonomy_slug: taxonomies[0][tax].slug,
                  };
                  taxTerms.push(temptTerm);
                });
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
              });
          }
        }
        setTax(taxes);
        setTaxTerms(taxTerms);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);
  useEffect(() => {
    Promise.all([
      apiFetch({ path: `${fetchPath}categories?per_page=100&page=1` }),
      apiFetch({ path: `${fetchPath}categories?per_page=100&page=2` }),
    ])
      .then((terms) => {
        const options = [...terms[0], ...terms[1]].map((p) => {
          return {
            label: p.name,
            value: p.slug,
          };
        });        
        setCatTerms(options);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);
  return [
    <InspectorControls key="1">
      <PanelBody>
        <PanelRow>
          <SelectControl
            label="Choose what to display"
            value={blockType}
            options={[
              { label: "Recent Posts", value: "recent" },
              { label: "All Posts", value: "all" },
            ]}
            onChange={(blockType) => setAttributes({ blockType })}
          />
        </PanelRow>
        {blockType === "recent" ? (
          <PanelRow>
            <TextControl
              label={"Text for optional button"}
              onChange={(linkText) => {
                setAttributes({ linkText });
              }}
              value={linkText}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {blockType === "recent" ? (
          <PanelRow>
            <TextControl
              label={"Link URL for optional button"}
              onChange={(linkURL) => {
                setAttributes({ linkURL });
              }}
              value={linkURL}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {blockType === "recent" ? (
          <PanelRow>
            <CheckboxControl
              label="Open in new tab for optional button?"
              checked={external}
              onChange={() => {
                setAttributes({ external: !external });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        {blockType === "recent" ? (
          <PanelRow>
            <SelectControl
              label="Number of recent posts"
              value={postsPerPage}
              options={[
                { label: "3", value: "3" },
                { label: "6", value: "6" },
                { label: "9", value: "9" },
              ]}
              onChange={(postsPerPage) => setAttributes({ postsPerPage })}
            />
          </PanelRow>
        ) : (
          <PanelRow>
            <SelectControl
              label="Columns for all posts"
              value={columns}
              options={[
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
              ]}
              onChange={(columns) => setAttributes({ columns })}
            />
          </PanelRow>
        )}
        {blockType === "all" && columns === "3" || blockType === "all" && columns === "2" ? (
          <PanelRow>
            <SelectControl
              label="Rows for all posts"
              value={rows}
              options={[
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
              ]}
              onChange={(rows) => setAttributes({ rows })}
            />
          </PanelRow>
        ) : (
          ""
        )}
        <PanelRow>
          <TextControl
            label={"Add a Header to this section"}
            onChange={(header) => {
              setAttributes({ header });
            }}
            value={header}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose a header style"
            value={headerStyle}
            options={[
              { label: "Simple", value: "simple" },
              { label: "Flagged", value: "flagged" },
            ]}
            onChange={(headerStyle) => setAttributes({ headerStyle })}
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={"Button Text Shown on the Cards"}
            onChange={(buttonText) => {
              setAttributes({ buttonText });
            }}
            value={buttonText}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose the background"
            value={background}
            options={[
              { label: "None", value: "none" },
              { label: "Gold", value: "gold" },
              { label: "Black", value: "black" },
              { label: "Gray", value: "gray" },
            ]}
            onChange={(background) => setAttributes({ background })}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Choose Card Type"
            value={cardType}
            options={[
              { label: "Story", value: "story" },
              { label: "Faculty", value: "faculty" },
              { label: "Directory", value: "directory" },
            ]}
            onChange={(cardType) => setAttributes({ cardType })}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding at the top"
            value={paddingTop}
            options={[
              { value: "has-padding-top-none", label: "None" },
              { value: "has-padding-top-small", label: "Small" },
              { value: "", label: "Medium" },
              { value: "has-padding-top-large", label: "Large" },
            ]}
            onChange={(paddingTop) => {
              setAttributes({ paddingTop });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Padding at the bottom"
            value={paddingBottom}
            options={[
              { value: "has-padding-bottom-none", label: "None" },
              { value: "has-padding-bottom-small", label: "Small" },
              { value: "", label: "Medium" },
              { value: "has-padding-bottom-large", label: "Large" },
            ]}
            onChange={(paddingBottom) => {
              setAttributes({ paddingBottom });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Order posts by"
            value={orderBy}
            options={[
              { value: "date", label: "Date" },
              { value: "title", label: "Title" },
              { value: "meta", label: "Meta field" },
            ]}
            onChange={(orderBy) => {
              setAttributes({ orderBy });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Show Excerpt on the cards?"
            checked={showExcerpt}
            onChange={() => {
              setAttributes({ showExcerpt: !showExcerpt });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Show Date on the cards?"
            checked={showDate}
            onChange={() => {
              setAttributes({ showDate: !showDate });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Show thumbnail on the cards?"
            checked={showThumbnail}
            onChange={() => {
              setAttributes({ showThumbnail: !showThumbnail });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Load more posts using infinite scroll?"
            checked={infiniteScroll}
            onChange={() => {
              setAttributes({ infiniteScroll: !infiniteScroll });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Filter by Alphabetical order?"
            checked={sortAlpha}
            onChange={() => {
              setAttributes({ sortAlpha: !sortAlpha });
            }}
          />
        </PanelRow>
        <PanelRow>
          <CheckboxControl
            label="Show total number of posts?"
            checked={addPostTotal}
            onChange={() => {
              setAttributes({ addPostTotal: !addPostTotal });
            }}
          />
          </PanelRow>
          <PanelRow>
          <CheckboxControl
            label="Turn on auto complete for search results?"
            checked={addAutoComplete}
            onChange={() => {
              setAttributes({ addAutoComplete: !addAutoComplete });
            }}
          />
        </PanelRow>
        {addPostTotal ? (
        <PanelRow>
          <TextareaControl
            label={"Post Type for total posts"}
            onChange={(postTotalType) => {
              setAttributes({ postTotalType });
            }}
            value={ postTotalType }
          />
        </PanelRow>): (
          ""
        )}
        <PanelRow>
          <TextareaControl
            label={"No results message"}
            help={"This message is displayed if no matching posts are found."}
            onChange={(resultsMessage) => {
              setAttributes({ resultsMessage });
            }}
            value={ resultsMessage }
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label={"Pre_Get_Posts Query Name"}
            help={"Add a name for the query to be used for pre_get_posts filter."}
            onChange={(queryName) => {
              setAttributes({ queryName });
            }}
            value={ queryName }
          />
        </PanelRow>
        <PanelRow>
          <TextControl
            label="HTML Anchor"
            help="Enter a word without spaces to make a unique web address just for this block, called an “anchor.” It must be unique from any other anchors on the page. Then, you’ll be able to link directly to this section of your page."
            value={id}
            onChange={(id) => setAttributes({ id })}
          />
        </PanelRow>
      </PanelBody>
      <PanelBody initialOpen={false} key="2" title={`Select Posts`}>
        <PanelRow>
          <ToggleControl
            label="Post Types"
            checked={hasSelectedPostType}
            help={
              hasSelectedPostType
                ? "Choose by post types"
                : "Include all post types"
            }
            onChange={(hasSelectedPostType) => {
              setAttributes({ hasSelectedPostType });
            }}
          />
        </PanelRow>
        {hasSelectedPostType ? (
          <PanelRow>
            <SelectControl
              multiple
              label="Choose Post Types"
              value={selectedPostType}
              options={postType}
              onChange={(selectedPostType) => {
                setAttributes({ selectedPostType });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        <PanelRow>
          <ToggleControl
            label="Categories"
            checked={hasSelectedCatTerms}
            help={
              hasSelectedCatTerms
                ? "Choose by categories"
                : "Include all categories"
            }
            onChange={(hasSelectedCatTerms) => {
              setAttributes({ hasSelectedCatTerms });
            }}
          />
        </PanelRow>
        {hasSelectedCatTerms ? (
          <PanelRow>
            <SelectControl
              multiple
              label="Choose Categories"
              value={selectedCatTerms}
              options={catTerms}
              onChange={(selectedCatTerms) => {
                setAttributes({ selectedCatTerms });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        <PanelRow>
          <ToggleControl
            label="Taxonomies"
            checked={hasSelectedTax}
            help={
              hasSelectedTax ? "Choose by taxonomies" : "Include all taxonomies"
            }
            onChange={(hasSelectedTax) => {
              setAttributes({ hasSelectedTax });
            }}
          />
        </PanelRow>
        {hasSelectedTax && taxes.length === 0 ? (
          <p style={{ fontSize: "14px", color: "red", marginBottom: "16px" }}>
            No taxonomy found!
          </p>
        ) : (
          ""
        )}
        {hasSelectedTax ? (
          <PanelRow>
            <SelectControl
              multiple
              label="Choose Taxonomies"
              value={selectedTaxTerms}
              options={taxTerms.map((item) => {
                return {
                  label: `${item.taxonomy}: ${item.label}`,
                  value: `${item.taxonomy_slug}::${item.value}`,
                };
              })}
              onChange={(selectedTaxTerms) => {
                setAttributes({ selectedTaxTerms });
              }}
            />
          </PanelRow>
        ) : (
          ""
        )}
        <PanelRow>
          <CheckboxControl
            label="Add a Post Type Tag?"
            help="Optional tag to show on the cards"
            checked={postTypeTag}
            onChange={() => {
              setAttributes({ postTypeTag: !postTypeTag });
            }}
          />
        </PanelRow>
        <PanelRow>
          <SelectControl
            label="Add a Taxonomy Tag"
            help="Optional tag to show on the cards"
            value={selectedTax}
            options={[
              ...[{ label: "Select one...", value: "" }],
              ...[{ label: "Category", value: "category" }],
              ...taxes,
            ]}
            onChange={(selectedTax) => {
              setAttributes({ selectedTax });
            }}
          />
        </PanelRow>
        <PanelRow>
            <SelectControl
              multiple
              label="Exclude Categories"
              value={excludeCat}
              options={catTerms}
              onChange={(excludeCat) => {
                setAttributes({ excludeCat });
              }}
            />
          </PanelRow>       
      </PanelBody>
      {blockType === "all" ? (
        <PanelBody initialOpen={false} key="3" title={`Add Filters`}>
          <PanelRow>
            <CheckboxControl
              label="Add a Post Type filter?"
              checked={addPostTypeFilter}
              onChange={() => {
                setAttributes({ addPostTypeFilter: !addPostTypeFilter });
              }}
            />
          </PanelRow>
         
          <PanelRow>
            <CheckboxControl
              label="Add a Category filter?"
              checked={addCatFilter}
              onChange={() => {
                setAttributes({ addCatFilter: !addCatFilter });
              }}
            />
          </PanelRow>
         
          <PanelRow>
            <CheckboxControl
              label="Add an order filter"
              checked={addOrderFilter}
              onChange={() => {
                setAttributes({ addOrderFilter: !addOrderFilter });
              }}
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add a search box?"
              checked={addSearch}
              onChange={() => {
                setAttributes({ addSearch: !addSearch });
              }}
            />
          </PanelRow>
          <PanelRow>
            <CheckboxControl
              label="Add taxonomy filters?"
              checked={addTaxFilter}
              onChange={() => {
                setAttributes({ addTaxFilter: !addTaxFilter });
              }}
            />
          </PanelRow>
          {addTaxFilter && taxes.length === 0 && taxTerms.length === 0 ? (
            <p style={{ fontSize: "14px", color: "red", marginBottom: "16px" }}>
              No taxonomy found!
            </p>
          ) : (
            ""
          )}
          {addTaxFilter ? (
            <PanelRow>
              <SelectControl
                multiple
                label="Choose the Taxonomies filters"
                value={selectedTaxFilters}
                options={taxes}
                onChange={(selectedTaxFilters) => {
                  setAttributes({ selectedTaxFilters })
                }}
              />
            </PanelRow>
          ) : (
            ""
          )}
           <PanelRow className="my-4">
            <CheckboxControl
              label="Add Year and Month filters?"
              checked={addYearFilter}
              onChange={() => {
                setAttributes({ addYearFilter: !addYearFilter });
              }}
            />
          </PanelRow>
           <PanelBody title={__("Filter Order and Names")}>              
            {
              <ReactSortable
                  list={filterOrder}
                  setList={handleSort}
                  className="sortable-posts"
                >
                  {filterOrder.map((item) => {
                    return (
                      <PanelBody
                        title={item.type === "postType" ? "Post Type Filter" : toTitleCase(item.slug)}
                        key={`sortable-${item.slug}`}
                      >
                        <PanelRow>
                          {item.type === "postType" ? (
                            <TextControl
                              label="Post Type Filter Name"
                              value={postTypeFilterName}
                              onChange={(val) => setAttributes({ postTypeFilterName: val })}
                            />
                          ) : item.type === "category" ? (
                            <TextControl
                              label={"Add a name for the category filter"}
                              onChange={(catFilterName) => {
                                setAttributes({ catFilterName });
                              }}
                              value={catFilterName}
                            />
                          ) : (
                            <TextControl
                              label={`Change filter name for ${toTitleCase(item.slug)}`}
                              value={taxFilterName[item.slug] || ""}
                              onChange={(val) => handleTaxFilterNameChange(val, item.slug)}
                            />
                          )}
                        </PanelRow>
                        <PanelRow>
                          {item.type === "postType" ? (
                              <CheckboxControl
                                label="Collapse Posts panel?"
                                checked={postPanelCollapse}
                                onChange={() => {
                                  setAttributes({ postPanelCollapse: !postPanelCollapse });
                                }}
                              />
                          ) : item.type === "category" ? (
                            <CheckboxControl
                            label="Collapse Categories panel?"
                            checked={catPanelCollapse}
                            onChange={() => {
                              setAttributes({ catPanelCollapse: !catPanelCollapse });
                            }}
                          />
                          ) : (
                              <CheckboxControl
                                  label={`Collapse ${toTitleCase(item.slug)} Panel?`}
                                  checked={!!taxPanelCollapse[item.slug]}
                                  onChange={(val) => handleTaxPanelChange(val, item.slug)}
                              />

                          )}
                        </PanelRow>
                        <PanelRow>
                          {item.type === "postType" ? (
                              <CheckboxControl
                                label="Display as a dropdown?"
                                checked={postIsDropdown}
                                onChange={() => {
                                  setAttributes({ postIsDropdown: !postIsDropdown });
                                }}
                              />
                          ) : item.type === "category" ? (
                              <CheckboxControl
                                label="Display as a dropdown?"
                                checked={catIsDropdown}
                                onChange={() => {
                                  setAttributes({ catIsDropdown: !catIsDropdown });
                                }}
                            />
                          ) : (
                            <CheckboxControl
                              label="Display as a dropdown?"
                              checked={taxIsDropdown[item.slug]}
                              value={taxIsDropdown[item.slug]}
                              onChange={(val) => handleTaxDropDownChange(val, item.slug)}
                          />

                          )}
                        </PanelRow>
                      </PanelBody>
                    );
                  })}
                </ReactSortable>}
                  {addYearFilter ? (
                    <PanelRow>
                    <CheckboxControl
                        label="Collapse Date panel?"
                        checked={datePanelCollapse}
                        onChange={() => {
                          setAttributes({ datePanelCollapse: !datePanelCollapse });
                        }}
                      />
                  </PanelRow>) : ""}
           </PanelBody>
         
          

         
        </PanelBody>
      ) : (
        ""
      )}
    </InspectorControls>,
    <div {...blockProps} key="2">
      <ServerSideRender
        block="purdue/post-grid"
        attributes={{
          blockType,
          linkText,
          linkURL,
          external,
          cardType,
          header,
          orderBy,
          showExcerpt,
          showDate,
          showThumbnail,
          hasSelectedPostType,
          hasSelectedTax,
          hasSelectedCatTerms,
          selectedPostType,
          selectedTax,
          postTypeTag,
          selectedTaxTerms,
          selectedTaxFilters,
          selectedCatTerms,
          excludeCat,
          addTaxFilter,
          addCatFilter,
          addPostTypeFilter,
          addOrderFilter,
          addSearch,
          addYearFilter,
          postTypeFilterName,
          catFilterName,
          taxFilterName,
          postsPerPage,
          postPanelCollapse,
          catPanelCollapse,
          columns,
          headerStyle,
          buttonText,
          background,
          paddingTop,
          paddingBottom,
          taxPanelCollapse,
          datePanelCollapse
        }}
      />
    </div>,
  ];
};
export default edit;
