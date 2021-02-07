
export default function DateComparison(date) {
  if(date) {
    const today = new Date().toISOString().slice(0, 10)
    if(date.slice(0, 4) >= today.slice(0, 4)){
      // Year is greater than or equal to today's year
      if(date.slice(5, 7) >= today.slice(5, 7)){
        // Month is greater than or equal to today's Month
        if(date.slice(8, 10) >= today.slice(8, 10)){
          // Day is greater than or equal to today's Day
          return true
        }
      }
    }
    return false
  }
  return false
}