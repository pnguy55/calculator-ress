Test history:

Checked with plain numbers --> works

Checked with parentheses --> did not work
Added checks for parentheses with proper handling --> still needs to work with parentheses on parenthesis multipication

Added that functionality --> now works with parentheses

make sure you cannot use two operations back to back, other than adding parentheses

added checks for double operations to prevent that behavior, discovered double decimal bug
fixed by checking the latest number added (not last input)

discovered bug where closing parenthesis can be used without an opening

fixed the bug by adding a flag to check whether there is already an opening parentheses to match this one

discovered bug where an opening parentheses cannot be used --> will add a check for '('
opening parentheses feature added

discovered bug where opening negative numbers and negative numbers in the middle of an expression don't work --> added feature for negative numbers

discovered bug with (-1)-3 causes a parenthesis error and added a case to catch it