<?php 
/**
 * Server-side rendering of the block.
 *
 * @package WordPress
 */
function rss_feed_news($url){
    $results=[];

    $rss = fetch_feed( $url );
	if ( is_wp_error( $rss ) ) {
		return '<div class="components-placeholder"><div class="notice notice-error"><strong>' . __( 'RSS Error:' ) . '</strong> ' . $rss->get_error_message() . '</div></div>';
	}

	if ( ! $rss->get_item_quantity() ) {
		return '<div class="components-placeholder"><div class="notice notice-error">' . __( 'An error has occurred, which probably means the feed is down. Try again later.' ) . '</div></div>';
	}
    $rss->enable_order_by_date(false);
    $rss_items  = $rss->get_items( 0, 10);
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
            $tag ="";
            // Get the <theme> tag of the item (specific to the content hub site)
            $theme = $item->get_item_tags($siteUrl."/cms", 'theme');
            if ($theme) {
                $tag = $theme[0]['data']; // The value of the first <theme> tag
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
            if($postType === "rkv_podcast"){
                $postType = "Podcast";
            }
            $description = $item->get_description();
            $imgURLMatch = preg_match("/img.+?src=\"([^\"]+)\"/", $description, $matchimgURL);
            if($imgURLMatch){
                $imgURL=$matchimgURL[1];
            }else{
                $imgURL='';
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
            $date = date('F j, Y',$postDate);
            $month = date('M',$postDate);
            $day = date('d',$postDate);
            $node=array(
                'id'=>$id,
                'linkType'=>"story",
                'mediaType'=>"image",
                'title'=>strval($title),
                'linkURL'=>strval($link),
                'date'=>$date,
                'mediaURL'=>$imgURL,
                'mediaAlt'=>$imgALT,
                "tag"=>$tag,
                "postType"=>$postType,
                "external"=>true,
                'time'=>"",
            );
            array_push($results, $node);
            ++$id;
        }	 
    }
    return $results;
}