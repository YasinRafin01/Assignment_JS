
const regions = [
    { name: "I'm flexible", img: "https://media.istockphoto.com/id/936410448/vector/black-outlined-world-map.jpg?s=612x612&w=0&k=20&c=4NC6zyuo9Bcz6W9MBsUHbTTj5f4vP1JRpyKJL7mdEvY=" },
    { name: "Southeast Asia", img: "https://c8.alamy.com/comp/2C58G60/asean-economic-community-aec-map-grey-map-with-dark-gray-highlighted-member-countries-southeast-asia-vector-illustration-2C58G60.jpg" },
    { name: "Canada", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShmebMhUa8hUtYB6kVF7A4BdANOgV3f34UjQ&s" },
    { name: "Europe", img: "https://thumbs.dreamstime.com/b/austria-map-black-white-detailed-outline-regions-country-austria-map-black-white-detailed-outline-regions-184772805.jpg" },
    { name: "Thailand", img: "https://cdn2.vectorstock.com/i/1000x1000/07/51/thailand-black-white-map-vector-950751.jpg" },
    { name: "Middle East", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0mvV0LzryT0eeiN2HQl-9JrsgX-dioT9Bg&s" }
];

const anywhereLink = document.getElementById('anywhereLink');
const anyweekLink = document.getElementById('anyweekLink');
const addGuest= document.getElementById('addGuest');
const destinationSearch = document.getElementById('destinationSearch');
const whereButton = document.getElementById('whereButton');
const searchContainer = document.getElementById('searchContainer');
const regionGrid = document.getElementById('regionGrid');
const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
const datePicker = document.getElementById('datePicker');
const datePickerBody = document.getElementById('datePickerBody');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

// Function to toggle destinationSearch visibility
function toggleDestinationSearch() {
    destinationSearch.classList.toggle('show'); // Toggle the 'show' class
    // Hide regionGrid when closing destinationSearch
    if (!destinationSearch.classList.contains('show')) {
        regionGrid.classList.remove('show');
    }
}

anywhereLink.addEventListener('click', function(e) {
    e.preventDefault();
    toggleDestinationSearch();
    
});
anyweekLink.addEventListener('click', function(e) {
    e.preventDefault();
    toggleDestinationSearch();
    
});
addGuest.addEventListener('click', function(e) {
    e.preventDefault();
    toggleDestinationSearch();
    
});

//function for Anywhere button

whereButton.addEventListener('click', function() {
    //searchContainer.style.display = 'block';
    // Toggle regionGrid visibility
    if (regionGrid.style.display === 'grid') {
        regionGrid.style.display = 'none';
    } else {
        regionGrid.style.display = 'grid';
    }

});

// Clear existing regions before adding new ones
regionGrid.innerHTML = '';

regions.forEach(region => {
    const regionItem = document.createElement('div');
    regionItem.className = 'region-item';
    
    const regionImage = document.createElement('img');
    regionImage.src = region.img;
    regionImage.alt = region.name;

    regionImage.style.width='130px';
    regionImage.style.height='100px';
    
    const regionText = document.createElement('span');
    regionText.textContent = region.name;

    regionItem.appendChild(regionImage);
    regionItem.appendChild(regionText);
    console.log(regionItem)
    regionItem.addEventListener('click', () => {

        const spanElement=document.getElementById('dest');
        spanElement.textContent=region.name;
        
    });
    regionGrid.appendChild(regionItem);
    
});

// Close destinationSearch if clicked outside of it
document.addEventListener('click', function(event) {
    const isClickInside = destinationSearch.contains(event.target) || anywhereLink.contains(event.target) || anyweekLink.contains(event.target) || addGuest.contains(event.target)||checkIn.contains(event.target);
    if (!isClickInside && destinationSearch.classList.contains('show')) {
        toggleDestinationSearch();
    }
});


// function for the calender

let currentDate = new Date();
let selectedCheckIn = null;
let selectedCheckOut = null;
let isDatePickerVisible=false;
let selectedDateRangeOption = "";
let selectedDateRangeOption1="";
let isSettingCheckIn=false;
let isSettingCheckOut=false;


checkIn.addEventListener('click',()=>{

     toggleDatePicker();

    });
checkOut.addEventListener('click', ()=>{

    toggleDatePicker();

});

function toggleDatePicker() {
    isDatePickerVisible = !isDatePickerVisible;
    datePicker.style.display = isDatePickerVisible ? 'block' : 'none';
    if (isDatePickerVisible) {
        renderCalendar();
    }
}

prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

function renderCalendar() {
    datePickerBody.innerHTML = '';
    const months = [getCurrentMonthDays(), getNextMonthDays()];

    months.forEach((month, index) => {
        const monthElement = document.createElement('div');
        monthElement.className = 'month';

        const monthHeader = document.createElement('div');
        monthHeader.className = 'month-header';
        monthHeader.textContent = new Date(currentDate.getFullYear(), currentDate.getMonth() + index).toLocaleString('default', { month: 'long', year: 'numeric' });
        monthElement.appendChild(monthHeader);

        const weekdaysElement = document.createElement('div');
        weekdaysElement.className = 'weekdays';
        ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            weekdaysElement.appendChild(dayElement);
        });
        monthElement.appendChild(weekdaysElement);

        const daysElement = document.createElement('div');
        daysElement.className = 'days';
        month.forEach(day => {
            const dayElement = document.createElement('div');
            if (day) {
                dayElement.textContent = day.getDate();
                dayElement.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent event bubbling
                    selectDate(day);
                });
                if (isDateSelected(day)) {
                    dayElement.classList.add('selected');
                }
            } else {
                dayElement.classList.add('empty');
            }
            daysElement.appendChild(dayElement);
        });
        monthElement.appendChild(daysElement);

        datePickerBody.appendChild(monthElement);
    });
}

function getCurrentMonthDays() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = new Array(42).fill(null);

    for (let i = 0; i < lastDate; i++) {
        days[i + firstDay] = new Date(year, month, i + 1);
    }

    return days;
}

function getNextMonthDays() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = new Array(42).fill(null);

    for (let i = 0; i < lastDate; i++) {
        days[i + firstDay] = new Date(year, month, i + 1);
    }

    return days;
}

function selectDate(date) {
    if (!selectedCheckIn) {
        selectedCheckIn = date;
        selectedCheckOut = null;
    } else if (selectedCheckIn && !selectedCheckOut) {
        if (selectedCheckIn.getTime() === date.getTime()) {
            selectedCheckIn = null;
        } else {
            selectedCheckOut = date;
            if (selectedCheckOut < selectedCheckIn) {
                [selectedCheckIn, selectedCheckOut] = [selectedCheckOut, selectedCheckIn];
            }
        }
    } else if (selectedCheckIn && selectedCheckOut) {
        if (selectedCheckOut.getTime() === date.getTime()) {
            selectedCheckOut = null;
        } else if (selectedCheckIn.getTime() === date.getTime()) {
            selectedCheckIn = null;
        } else {
            selectedCheckIn = date;
            selectedCheckOut = null;
        }
    }

    updateCheckInText();
    updateCheckOutText();
    renderCalendar();
}

function isDateSelected(date) {
    return (selectedCheckIn && date.getTime() === selectedCheckIn.getTime()) ||
           (selectedCheckOut && date.getTime() === selectedCheckOut.getTime());
}

function updateCheckInText() {
    const timeElement=document.getElementById("time");
    
    timeElement.textContent = selectedCheckIn ? formatDate(selectedCheckIn)+selectedDateRangeOption : 'Add date';

}
function updateCheckOutText(){
    const timeElement1=document.getElementById("time1");
    timeElement1.textContent = selectedCheckOut ? formatDate(selectedCheckOut)+selectedDateRangeOption : 'Add date';
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

document.querySelectorAll('.date-range-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        document.querySelectorAll('.date-range-option').forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedDateRangeOption = e.target.getAttribute('data-days');
        if(!selectedCheckOut){
               
                updateCheckInText();
        }else if(selectedCheckOut){
            
            updateCheckOutText();
        }
    });
});

function showExpandedSearch() {
    destinationSearch.style.display = 'flex';
}

// add guest functionalities

document.addEventListener('DOMContentLoaded', function() {
    const guestInput = document.getElementById('guest-input');
    const guestSelector = document.getElementById('guest-selector');
    const guestInput1 = document.getElementById('guest-input1');

    guestInput.addEventListener('click', function() {
        guestSelector.style.display = guestSelector.style.display === 'flex' ? 'none' : 'flex';
    });

    document.addEventListener('click', function(event) {
        if (!guestInput.contains(event.target) && !guestSelector.contains(event.target)) {
            guestSelector.style.display = 'none';
        }
    });

    const incrementButtons = document.querySelectorAll('.increment');
    const decrementButtons = document.querySelectorAll('.decrement');
    const counts = document.querySelectorAll('.count');

    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const countElement = document.querySelector(`.count[data-type=${type}]`);
            let count = parseInt(countElement.textContent);
            countElement.textContent = count + 1;
            updateDecrementButtons();
            updateGuestInputPlaceholder();
        });
    });

    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const countElement = document.querySelector(`.count[data-type=${type}]`);
            let count = parseInt(countElement.textContent);
            if (count > 0) {
                countElement.textContent = count - 1;
            }
            updateDecrementButtons();
            updateGuestInputPlaceholder();
        });
    });

    function updateDecrementButtons() {
        counts.forEach(countElement => {
            const type = countElement.getAttribute('data-type');
            const decrementButton = document.querySelector(`.decrement[data-type=${type}]`);
            if (parseInt(countElement.textContent) === 0) {
                decrementButton.disabled = true;
            } else {
                decrementButton.disabled = false;
            }
        });
    }
    let placeholderText='';    
    function updateGuestInputPlaceholder() {
        let totalGuests = 0;
        let infants = 0;
        let pets = 0;

        counts.forEach(countElement => {
            const type = countElement.getAttribute('data-type');
            const count = parseInt(countElement.textContent);
            if (type === 'infants') {
                infants = count;
            } else if (type === 'pets') {
                pets = count;
            } else {
                totalGuests += count;
            }
        });

        placeholderText = `${totalGuests} ${totalGuests === 1 ? 'guest' : 'guests'}`;
        if (infants > 0) {
            placeholderText += `, ${infants} ${infants === 1 ? 'infant' : 'infants'}`;
        }
        if (pets > 0) {
            placeholderText += `, ${pets} ${pets === 1 ? 'pet' : 'pets'}`;
        }

        guestInput.value = placeholderText;
        guestInput1.textContent = placeholderText;
    }

    // Prevent modal from closing when clicking inside the guest selector
    guestSelector.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    updateGuestInputPlaceholder();
});


// functionalities for image gallery

const images = [
    'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP0ASYhu75T34l5TcUAof4KptA2g6eCspVtg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaA0SQ7Ppc6ugXeLjXm7gMqlUERCgafx1s8A&s',
    'https://homesmart.sg/wp-content/uploads/2022/01/Smart-Digital-Lock-A100-1024x1024.jpg',
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEyL3AtNDY4LXBtLTEyNjktMDQtbW9ja3VwLmpwZw.jpg'
];

const modal = document.getElementById('myModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const imageCounter = document.getElementById('imageCounter');
const showAllPhotos = document.getElementById('showAllPhotos');
let currentIndex = 0;

function openModal(index) {
    modal.style.display = 'block';
    modalImg.src = images[index];
    currentIndex = index;
    updateImageCounter();
}

function updateImageCounter() {
    imageCounter.textContent = `Image ${currentIndex + 1} of ${images.length}`;
}

showAllPhotos.onclick = () => openModal(0);
closeBtn.onclick = () => modal.style.display = 'none';

prevButton.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
    updateImageCounter();
};

nextButton.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex];
    updateImageCounter();
};

// Close modal when clicking outside the image
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};


// making the heart icon functional

const saveIcon = document.getElementById('saveIcon');

function updateIconState(isSaved) {
    if (isSaved) {
        saveIcon.style.color = 'red';
        saveIcon.textContent = '♥';
    } else {
        saveIcon.style.color = '';
        saveIcon.textContent = '♡'; 
    }
}

let isSaved = localStorage.getItem('isSaved') === 'true';
updateIconState(isSaved);

saveIcon.addEventListener('click', function() {
    isSaved = !isSaved;
    updateIconState(isSaved);
    localStorage.setItem('isSaved', isSaved);
});


// share button functionalities

const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const shareModal = document.getElementById('shareModal');
const copyLinkBtn = document.getElementById('copyLinkBtn');

openModalBtn.addEventListener('click', () => {
    shareModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    shareModal.classList.remove('active');
});

copyLinkBtn.addEventListener('click', () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Current page URL copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy URL: ', err);
    });
});

shareModal.addEventListener('click', (event) => {
    if (event.target === shareModal) {
        shareModal.classList.remove('active');
    }
});

// function to transefer text of one tag to another
function transferText() {
    
    let sourceElement = document.getElementById('source1');

    
    let textToTransfer = sourceElement.innerText;

    
    let destinationElement = document.getElementById('destination1');

    
    destinationElement.innerText = textToTransfer;

    let sourceElement1 = document.getElementById('guest-input1');
    let textToTransfer1 = sourceElement1.innerText;

    let destinationElement1=document.getElementById('destination2');
    destinationElement1.innerText=textToTransfer1;


}