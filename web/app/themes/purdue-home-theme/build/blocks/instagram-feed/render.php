<?php
    $id = $attributes['id'] != "" ?' id="' . $attributes['id'] . '"' : "";
?>

<div <?= $id; ?> class="purdue-home-instagram-feed <?= $attributes['className']; ?>">
    <?php if ($attributes['mediaURL'] != ""): ?>
    <div class="image" style="background-image:url(<?= $attributes['mediaURL']; ?>)"></div>
    <?php endif; ?>

    <?php
$blockclass = 'section';
if ($attributes['paddingTop']) {
    $blockclass .= ' ' . $attributes['paddingTop'];
}
if ($attributes['paddingBottom']) {
    $blockclass .= ' ' . $attributes['paddingBottom'];
}
?>

    <div class="<?= $blockclass; ?>">
        <div class="container">
            <div class="columns">
                <div class="column">

                    <?php if ($attributes['subheader'] != ""): ?>
                    <?php $subheaderclass = "tagged-header tagged-header--gold"; ?>
                    <div class="tagged-header-container">
                        <h2 class="<?= $subheaderclass; ?>"><?= $attributes["subheader"]; ?></h2>
                    </div>
                    <?php endif; ?>

                    <?php 
                $headerclass = 'purdue-home-instagram-feed__header'; 
                if ($attributes['subheader'] == ""):
                ?>
                    <h2 class="<?= $headerclass; ?>"><?= $attributes['header']; ?></h2>
                    <?php 
                elseif ($attributes['subheader'] != ""):
                ?>
                    <h3 class="<?= $headerclass; ?>"><?= $attributes['header']; ?></h3>
                    <?php endif; ?>

                    <?php if ($attributes['text'] != ""): ?>
                        <p class="purdue-home-instagram-feed__text"><?= $attributes['text']; ?></p>
                    <?php endif; ?>
                    
                    <?php if ($attributes['buttonLinks'] && sizeof($attributes['buttonLinks']) > 0 && $attributes['buttonLinks'][0]['linkURL']): ?>
                    <ul class="purdue-home-button-list">
                        <?php foreach ($attributes['buttonLinks'] as $key => $link): ?>
                        <?php
                        $target = $link["external"] ? 'target="_blank"' : 'target="_self"';
                        $buttonClass = "purdue-home-button";
                        if ($link["buttonColor"] == "black") {
                            $buttonClass .= " purdue-home-button--black";
                        }elseif($link["buttonColor"] == "white") {
                            $buttonClass .= " purdue-home-button--white";
                        }
                        $liClass = $link["fullWidth"] ? "purdue-home-button-wrap--full" : "";
                        ?>
                        <li class="<?= $liClass; ?>">
                            <a class="<?= $buttonClass; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                <?= trim($link["linkText"]); ?>
                            </a>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>
                    <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]["linkURL"] !== ""): ?>
                    <div class="purdue-home-instagram-feed__list-container mobile-hidden">
                        <ul class="purdue-home-instagram-feed__list">
                            <?php foreach ($attributes['links'] as $key => $link): ?>
                            <?php $target = $link["external"] ? 'target="_blank"' : 'target="_self"'; ?>
                            <li>
                                <a title="<?= $link["linkText"]; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                    <span class="screen-reader-text"><?= $link["linkText"]; ?></span>
                                    <?php if(strtolower($link["linkText"]) == "twitter"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                                    </svg>
                                    <?php }elseif(strtolower($link["linkText"]) == "facebook"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                                    </svg>
                                    <?php }elseif(strtolower($link["linkText"]) == "linkedin"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                    </svg>
                                    <?php }elseif(strtolower($link["linkText"]) == "instagram"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
                                    </svg>
                                    <?php }elseif(strtolower($link["linkText"]) == "youtube"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z" />
                                    </svg>
                                    <?php }elseif(strtolower($link["linkText"]) == "snapchat"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M384,32H64A64,64,0,0,0,0,96V416a64,64,0,0,0,64,64H384a64,64,0,0,0,64-64V96A64,64,0,0,0,384,32Zm-3.907,319.309-.083.1a32.364,32.364,0,0,1-8.717,6.823,90.26,90.26,0,0,1-20.586,8.2,12.694,12.694,0,0,0-3.852,1.76c-2.158,1.909-2.1,4.64-4.4,8.55a23.137,23.137,0,0,1-6.84,7.471c-6.707,4.632-14.244,4.923-22.23,5.23-7.214.274-15.39.581-24.729,3.669-3.761,1.245-7.753,3.694-12.377,6.533-11.265,6.9-26.68,16.353-52.3,16.353s-40.925-9.4-52.106-16.279c-4.657-2.888-8.675-5.362-12.543-6.64-9.339-3.08-17.516-3.4-24.729-3.67-7.986-.307-15.523-.6-22.231-5.229a23.085,23.085,0,0,1-6.01-6.11c-3.2-4.632-2.855-7.8-5.254-9.895a13.428,13.428,0,0,0-4.1-1.834,89.986,89.986,0,0,1-20.313-8.127,32.905,32.905,0,0,1-8.3-6.284c-6.583-6.757-8.276-14.776-5.686-21.824,3.436-9.338,11.571-12.111,19.4-16.262,14.776-8.027,26.348-18.055,34.433-29.884a68.236,68.236,0,0,0,5.985-10.567c.789-2.158.772-3.329.241-4.416a7.386,7.386,0,0,0-2.208-2.217c-2.532-1.676-5.113-3.353-6.882-4.5-3.27-2.141-5.868-3.818-7.529-4.98-6.267-4.383-10.65-9.04-13.4-14.245a28.4,28.4,0,0,1-1.369-23.584c4.134-10.924,14.469-17.706,26.978-17.706a37.141,37.141,0,0,1,7.845.83c.689.15,1.37.307,2.042.482-.108-7.43.058-15.357.722-23.119,2.358-27.261,11.912-41.589,21.874-52.994a86.836,86.836,0,0,1,22.28-17.931C188.254,100.383,205.312,96,224,96s35.828,4.383,50.944,13.016a87.169,87.169,0,0,1,22.239,17.9c9.961,11.406,19.516,25.709,21.874,52.995a231.194,231.194,0,0,1,.713,23.118c.673-.174,1.362-.332,2.051-.481a37.131,37.131,0,0,1,7.844-.83c12.5,0,22.82,6.782,26.971,17.706a28.37,28.37,0,0,1-1.4,23.559c-2.74,5.2-7.123,9.861-13.39,14.244-1.668,1.187-4.258,2.864-7.529,4.981-1.835,1.187-4.541,2.947-7.164,4.682a6.856,6.856,0,0,0-1.951,2.034c-.506,1.046-.539,2.191.166,4.208a69.015,69.015,0,0,0,6.085,10.792c8.268,12.1,20.188,22.313,35.454,30.407,1.486.772,2.98,1.5,4.441,2.258.722.332,1.569.763,2.491,1.3,4.9,2.723,9.2,6.01,11.455,12.153C387.821,336.915,386.269,344.7,380.093,351.309Zm-16.719-18.461c-50.313-24.314-58.332-61.918-58.689-64.749-.431-3.379-.921-6.035,2.806-9.472,3.594-3.328,19.541-13.19,23.965-16.278,7.33-5.114,10.534-10.219,8.16-16.495-1.66-4.316-5.686-5.976-9.961-5.976a18.5,18.5,0,0,0-3.993.448c-8.035,1.743-15.838,5.769-20.354,6.857a7.1,7.1,0,0,1-1.66.224c-2.408,0-3.279-1.071-3.088-3.968.564-8.783,1.759-25.925.373-41.937-1.884-22.032-8.99-32.948-17.432-42.6-4.051-4.624-23.135-24.654-59.536-24.654S168.53,134.359,164.479,139c-8.434,9.654-15.531,20.57-17.432,42.6-1.386,16.013-.141,33.147.373,41.937.166,2.756-.68,3.968-3.088,3.968a7.1,7.1,0,0,1-1.66-.224c-4.507-1.087-12.31-5.113-20.346-6.856a18.494,18.494,0,0,0-3.993-.449c-4.25,0-8.3,1.636-9.961,5.977-2.374,6.276.847,11.381,8.168,16.494,4.425,3.088,20.371,12.958,23.966,16.279,3.719,3.437,3.237,6.093,2.805,9.471-.356,2.79-8.384,40.394-58.689,64.749-2.946,1.428-7.96,4.45.88,9.331,13.88,7.628,23.111,6.807,30.3,11.43,6.093,3.927,2.5,12.394,6.923,15.449,5.454,3.76,21.583-.266,42.335,6.6,17.433,5.744,28.116,22.015,58.963,22.015s41.788-16.3,58.938-21.973c20.795-6.865,36.89-2.839,42.336-6.6,4.433-3.055.822-11.522,6.923-15.448,7.181-4.624,16.411-3.8,30.3-11.472C371.36,337.355,366.346,334.333,363.374,332.848Z" />
                                    </svg>
                                    <?php } ?>
                                </a>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>

                </div>
                <div class="column">

                    <?php if ($attributes['type'] == "plugin"): ?>
                    <?= $content; ?>
                    <?php elseif ($attributes['type'] == "manual"): ?>
                    <div class="purdue-home-instagram-feed__image-container mobile-hidden">
                        <?php foreach ($attributes['imgs'] as $key => $img): ?>
                        <?php if ($key < 6): ?>
                        <figure class="purdue-home-instagram-feed__image image is-1by1">
                            <img src="<?= $img["url"]; ?>" alt="<?= $img["alt"]; ?>" />
                        </figure>
                        <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                    <div class="glide purdue-home-instagram-feed__image-slider mobile-show">
                        <div class="glide__track" data-glide-el="track">
                            <div class="glide__slides">
                                <?php foreach ($attributes['imgs'] as $img): ?>
                                <?php if ($key < 6): ?>
                                <div class="glide__slide">
                                    <figure class="image is-1by1">
                                        <img src="<?= $img["url"]; ?>" alt="<?= $img["alt"]; ?>" />
                                    </figure>
                                </div>
                                <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="slider-controls slider-controls--dark">
                            <button class="glide__arrow arrow--left">prev</button>
                            <div class="glide__bullets" data-glide-el="controls[nav]">
                                <?php foreach ($attributes['imgs'] as $key => $card): ?>
                                <?php $num = $key + 1; ?>
                                <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key; ?>"
                                    aria-label="slide <?= $num; ?>"></button>
                                <?php endforeach; ?>
                            </div>
                            <button class="glide__arrow arrow--right">next</button>
                        </div>
                    </div>
                    <?php else: ?>
                    <?php
                    $accessToken = $attributes['token'];
                    $tokenUrl = 'https://graph.instagram.com/me/media?';
                    $postFields = array(
                        'fields' => 'id,caption,media_type,media_url,thumbnail_url,children{media_type,media_url,thumbnail_url},timestamp',
                        'access_token' => $accessToken
                    );

                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $tokenUrl . http_build_query($postFields));
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                    $feed = curl_exec($ch);

                    if (curl_errno($ch)) {
                        $error = curl_error($ch);
                        print_r($error);
                        exit();
                    }

                    curl_close($ch);
                    $items = json_decode($feed, true);
                    $attributes['items'] = $items["data"];

                    ?>
                    <div class="purdue-home-instagram-feed__image-container mobile-hidden">
                        <?php foreach ($attributes['items'] as $key => $item): ?>
                        <?php if ($key < 6): ?>
                        <?php
                                $src = $item["media_type"] == "VIDEO" ? $item["thumbnail_url"] : $item["media_url"];
                                ?>
                        <figure role="button" class="purdue-home-instagram-feed__image image is-1by1 modal-trigger"
                            data-target="feed-modal-<?= $key; ?>">
                            <img src="<?= $src; ?>" alt="<?= $item["caption"]; ?>" />
                        </figure>
                        <?php endif; ?>
                        <?php endforeach; ?>
                    </div>
                    <div class="glide purdue-home-instagram-feed__image-slider mobile-show">
                        <div class="glide__track" data-glide-el="track">
                            <div class="glide__slides">
                                <?php foreach ($attributes['items'] as $key => $item): ?>
                                <?php if ($key < 6): ?>
                                <?php
                                        $src = $item["media_type"] == "VIDEO" ? $item["thumbnail_url"] : $item["media_url"];
                                        ?>
                                <div class="glide__slide">
                                    <figure role="button" class="image is-1by1">
                                        <img src="<?= $src; ?>" alt="<?= $item["caption"]; ?>" />
                                        <div class="trigger-button-container">
                                            <button class="purdue-home-button--black modal-trigger"
                                                data-target="feed-modal-<?= $key; ?>">View More</button>
                                        </div>
                                    </figure>
                                </div>
                                <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                        </div>
                        <div class="slider-controls slider-controls--dark">
                            <button class="glide__arrow arrow--left">prev</button>
                            <div class="glide__bullets" data-glide-el="controls[nav]">
                                <?php foreach ($attributes['items'] as $key => $item): ?>
                                <?php if ($key < 6): ?>
                                <?php $num = $key + 1; ?>
                                <button class="glide__bullet slider__bullet" data-glide-dir="=<?= $key; ?>"
                                    aria-label="slide <?= $num; ?>"></button>
                                <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                            <button class="glide__arrow arrow--right">next</button>
                        </div>
                    </div>
                    <?php endif; ?>

                    <?php if ($attributes['links'] && sizeof($attributes['links']) > 0 && $attributes['links'][0]["linkURL"] !== ""): ?>
                    <div class="purdue-home-instagram-feed__list-container mobile-show">
                        <ul class="purdue-home-instagram-feed__list">
                            <?php foreach ($attributes['links'] as $key => $link): ?>
                            <?php $target = $link["external"] ? 'target="_blank"' : 'target="_self"'; ?>
                            <li>
                                <a title="<?= $link["linkText"]; ?>" href="<?= $link["linkURL"]; ?>" <?= $target; ?>>
                                    <span class="screen-reader-text"><?= $link["linkText"]; ?></span>
                                    <?php if(strtolower($link["linkText"]) == "twitter"){ ?>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                        <path
                                            d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z" />
                                    </svg> </a>
                                <?php }elseif(strtolower($link["linkText"]) == "facebook"){ ?>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                                </svg>
                                <?php }elseif(strtolower($link["linkText"]) == "linkedin"){ ?>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                </svg>
                                <?php }elseif(strtolower($link["linkText"]) == "instagram"){ ?>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
                                </svg>
                                <?php }elseif(strtolower($link["linkText"]) == "youtube"){ ?>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z" />
                                </svg>
                                <?php }elseif(strtolower($link["linkText"]) == "snapchat"){ ?>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M384,32H64A64,64,0,0,0,0,96V416a64,64,0,0,0,64,64H384a64,64,0,0,0,64-64V96A64,64,0,0,0,384,32Zm-3.907,319.309-.083.1a32.364,32.364,0,0,1-8.717,6.823,90.26,90.26,0,0,1-20.586,8.2,12.694,12.694,0,0,0-3.852,1.76c-2.158,1.909-2.1,4.64-4.4,8.55a23.137,23.137,0,0,1-6.84,7.471c-6.707,4.632-14.244,4.923-22.23,5.23-7.214.274-15.39.581-24.729,3.669-3.761,1.245-7.753,3.694-12.377,6.533-11.265,6.9-26.68,16.353-52.3,16.353s-40.925-9.4-52.106-16.279c-4.657-2.888-8.675-5.362-12.543-6.64-9.339-3.08-17.516-3.4-24.729-3.67-7.986-.307-15.523-.6-22.231-5.229a23.085,23.085,0,0,1-6.01-6.11c-3.2-4.632-2.855-7.8-5.254-9.895a13.428,13.428,0,0,0-4.1-1.834,89.986,89.986,0,0,1-20.313-8.127,32.905,32.905,0,0,1-8.3-6.284c-6.583-6.757-8.276-14.776-5.686-21.824,3.436-9.338,11.571-12.111,19.4-16.262,14.776-8.027,26.348-18.055,34.433-29.884a68.236,68.236,0,0,0,5.985-10.567c.789-2.158.772-3.329.241-4.416a7.386,7.386,0,0,0-2.208-2.217c-2.532-1.676-5.113-3.353-6.882-4.5-3.27-2.141-5.868-3.818-7.529-4.98-6.267-4.383-10.65-9.04-13.4-14.245a28.4,28.4,0,0,1-1.369-23.584c4.134-10.924,14.469-17.706,26.978-17.706a37.141,37.141,0,0,1,7.845.83c.689.15,1.37.307,2.042.482-.108-7.43.058-15.357.722-23.119,2.358-27.261,11.912-41.589,21.874-52.994a86.836,86.836,0,0,1,22.28-17.931C188.254,100.383,205.312,96,224,96s35.828,4.383,50.944,13.016a87.169,87.169,0,0,1,22.239,17.9c9.961,11.406,19.516,25.709,21.874,52.995a231.194,231.194,0,0,1,.713,23.118c.673-.174,1.362-.332,2.051-.481a37.131,37.131,0,0,1,7.844-.83c12.5,0,22.82,6.782,26.971,17.706a28.37,28.37,0,0,1-1.4,23.559c-2.74,5.2-7.123,9.861-13.39,14.244-1.668,1.187-4.258,2.864-7.529,4.981-1.835,1.187-4.541,2.947-7.164,4.682a6.856,6.856,0,0,0-1.951,2.034c-.506,1.046-.539,2.191.166,4.208a69.015,69.015,0,0,0,6.085,10.792c8.268,12.1,20.188,22.313,35.454,30.407,1.486.772,2.98,1.5,4.441,2.258.722.332,1.569.763,2.491,1.3,4.9,2.723,9.2,6.01,11.455,12.153C387.821,336.915,386.269,344.7,380.093,351.309Zm-16.719-18.461c-50.313-24.314-58.332-61.918-58.689-64.749-.431-3.379-.921-6.035,2.806-9.472,3.594-3.328,19.541-13.19,23.965-16.278,7.33-5.114,10.534-10.219,8.16-16.495-1.66-4.316-5.686-5.976-9.961-5.976a18.5,18.5,0,0,0-3.993.448c-8.035,1.743-15.838,5.769-20.354,6.857a7.1,7.1,0,0,1-1.66.224c-2.408,0-3.279-1.071-3.088-3.968.564-8.783,1.759-25.925.373-41.937-1.884-22.032-8.99-32.948-17.432-42.6-4.051-4.624-23.135-24.654-59.536-24.654S168.53,134.359,164.479,139c-8.434,9.654-15.531,20.57-17.432,42.6-1.386,16.013-.141,33.147.373,41.937.166,2.756-.68,3.968-3.088,3.968a7.1,7.1,0,0,1-1.66-.224c-4.507-1.087-12.31-5.113-20.346-6.856a18.494,18.494,0,0,0-3.993-.449c-4.25,0-8.3,1.636-9.961,5.977-2.374,6.276.847,11.381,8.168,16.494,4.425,3.088,20.371,12.958,23.966,16.279,3.719,3.437,3.237,6.093,2.805,9.471-.356,2.79-8.384,40.394-58.689,64.749-2.946,1.428-7.96,4.45.88,9.331,13.88,7.628,23.111,6.807,30.3,11.43,6.093,3.927,2.5,12.394,6.923,15.449,5.454,3.76,21.583-.266,42.335,6.6,17.433,5.744,28.116,22.015,58.963,22.015s41.788-16.3,58.938-21.973c20.795-6.865,36.89-2.839,42.336-6.6,4.433-3.055.822-11.522,6.923-15.448,7.181-4.624,16.411-3.8,30.3-11.472C371.36,337.355,366.346,334.333,363.374,332.848Z" />
                                </svg>
                                <?php } ?>
                                </a>
                            </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>

                </div>
            </div>
        </div>
    </div>
</div>
<?php if ($attributes['type'] == "facebook" && $attributes['items'] != ""): ?>
<?php foreach ($attributes['items'] as $key => $item): ?>
<?php if ($key < 6): ?>
<div id="feed-modal-<?= $key; ?>" class="instagram-feed-modal modal">
    <div class="modal-background"></div>
    <div class="modal-close" aria-label="close"></div>
    <div class="modal-content">
        <?php if ($item["media_type"] == "VIDEO"): ?>
        <div class="iframe-container-feed">
            <iframe class="embed-video" title="<?= $item["caption"]; ?>" src="" data-src="<?= $item["media_url"]; ?>"
                frameborder="0" allow="fullscreen"></iframe>
        </div>
        <?php elseif ($item["media_type"] == "IMAGE"): ?>
        <figure class="image">
            <img src="<?= $item["media_url"]; ?>" alt="<?= $item["caption"]; ?>" />
        </figure>
        <?php else: ?>
        <?php $children = $item["children"]["data"];?>
        <div class="flex-container">
            <?php foreach ($children as $key => $child): ?>
            <?php if ($child["media_type"] == "VIDEO"): ?>
            <div class="iframe-container-feed">
                <iframe class="embed-video" title="video player" src="" data-src="<?= $child["media_url"]; ?>"
                    frameborder="0" allow="fullscreen"></iframe>
            </div>
            <?php elseif ($child["media_type"] == "IMAGE"): ?>
            <figure class="image">
                <img src="<?= $child["media_url"]; ?>" alt="" />
            </figure>
            <?php endif; ?>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</div>
<?php endif; ?>
<?php endforeach; ?>
<?php endif; ?>