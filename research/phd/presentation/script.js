function CreateComment()
{
	var lnk = DecodeText("8oqT@3uf48oKu.xcW", "NvHqyU3oLM1GEsi6n7KOkQjCcapX9zVuAtIhDfFmYx8JBdPge0ZblS42WRTrw5");
	var elParent = document.getElementById('path');
	var elSpan = document.createElement('span');
	elSpan.setAttribute('id','comment');
	var elLink = document.createElement('a');
	elLink.setAttribute('href','mailto:'+lnk);
	elLink.innerHTML = "Send comment";
	elParent.appendChild(elSpan);
	elSpan.appendChild(elLink);
}

function CreateDocument()
{
	var elParent = document.getElementById('document');
	var elIframe = document.createElement('iframe');
	elIframe.setAttribute('id','embed');
	elIframe.setAttribute('src','https://docs.google.com/a/bikfalvi.com/viewer?authuser=1&srcid=0ByT4N8kjyuzXZXcxZlNYTHcyMzg&pid=explorer&a=v&chrome=false&embedded=true');
	elParent.appendChild(elIframe);
}
