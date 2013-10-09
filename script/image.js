var wnd;
function imagewnd(image,width,height)
{
	wnd = window.open(image, 'Bibtex', 'height='+height+',width='+width);
	if(window.focus) {wnd.focus();}
}