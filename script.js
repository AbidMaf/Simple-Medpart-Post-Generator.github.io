function selectedFile() { 
    var uploadedFile = $('#uploadImage').prop('files')[0];
    var fileReader = new FileReader();
    fileReader.onload = function() {
        var data = fileReader.result;
        $('.poster').css('background-image', 'url(' + data + ')');
        $('.poster').attr('src', data);
    };
    fileReader.readAsDataURL(uploadedFile);
}

function changeHeading1() {
    var heading1 = $('#heading1').val() + '&nbsp;';
    $('h1').text(heading1.replace(/&nbsp;/g, " "));
}

function changeHeading2() {
    var heading2 = $('#heading2').val() + '&nbsp;';
    $('h3').text(heading2.replace(/&nbsp;/g, " "));
}

function changePosterY() {
    var PosterY = $('#posterVertical').val();
    $('#posterAttachment').css('background-position', $('#posterHorizontal').val() + '% ' + PosterY + '%');
}

function changePosterX() {
    var PosterX = $('#posterHorizontal').val();
    $('#posterAttachment').css('background-position', PosterX + '% ' + $('#posterVertical').val() + '%');
}

function posterScaleSize() {
    var PosterScaleVal = $('#posterScale').val();
    $('#posterAttachment').css('background-size', PosterScaleVal + '%');
}

function changeSlide() {
    var radio = document.getElementsByName('slide');
    var slide = document.querySelector('input[name="slide"]:checked').value;
    for (let i = 0; i < radio.length; i++) {
        if(radio[i].checked == true) {
            // alert(radio[i].value);
            $('#slide' + radio[i].value).removeClass('hide');
            for (let j = 0; j < radio.length; j++) {
                if(radio[j].checked == false) {
                    $('#slide' + radio[j].value).addClass('hide');
                }
            }
        }
        $('#slide' + i+1).addClass('hide');
    }
}

function resizeCanvas(canvas) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = 1080;
    tmpCanvas.height = 1080;

    var ctx = tmpCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, 1080, 1080, 0, 0, 1080, 1080);
    return tmpCanvas;
}

function downloadSlides() {
    alert('Slide download berdasarkan slide yg ditampilkan')

    var slide = document.querySelector('input[name="slide"]:checked').value;
    var preview = document.querySelector('.preview');
    preview.setAttribute('style', 'width: 1080px !important;');
    var element = document.querySelector('#slide' + slide);
    var getCanvas;
    var tempSize = $('.preview').width();
    var scaleSize = 1080 / tempSize;
    // $('#slide1').css('width', 1080);

    var options = {
        quality: 1,
        Style: {
            'width': '1080px !important',
            'aspect-ratio': '1',
            'max-width': '1080px',
            'transform': 'scale(' + scaleSize + ')',
            'transform-origin': 'top left'
        }
    };

    domtoimage.toPng(element, options).then(function(dataUrl) {
        // var img = new Image();
        // img.src = dataUrl;
        // document.getElementById('img-out').appendChild(img);
        window.saveAs(dataUrl, 'Slide'+ slide +'.png');
    })

    // HTML2Canvas Method
    // html2canvas(element, {
    //     scale: 2,
    //     dpi: 300
    // }).then(function(canvas) {
    //     var anchorTag = document.createElement('a');
    //     document.body.appendChild(anchorTag);
    //     document.getElementById('img-out').appendChild(canvas);
    //     anchorTag.download = 'slide1.png';
    //     anchorTag.href = canvas.toDataURL('image/png');
    //     anchorTag.target = '_blank';
    //     anchorTag.click();
    // });
    // var imageData = getCanvas.toDataURL('image/png');

    // $('#slide1').css('width', tempSize);
}
