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
	elIframe.setAttribute('src','https://docs.google.com/a/bikfalvi.com/file/d/0ByT4N8kjyuzXZXcxZlNYTHcyMzg/preview');
	elParent.appendChild(elIframe);
}
