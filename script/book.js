//Variables
const form = document.forms[0]
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
const newBooking = {
    date: '',
    time: '',
    treat: '',
    name: '',
    tel: '',
    email: ''
}


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
            newBooking.date = ''
            return getCalendar(year, month)
        }
        if (document.querySelector('.selected')){
            document.querySelector('.selected').classList.remove('selected')
        }
        e.target.classList.add('selected')
        newBooking.date = e.target.dataset.date
        console.log(new Date(e.target.dataset.date))
        //get available times
    }
}

const pickTime = e => {
    if (e.target.value){
        newBooking.time = e.target.value
        console.log(e.target.value)
    }
}

const pickTreat = e => {
    if (e.target.value){
        newBooking.treat = e.target.value
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

const validate = e => {
    e.preventDefault();
    for (let i in newBooking){
        if (i !== 'date'){
            let formField = form.elements[`${i}`]
            if (!formField.value.trim()){
                setMsgFor(formField, `${formField.name} cannot be blank!`, false)
            }
            else if ((formField.name == 'tel' || formField.name == 'email') && !checkField(formField)){
                // check tel and email with regex
                setMsgFor(formField, `Wrong ${formField.name} format!`, false)
            }
            else {
                setMsgFor(formField, 'Ok', true)
            }
        }
    }
    
    // need to check date apart, because it's not a form element
    if (!newBooking.date){
        return setMsgFor(calendarDays, 'please select date!', false)
    } 
    if (new Date(newBooking.date) < currentDate.setHours(0, 0, 0, 0)){
        return setMsgFor(calendarDays, 'Date is in the past!', false)
    }
    setMsgFor(calendarDays, 'Ok', true)
    
    //if everything filled and validated, show again, press book, and put in db
    console.log(newBooking.date, newBooking.time, newBooking.treat)
}

const setMsgFor = (input, msg, isSuccess) => {
    const formField = input.parentElement
    const errorMsg = formField.querySelector('small')
    errorMsg.innerText = msg
    if (!isSuccess){
        formField.classList.remove('success')
        formField.classList.add('error')
        return false
    }
    formField.classList.remove('error')
    formField.classList.add('success')
}

const checkField = field => {
    const regex = {
        tel: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        email: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
    }
    return regex[field.name].test(field.value.trim())
}

//Listeners
calendar.addEventListener('click', pickDate)
timeSelector.addEventListener('change', pickTime)
treatSelector.addEventListener('change', pickTreat)
confirmBtn.addEventListener('click', validate)

getCalendar(year, month)