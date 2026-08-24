<?php 
/**
 * Server-side rendering of the block.
 *
 * @package WordPress
 */
	
function card($card,$type, $inculdeDesc,$includeThumb, $hasType, $hasTag, $background, $layout, $header){
    $headingTag = $header ? "h3" : "h2";
    $cardClass="purdue-home-cta-card";
    if($type=="simple"){
        $cardClass.=" has-content-bottom";
    }elseif($type=="story"){
        $cardClass.=" purdue-home-cta-card--story";
        if($layout){
            $cardClass.=" purdue-home-cta-card--horizontal";
        }
        if(array_key_exists("postType", $card) && $card["postType"]){
            $cardClass.=" post-type-".$card["postType"];
        }
    }else{
        $cardClass.=" purdue-home-cta-card--stack";
    }
    
    $contentClass="flex-container";
    $output = '';
    if($type=="story"){
        $contentClass.=" flex-container--align-center";
        if($background=="black"){
            $contentClass.=" has-black-background";
        }else if($background == "gray"){
            $contentClass.=" has-gray-background";
        }else{
            
        }

        if(!$inculdeDesc){
            $contentClass.=" has-no-excerpt";
        }
    }elseif($type=="faculty"){
        $contentClass.=" flex-container--faculty";
    }else{
        $contentClass.=" flex-container--align-bottom";
    }

    if(!$card["linkURL"] || ($card["linkURL"] && $card["linkURL2"])) {
        $cardClass .= ' purdue-home-cta-card--nolink';
    }

    if($card["linkURL"] != "" && !$card['linkURL2']){
        $target = isset($card["external"]) && $card["external"] ? "_blank" : "_self";
        $ariaLabel = "";
        $buttonText = (is_null($card["buttonText"])) ? "Learn More" : $card["buttonText"];
        if(isset($card["ariaLabel"]) && $card["ariaLabel"]!=""){
            $ariaLabel = 'aria-label="'.$card["ariaLabel"].' '.$external.'"';
        }elseif(isset($external) && $external!=""){
            if($type=="story" || $type=="simple"){                
                $ariaLabel = isset($buttonText)? 'aria-label="'.$buttonText.'"':'';
            }else{
                $ariaLabel = isset($card["name"])? 'aria-label="'. $card["name"] .'"':'';
            }
        }else{
            $ariaLabel = "";
        }
        $output.='<article class="'.$cardClass.'" data-link="'.$card["linkURL"].'" data-target="'.$target.'">';  
        if($includeThumb){
            $imageClass="image";
            if($type=="simple" || $type=="story"){
                if($layout){
                    $imageClass.="";
                }else{
                    $imageClass.=" is-16by9";
                }
            }else{
                $imageClass.=" is-square";
            }
            if(!$layout){
                $output.='<div class="card-image">';
            }
            $output.='<figure class="'.$imageClass.'">';
            $output.='<img alt="'.$card["mediaAlt"].'" src="'.$card["mediaURL"].'"/>';
            $output.='</figure>';
            if(!$layout){
                $output.='</div>';
            }
        }
        $output.='<div class="'.$contentClass.'">';
        if($type=="story" && ($card["tag"] || $card["postType"])&&($hasType||$hasTag)){
            $output.='<p class="purdue-home-cta-grid__card-subtitle">';
        }
        if($type=="story" && $card["postType"]&& $hasType){
            $output.='<span class="purdue-posttype-tag">'.$card["postType"].'</span>';
        }
        if($type=="story" && $card["postType"]&& $hasType && $card["tag"]&& $hasTag){
            $output.='|';
        }
        if($type=="story" && $card["tag"]&& $hasTag){
            $output.='<span class="purdue-tax-tag">'.$card["tag"].'</span>';
        }

        if($type=="story" && ($card["tag"] || $card["postType"])&&($hasType||$hasTag)){
            $output.='</p>';
        }
        if($type=="story"&& $card["title"]){
        $output.='<'.$headingTag.' class="purdue-home-cta-grid__card-title">'.$card["title"].'</'.$headingTag.'>';
        }
        if($type=="story"&& $card["subtext"]&& $inculdeDesc){
            $output.='<div class="purdue-home-cta-grid__card-subtext">'.$card["subtext"].'</div>';
        }
        if($type=="story"){
            $buttonText = (is_null($card["buttonText"])) ? "Learn More" : $card["buttonText"];
            $output.='<a class="purdue-home-button purdue-home-button--story '.$card['buttonCSS'].'" href="'.$card["linkURL"].'" target='.$target.' '.$ariaLabel.'>'.$buttonText.'</a>';
        }
        if($type=="faculty"&& $card["name"]){
            $output.='<'.$headingTag.' ><a class="purdue-home-cta-grid__card-name '.$card["buttonCSS"].'" href="'.$card["linkURL"].'" target='.$target.' '.$ariaLabel.'>'.$card["name"].'</a></'.$headingTag.'>';
        }
        if($type=="faculty"&& $card["titleLine1"]){
            $output.='<p class="purdue-home-cta-grid__card-titleline">'.$card["titleLine1"].'</p>';
        }
        if($type=="faculty"&& $card["titleLine2"]){
            $output.='<p class="purdue-home-cta-grid__card-titleline">'.$card["titleLine2"].'</p>';
        }
        if($type=="faculty"&& $card["email"]){
            $output.='<p class="purdue-home-cta-grid__card-email">'.trim($card["email"]).'</p>';
        }
        if($type=="faculty"&& $card["address"]){
            $output.='<p class="purdue-home-cta-grid__card-address">'.trim($card["address"]).'</p>';
        }
        
        if($type=="faculty"&& $card["officePhone"]){
            $output.='<p class="purdue-home-cta-grid__card-phone">Office: '.trim($card["officePhone"]).'</p>';
        }
        if($type=="faculty"&& $card["cellPhone"]){
            $output.='<p class="purdue-home-cta-grid__card-phone">Cell: '.trim($card["cellPhone"]).'</p>';
        }
        if($type=="faculty"&& $card["homePhone"]){
            $output.='<p class="purdue-home-cta-grid__card-phone">Home: '.trim($card["homePhone"]).'</p>';
        }      
        if($type=="simple"&& $card["title"]){
            $output.='<p><a class="purdue-home-cta-grid__card-title '.$card["buttonCSS"].'" href="'.$card["linkURL"].'" target='.$target.' '.$ariaLabel.'>'.$card["title"].'</a></p>';
        }
        if($type=="simple"&& $card["subtext"]){
            $output.='<p class="purdue-home-cta-grid__card-subtext">'.$card["subtext"].'</p>';
        }
        $output.='</div></article>';
    }else{
        $output.='<article class="'.$cardClass.'">';  
        if($includeThumb){
            $imageClass="image";
            if($type=="simple" || $type=="story"){
                $imageClass.=" is-16by9";
            }else{
                $imageClass.=" is-square";
            }
            $output.='<figure class="'.$imageClass.'">';
            $output.='<img alt="'.$card["mediaAlt"].'" src="'.$card["mediaURL"].'"/>';
            $output.='</figure>';
        }
        $output.='<div class="'.$contentClass.'">';
        if($type=="story" && ($card["tag"] || $card["postType"])&&($hasType||$hasTag)){
            $output.='<p class="purdue-home-cta-grid__card-subtitle">';
        }
        if($type=="story" && $card["postType"]&& $hasType){
            $output.='<span class="purdue-posttype-tag">'.$card["postType"].'</span>';
        }
        if($type=="story" && $card["postType"]&& $hasType && $card["tag"]&& $hasTag){
            $output.='|';
        }
        if($type=="story" && $card["tag"]&& $hasTag){
            $output.='<span class="purdue-tax-tag">'.$card["tag"].'</span>';
        }
        if($type=="story" && ($card["tag"] || $card["postType"])&&($hasType||$hasTag)){
            $output.='</p>';
        }
        if($type=="story"&& $card["title"]){
        $output.='<p class="purdue-home-cta-grid__card-title">'.$card["title"].'</p>';
        }
        if($type=="story"&& $card["subtext"]&& $inculdeDesc){
            $output.='<p class="purdue-home-cta-grid__card-subtext">'.$card["subtext"].'</p>';
        }
        if($type=="story" && ($card["linkURL"] || $card["linkURL2"])){
            $output.='<ul class="purdue-home-button-list">';
        }
        if($type=="story" && $card["linkURL"]){
            $target = isset($card["external"]) && $card["external"] ? "_blank" : "_self";
            $external = isset($card["external"]) && $card["external"] ? "(Opens in a new tab)" : "";
            $buttonText = (is_null($card["buttonText"])) ? "Learn More" : $card["buttonText"];
            $ariaLabel = "";
            if(isset($card["ariaLabel"]) && $card["ariaLabel"]!=""){
                $ariaLabel = 'aria-label="'.$card["ariaLabel"].' '.$external.'"';
            }elseif(isset($external) && $external!=""){
                $ariaLabel = isset($card["buttonText"])? 'aria-label="'.$card["buttonText"].' '.$external.'"':'';
            }else{
                $ariaLabel = "";
            }
            $output.='<li><a class="purdue-home-button '.$card["buttonCSS"].'" href="'.$card["linkURL"].'" target='.$target.' '.$ariaLabel.'>'.$buttonText.'</a></li>';
        }
        if($type=="story" && $card["linkURL2"]){
            $buttonText2 = (is_null($card["buttonText2"])) ? "Learn More" : $card["buttonText2"];
            $target2 = isset($card["external2"]) && $card["external2"] ? "_blank" : "_self";
            $external2 = isset($card["external2"]) && $card["external2"] ? "(Opens in a new tab)" : "";
            $ariaLabel2 = "";
            if(isset($card["ariaLabel2"]) && $card["ariaLabel2"]!=""){
                $ariaLabel2 = 'aria-label="'.$card["ariaLabel2"].' '.$external2.'"';
            }elseif(isset($external2) && $external2!=""){
                $ariaLabel2 = isset($card["buttonText2"])? 'aria-label="'.$card["buttonText2"].' '.$external2.'"':'';
            }else{
                $ariaLabel = "";
            }
            $output.='<li><a class="purdue-home-button '.$card["buttonCSS2"].'" href="'.$card["linkURL2"].'" target='.$target2.' '.$ariaLabel2.'>'.$buttonText2.'</a></li>';
        }
        if($type=="story" && ($card["linkURL"] || $card["linkURL2"])){
            $output.='</ul>';
        }

        if($type=="faculty"&& $card["name"]){
            $output.='<'.$headingTag.' class="purdue-home-cta-grid__card-name">'.$card["name"].'</'.$headingTag.'>';
        }
        if($type=="faculty"&& $card["titleLine1"]){
            $output.='<p class="purdue-home-cta-grid__card-titleline">'.$card["titleLine1"].'</p>';
        }
        if($type=="faculty"&& $card["titleLine2"]){
            $output.='<p class="purdue-home-cta-grid__card-titleline">'.$card["titleLine2"].'</p>';
        }
        if($type=="faculty"&& $card["email"]){
            $output.='<a class="purdue-home-cta-grid__card-email" href="mailto:'.trim($card["email"]).'">'.trim($card["email"]).'</a>';
        }
        if($type=="faculty"&& $card["address"]){
            $output.='<p class="purdue-home-cta-grid__card-address">'.trim($card["address"]).'</p>';
        }
        if($type=="faculty"&& $card["officePhone"]){
            $output.='<p class="purdue-home-cta-grid__card-phone">Office: <a class="purdue-home-cta-grid__card-phone" href="tel://'.trim($card["officePhone"]).'">'.trim($card["officePhone"]).'</a></p>';
        }
        if($type=="faculty"&& $card["cellPhone"]){
            $output.='<p class="purdue-home-cta-grid__card-phone">Cell: <a class="purdue-home-cta-grid__card-phone" href="tel://'.trim($card["cellPhone"]).'">'.trim($card["cellPhone"]).'</a></p>';
        }
        if($type=="faculty"&& $card["homePhone"]){
            $output.='<p class="purdue-home-cta-grid__card-phone">Home: <a class="purdue-home-cta-grid__card-phone" href="tel://'.trim($card["homePhone"]).'">'.trim($card["homePhone"]).'</a></p>';
        }

        $websiteTarget = isset($card["websiteExternal"]) && $card["websiteExternal"] ? "_blank" : "_self";

        if($type=="faculty"&& $card["websiteLink"]){
            $output.='<p class="mt-2"><a class="purdue-home-cta-grid__card-websiteURL" href="'.trim($card["websiteURL"]).'" target="'.$websiteTarget.'">'.trim($card["websiteLink"]).'</a></p>';
        }

        if($type=="simple"&& $card["title"]){
            $output.='<p class="purdue-home-cta-grid__card-title">'.$card["title"].'</p>';
        }
        if($type=="simple"&& $card["subtext"]){
            $output.='<p class="purdue-home-cta-grid__card-subtext">'.$card["subtext"].'</p>';
        }
        $output.='</div></article>';
    }
    return $output;
}


function rss_feed($url){
    $results=[];

    $rss = fetch_feed( $url );
	if ( is_wp_error( $rss ) ) {
		return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . __( 'RSS Error:' ) . '</strong> ' . $rss->get_error_message() . '</div></div>';
	}

	if ( ! $rss->get_item_quantity() ) {
		return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</div></div>';
	}
    $rss->enable_order_by_date(false);
    $rss_items  = $rss->get_items( 0, 9);
    if(!empty($rss_items)){
        $id=0; 
        foreach ($rss_items as $item) {  
            $title = esc_html( trim( strip_tags( $item->get_title() ) ) );
            if ( empty( $title ) ) {
                $title = __( '(no title)' );
            }
            $link = $item->get_link();
            $link = esc_url( $link );
            $parsedUrl = parse_url($url);
            $siteUrl = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
            $postType = $item->get_item_tags($siteUrl."/cms", 'posttype');
            $postType = $postType&&sizeof($postType)>0? $postType[0]['data']:"";
            $tag="";
            //Specially for contenthub feed
            $theme = $item->get_item_tags($siteUrl."/cms", 'theme');
            if($theme){
                $tag = $theme[0]['data'];
            }else{
                $cat = $item->get_categories();
                $tag = $cat&&sizeof($cat)>0? $cat[0]->get_term():"";
                if($tag=="Featured"){
                    if($cat&&sizeof($cat)>1){
                        $tag = $cat[1]->get_term();
                    }else{
                        $tag ="";
                    }
                }
                if($tag=="Uncategorized"){
                    if($cat&&sizeof($cat)>1){
                        $tag = $cat[1]->get_term();
                    }else{
                        $tag ="";
                    }
                }
            }
            $description = $item->get_description();
            $media =  $item->get_enclosure();

            $imgURLMatch = preg_match("/img.+?src=\"([^\"]+)\"/", $description, $matchimgURL);
            //$mediaURLMatch = preg_match("/<media.+?url=\"([^\"]+)\"/", $description, $matchmediaURL);
            if($imgURLMatch){
                $imgURL=$matchimgURL[1];
            }else if($media){
                $imgURL=$media->get_link();
            }else{
                $imgURL='https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg';
            }
            $imgALTMatch = preg_match("/<img[^>]+alt=\"([^>]*)\"[^>]*>/iU", $description, $matchimgALT);
            if($imgALTMatch){
                $imgALT=$matchimgALT[1];
            }else{
                $imgALT='';
            }
            $text="";
            if(strlen(strip_tags(preg_replace('/<figure[^>]*>.*?<\/figure>/i', ' ', $description)))>0){
            $text=substr(strip_tags(preg_replace('/<figure[^>]*>.*?<\/figure>/i', ' ', $description)), 0, 300)."...";
            }
            $postDate = strtotime($item->get_date('j F Y, g:i a'));
            $date = date('M d, Y',$postDate);
            $month = date('M',$postDate);
            $day = date('d',$postDate);
            $node=array(
                'id'=>$id,
                'title'=>strval($title),
                'subtext'=>strval($text),
                'linkURL'=>strval($link),
                'linkURL2'=>'',
                'buttonCSS'=>'',
                'date'=>$date,
                'mediaURL'=>$imgURL,
                'mediaAlt'=>$imgALT,
                "tag"=>$tag,
                "postType"=>$postType,
                "external"=>true,
                'buttonText'=>"Learn More"
            );
            array_push($results, $node);
            ++$id;
        }	 
    }
    return $results;
}