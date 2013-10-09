var numCarouselItems = 5;

function carouselInitCallback(carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });
    $('#carousel-control a').bind('click', function() {
        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        return false;
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};

function carouselItemVisibleInCallback(carousel, listItem, listIndex, state) {
	$($('#carousel-control').children()[(listIndex - 1) % numCarouselItems]).css('background-position','-20px 0');
}

function carouselItemVisibleOutCallback(carousel, listItem, listIndex, state) {
	$($('#carousel-control').children()[(listIndex - 1) % numCarouselItems]).css('background-position','0 0');
}

jQuery(document).ready(function() {
    $('#carousel').jcarousel({
        auto: numCarouselItems,
        wrap: 'both',
        initCallback: carouselInitCallback,
		itemVisibleInCallback: carouselItemVisibleInCallback,
		itemVisibleOutCallback: carouselItemVisibleOutCallback
    });
});