// Defining function to get unique values from an array
export function GetUnique(array, pageLength){
  var uniqueArray = [];
  
  // Loop through array values
  for(let i=0; i < array.length; i++){
      if(uniqueArray.findIndex(item => item.name === array[i].name) === -1) {
          uniqueArray.push(array[i]);
      }
  }

  let repeatWarning = document.getElementById("repeat_warning");
  if(repeatWarning){
    repeatWarning.style.visibility = "hidden";
    if(uniqueArray.length < pageLength) repeatWarning.style.visibility = "visible";
  }
  return uniqueArray;
}