$(document).ready(function() {
    // Define arrays of image URLs
    var imagesSets = [
        ["images/show-images/1.jpg", "images/show-images/2.jpg", "images/show-images/3.jpg"],
        ["images/show-images/4.jpg", "images/show-images/5.jpg", "images/show-images/6.jpg"],
        ["images/show-images/7.jpg", "images/show-images/8.png", "images/show-images/9.png"],
        ["images/show-images/10.jpg", "images/show-images/11.jpg", "images/show-images/12.jpg"],
        ["images/show-images/13.jpg", "images/show-images/14.png", "images/show-images/19.png"],
        ["images/show-images/20.png", "images/show-images/17.png", "images/show-images/18.png"]
    ];

    // Function to change the image with a fade effect
    function changeImage(imageElement, index) {
        // Get a random index for the next image within the set
        var randomImageIndex = Math.floor(Math.random() * imagesSets[index].length);

        // Get the next image URL
        var nextImage = imagesSets[index][randomImageIndex];

        // Fade out the current image
        $(imageElement).fadeOut(500, function() {
            // Change the source of the image
            $(this).attr('src', nextImage);
            // Fade in the new image
            $(this).fadeIn(1500);
        });
    }

    function createCloseButton() {
        return $('<div class="close-button">X</div>').css({
            'position': 'absolute',
            'top': '10px',
            'right': '10px',
            'padding': '5px 10px',
            'background': 'black',
            'color': 'white',
            'cursor': 'pointer',
            'border-radius': '50%',
            'font-family': 'Arial, sans-serif',
            'font-weight': 'bold',
            'line-height': '1',
            'z-index': '20000' // Above the image
        });
    }

    function enlargeImage(img) {
        img.css({
            'width': '80%',
            'position': 'fixed',
            'top': '50%',
            'left': '50%',
            'transform': 'translate(-50%, -50%)',
            'z-index': '9999'
        });
        var closeButton = createCloseButton();
        closeButton.appendTo('body').on('click', function () {
            shrinkImage(img);
        });
        $('<div class="overlay"></div>').css({
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'background-color': 'rgba(0, 0, 0, 0.5)',
            'z-index': '9998'
        }).appendTo('body');
    }

    function shrinkImage(img) {
        img.css({
            'width': '',
            'position': '',
            'top': '',
            'left': '',
            'transform': '',
            'z-index': ''
        });
        $('.overlay').remove();
        $('.close-button').remove(); // Remove the close button
    }

    $('.image.fit').each(function (index) {
        changeImage($(this).find('img'), index);

        $(this).find('img').on('click', function (event) {
            event.preventDefault();
            var img = $(this);

            if (!img.hasClass('enlarged')) {
                img.addClass('enlarged');
                enlargeImage(img);
            }
        });
    });

    // Use event delegation for dynamically created overlay
    $(document).on('click', '.overlay', function () {
        var img = $('.image.fit img.enlarged');
        if (img.length) {
            img.removeClass('enlarged');
            shrinkImage(img);
        }
    });
});
