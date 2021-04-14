//Variables
const calendar = document.querySelector('#calendar')
const calendarDays = document.querySelector('#days')
const monthNode = document.querySelector('#month')
const yearNode = document.querySelector('#year')

const currentDate = new Date()
let year = currentDate.getFullYear()
let month = currentDate.getMonth()

//Functions
const pickDate = e => {
    if (e.target.id && (e.target.matches('p') || e.target.type == 'submit')){
        if (e.target.type == 'submit'){
            calendarDays.innerHTML = ''
            switch (e.target.id){
                case 'month-prev':
                    month--
                    if (month < 0){
                        month = 11
                        year--
                    }
                    break
                case 'month-next':
                    month++
                    if (month > 11){
                        month = 0
                        year++
                    }
                    break
                case 'year-prev':
                    year--
                    break
                case 'year-next':
                    year++
                    break
                default: return
            }
            return getCalendar(year, month)
        }
        if (document.querySelector('.selected')){
            document.querySelector('.selected').classList.remove('selected')
        }
        e.target.classList.add('selected')
        console.log(new Date(e.target.dataset.date))
        //get available times
    }
}

const getCalendar = (selectedYear, selectedMonth) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']
    const daysOfMonth = new Date(selectedYear, selectedMonth+1, 0).getDate()
    const initialDay = new Date(selectedYear, selectedMonth, 1).toDateString().split(' ')[0]
    const dayOffset = days.findIndex(item => item == initialDay)

    yearNode.innerHTML = selectedYear
    monthNode.innerHTML = months[selectedMonth]
    
    days.map(item => {
        const dayHead = document.createElement('p')
        dayHead.innerHTML = item
        dayHead.classList.add('calendar__head--days')
        calendarDays.appendChild(dayHead)
    })

    for (let i = 1-dayOffset; i <= daysOfMonth; i++){
        const dayNode = document.createElement('p')
        if (i > 0 ){
            let day = new Date(selectedYear, selectedMonth, i).toDateString()
            dayNode.id = i
            dayNode.setAttribute('data-date', day)
            dayNode.innerHTML = day.split(' ')[2]
            if (currentDate.toDateString() == day){
                dayNode.classList.add('today')
            }
        }
        calendarDays.appendChild(dayNode)
    }
}

//Listeners
calendar.addEventListener('click', e => pickDate(e))

getCalendar(year, month)