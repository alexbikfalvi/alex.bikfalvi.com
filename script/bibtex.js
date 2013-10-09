function bibtexwnd(file)
{
	var wnd = window.open("http://alex.bikfalvi.com/papers/bibtex/" + file, 'Bibtex', 'height=200,width=800');
	if(window.focus) {wnd.focus();}
}