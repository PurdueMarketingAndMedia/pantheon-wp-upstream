<?php

if ( !defined('ABSPATH') ) {
	header( 'HTTP/1.0 403 Forbidden' );
	die;
}

class PurdueSegment {

	public function __construct() {

		add_action( 'wp_head', array( __CLASS__, 'add_segment_code' ), 5 );
		// add_action( 'wp_footer', array( __CLASS__, 'add_segment_form_identify' ), 5 );
        // add_action( 'wp_footer', array( __CLASS__, 'add_segment_body_code' ));

	}

	public static function add_segment_code() {
		$segment = 'hFnjjDlw7Ww7VAWxQavhY4wUFAs3uxaF';
		$segment_prod = 'ELTWNTShdcGAnRQ6bzbp2GoHInijLSpx';
		if (isset($_ENV['PANTHEON_ENVIRONMENT']) && php_sapi_name() != 'cli') {
			if ($_ENV['PANTHEON_ENVIRONMENT'] === 'live') {
			  $segment = $segment_prod;
			} 
		} elseif ($_SERVER['HTTP_HOST'] === 'www.purdue.edu') {
			$segment = $segment_prod;
		}


		?>
		<!-- Segment.com Analytics -->
		<script>
		!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";
		analytics.load("<?php echo $segment; ?>");
		analytics.page();
		}}();
		</script>
		<!-- END Segment.com Analytics -->

		<?php
	}

	public static function add_segment_form_identify() {
		?>
		
		<script>
			var firstName = document.querySelector('.name_first > input').value || null
			var lastName = document.querySelector('.name_last > input').value || null
			var email = document.querySelector('.name_last > input').value || null


			var submit = document.querySelector('.gform_button[type="submit"]') || null

			if(submit !== null) {
				submit.addEventListener('click', () => {
					analytics.identify({
						first_name: firstName,
						last_name: lastName,
						email: email
					})
				})
			}

		</script>

		<?php
	}
	public static function add_segment_body_code() {
		?>

		<script>
			var timer;
			var timerStart;
			var segment_purdue = {
				formSubmitted: function(event){

					event.preventDefault();
					timer=Math.floor((Date.now()-timerStart)/1000);
					let form=event.target;
					let formName=form.querySelector('.gform_heading')?form.querySelector('.gform_heading>.gform_title').innerHTML:document.querySelector('h1').innerHTML;
					let messages=Array.prototype.slice.call(form.querySelectorAll('.validation_message'),0);

					if(messages&&messages.length>0){
						let messageText='';
						messages.forEach((message)=>{
							messageText=messageText+message.innerHTML+"\n";
						})
						let properties = {
							form_name : formName,
							time_on_page:timer,
							validation_message:messageText
						}
						analytics.track('Form Submit Failed', properties);
					}else{

						let traits = {
							first_name : '',
							last_name : '',
							phone : '',
							email : '',
						};

						// Select the first firstname, lastname, email, phone, state, postcode, and county as user's traits
						traits.first_name = form.querySelector('.name_first > input')?form.querySelector('.name_first > input').value : null
						traits.last_name = form.querySelector('.name_last > input')?form.querySelector('.name_last > input').value : null
						traits.email = form.querySelector('.ginput_container_email > input')?form.querySelector('.ginput_container_email > input').value : null
						traits.phone = form.querySelector('.ginput_container_phone > input').value?form.querySelector('.ginput_container_phone > input').value : null
						traits.state=form.querySelector('.address_state>input')?form.querySelector('.address_state>input').value : null
						traits.postcode=form.querySelector('.address_zip>input')?form.querySelector('.address_zip>input').value : null
						traits.country=form.querySelector('.address_country>select')?form.querySelector('.address_country>select').value : null

						analytics.identify(traits); 
						let properties = {
							form_name : formName,
							time_on_page:timer
						}
						analytics.track('Form Submitted', properties);
					}   
					setTimeout(function(){ 
						form.submit()
					}, 300);                 
				},
				init: function() {
					let session_search=sessionStorage.getItem('total_searches');
					!session_search?sessionStorage.setItem('total_searches', '0'):'';   
					//G-forms
					const gFormWrappers = Array.prototype.slice.call(document.querySelectorAll('.gform_wrapper'), 0);
					if(gFormWrappers&&gFormWrappers.length>0){
						gFormWrappers.forEach((wrapper)=>{
							let form=wrapper.querySelector('form')
							form.addEventListener("submit",this.formSubmitted);
						})
					}
					// this code will result in a Segment track event firing when the link is clicked
					const links = Array.prototype.slice.call(document.getElementsByTagName('a'), 0);
					const windowHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
					const h1=document.querySelector('h1');
					const h1Text=h1?h1.innerHTML:'';
					

					if(links&&links.length>0){
						links.forEach((link)=>{
							let href=link.href;
							let ext_name=href.split('?')[0].split('/').pop()
							let ext=ext_name.indexOf(".")!==-1?ext_name.substring(ext_name.lastIndexOf('.')+1):null
							let scrollDepth=link.getBoundingClientRect().top>=windowHeight?link.getBoundingClientRect().top-windowHeight:0;
							link.addEventListener('click',function(){
								event.preventDefault();
								timer=Math.floor((Date.now()-timerStart)/1000);

								if(ext&&(ext==="pdf"||ext==="doc"||ext==="docx"||ext==="xls"||ext==="xlsx"||ext==="ppt"||ext==="pptx"||ext==="txt"||ext==="jpg"||ext==="png"||ext==="gif"||ext==="jpeg"||ext==="zip"||ext==="zip")){
									analytics.track('Download Link Clicked', {
										click_text: link.innerText,
										destination_href:href,
										file_type: ext,
										time_on_page:timer,
										scroll_depth:scrollDepth
									});
								}
								if(href.substring(0,href.indexOf(":")+1)==="mailto:"){
									analytics.track('Email Link Clicked', {
										destination_href:href,
										time_on_page:timer
									});
								}else if(href.substring(0,href.indexOf(":")+1)==="tel:"){
									analytics.track('Phone Link Clicked', {
										destination_href:href,
										time_on_page:timer
									});
								}
								if(link.host&&link.host!==""&&link.host!==window.location.host){
									if(link.host.indexOf("www.facebook.com")!==-1||
										link.host.indexOf("www.twitter.com")!==-1||
										link.host.indexOf("www.instagram.com")!==-1||
										link.host.indexOf("www.snapchat.com")!==-1||
										link.host.indexOf("www.linkedin.com")!==-1||
										link.host.indexOf("www.youtube.com")!==-1||
										link.host.indexOf("www.pinterest.com")!==-1||
										link.host.indexOf("www.amazon.com")!==-1){
											analytics.track('social Link Clicked', {
											destination_href:href,
											time_on_page:timer
										});
									}else{
										analytics.track('External Link Clicked', {
											click_text: link.innerText,
											destination_href:href,
											time_on_page:timer,
											scroll_depth:scrollDepth
										});
									}

								}
								if(link.classList.contains('pu-cta-banner-gray__desc')||
									link.classList.contains('pu-cta-banner-image__button')||
									link.classList.contains('pu-cta-banner-gold__button')||
									link.classList.contains('pu-cta-banner-black__button')||
									link.classList.contains('cta-card__button')||
									link.classList.contains('cta-card-small')||
									link.classList.contains('pu-cta-hero__button')||
									link.classList.contains('pu-feature-story__button')||
									link.classList.contains('pu-proofpoint__button')||
									link.classList.contains('cta-button')||
									link.parentElement.parentElement.parentElement.classList.contains('navbar-end')){
									analytics.track('CTA Link Clicked', {
										click_text: link.innerText,
										destination_href:link.href,
										time_on_page:timer,
										scroll_depth:scrollDepth
									});
								}
								//Search Results Page
								if(h1Text.substring(0,h1Text.indexOf(' '))==="Search"&&h1.nextElementSibling.classList.contains('search-box')){
									if(link.parentElement.classList.contains("search-post-title")||link.classList.contains("gs-title")){
										let pageN=1;
										if(document.querySelector('.gsc-cursor-current-page')){
											pageN=document.querySelector('.gsc-cursor-current-page').innerHTML;
										}else if(document.querySelector('.pagination>.nav-links>.current')){
											pageN=document.querySelector('.pagination>.nav-links>.current').innerHTML;
										}
										function getParameterByName(name, url = window.location.href) {
											name = name.replace(/[\[\]]/g, '\\$&');
											var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
												results = regex.exec(url);
											if (!results) return null;
											if (!results[2]) return '';
											return decodeURIComponent(results[2].replace(/\+/g, ' '));
										}
										analytics.track('Search Results Page', {
											click_text: link.innerText,
											query: getParameterByName('s')||getParameterByName('q'),
											page_number:pageN,
											time_on_page:timer,
											scroll_depth:scrollDepth
										});
									}
								}
								setTimeout(function(){ 
									window.open(link.href, link.target&&link.target==="_blank"?"_blank":"_self")
								}, 300);
							})
						})
					}
					//404 page 
					if(h1Text==="Page Not Found"){
						analytics.track('404 Page Viewed', {
							page_href: window.location.href,
							referrer: document.referrer
						});
					}
					//Search performed
					const searchForms=Array.prototype.slice.call(document.getElementsByName('searchform'),0);
					searchForms.forEach((form)=>{
						form.addEventListener('submit',function(event){
							event.preventDefault();
							timer=Math.floor((Date.now()-timerStart)/1000);
							let phrase=event.target.querySelector('.search-field').value || null;
							let searches = sessionStorage.getItem('total_searches');
							searches = parseInt(searches)+1;
							sessionStorage.setItem('total_searches', searches);
							analytics.track("Site Search Performed", {
								query:phrase,
								total_searches:searches,
								time_on_page:timer
							})
							setTimeout(function(){ 
								form.submit()
							}, 300);  
						})
					})

					//Embeded videos
					var youtubePlayers=[];
					var vimeoPlayers=[];
					
					window.onload=function(){

						timer=0;
						timerStart=Date.now();                      
						const youtube=Array.prototype.slice.call(document.querySelectorAll('.wp-block-embed-youtube iframe'),0);
						const vimeo=Array.prototype.slice.call(document.querySelectorAll('.wp-block-embed-vimeo iframe'),0);
						const dmotion=Array.prototype.slice.call(document.querySelectorAll('.wp-block-embed-dailymotion iframe'),0);

						//YouTube videos
						if(youtube&&youtube.length>0){
							let tag = document.createElement('script');
							tag.src = "https://www.youtube.com/iframe_api";
							let firstScriptTag = document.getElementsByTagName('script')[0];
							firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
							let checkYT = setInterval(function () {
								if(YT&&YT.loaded){
									youtube.forEach((iframe)=>{                                           
										if(iframe.src.indexOf("&origin=")!==-1){
												iframe.src=iframe.src.substring(0,iframe.src.indexOf("&origin"))
										}
										if(iframe.src.indexOf("&enablejsapi=1")===-1){
												iframe.src=iframe.src+"&enablejsapi=1"
										}
										
										if(!iframe.id){
											iframe.id="youtube"+iframe.src.split( 'embed/' )[1].split( '?' )[0]
										}                                 
										var player=new YT.Player( iframe.id, {
											videoId:iframe.src.split( 'embed/' )[1].split( '?' )[0],
											events: { 
												'onReady': onPlayerReady,
												'onStateChange': onPlayerStateChange 
											}
										}); 
										youtubePlayers.push({
											"id" :iframe.id,
											"player" : player
										});                             
									})
									
								   clearInterval(checkYT);
								}
							}, 100);
							checkYT;
						}
						//Vimeo videos
						if(vimeo&&vimeo.length>0){
							let tag = document.createElement('script');
							tag.src = "https://player.vimeo.com/api/player.js";
							let firstScriptTag = document.getElementsByTagName('script')[0];
							firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
							let checkVimeo = setInterval(function () {
								if(Vimeo){
									vimeo.forEach((iframe)=>{ 
										var url=iframe.src
										var percent=0;
										var player = new Vimeo.Player(iframe);
								  
										async function viemoPlay(){
											try {
												const [title, duration] = await Promise.all([
													player.getVideoTitle(),
													player.getDuration(),
												]);
												player.on('play', function(event) {
													trackPlay("Vimeo",title,Math.round(event.seconds),duration,url);
												});
												player.on('pause', function(event) {
													if(Math.round(event.seconds)!==duration){
														trackPause("Vimeo",title,Math.round(event.seconds),duration,url);
													}
												   
												});
												player.on('ended', function(event) {
													trackComplete("Vimeo",title,Math.round(event.seconds),duration,url);
												});
											  
												var lastTime=0;
												var currentTime=0;
												var seekStart = null;
												player.on('seeking', function(event) {
													if(seekStart === null){
														seekStart=lastTime
														trackSeek("Vimeo",title,Math.round(event.seconds),duration,url);   
													}

												});
												player.on('seeked', function(event) {
													seekStart = null;
												});
												player.on("timeupdate", function(event){
								
													let percent_new=Math.round(event.seconds/duration*100);
													if(percent_new!==percent){
														percent=percent_new;
														if(percent===25||percent===50||percent===75||percent===90){
															percentage=percent+'%'
															trackProgress("Vimeo",title,Math.round(event.seconds),duration,url,percentage)
														}
													}
													lastTime = currentTime;
													currentTime = event.seconds;
												})
											  
											} catch (err) {
												console.log(err);
											}
										}
										viemoPlay()

									})                                          
									clearInterval(checkVimeo);
								}
							}, 100);
							checkVimeo;
				   
						}
						//Dailymotion videos
						if(dmotion&&dmotion.length>0){
							let tag = document.createElement('script');
							tag.src = "https://api.dmcdn.net/all.js";
							let firstScriptTag = document.getElementsByTagName('script')[0];
							firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
							let checkDM = setInterval(function () {
								if(DM){
									dmotion.forEach((iframe)=>{ 
										const url=iframe.src;
										const videoID=url.substring(url.lastIndexOf('/')+1)
										var duration;
										var title;
										var percent=0;
										DM.api(
											`/video/${videoID}`,
											{ fields: ['duration', 'title' ]},
											result => {
												// result is an Object with all the fields wanted
												duration=result.duration;
												title=result.title;
											}
										)
										var player =DM.player(iframe,{
											video: videoID
										});

										player.addEventListener('play', function(event){
											trackPlay("Daily Motion",title,Math.round(event.target.currentTime),duration,url);
											
										})
										player.addEventListener('pause', function(event){
											trackPause("Daily Motion",title,Math.round(event.target.currentTime),duration,url);
											
										})
										player.addEventListener('seeking', function(){
											trackSeek("Daily Motion",title,Math.round(event.target.currentTime),duration,url);
										})
										player.addEventListener('end', function(){
											trackComplete("Daily Motion",title,Math.round(event.target.currentTime),duration,url);
										})
										player.addEventListener('timeupdate', function(){
											let percent_new=Math.round(event.target.currentTime/duration*100);
											if(percent_new!==percent){
												percent=percent_new;
												if(percent===25||percent===50||percent===75||percent===90){
													percentage=percent+'%'
													trackProgress("Daily Motion",title,Math.round(event.target.currentTime),duration,url,percentage)
												}
											}
										}) 

									})                                          
									clearInterval(checkDM);
								}
							}, 100);
							checkDM;
				   
						}
					}
				   
					window.onPlayerReady=function(event) {

						var lastTime = -1;
						var lastState=-1;
						var interval = 1000;
						var percent = 0;
						const duration=event.target.getDuration();
						const title=event.target.getVideoData().title;
						const url=event.target.getVideoUrl();

						var checkPlayerTime = function () {
							if (lastTime !== -1) {
						  
								if(event.target.getPlayerState() === 1||(event.target.getPlayerState() === 2&&lastState===2)) {
									if (Math.abs(event.target.getCurrentTime() - lastTime - 1) > 1) {
										trackSeek("YouTube",title,Math.round(event.target.getCurrentTime()),Math.round(duration),url)
									}
								}

								let percent_new=Math.round(event.target.getCurrentTime()/duration*100);
								if(percent_new!==percent){
									percent=percent_new;
									if(percent===25||percent===50||percent===75||percent===90){
										percentage=percent+'%'
										trackProgress("YouTube",title,Math.round(event.target.getCurrentTime()),Math.round(duration),url,percentage)
									}
								}
								
							}
							lastTime = event.target.getCurrentTime();
							lastState = event.target.getPlayerState();
							setTimeout(checkPlayerTime, interval); /// repeat function call in 1 second
						}
						setTimeout(checkPlayerTime, interval); /// initial call delayed 
					}  

					function onPlayerStateChange(event) {
						console.log('state change')
						const duration=event.target.getDuration();
						const title=event.target.getVideoData().title;
						const url=event.target.getVideoUrl();
						switch(event.data) {
							case 0:
								trackComplete("YouTube",title,Math.round(event.target.getCurrentTime()),Math.round(duration),url);
								break;
							case 1:
								trackPlay("YouTube",title,Math.round(event.target.getCurrentTime()),Math.round(duration),url);
								break;
							case 2:
								if(Math.round(event.target.getCurrentTime())!==duration){
									trackPause("YouTube",title,Math.round(event.target.getCurrentTime()),Math.round(duration),url);
								}
								break;

						}
					}

					function trackPlay(player,title,position,length,url){
						analytics.track('Video Playback Started', {
							video_player: player,
							video_title:title,
							video_position:position,
							video_total_length:length,
							video_url:url
						});
					}
					function trackPause(player,title,position,length,url){
						analytics.track('Video Playback Paused', {
							video_player: player,
							video_title:title,
							video_position:position,
							video_total_length:length,
							video_url:url
						});
					}
					function trackSeek(player,title,position,length,url){
						analytics.track('Video Playback Seek', {
							video_player: player,
							video_title:title,
							video_position:position,
							video_total_length:length,
							video_url:url
						});
					}
					function trackComplete(player,title,position,length,url){
						analytics.track('Video Playback Completed', {
							video_player: player,
							video_title:title,
							video_position:position,
							video_total_length:length,
							video_url:url,
							video_progress:'100%'
						});
					}
					function trackProgress(player,title,position,length,url,progress){
						analytics.track('Video Playback Progress', {
							video_player: player,
							video_title:title,
							video_position:position,
							video_total_length:length,
							video_url:url,
							video_progress:progress
						});
					}
					//Uploaded videos
					const videos=Array.prototype.slice.call(document.querySelectorAll('.wp-block-video video'));
					if(videos&&videos.length>0){
						videos.forEach((video)=>{
							var duration;
							var percent=0;
							const title=video.nextElementSibling.innerHTML?video.nextElementSibling.innerHTML:'';
							const url=video.src;
							const ext=url.substring(url.lastIndexOf("/")+1).split('.').pop();
							video.addEventListener("play", (event)=>{
								duration=video.duration;
								trackPlay(ext,title,Math.round(event.target.currentTime),Math.round(duration),url);
							})
							video.addEventListener("pause", (event)=>{
								if(video.currentTime!==duration&&video.currentTime!==0){
									trackPause(ext,title,Math.round(event.target.currentTime),Math.round(duration),url);
								}
							})
							var lastTime=0;
							var currentTime=0;
							var seekStart = null;
							video.addEventListener("seeking", (event)=>{  
								
								if(seekStart === null){
									seekStart=lastTime
									trackSeek(ext,title,Math.round(seekStart),Math.round(duration),url);   
								}
		
							})
							video.addEventListener("seeked", (event)=>{  
								seekStart = null;
							})
							video.addEventListener("ended", (event)=>{
								trackComplete(ext,title,Math.round(event.target.currentTime),Math.round(duration),url);
							})
							video.addEventListener("timeupdate", (event)=>{
								
								let percent_new=Math.round(video.currentTime/duration*100);
								if(percent_new!==percent){
									percent=percent_new;
									if(percent===25||percent===50||percent===75||percent===90){
										percentage=percent+'%'
										trackProgress(ext,title,Math.round(event.target.currentTime),Math.round(duration),url,percentage)
									}
								}
								lastTime = currentTime;
								currentTime = event.target.currentTime;
							})
						})
					}
				}
			}

			analytics.ready(
				segment_purdue.init()
			);

		</script>           
		<?php
	}
}

new PurdueSegment;