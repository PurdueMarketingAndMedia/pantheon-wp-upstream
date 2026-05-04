<?php
/**
 * Blocks tempaltes
 *
 * @since   1.0.0
 * @package purdue-home-theme
 */

 function purdue_home_block_patterns() {

	if ( class_exists( 'WP_Block_Patterns_Registry' ) ) {
		register_block_pattern_category(
			'templates',
			array( 'label' => __( 'Templates', 'purdue-home' ) )
		);
	  register_block_pattern(
		'homepage-storytelling',
		  array(
		  'title' => __( 'Storytelling Homepage', 'purdue-home' ),
		  'description' => _x( 'A template to be used as a storytelling homepage.', 'Block pattern description', 'purdue-home' ),
		  'categories' => array('templates'),
		  'blockTypes' => array( 'core/paragraph', 'core/heading','purdue/rtb-hero','purdue/featured-story','purdue/two-column-cta','purdue/tabs','purdue/tab','purdue/cta-banner', 'purdue/video-embed','purdue/news-and-events','purdue/image-slider','purdue/intro-text'),
		  'content'    => '<!-- wp:purdue/rtb-hero {"type":"stack","header":"Page Header goes here Lorem ipsum","subheader":"OPtional Subheader here","subtext":"Optional subtext goes here lorem ipsum","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","sliderCards":[{"id":"","type":"image","text":"","source":"","linkURL":"","external":true,"title":"","content":"","mediaAlt":"","mediaURL":"https://placehold.co/402x222","chosen":false,"selected":false},{"id":1,"type":"image","text":"","source":"","linkURL":"","external":true,"title":"","content":"","mediaAlt":"","mediaURL":"https://placehold.co/402x222","chosen":false,"selected":false},{"id":2,"type":"image","text":"","source":"","linkURL":"","external":true,"title":"","content":"","mediaAlt":"","mediaURL":"https://placehold.co/402x222","chosen":false,"selected":false}],"links":[{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Optional CTA Button","linkURL":"","buttonColor":"black","fullWidth":false,"external":false,"chosen":false}]} /-->

		  <!-- wp:purdue/featured-story {"subheader":"OPtional Subheader","header":"Header goes here Lorem ipsum","mediaURL":"https://placehold.co/743x418","mediaTitle":"Screen Shot 2023-07-12 at 11.27.19 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here lorem ipsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/featured-story -->
		  
		  <!-- wp:purdue/two-column-cta {"cards":[{"mediaId":157,"mediaURL":"https://placehold.co/1400x943","mediaAlt":"","subtitle":"Optional subheader","title":"Header goes here","subtext":"Body copy goes here lorem ipsum","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":138,"mediaURL":"https://placehold.co/1400x943","mediaAlt":"","subtitle":"optional sunheader","title":"Header goes here","subtext":"Body copy goes here lorem ipsum\n\n","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false}]} /-->
		  
		  <!-- wp:purdue/video-embed {"header":"Optional section header","mediaURL":"https://placehold.co/1280x720","mediaTitle":"Screen Shot 2023-07-13 at 10.34.03 AM","youtubeLink":"https://www.youtube.com/watch?v=nuF2WKjUNbc"} /-->
		  
		  <!-- wp:purdue/tabs-block {"numTabs":4,"headers":[{"id":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-0","text":"Tab header goes here","active":false},{"id":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-1","text":"Tab header goes here","active":false},{"id":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-2","text":"Tab header goes here","active":false},{"id":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-3","text":"Tab header goes here","active":true}]} -->
		  <div class="purdue-home-tabs"><div class="section has-padding-top-large has-padding-bottom-large"><div class="container"><div class="columns"><div class="column is-5"><div class="arrow"></div><h2 class="tagged-header tagged-header--gold">I want to learn about</h2><div class="purdue-home-tabs__headers" role="tablist"><button id="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-0" class="purdue-home-tabs__header " role="tab" aria-controls="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-0" aria-selected="false"><h3 class="purdue-home-tabs__header-text">Tab header goes here</h3></button><button id="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-1" class="purdue-home-tabs__header " role="tab" aria-controls="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-1" aria-selected="false"><h3 class="purdue-home-tabs__header-text">Tab header goes here</h3></button><button id="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-2" class="purdue-home-tabs__header " role="tab" aria-controls="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-2" aria-selected="false"><h3 class="purdue-home-tabs__header-text">Tab header goes here</h3></button><button id="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-3" class="purdue-home-tabs__header  active" role="tab" aria-controls="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-3" aria-selected="true"><h3 class="purdue-home-tabs__header-text">Tab header goes here</h3></button></div></div><div class="column is-7"><!-- wp:purdue/tab-block {"aria":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-0","selected":true} -->
		  <div class="purdue-home-tabs__panel" aria-labelledby="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-0" id="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-0"><!-- wp:purdue/image-slider {"paddingTop":"has-padding-top-none","paddingBottom":"has-padding-bottom-none","imgs":[{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":401,"width":711,"orientation":"landscape"}},"mime":"image/png","type":"image","subtype":"png","id":27,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""},{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":400,"width":712,"orientation":"landscape"}},"mime":"image/jpeg","type":"image","subtype":"jpeg","id":1220,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""}],"cards":[{"mediaId":0,"mediaURL":"","mediaAlt":"","title":"","subtext":"","linkText":"","linkURL":"","external":true}],"removeSidePadding":true} /-->
		  
		  <!-- wp:purdue/intro-text {"background":"black","layout":"one-left","header":"Header goes here","subheader":"Section header goes here","removeSidePadding":true,"links":[{"linkText":"Button Text","linkURL":"#","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body content goes here lopsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text --></div>
		  <!-- /wp:purdue/tab-block -->
		  
		  <!-- wp:purdue/tab-block {"aria":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-1"} -->
		  <div class="purdue-home-tabs__panel" aria-labelledby="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-1" id="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-1"><!-- wp:purdue/image-slider {"paddingTop":"has-padding-top-none","paddingBottom":"has-padding-bottom-none","imgs":[{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":400,"width":712,"orientation":"landscape"}},"mime":"image/jpeg","type":"image","subtype":"jpeg","id":1220,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""},{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":401,"width":711,"orientation":"landscape"}},"mime":"image/png","type":"image","subtype":"png","id":27,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""}],"cards":[{"mediaId":0,"mediaURL":"","mediaAlt":"","title":"","subtext":"","linkText":"","linkURL":"","external":true}],"removeSidePadding":true} /-->
		  
		  <!-- wp:purdue/intro-text {"background":"black","layout":"one-left","header":"Header goes here","subheader":"Section header goes here","removeSidePadding":true,"links":[{"linkText":"Button Text","linkURL":"#","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text --></div>
		  <!-- /wp:purdue/tab-block -->
		  
		  <!-- wp:purdue/tab-block {"aria":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-2"} -->
		  <div class="purdue-home-tabs__panel" aria-labelledby="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-2" id="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-2"><!-- wp:purdue/image-slider {"paddingTop":"has-padding-top-none","paddingBottom":"has-padding-bottom-none","imgs":[{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":400,"width":712,"orientation":"landscape"}},"mime":"image/jpeg","type":"image","subtype":"jpeg","id":1220,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""},{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":401,"width":711,"orientation":"landscape"}},"mime":"image/png","type":"image","subtype":"png","id":27,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""}],"cards":[{"mediaId":0,"mediaURL":"","mediaAlt":"","title":"","subtext":"","linkText":"","linkURL":"","external":true}],"removeSidePadding":true} /-->
		  
		  <!-- wp:purdue/intro-text {"background":"black","layout":"one-left","header":"Header goes here","subheader":"Section header goes here","removeSidePadding":true,"links":[{"linkText":"Button Text","linkURL":"#","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body content goes here lopsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text --></div>
		  <!-- /wp:purdue/tab-block -->
		  
		  <!-- wp:purdue/tab-block {"aria":"d1285c6f-28de-4036-ad5c-edd8c9f13f9b-3","editorSelected":true} -->
		  <div class="purdue-home-tabs__panel active" aria-labelledby="header-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-3" id="panel-d1285c6f-28de-4036-ad5c-edd8c9f13f9b-3"><!-- wp:purdue/image-slider {"paddingTop":"has-padding-top-none","paddingBottom":"has-padding-bottom-none","imgs":[{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":400,"width":712,"orientation":"landscape"}},"mime":"image/jpeg","type":"image","subtype":"jpeg","id":1220,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""},{"sizes":{"thumbnail":{"height":150,"width":150,"url":"https://placehold.co/712x400","orientation":"landscape"},"medium":{"height":169,"width":300,"url":"https://placehold.co/712x400","orientation":"landscape"},"full":{"url":"https://placehold.co/712x400","height":401,"width":711,"orientation":"landscape"}},"mime":"image/png","type":"image","subtype":"png","id":27,"url":"https://placehold.co/712x400","alt":"","link":"https://placehold.co/712x400","caption":""}],"cards":[{"mediaId":0,"mediaURL":"","mediaAlt":"","title":"","subtext":"","linkText":"","linkURL":"","external":true}],"removeSidePadding":true} /-->
		  
		  <!-- wp:purdue/intro-text {"background":"black","layout":"one-left","header":"Header goes here","subheader":"Section header goes here","removeSidePadding":true,"links":[{"linkText":"Button Text","linkURL":"#","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body content goes here lopsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text --></div>
		  <!-- /wp:purdue/tab-block --></div></div></div></div></div>
		  <!-- /wp:purdue/tabs-block -->
		  
		  <!-- wp:purdue/news-and-events {"heading":"Header goes here","featuredHeading":"Header goes here","listHeading":"Header goes here","smallCards":[{"tag":"Tag goes here","date":"October 22, 2023","time":"1-3 pm","title":"Title goes here lorem ipsum lorem ipsum lorem ipsum","linkURL":"#","external":true,"chosen":false,"selected":false},{"tag":"Tag goes here","date":"October 22, 2023","time":"1-3 pm","title":"Title goes here lorem ipsum lorem ipsum lorem ipsum","linkURL":"#","external":true,"chosen":false},{"tag":"Tag","date":"October 22, 2023","time":"1-3 pm","title":"Title goes here lorem ipsum lorem ipsum lorem ipsum","linkURL":"#","external":true,"chosen":false}],"sliderCards":[{"tag":"Tag goes here","date":"October 22, 2023","time":"4 PM","title":"Title goes here","linkURL":"","external":true,"linkType":"story","mediaId":27,"mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"Screen Shot 2023-07-12 at 11.27.19 AM","chosen":false,"selected":false}],"linkURL":"#"} /-->
		  
		  <!-- wp:purdue/cta-banner {"header":"Header goes here Lorem ipsum","subheader":"SUBHEADER GOES HERE","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}],"fieldId":"051d5d72-e8f5-4bf4-80d6-c58e901b1be8"} /-->',
		)
	  );
	  
	  register_block_pattern(
		'homepage-pragmatic',
		  array(
		  'title' => __( 'Pragmatic Homepage', 'purdue-home' ),
		  'description' => _x( 'A template to be used as a progmatic homepage.', 'Block pattern description', 'purdue-home' ),
		  'categories' => array('templates'),
		  'blockTypes' => array( 'core/paragraph', 'core/heading','purdue/rtb-hero','purdue/mixed-rtb','purdue/cta-banner', 'purdue/content-block','purdue/news-and-events','purdue/cta-grid','purdue/cta-carousel','purdue/intro-text'),		 
		  'content'    => '<!-- wp:purdue/rtb-hero {"type":"stack","header":"Page Header goes here Lorem ipsum","subheader":"Optional subheader here","subtext":"Optional subtext goes here lorem ipsum","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","sliderCards":[{"id":"","type":"image","text":"","source":"","linkURL":"","external":true,"title":"","content":"","mediaAlt":"","mediaURL":"https://placehold.co/402x222","chosen":false,"selected":false},{"id":1,"type":"image","text":"","source":"","linkURL":"","external":true,"title":"","content":"","mediaAlt":"","mediaURL":"https://placehold.co/402x222","chosen":false,"selected":false},{"id":2,"type":"image","text":"","source":"","linkURL":"","external":true,"title":"","content":"","mediaAlt":"","mediaURL":"https://placehold.co/402x222","chosen":false,"selected":false}],"links":[{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"OPtional CTA","linkURL":"#","buttonColor":"black","fullWidth":false,"external":false,"chosen":false,"selected":false}]} /-->

		  <!-- wp:purdue/mixed-rtb {"smallCards":[{"id":0,"mediaId":27,"mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","linkType":"video","linkText":"Watch Video","linkURL":"https://www.youtube.com/watch?v=jurK17rAA9A","external":false,"chosen":false,"selected":false},{"id":1,"mediaId":27,"mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","linkType":"story","linkText":"Title goes here","linkURL":"#","external":true,"chosen":false,"selected":false}],"sliderCards":[{"id":0,"type":"rtb","lead":"STAT","title":"10","content":"","smallText":"Lorem lpsum lprem dolore","source":"Source goes here","linkURL":"#","external":true,"reverseShade":false,"background":"gold","ctaText":"","mediaId":0,"mediaType":"","mediaURL":"","mediaAlt":"","mediaTitle":"","chosen":false,"selected":false},{"id":1,"type":"story","lead":"","title":"Stories title here lorem ipsum dolor sit amet","content":"","smallText":"","source":"","linkURL":"#","external":true,"reverseShade":false,"background":"gold","ctaText":"Title here","mediaId":27,"mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","chosen":false,"selected":false},{"id":2,"type":"rtb","lead":"Stat","title":"10","content":"","smallText":"Lorem lpsum lprem dolore","source":"Source goes here","linkURL":"#","external":true,"reverseShade":false,"background":"black","ctaText":"","mediaId":0,"mediaType":"","mediaURL":"","mediaAlt":"","mediaTitle":"","chosen":false,"selected":false}],"paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large"} /-->
		  
		  <!-- wp:purdue/news-and-events {"heading":"Header goes here","featuredHeading":"Header goes here","listHeading":"Header goes here","smallCards":[{"tag":"Tag goes here","date":"October 22, 2023","time":"1-3 pm","title":"Title goes here lorem ipsum lorem ipsum lorem ipsum","linkURL":"#","external":true,"chosen":false,"selected":false},{"tag":"Tag goes here","date":"October 22, 2023","time":"1-3 pm","title":"Title goes here lorem ipsum lorem ipsum lorem ipsum","linkURL":"#","external":true,"chosen":false,"selected":false},{"tag":"Tag","date":"October 22, 2023","time":"1-3 pm","title":"Title goes here lorem ipsum lorem ipsum lorem ipsum","linkURL":"#","external":true,"chosen":false,"selected":false}],"sliderCards":[{"tag":"Tag goes here","date":"October 22, 2023","time":"4 PM","title":"Title goes here","linkURL":"","external":true,"linkType":"story","mediaId":27,"mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"Screen Shot 2023-07-12 at 11.27.19 AM","chosen":false,"selected":false}],"linkURL":"#"} /-->
		  
		  <!-- wp:purdue/content-block {"width":"wide","addHeader":true,"header":"OPTional Section title goes here","bgColor":"has-gray-background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large","twoColumn":true,"divider":true,"verticalCenter":true} -->
		  <!-- wp:columns {"className":"page-layout-columns columns is-multiline"} -->
		  <div class="wp-block-columns page-layout-columns columns is-multiline"><!-- wp:column {"className":"column is-full-tablet page-layout-main"} -->
		  <div class="wp-block-column column is-full-tablet page-layout-main"><!-- wp:image {"id":1097,"sizeSlug":"large","linkDestination":"none"} -->
		  <figure class="wp-block-image size-large"><img src="https://placehold.co/712x400" alt="Purdue Pete in student crowd." class="wp-image-1097"/></figure>
		  <!-- /wp:image --></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column {"className":"column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"} -->
		  <div class="wp-block-column column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"><!-- wp:heading {"textAlign":"left","level":3} -->
		  <h3 class="wp-block-heading has-text-align-left">Optional heading 3 text goes here <strong>lorem ipsum lorem ipsum lorem ipsum</strong></h3>
		  <!-- /wp:heading -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:purdue/button-bar {"type":"simple","links":[{"linkText":"Optional CTA button","linkSubtext":"","linkURL":"#","external":false,"buttonColor":"gold","fullWidth":false,"chosen":false,"selected":false}]} /--></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/content-block -->
		  
		  <!-- wp:purdue/content-block {"width":"wide","addHeader":true,"header":"OPTional Section title goes here","bgColor":"has-black-background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large","twoColumn":true,"divider":true,"verticalCenter":true} -->
		  <!-- wp:columns {"className":"page-layout-columns columns is-multiline"} -->
		  <div class="wp-block-columns page-layout-columns columns is-multiline"><!-- wp:column {"className":"column is-full-tablet page-layout-main"} -->
		  <div class="wp-block-column column is-full-tablet page-layout-main"><!-- wp:heading {"textAlign":"left","level":3} -->
		  <h3 class="wp-block-heading has-text-align-left">Optional heading 3 text goes here <strong>lorem ipsum lorem ipsum lorem ipsum</strong></h3>
		  <!-- /wp:heading -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:purdue/button-bar {"type":"simple","links":[{"linkText":"Optional CTA button","linkSubtext":"","linkURL":"#","external":false,"buttonColor":"gold","fullWidth":false,"chosen":false,"selected":false}]} /--></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column {"className":"column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"} -->
		  <div class="wp-block-column column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"><!-- wp:image {"id":1097,"sizeSlug":"large","linkDestination":"none"} -->
		  <figure class="wp-block-image size-large"><img src="https://placehold.co/712x400" alt="Purdue Pete in student crowd." class="wp-image-1097"/></figure>
		  <!-- /wp:image --></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/content-block -->
		  
		  <!-- wp:purdue/intro-text {"layout":"two","header":"Header goes here","subheader":"Section Header goes here","subheaderType":"background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-none","links":[{"linkText":"","linkURL":"","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here Lorem ipsum dolor sit amet</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text -->
		  
		  <!-- wp:purdue/cta-grid {"cards":[{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/subtitle goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/subtitle goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/subtitle goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false}],"paddingTop":"has-padding-top-none"} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p></p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/cta-grid -->
		  
		  <!-- wp:purdue/cta-carousel {"background":"gray","header":"Section Header goes here","cards":[{"id":0,"type":"story","backgroundURL":"https://placehold.co/1344x532","backgroundAlt":"","mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","youtube":"","citeName":"","citeTitle":"","tag":"Tag goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","linkText1":"Button Text","linkURL1":"#","color1":"gold","external1":true,"linkText2":"Button Text","linkURL2":"#","color2":"gold","external2":true,"chosen":false,"selected":false},{"id":1,"type":"quote","backgroundURL":"https://placehold.co/1344x532","backgroundAlt":"","mediaType":"","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","youtube":"https://www.youtube.com/watch?v=jurK17rAA9A","citeName":"Name","citeTitle":"Title","tag":"","title":"","subtext":"Content goes here Lorem ipsum dolor sit amet","linkText1":"","linkURL1":"","color1":"gold","external1":true,"linkText2":"","linkURL2":"","color2":"gold","external2":true,"chosen":false,"selected":false},{"id":2,"type":"story","backgroundURL":"https://placehold.co/1344x532","backgroundAlt":"Purdue President Mung Chiang speaking at event.","mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"Dan-DeLaurentis_v2","youtube":"","citeName":"","citeTitle":"","tag":"Tag goes here","title":"Header goes here","subtext":"Content goes here Lorem ipsum dolor sit amet","linkText1":"Button Text","linkURL1":"#","color1":"gold","external1":true,"linkText2":"","linkURL2":"","color2":"gold","external2":true,"chosen":false,"selected":false}],"paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large"} /-->
		  
		  <!-- wp:purdue/cta-banner {"header":"Header goes here Lorem ipsum","subheader":"SUBHEADER GOES HERE","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}],"fieldId":"ab3cdf1b-d11f-4a9e-8db0-92709273d490"} /-->',
		)
	  );
	  register_block_pattern(
		'landing-storytelling',
		  array(
		  'title' => __( 'Storytelling Landing Page', 'purdue-home' ),
		  'description' => _x( 'A template to be used as a storytelling Landing Page.', 'Block pattern description', 'purdue-home' ),
		  'categories' => array('templates'),
		  'blockTypes' => array( 'core/paragraph', 'core/heading','purdue/diagonal-hero','purdue/cta-banner', 'purdue/featured-story','purdue/two-column-cta','purdue/cta-carousel','purdue/intro-text'),		 
		  'content'    => '<!-- wp:purdue/diagonal-hero {"header":"Page Header goes here Lorem ipsum","subheader":"Optional Section Header here","subtext":"Body copy goes here lorem ipsum","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","links":[{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"black","fullWidth":false,"external":false,"chosen":false}]} /-->

		  <!-- wp:purdue/intro-text {"background":"gold","header":"Header goes here Lorem ipsum","subheader":"OPtional Section Title here","subheaderType":"background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large","links":[{"linkText":"Optional CTA Button","linkURL":"#","external":false,"chosen":false,"selected":false,"buttonColor":"black"},{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"white","fullWidth":false,"external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here lorem ipsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text -->
		  
		  <!-- wp:purdue/two-column-cta {"cards":[{"mediaId":157,"mediaURL":"https://placehold.co/1400x943","mediaAlt":"","subtitle":"Optional subheader","title":"Header goes here","subtext":"Body copy goes here lorem ipsum","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":138,"mediaURL":"https://placehold.co/1400x943","mediaAlt":"","subtitle":"optional sunheader","title":"Header goes here","subtext":"Body copy goes here lorem ipsum\n\n","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false}]} /-->
		  
		  <!-- wp:purdue/cta-carousel {"background":"gray","header":"Section Header goes here","cards":[{"id":0,"type":"story","backgroundURL":"https://placehold.co/1344x532","backgroundAlt":"","mediaType":"image","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","youtube":"","citeName":"","citeTitle":"","tag":"Tag goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","linkText1":"Button Text","linkURL1":"#","color1":"gold","external1":true,"linkText2":"Button Text","linkURL2":"#","color2":"gold","external2":true,"chosen":false,"selected":false},{"id":1,"type":"quote","backgroundURL":"https://placehold.co/1344x532","backgroundAlt":"","mediaType":"","mediaURL":"https://placehold.co/712x400","mediaAlt":"","mediaTitle":"","youtube":"https://www.youtube.com/watch?v=jurK17rAA9A","citeName":"Name","citeTitle":"Title","tag":"","title":"","subtext":"Quote content goes here Lorem ipsum dolor sit amet","linkText1":"","linkURL1":"","color1":"gold","external1":true,"linkText2":"","linkURL2":"","color2":"gold","external2":true,"chosen":false,"selected":false}],"paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large"} /-->
		  
		  <!-- wp:purdue/featured-story {"subheader":"OPtional Section Header","header":"Header goes here Lorem ipsum","mediaURL":"https://placehold.co/743x418","mediaTitle":"Screen Shot 2023-07-12 at 11.27.19 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Insert Gravity form here</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/featured-story -->
		  
		  <!-- wp:purdue/cta-banner {"header":"Header goes here Lorem ipsum","subheader":"Optional section header goes here","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}],"fieldId":"0f0c7171-d4cc-47d8-a973-ecc8ecde1f05"} /-->',
		)
	  );
	  register_block_pattern(
		'landing-progmatic',
		  array(
		  'title' => __( 'Progmatic Landing Page', 'purdue-home' ),
		  'description' => _x( 'A template to be used as a storytelling Landing Page.', 'Block pattern description', 'purdue-home' ),
		  'categories' => array('templates'),
		  'blockTypes' => array( 'core/paragraph', 'core/heading','purdue/link-hero','purdue/cta-banner', 'purdue/featured-story','purdue/two-column-cta','purdue/cta-carousel','purdue/intro-text'),		 
		  'content'    => '<!-- wp:purdue/link-hero {"header":"Page Header goes here Lorem ipsum","subheader":"Section Header here","subtext":"Optional Body copy goes here lorem ipsum","mediaType":"image","mediaURL":"https://placehold.co/1920x960","mediaTitle":"Screen Shot 2023-07-12 at 11.49.12 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}],"ctalinks":[{"linkText":"","linkURL":"","buttonColor":"gold","fullWidth":false,"external":false}],"fieldId":"0bc72e46-4497-4814-8ed0-63fb3d418950"} /-->

		  <!-- wp:purdue/cta-grid {"cards":[{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/Subtitle Here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet\n","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/Subtitle here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet\n\n","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false}],"alignment":"center","paddingTop":"has-padding-top-none","columns":"6"} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p></p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/cta-grid -->
		  
		  <!-- wp:purdue/content-block {"width":"wide","addHeader":true,"header":"Section Header Here","bgColor":"has-black-background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large","twoColumn":true,"divider":true,"verticalCenter":true} -->
		  <!-- wp:columns {"className":"page-layout-columns columns is-multiline"} -->
		  <div class="wp-block-columns page-layout-columns columns is-multiline"><!-- wp:column {"className":"column is-full-tablet page-layout-main"} -->
		  <div class="wp-block-column column is-full-tablet page-layout-main"><!-- wp:heading -->
		  <h2 class="wp-block-heading">Heading 3 text goes here&nbsp;<strong>lorem ipsum lorem ipsum lorem ipsum</strong></h2>
		  <!-- /wp:heading -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br></p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:purdue/button-bar {"type":"simple","links":[{"linkText":"Optional CTA button","linkSubtext":"","linkURL":"#","external":false,"buttonColor":"gold","fullWidth":false,"chosen":false,"selected":false}]} /--></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column {"className":"column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"} -->
		  <div class="wp-block-column column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"><!-- wp:purdue/rtb-row {"background":"black","rtbs":[{"highlight":"96.4%","content":"STAT goes here","source":"","linkURL":"","external":true,"chosen":false,"selected":false},{"highlight":"90%","content":"STAT goes here","source":"","linkURL":"","external":true,"chosen":false,"selected":false},{"highlight":"97%","content":"STAT goes here","source":"","linkURL":"","external":true,"chosen":false,"selected":false}],"columns":"1"} /--></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/content-block -->
		  
		  <!-- wp:purdue/intro-text {"background":"gray","layout":"two","header":"Header goes here Lorem ipsum","subheader":"Section Title here","subheaderType":"background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large","links":[{"linkText":"","linkURL":"","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here lorem ipsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text -->
		  
		  <!-- wp:purdue/accordion {"title":"Accordion Title H3","background":"gray","isNarrow":true,"blockId":"d1f9737e-1db3-4d34-b1d6-ae1dea6dfc53"} -->
		  <!-- wp:columns -->
		  <div class="wp-block-columns"><!-- wp:column -->
		  <div class="wp-block-column"><!-- wp:image {"id":27,"sizeSlug":"full","linkDestination":"none"} -->
		  <figure class="wp-block-image size-full"><img src="https://placehold.co/712x400" alt="" class="wp-image-27"/></figure>
		  <!-- /wp:image --></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column -->
		  <div class="wp-block-column"><!-- wp:heading {"level":4} -->
		  <h4 class="wp-block-heading">Heading H4 Goes here</h4>
		  <!-- /wp:heading -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:list {"textColor":"black"} -->
		  <ul class="has-black-color has-text-color"><!-- wp:list-item -->
		  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elita. </li>
		  <!-- /wp:list-item -->
		  
		  <!-- wp:list-item -->
		  <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
		  <!-- /wp:list-item --></ul>
		  <!-- /wp:list -->
		  
		  <!-- wp:purdue/button-bar {"type":"simple","links":[{"linkText":"Button Text","linkSubtext":"","linkURL":"#","external":false,"buttonColor":"gold","fullWidth":false,"chosen":false,"selected":false}]} /--></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/accordion -->
		  
		  <!-- wp:purdue/accordion {"title":"Accordion Title H3","background":"gray","isNarrow":true,"blockId":"ddbb7271-4407-44d4-8328-b51b0580b9cb"} -->
		  <!-- wp:columns -->
		  <div class="wp-block-columns"><!-- wp:column -->
		  <div class="wp-block-column"><!-- wp:image {"id":27,"sizeSlug":"full","linkDestination":"none"} -->
		  <figure class="wp-block-image size-full"><img src="https://placehold.co/712x400" alt="" class="wp-image-27"/></figure>
		  <!-- /wp:image --></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column -->
		  <div class="wp-block-column"><!-- wp:heading {"level":4} -->
		  <h4 class="wp-block-heading">Heading H4 Goes here</h4>
		  <!-- /wp:heading -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:list {"textColor":"black"} -->
		  <ul class="has-black-color has-text-color"><!-- wp:list-item -->
		  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elita. </li>
		  <!-- /wp:list-item -->
		  
		  <!-- wp:list-item -->
		  <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
		  <!-- /wp:list-item --></ul>
		  <!-- /wp:list -->
		  
		  <!-- wp:purdue/button-bar {"type":"simple","links":[{"linkText":"Button Text","linkSubtext":"","linkURL":"#","external":false,"buttonColor":"gold","fullWidth":false,"chosen":false,"selected":false}]} /--></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/accordion -->
		  
		  <!-- wp:purdue/accordion {"title":"Accordion Title H3","background":"gray","paddingBottom":"has-padding-bottom-large","removeBottomBorder":false,"isNarrow":true,"blockId":"7af067bb-c89e-41f0-ae77-35f6e3562217"} -->
		  <!-- wp:columns -->
		  <div class="wp-block-columns"><!-- wp:column -->
		  <div class="wp-block-column"><!-- wp:image {"id":27,"sizeSlug":"full","linkDestination":"none"} -->
		  <figure class="wp-block-image size-full"><img src="https://placehold.co/712x400" alt="" class="wp-image-27"/></figure>
		  <!-- /wp:image --></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column -->
		  <div class="wp-block-column"><!-- wp:heading {"level":4} -->
		  <h4 class="wp-block-heading">Heading H4 Goes here</h4>
		  <!-- /wp:heading -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:list {"textColor":"black"} -->
		  <ul class="has-black-color has-text-color"><!-- wp:list-item -->
		  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elita. </li>
		  <!-- /wp:list-item -->
		  
		  <!-- wp:list-item -->
		  <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
		  <!-- /wp:list-item --></ul>
		  <!-- /wp:list -->
		  
		  <!-- wp:purdue/button-bar {"type":"simple","links":[{"linkText":"Button Text","linkSubtext":"","linkURL":"#","external":false,"buttonColor":"gold","fullWidth":false,"chosen":false,"selected":false}]} /--></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/accordion -->
		  
		  <!-- wp:purdue/cta-stack {"background":"black","header":"Section Header Here","cards":[{"mediaId":219,"mediaURL":"https://placehold.co/268x140","mediaAlt":"","title":"Header goes here","subtext":"Body copy goes here lorem ipsum","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":13,"mediaURL":"https://placehold.co/268x140","mediaAlt":"","title":"Header goes here","subtext":"Body copy goes here lorem ipsum","linkURL":"#","external":true,"chosen":false},{"mediaId":13,"mediaURL":"https://placehold.co/268x140","mediaAlt":"","title":"Header goes here","subtext":"Body copy goes here lorem ipsum","linkURL":"#","external":true,"chosen":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p></p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/cta-stack -->
		  
		  <!-- wp:purdue/featured-story {"subheader":"OPtional Subheader","header":"Header goes here Lorem ipsum","mediaURL":"https://placehold.co/743x418","mediaTitle":"Screen Shot 2023-07-12 at 11.27.19 AM","links":[{"linkText":"Button Text","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false}],"paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large"} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Insert Gravity form here</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/featured-story -->',
		)
	  );
	  register_block_pattern(
		'detail-page',
		  array(
		  'title' => __( 'Content Detail Page', 'purdue-home' ),
		  'description' => _x( 'A template to be used as a Content Detail Page.', 'Block pattern description', 'purdue-home' ),
		  'categories' => array('templates'),
		  'blockTypes' => array( 'core/paragraph', 'core/heading','purdue/link-hero','purdue/cta-banner', 'purdue/featured-story','purdue/two-column-cta','purdue/cta-carousel','purdue/intro-text'),		 
		  'content'    => '<!-- wp:purdue/teritary-header {"header":"Page Header goes here Lorem ipsum","background":"dark-gray","links":[{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"gold","fullWidth":false,"external":false,"chosen":false,"selected":false},{"linkText":"Optional CTA Button","linkURL":"#","buttonColor":"white","fullWidth":false,"external":false,"chosen":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Subtext goes here lorem ipsum</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/teritary-header -->
		  
		  <!-- wp:purdue/intro-text {"background":"gray","layout":"two","header":"Header goes here","subheader":"Section Header goes here","subheaderType":"background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-none","links":[{"linkText":"","linkURL":"","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here Lorem ipsum dolor sit amet</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text -->
		  
		  <!-- wp:purdue/rtb-row {"background":"gray","rtbs":[{"highlight":"90%","content":"Body copy goes here Lorem ipsum dolor sit amet","source":"","linkURL":"","external":true,"chosen":false,"selected":false},{"highlight":"96%","content":"Body copy goes here Lorem ipsum dolor sit amet","source":"","linkURL":"","external":true,"chosen":false,"selected":false},{"highlight":"97%","content":"Body copy goes here Lorem ipsum dolor sit amet","source":"","linkURL":"","external":true,"chosen":false,"selected":false}],"paddingBottom":"has-padding-bottom-large"} /-->
		  
		  <!-- wp:purdue/content-block {"paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large"} -->
		  <!-- wp:columns {"className":"page-layout-columns columns is-multiline"} -->
		  <div class="wp-block-columns page-layout-columns columns is-multiline"><!-- wp:column {"className":"column is-full-tablet page-layout-main"} -->
		  <div class="wp-block-column column is-full-tablet page-layout-main"><!-- wp:paragraph {"placeholder":"Start typing to add content, or remove this default paragraph block and then add new blocks."} -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:purdue/purdue-quote {"alignment":"center","citeName":"Name Goes Here","citeTitle":"Title goes here","paddingTop":"has-padding-top-small"} -->
		  <!-- wp:paragraph {"placeholder":"Quote content copy"} -->
		  <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/purdue-quote -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:image {"align":"left","id":27,"sizeSlug":"full","linkDestination":"none"} -->
		  <figure class="wp-block-image alignleft size-full"><img src="https://placehold.co/712x400" alt="" class="wp-image-27"/><figcaption class="wp-element-caption">Caption goes here</figcaption></figure>
		  <!-- /wp:image -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph -->
		  
		  <!-- wp:image {"align":"wide","id":27,"sizeSlug":"full","linkDestination":"none"} -->
		  <figure class="wp-block-image alignwide size-full"><img src="https://placehold.co/1312x740" alt="" class="wp-image-27"/><figcaption class="wp-element-caption">Caption goes here</figcaption></figure>
		  <!-- /wp:image -->
		  
		  <!-- wp:paragraph -->
		  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		  <!-- /wp:paragraph --></div>
		  <!-- /wp:column -->
		  
		  <!-- wp:column {"className":"column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"} -->
		  <div class="wp-block-column column is-one-quarter-desktop is-full-tablet is-full-mobile page-layout-sidebar"><!-- wp:paragraph {"placeholder":"Start typing to add content, or remove this default paragraph block and then add new blocks."} -->
		  <p></p>
		  <!-- /wp:paragraph --></div>
		  <!-- /wp:column --></div>
		  <!-- /wp:columns -->
		  <!-- /wp:purdue/content-block -->
		  
		  <!-- wp:purdue/intro-text {"layout":"two","header":"Header goes here","subheader":"Section Header goes here","subheaderType":"background","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-none","links":[{"linkText":"","linkURL":"","external":false,"chosen":false,"selected":false}]} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p>Body copy goes here Lorem ipsum dolor sit amet</p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/intro-text -->
		  
		  <!-- wp:purdue/cta-grid {"cards":[{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/subtitle goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/subtitle goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false},{"mediaId":27,"mediaURL":"https://placehold.co/712x400","mediaAlt":"","subtitle":"Tag/subtitle goes here","title":"Header goes here","subtext":"Body copy goes here Lorem ipsum dolor sit amet","date":"","linkText":"Button Text","linkURL":"#","external":true,"chosen":false,"selected":false}],"paddingTop":"has-padding-top-none"} -->
		  <!-- wp:paragraph {"placeholder":"Body content copy"} -->
		  <p></p>
		  <!-- /wp:paragraph -->
		  <!-- /wp:purdue/cta-grid -->
		  
		  <!-- wp:purdue/link-cards-new {"background":"gray","header":"Section Header here","cards":[{"id":0,"mediaURL":"https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg","mediaAlt":"","tag":"Tag here","title":"Story title here","subtext":"","date":"October 2, 2023","name":"","titleLine1":"","titleLine2":"","linkURL":"#","external":true,"chosen":false,"selected":false},{"id":1,"mediaURL":"https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg","mediaAlt":"","tag":"Tag Here","title":"Story title here","subtext":"","date":"October 2, 2023","name":"","titleLine1":"","titleLine2":"","linkURL":"#","external":true,"chosen":false,"selected":false},{"id":2,"mediaURL":"https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg","mediaAlt":"","tag":"Tag","title":"Story title here","subtext":"","date":"October 2, 2023","name":"","titleLine1":"","titleLine2":"","linkURL":"#","external":true,"chosen":false,"selected":false},{"id":3,"mediaURL":"https://marcom.purdue.edu/app/uploads/2021/09/cropped-cropped-DW540158-HDR.jpg","mediaAlt":"","tag":"Tag Here","title":"Story title here","subtext":"","date":"October 2, 2023","name":"","titleLine1":"","titleLine2":"","linkURL":"#","external":true,"chosen":false,"selected":false}],"linkURL":"#","paddingTop":"has-padding-top-large","paddingBottom":"has-padding-bottom-large","columns":"3"} /-->',
		)
	  );
	}
  
  }
  add_action( 'init', 'purdue_home_block_patterns' );