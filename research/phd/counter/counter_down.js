var elementDayFirst;
var elementDaySecond;
var elementHourFirst;
var elementHourSecond;
var elementMinFirst;
var elementMinSecond;
var elementSecFirst;
var elementSecSecond;

var currentDayFirst;
var currentDaySecond;
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

var timeDeltaDay = 0;
var timeDeltaHour = 0;
var timeDeltaMin = 0;
var timeDeltaSec = 0;

function TimeDelta()
{
	var time = Date.UTC(2012,6,18,9,0,0,0) - (new Date()).getTime();
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
	elementDayFirst = document.getElementById('counterdigitdayfirst');
	elementDaySecond = document.getElementById('counterdigitdaysecond');
	elementHourFirst = document.getElementById('counterdigithourfirst');
	elementHourSecond = document.getElementById('counterdigithoursecond');
	elementMinFirst = document.getElementById('counterdigitminutefirst');
	elementMinSecond = document.getElementById('counterdigitminutesecond');
	elementSecFirst = document.getElementById('counterdigitsecfirst');
	elementSecSecond = document.getElementById('counterdigitsecsecond');
	
	if(TimeDelta() >= 0)
	{
		setTimeout('ResetCounterDayDigitFirstTimeout()', resetTimeout);
	}
}

function ResetCounterDayDigitFirstTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementDayFirst.style.backgroundPosition = String(-digitDayFirstCurrentPosition * 80) + "px 0";
		currentDayFirst = Math.floor(timeDeltaDay / 10);
		digitDayFirstFinalPosition = ((10 - currentDayFirst) % 10) * 6;
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
		elementDaySecond.style.backgroundPosition = String(-digitDaySecondCurrentPosition * 80) + "px 0";
		currentDaySecond = Math.floor(timeDeltaDay % 10);
		digitDaySecondFinalPosition = ((10 - currentDaySecond) % 10) * 6;
		if(digitDaySecondCurrentPosition != digitDaySecondFinalPosition)
		{
			digitDaySecondCurrentPosition = (digitDaySecondCurrentPosition + 1) % 60;
			setTimeout('ResetCounterDayDigitSecondTimeout()', resetTimeout);
		}
		else setTimeout('ResetCounterHourDigitFirstTimeout()', resetTimeout);
	}
}

function ResetCounterHourDigitFirstTimeout()
{
	if(TimeDelta() >= 0)
	{
		elementHourFirst.style.backgroundPosition = String(-digitHourFirstCurrentPosition * 80) + "px 0";
		currentHourFirst = Math.floor(timeDeltaHour / 10);
		digitHourFirstFinalPosition = ((3 - currentHourFirst) % 3) * 6;
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
		elementHourSecond.style.backgroundPosition = String(-digitHourSecondCurrentPosition * 80) + "px 0";
		currentHourSecond = Math.floor(timeDeltaHour % 10);
		digitHourSecondFinalPosition = ((10 - currentHourSecond) % 10) * 6;
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
		elementMinFirst.style.backgroundPosition = String(-digitMinFirstCurrentPosition * 80) + "px 0";
		currentMinFirst = Math.floor(timeDeltaMin / 10);
		digitMinFirstFinalPosition = ((6 - currentMinFirst) % 6) * 6;
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
		elementMinSecond.style.backgroundPosition = String(-digitMinSecondCurrentPosition * 80) + "px 0";
		currentMinSecond = Math.floor(timeDeltaMin % 10);
		digitMinSecondFinalPosition = ((10 - currentMinSecond) % 10) * 6;
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
		elementSecFirst.style.backgroundPosition = String(-digitSecFirstCurrentPosition * 80) + "px 0";
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
		elementSecSecond.style.backgroundPosition = String(-digitSecSecondCurrentPosition * 80) + "px 0";
		currentSecSecond = Math.floor(timeDeltaSec % 10);
		digitSecSecondFinalPosition = ((10 - currentSecSecond) % 10) * 6;
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
		var newDayFirst = Math.floor(timeDeltaDay / 10);
		var newDaySecond = Math.floor(timeDeltaDay % 10);
		var newHourFirst = Math.floor(timeDeltaHour / 10);
		var newHourSecond = Math.floor(timeDeltaHour % 10);
		var newMinFirst = Math.floor(timeDeltaMin / 10);
		var newMinSecond = Math.floor(timeDeltaMin % 10);
		var newSecFirst = Math.floor(timeDeltaSec / 10);
		var newSecSecond = Math.floor(timeDeltaSec % 10);
		
		if(newDayFirst != currentDayFirst) ShiftDayFirst(newDayFirst);
		if(newDaySecond != currentDaySecond) ShiftDaySecond(newDaySecond);
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
	digitDayFirstCurrentPosition = ((10 - currentDayFirst) % 10) * 6;
	digitDayFirstFinalPosition = ((10 - newDayFirst) % 10) * 6;
	currentDayFirst = newDayFirst;
	setTimeout('TimeoutDayFirst()', 0);
}

function ShiftDaySecond(newDaySecond)
{
	digitDaySecondCurrentPosition = ((10 - currentDaySecond) % 10) * 6;
	digitDaySecondFinalPosition = ((10 - newDaySecond) % 10) * 6;
	currentDaySecond = newDaySecond;
	setTimeout('TimeoutDaySecond()', 0);
}

function ShiftHourFirst(newHourFirst)
{
	digitHourFirstCurrentPosition = ((3 - currentHourFirst) % 3) * 6;
	digitHourFirstFinalPosition = ((3 - newHourFirst) % 3) * 6;
	currentHourFirst = newHourFirst;
	setTimeout('TimeoutHourFirst()', 0);
}

function ShiftHourSecond(newHourSecond)
{
	digitHourSecondCurrentPosition = ((10 - currentHourSecond) % 10) * 6;
	digitHourSecondFinalPosition = ((10 - newHourSecond) % 10) * 6;
	currentHourSecond = newHourSecond;
	setTimeout('TimeoutHourSecond()', 0);
}

function ShiftMinFirst(newMinFirst)
{
	digitMinFirstCurrentPosition = ((6 - currentMinFirst) % 6) * 6;
	digitMinFirstFinalPosition = ((6 - newMinFirst) % 6) * 6;
	currentMinFirst = newMinFirst;
	setTimeout('TimeoutMinFirst()', 0);
}

function ShiftMinSecond(newMinSecond)
{
	digitMinSecondCurrentPosition = ((10 - currentMinSecond) % 10) * 6;
	digitMinSecondFinalPosition = ((10 - newMinSecond) % 10) * 6;
	currentMinSecond = newMinSecond;
	setTimeout('TimeoutMinSecond()', 0);
}

function ShiftSecFirst(newSecFirst)
{
	digitSecFirstCurrentPosition = ((6 - currentSecFirst) % 6) * 6;
	digitSecFirstFinalPosition = ((6 - newSecFirst) % 6) * 6;
	currentSecFirst = newSecFirst;
	setTimeout('TimeoutSecFirst()', 0);
}

function ShiftSecSecond(newSecSecond)
{
	digitSecSecondCurrentPosition = ((10 - currentSecSecond) % 10) * 6;
	digitSecSecondFinalPosition = ((10 - newSecSecond) % 10) * 6;
	currentSecSecond = newSecSecond;
	setTimeout('TimeoutSecSecond()', 0);
}

function TimeoutDayFirst()
{
	elementDayFirst.style.backgroundPosition = String(-digitDayFirstCurrentPosition * 80) + "px 0";
	if(digitDayFirstCurrentPosition != digitDayFirstFinalPosition)
	{
		digitDayFirstCurrentPosition = (digitDayFirstCurrentPosition + 1) % 60;
		setTimeout('TimeoutDayFirst()', shiftTimeout);
	}
}

function TimeoutDaySecond()
{
	elementDaySecond.style.backgroundPosition = String(-digitDaySecondCurrentPosition * 80) + "px 0";
	if(digitDaySecondCurrentPosition != digitDaySecondFinalPosition)
	{
		digitDaySecondCurrentPosition = (digitDaySecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutDaySecond()', shiftTimeout);
	}
}

function TimeoutHourFirst()
{
	elementHourFirst.style.backgroundPosition = String(-digitHourFirstCurrentPosition * 80) + "px 0";
	if(digitHourFirstCurrentPosition != digitHourFirstFinalPosition)
	{
		digitHourFirstCurrentPosition = (digitHourFirstCurrentPosition + 1) % 18;
		setTimeout('TimeoutHourFirst()', shiftTimeout);
	}
}

function TimeoutHourSecond()
{
	elementHourSecond.style.backgroundPosition = String(-digitHourSecondCurrentPosition * 80) + "px 0";
	if(digitHourSecondCurrentPosition != digitHourSecondFinalPosition)
	{
		digitHourSecondCurrentPosition = (digitHourSecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutHourSecond()', shiftTimeout);
	}
}

function TimeoutMinFirst()
{
	elementMinFirst.style.backgroundPosition = String(-digitMinFirstCurrentPosition * 80) + "px 0";
	if(digitMinFirstCurrentPosition != digitMinFirstFinalPosition)
	{
		digitMinFirstCurrentPosition = (digitMinFirstCurrentPosition + 1) % 36;
		setTimeout('TimeoutMinFirst()', shiftTimeout);
	}
}

function TimeoutMinSecond()
{
	elementMinSecond.style.backgroundPosition = String(-digitMinSecondCurrentPosition * 80) + "px 0";
	if(digitMinSecondCurrentPosition != digitMinSecondFinalPosition)
	{
		digitMinSecondCurrentPosition = (digitMinSecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutMinSecond()', shiftTimeout);
	}
}

function TimeoutSecFirst()
{
	elementSecFirst.style.backgroundPosition = String(-digitSecFirstCurrentPosition * 80) + "px 0";
	if(digitSecFirstCurrentPosition != digitSecFirstFinalPosition)
	{
		digitSecFirstCurrentPosition = (digitSecFirstCurrentPosition + 1) % 36;
		setTimeout('TimeoutSecFirst()', shiftTimeout);
	}
}

function TimeoutSecSecond()
{
	elementSecSecond.style.backgroundPosition = String(-digitSecSecondCurrentPosition * 80) + "px 0";
	if(digitSecSecondCurrentPosition != digitSecSecondFinalPosition)
	{
		digitSecSecondCurrentPosition = (digitSecSecondCurrentPosition + 1) % 60;
		setTimeout('TimeoutSecSecond()', shiftTimeout);
	}
}
