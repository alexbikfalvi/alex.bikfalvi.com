var elementDownDayFirst;
var elementDownDaySecond;
var elementDownHourFirst;
var elementDownHourSecond;
var elementDownMinFirst;
var elementDownMinSecond;
var elementDownSecFirst;
var elementDownSecSecond;

var elementUpDayFirst;
var elementUpDaySecond;
var elementUpDayThird;
var elementUpDayFourth;
var elementUpHourFirst;
var elementUpHourSecond;
var elementUpMinFirst;
var elementUpMinSecond;
var elementUpSecFirst;
var elementUpSecSecond;

var currentShuffle = 0;

var currentDayFirst;
var currentDaySecond;
var currentDayThird;
var currentDayFourth;
var currentHourFirst;
var currentHourSecond;
var currentMinFirst;
var currentMinSecond;
var currentSecFirst;
var currentSecSecond;

var digitDayFirstCurrentPosition = 0;
var digitDayFirstFinalPosition = 0;
var digitDaySecondCurrentPosition = 0;
var digitDaySecondFinalPosition = 0;
var digitDayThirdCurrentPosition = 0;
var digitDayThirdFinalPosition = 0;
var digitDayFourthCurrentPosition = 0;
var digitDayFourthFinalPosition = 0;
var digitHourFirstCurrentPosition = 0;
var digitHourFirstFinalPosition = 0;
var digitHourSecondCurrentPosition = 0;
var digitHourSecondFinalPosition = 0;
var digitMinFirstCurrentPosition = 0;
var digitMinFirstFinalPosition = 0;
var digitMinSecondCurrentPosition = 0;
var digitMinSecondFinalPosition = 0;
var digitSecFirstCurrentPosition = 0;
var digitSecFirstFinalPosition = 0;
var digitSecSecondCurrentPosition = 0;
var digitSecSecondFinalPosition = 0;

var resetTimeout = 25;
var counterTimeout = 1000;
var shiftTimeout = 50;
var shuffleTimeout = 10000;

var timeDeltaDay = 0;
var timeDeltaHour = 0;
var timeDeltaMin = 0;
var timeDeltaSec = 0;

function TimeDelta()
{
	var time = (new Date()).getTime() - Date.UTC(2012,6,18,9,0,0,0);
	var timeDelta = time;
	timeDeltaDay = Math.floor(timeDelta / 86400000);
	time = time - 86400000 * timeDeltaDay;
	timeDeltaHour = Math.floor(time / 3600000);
	time = time - 3600000 * timeDeltaHour;
	timeDeltaMin = Math.floor(time / 60000);
	time = time - 60000 * timeDeltaMin;
	timeDeltaSec = Math.floor(time / 1000);
	return timeDelta;
}

function RunCounter()
{
	elementDownDayFirst = document.getElementById('counterdowndigitdayfirst');
	elementDownDaySecond = document.getElementById('counterdowndigitdaysecond');
	elementDownHourFirst = document.getElementById('counterdowndigithourfirst');
	elementDownHourSecond = document.getElementById('counterdowndigithoursecond');
	elementDownMinFirst = document.getElementById('counterdowndigitminutefirst');
	elementDownMinSecond = document.getElementById('counterdowndigitminutesecond');
	elementDownSecFirst = document.getElementById('counterdowndigitsecfirst');
	elementDownSecSecond = document.getElementById('counterdowndigitsecsecond');

	elementUpDayFirst = document.getElementById('counterupdigitdayfirst');
	elementUpDaySecond = document.getElementById('counterupdigitdaysecond');
	elementUpDayThird = document.getElementById('counterupdigitdaythird');
	elementUpDayFourth = document.getElementById('counterupdigitdayfourth');
	elementUpHourFirst = document.getElementById('counterupdigithourfirst');
	elementUpHourSecond = document.getElementById('counterupdigithoursecond');
	elementUpMinFirst = document.getElementById('counterupdigitminutefirst');
	elementUpMinSecond = document.getElementById('counterupdigitminutesecond');
	elementUpSecFirst = document.getElementById('counterupdigitsecfirst');
	elementUpSecSecond = document.getElementById('counterupdigitsecsecond');
	
	ShuffleCounterDown();
	ResetCounterDayDigitFirstTimeout();
}

function ShuffleCounterDown()
{
	currentShuffle = (currentShuffle + 1) % 60;
	
	elementDownDayFirst.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownDaySecond.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownHourFirst.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownHourSecond.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownMinFirst.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownMinSecond.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownSecFirst.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	elementDownSecSecond.style.backgroundPosition = String(-currentShuffle * 80) + "px 0";
	
	if(currentShuffle != 0) setTimeout('ShuffleCounterDown()', resetTimeout);
	else setTimeout('ShuffleCounterDown()', shuffleTimeout);
}

function ResetCounterDayDigitFirstTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpDayFirst.style.backgroundPosition = String(-digitDayFirstCurrentPosition * 40) + "px 0";
		currentDayFirst = Math.floor(timeDeltaDay / 1000) % 10;
		digitDayFirstFinalPosition = currentDayFirst * 6;
		if(digitDayFirstCurrentPosition != digitDayFirstFinalPosition)
		{
			digitDayFirstCurrentPosition = (digitDayFirstCurrentPosition + 1) % 60;
			setTimeout('ResetCounterDayDigitFirstTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterDayDigitSecondTimeout()', resetTimeout);
	}
}

function ResetCounterDayDigitSecondTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpDaySecond.style.backgroundPosition = String(-digitDaySecondCurrentPosition * 40) + "px 0";
		currentDaySecond = Math.floor(timeDeltaDay / 100) % 10;
		digitDaySecondFinalPosition = currentDaySecond * 6;
		if(digitDaySecondCurrentPosition != digitDaySecondFinalPosition)
		{
			digitDaySecondCurrentPosition = (digitDaySecondCurrentPosition + 1) % 60;
			setTimeout('ResetCounterDayDigitSecondTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterDayDigitThirdTimeout()', resetTimeout);
	}
}

function ResetCounterDayDigitThirdTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpDayThird.style.backgroundPosition = String(-digitDayThirdCurrentPosition * 40) + "px 0";
		currentDayThird = Math.floor((timeDeltaDay / 10) % 10);
		digitDayThirdFinalPosition = currentDayThird * 6;
		if(digitDayThirdCurrentPosition != digitDayThirdFinalPosition)
		{
			digitDayThirdCurrentPosition = (digitDayThirdCurrentPosition + 1) % 60;
			setTimeout('ResetCounterDayDigitThirdTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterDayDigitFourthTimeout()', resetTimeout);
	}
}

function ResetCounterDayDigitFourthTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpDayFourth.style.backgroundPosition = String(-digitDayFourthCurrentPosition * 40) + "px 0";
		currentDayFourth = Math.floor(timeDeltaDay % 10);
		digitDayFourthFinalPosition = currentDayFourth * 6;
		if(digitDayFourthCurrentPosition != digitDayFourthFinalPosition)
		{
			digitDayFourthCurrentPosition = (digitDayFourthCurrentPosition + 1) % 60;
			setTimeout('ResetCounterDayDigitFourthTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterHourDigitFirstTimeout()', resetTimeout);
	}
}

function ResetCounterHourDigitFirstTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpHourFirst.style.backgroundPosition = String(-digitHourFirstCurrentPosition * 40) + "px 0";
		currentHourFirst = Math.floor(timeDeltaHour / 10);
		digitHourFirstFinalPosition = currentHourFirst * 6;
		if(digitHourFirstCurrentPosition != digitHourFirstFinalPosition)
		{
			digitHourFirstCurrentPosition = (digitHourFirstCurrentPosition + 1) % 18;
			setTimeout('ResetCounterHourDigitFirstTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterHourDigitSecondTimeout()', resetTimeout);
	}
}

function ResetCounterHourDigitSecondTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpHourSecond.style.backgroundPosition = String(-digitHourSecondCurrentPosition * 40) + "px 0";
		currentHourSecond = Math.floor(timeDeltaHour % 10);
		digitHourSecondFinalPosition = currentHourSecond * 6;
		if(digitHourSecondCurrentPosition != digitHourSecondFinalPosition)
		{
			digitHourSecondCurrentPosition = (digitHourSecondCurrentPosition + 1) % 60;
			setTimeout('ResetCounterHourDigitSecondTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterMinDigitFirstTimeout()', resetTimeout);
	}
}

function ResetCounterMinDigitFirstTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpMinFirst.style.backgroundPosition = String(-digitMinFirstCurrentPosition * 40) + "px 0";
		currentMinFirst = Math.floor(timeDeltaMin / 10);
		digitMinFirstFinalPosition = currentMinFirst * 6;
		if(digitMinFirstCurrentPosition != digitMinFirstFinalPosition)
		{
			digitMinFirstCurrentPosition = (digitMinFirstCurrentPosition + 1) % 36;
			setTimeout('ResetCounterMinDigitFirstTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterMinDigitSecondTimeout()', resetTimeout);
	}
}

function ResetCounterMinDigitSecondTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpMinSecond.style.backgroundPosition = String(-digitMinSecondCurrentPosition * 40) + "px 0";
		currentMinSecond = Math.floor(timeDeltaMin % 10);
		digitMinSecondFinalPosition = currentMinSecond * 6;
		if(digitMinSecondCurrentPosition != digitMinSecondFinalPosition)
		{
			digitMinSecondCurrentPosition = (digitMinSecondCurrentPosition + 1) % 60;
			setTimeout('ResetCounterMinDigitSecondTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterSecDigitFirstTimeout()', resetTimeout);
	}
}

function ResetCounterSecDigitFirstTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpSecFirst.style.backgroundPosition = String(-digitSecFirstCurrentPosition * 40) + "px 0";
		currentSecFirst = Math.floor(timeDeltaSec / 10);
		digitSecFirstFinalPosition = ((6 - currentSecFirst) % 6) * 6;
		if(digitSecFirstCurrentPosition != digitSecFirstFinalPosition)
		{
			digitSecFirstCurrentPosition = (digitSecFirstCurrentPosition + 1) % 36;
			setTimeout('ResetCounterSecDigitFirstTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterSecDigitSecondTimeout()', resetTimeout);
	}
}

function ResetCounterSecDigitSecondTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementUpSecSecond.style.backgroundPosition = String(-digitSecSecondCurrentPosition * 40) + "px 0";
		currentSecSecond = Math.floor(timeDeltaSec % 10);
		digitSecSecondFinalPosition = currentSecSecond * 6;
		if(digitSecSecondCurrentPosition != digitSecSecondFinalPosition)
		{
			digitSecSecondCurrentPosition = (digitSecSecondCurrentPosition + 1) % 60;
			setTimeout('ResetCounterSecDigitSecondTimeout()', resetTimeout);
		}
		else setTimeout('CounterTimeout()', resetTimeout);
	}
}

function CounterTimeout()
{
	if(TimeDelta() >= 0)
	{
		var newDayFirst = Math.floor((timeDeltaDay / 1000) % 10);
		var newDaySecond = Math.floor((timeDeltaDay / 100) % 10);
		var newDayThird = Math.floor((timeDeltaDay / 10) % 10);
		var newDayFourth = Math.floor(timeDeltaDay % 10);
		var newHourFirst = Math.floor(timeDeltaHour / 10);
		var newHourSecond = Math.floor(timeDeltaHour % 10);
		var newMinFirst = Math.floor(timeDeltaMin / 10);
		var newMinSecond = Math.floor(timeDeltaMin % 10);
		var newSecFirst = Math.floor(timeDeltaSec / 10);
		var newSecSecond = Math.floor(timeDeltaSec % 10);
		
		if(newDayFirst != currentDayFirst) ShiftDayFirst(newDayFirst);
		if(newDaySecond != currentDaySecond) ShiftDaySecond(newDaySecond);
		if(newDayThird != currentDayThird) ShiftDayThird(newDayThird);
		if(newDayFourth != currentDayFourth) ShiftDayFourth(newDayFourth);
		if(newHourFirst != currentHourFirst) ShiftHourFirst(newHourFirst);
		if(newHourSecond != currentHourSecond) ShiftHourSecond(newHourSecond);
		if(newMinFirst != currentMinFirst) ShiftMinFirst(newMinFirst);
		if(newMinSecond != currentMinSecond) ShiftMinSecond(newMinSecond);
		if(newSecFirst != currentSecFirst) ShiftSecFirst(newSecFirst);
		if(newSecSecond != currentSecSecond) ShiftSecSecond(newSecSecond);
		
		setTimeout('CounterTimeout()', counterTimeout);
	}
}

function ShiftDayFirst(newDayFirst)
{
	digitDayFirstCurrentPosition = currentDayFirst * 6;
	digitDayFirstFinalPosition = newDayFirst * 6;
	currentDayFirst = newDayFirst;
	setTimeout('TimeoutDayFirst()', 0);
}

function ShiftDaySecond(newDaySecond)
{
	digitDaySecondCurrentPosition = currentDaySecond * 6;
	digitDaySecondFinalPosition = newDaySecond * 6;
	currentDaySecond = newDaySecond;
	setTimeout('TimeoutDaySecond()', 0);
}

function ShiftDayThird(newDayThird)
{
	digitDayThirdCurrentPosition = currentDayThird * 6;
	digitDayThirdFinalPosition = newDayThird * 6;
	currentDayThird = newDayThird;
	setTimeout('TimeoutDayThird()', 0);
}

function ShiftDayFourth(newDayFourth)
{
	digitDayFourthCurrentPosition = currentDayFourth * 6;
	digitDayFourthFinalPosition = newDayFourth * 6;
	currentDayFourth = newDayFourth;
	setTimeout('TimeoutDayFourth()', 0);
}

function ShiftHourFirst(newHourFirst)
{
	digitHourFirstCurrentPosition = currentHourFirst * 6;
	digitHourFirstFinalPosition = newHourFirst * 6;
	currentHourFirst = newHourFirst;
	setTimeout('TimeoutHourFirst()', 0);
}

function ShiftHourSecond(newHourSecond)
{
	digitHourSecondCurrentPosition = currentHourSecond * 6;
	digitHourSecondFinalPosition = newHourSecond * 6;
	currentHourSecond = newHourSecond;
	setTimeout('TimeoutHourSecond()', 0);
}

function ShiftMinFirst(newMinFirst)
{
	digitMinFirstCurrentPosition = currentMinFirst * 6;
	digitMinFirstFinalPosition = newMinFirst * 6;
	currentMinFirst = newMinFirst;
	setTimeout('TimeoutMinFirst()', 0);
}

function ShiftMinSecond(newMinSecond)
{
	digitMinSecondCurrentPosition = currentMinSecond * 6;
	digitMinSecondFinalPosition = newMinSecond * 6;
	currentMinSecond = newMinSecond;
	setTimeout('TimeoutMinSecond()', 0);
}

function ShiftSecFirst(newSecFirst)
{
	digitSecFirstCurrentPosition = currentSecFirst * 6;
	digitSecFirstFinalPosition = newSecFirst * 6;
	currentSecFirst = newSecFirst;
	setTimeout('TimeoutSecFirst()', 0);
}

function ShiftSecSecond(newSecSecond)
{
	digitSecSecondCurrentPosition = currentSecSecond * 6;
	digitSecSecondFinalPosition = newSecSecond * 6;
	currentSecSecond = newSecSecond;
	setTimeout('TimeoutSecSecond()', 0);
}

function TimeoutDayFirst()
{
	elementUpDayFirst.style.backgroundPosition = String(-digitDayFirstCurrentPosition * 40) + "px 0";
	if(digitDayFirstCurrentPosition != digitDayFirstFinalPosition)
	{
		digitDayFirstCurrentPosition = (digitDayFirstCurrentPosition + 1) % 60;
		setTimeout('TimeoutDayFirst()', shiftTimeout);
	}
}

function TimeoutDaySecond()
{
	elementUpDaySecond.style.backgroundPosition = String(-digitDaySecondCurrentPosition * 40) + "px 0";
	if(digitDaySecondCurrentPosition != digitDaySecondFinalPosition)
	{
		digitDaySecondCurrentPosition = (digitDaySecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutDaySecond()', shiftTimeout);
	}
}

function TimeoutDayThird()
{
	elementUpDayThird.style.backgroundPosition = String(-digitDayThirdCurrentPosition * 40) + "px 0";
	if(digitDayThirdCurrentPosition != digitDayThirdFinalPosition)
	{
		digitDayThirdCurrentPosition = (digitDayThirdCurrentPosition + 1) % 60;
		setTimeout('TimeoutDayThird()', shiftTimeout);
	}
}

function TimeoutDayFourth()
{
	elementUpDayFourth.style.backgroundPosition = String(-digitDayFourthCurrentPosition * 40) + "px 0";
	if(digitDayFourthCurrentPosition != digitDayFourthFinalPosition)
	{
		digitDayFourthCurrentPosition = (digitDayFourthCurrentPosition + 1) % 60;
		setTimeout('TimeoutDayFourth()', shiftTimeout);
	}
}

function TimeoutHourFirst()
{
	elementUpHourFirst.style.backgroundPosition = String(-digitHourFirstCurrentPosition * 40) + "px 0";
	if(digitHourFirstCurrentPosition != digitHourFirstFinalPosition)
	{
		digitHourFirstCurrentPosition = (digitHourFirstCurrentPosition + 1) % 18;
		setTimeout('TimeoutHourFirst()', shiftTimeout);
	}
}

function TimeoutHourSecond()
{
	elementUpHourSecond.style.backgroundPosition = String(-digitHourSecondCurrentPosition * 40) + "px 0";
	if(digitHourSecondCurrentPosition != digitHourSecondFinalPosition)
	{
		digitHourSecondCurrentPosition = (digitHourSecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutHourSecond()', shiftTimeout);
	}
}

function TimeoutMinFirst()
{
	elementUpMinFirst.style.backgroundPosition = String(-digitMinFirstCurrentPosition * 40) + "px 0";
	if(digitMinFirstCurrentPosition != digitMinFirstFinalPosition)
	{
		digitMinFirstCurrentPosition = (digitMinFirstCurrentPosition + 1) % 36;
		setTimeout('TimeoutMinFirst()', shiftTimeout);
	}
}

function TimeoutMinSecond()
{
	elementUpMinSecond.style.backgroundPosition = String(-digitMinSecondCurrentPosition * 40) + "px 0";
	if(digitMinSecondCurrentPosition != digitMinSecondFinalPosition)
	{
		digitMinSecondCurrentPosition = (digitMinSecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutMinSecond()', shiftTimeout);
	}
}

function TimeoutSecFirst()
{
	elementUpSecFirst.style.backgroundPosition = String(-digitSecFirstCurrentPosition * 40) + "px 0";
	if(digitSecFirstCurrentPosition != digitSecFirstFinalPosition)
	{
		digitSecFirstCurrentPosition = (digitSecFirstCurrentPosition + 1) % 36;
		setTimeout('TimeoutSecFirst()', shiftTimeout);
	}
}

function TimeoutSecSecond()
{
	elementUpSecSecond.style.backgroundPosition = String(-digitSecSecondCurrentPosition * 40) + "px 0";
	if(digitSecSecondCurrentPosition != digitSecSecondFinalPosition)
	{
		digitSecSecondCurrentPosition = (digitSecSecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutSecSecond()', shiftTimeout);
	}
}

