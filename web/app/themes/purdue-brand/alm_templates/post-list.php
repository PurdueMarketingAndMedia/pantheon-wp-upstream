<div class="column is-one-third-desktop is-half-tablet is-full-mobile">
					<div class="card">
						<?php if ( has_post_thumbnail() ) { ?>
							<div class="card-image">
								<figure class="image is-16by9">
									<?php	the_post_thumbnail();?>
								</figure>
							</div> 
						<?php }?>
						<div class="card-content">
							<div class="media">
								
								<div class="media-content">
									<p class="subtitle">
										<?php the_time('F j, Y');?>
									</p>
									<p class="title is-4">
										<?php the_title();?>
									</p>
								</div>
							</div>
							<div class="content">
								<?php the_excerpt();?>
							</div>
							<div class="read-more-button">
								<a href="<?php the_permalink();?>">Read More</a>
							</div>
                    </div>
				</div>
</div>