<?php 
/**
 * Server-side rendering of the block.
 *
 * @package WordPress
 */
	
 function out_image($media){
    $output='<div class="image is-16by9">';
    if($media["mediaType"]=="image"){
        $output.='<img alt="'.$media["mediaAlt"].'" src="'.$media["mediaURL"].'"/>';
    }else if($media["mediaType"]=="video"){
        $output.='<video title="'.$media["mediaTitle"].'" playsinline muted loop>
        <source src="'.$media["mediaURL"].'">
        </video>';            
    }
    $output.='</div>';
    return $output;
}