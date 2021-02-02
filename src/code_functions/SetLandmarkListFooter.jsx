export function SetLandmarkListFooter(offset, pageLength, count) {
  let footerMessage = document.getElementById("footer_message");
  let prevBtn = document.getElementById("prev_button");
  let nextBtn = document.getElementById("next_button");

  if(footerMessage && prevBtn && nextBtn) {
    // Offset changing also updates the list page nav buttons and footer text
    offset === 0 ? 
    prevBtn.style.visibility = "hidden":
    prevBtn.style.visibility = "visible"

    if (count < offset + pageLength) {
      nextBtn.style.visibility = "hidden";
      footerMessage.innerText = `Now showing ${1+offset}-${count} of ${count}`;
    } else {
      nextBtn.style.visibility = "visible";
      footerMessage.innerText = `Now showing ${1+offset}-${pageLength + offset} of ${count}`;
    }
  }
}