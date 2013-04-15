/* Resizes the image at the source element to the specified width for the destination element */
function scaleToWidth(src, dest, width){
    var height = (src.height * width) / src.width;
    dest.src = src.src;
    dest.width = width;
    dest.height = height;
}