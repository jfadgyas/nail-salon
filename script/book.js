//Variables
const calendar = document.querySelector('#calendar')
const calendarDays = document.querySelector('#days')
const monthNode = document.querySelector('#month')
const yearNode = document.querySelector('#year')
const timeSelector = document.querySelector('#time')
const treatSelector = document.querySelector('#treat')
const confirmBtn = document.querySelector('#confirm')

const currentDate = new Date()
let year = currentDate.getFullYear()
let month = currentDate.getMonth()
//object for selected things?
let selectedDate
let selectedTime
let selectedTreat

//Functions
const pickDate = e => {
    console.log(e.target.type)
    if (e.target.id && (e.target.matches('p') || e.target.type == 'button')){
        if (e.target.type == 'button'){
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
            selectedDate = ''
            return getCalendar(year, month)
        }
        if (document.querySelector('.selected')){
            document.querySelector('.selected').classList.remove('selected')
        }
        e.target.classList.add('selected')
        selectedDate = e.target.dataset.date
        console.log(new Date(e.target.dataset.date))
        //get available times
    }
}

const pickTime = e => {
    if (e.target.value){
        selectedTime = e.target.value
        console.log(e.target.value)
    }
}

const pickTreat = e => {
    if (e.target.value){
        selectedTreat = e.target.value
        console.log(e.target.value)
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
        dayHead.classList.add('booking__calendar__days--head')
        calendarDays.appendChild(dayHead)
    })

    for (let i = 1-dayOffset; i <= daysOfMonth; i++){
        const dayNode = document.createElement('p')
        dayNode.classList.add('booking__calendar__days--day')
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

const validate = () => {
    //maybe an object for the selected things?
    if (!selectedDate){
        console.log('datum missing')
    }
    if (!selectedTime){
        console.log('time missing')
    }
    if (!selectedTreat){
        console.log('treat missing')
    }
    //if everything filled and validated, show again, press book, and put in db
    console.log(selectedDate, selectedTime, selectedTreat)
}

//Listeners
calendar.addEventListener('click', pickDate)
timeSelector.addEventListener('change', pickTime)
treatSelector.addEventListener('change', pickTreat)
confirmBtn.addEventListener('click', validate)

getCalendar(year, month)