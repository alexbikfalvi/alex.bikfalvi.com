// Email obfuscator script 2.1 by Tim Williams, University of Arizona
// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/

function DecodeText(codeText, codeKey)
{
  	plainText="";
	for (i=0; i<codeText.length; i++)
	{
		if (codeKey.indexOf(codeText.charAt(i))==-1)
		{
			ltr = codeText.charAt(i);
			plainText += (ltr);
		}
		else
		{     
			ltr = (codeKey.indexOf(codeText.charAt(i))-codeText.length+codeKey.length) % codeKey.length;
			plainText += (codeKey.charAt(ltr));
		}
	}
	return plainText;
}
