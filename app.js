// This section defines variables to select various elements from the HTML document
const jobTitle = document.querySelector(".job-title");
const filterBtn = document.querySelectorAll(".filter");
const jobListing = document.querySelector(".job-listings");
const hambuger = document.querySelector(".hambuger-cont");
const login = document.querySelector(".login");
const navContent = document.querySelector(".nav-content");
const cancel = document.querySelector(".cancel");
const header = document.querySelector("header");
const searchInput = document.querySelector(".search-job");
const searchLocation = document.querySelector(".search-location");
const searchBtn = document.querySelector(".search-btn");
const content = document.querySelectorAll("[data-translate]");

// Function to retrieve data from local storage
function getDataFromLocal() {
  try {
    const data = localStorage.getItem("apiData");
    if (data) {
      return JSON.parse(data);
    } else {
      console.log("No data found in local storage.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data from local storage:", error);
    return null;
  }
}

// Function to convert time difference to human-readable format
const convertTime = (date) => {
  // date = new Date(date)
  const currentTime = new Date().getTime();
  const specifiedTime = date.getTime();
  const timeDifference = currentTime - specifiedTime;
  let secondsDifference = timeDifference / 1000;
  if (secondsDifference > 60) {
    secondsDifference /= 60;
  }
  if (secondsDifference > 60) {
    secondsDifference /= 60;
  }
  if (secondsDifference > 24) {
    secondsDifference /= 24;
  }
  // Output the difference in seconds
  return Math.round(secondsDifference);
};

// Function to map job data into HTML elements
const mapJob = (jobs) => {
  console.log(jobs);
  return jobs.map((b) => {
    console.log(b.employer_logo);
    const date = new Date(b.job_posted_at_datetime_utc);
    const Day_posted = convertTime(date);
    return `  <div class="job-listing" id= ${b.id}>  <h3>${b.job_title}</h3>
          <p><strong class="">Company:</strong> <span class="company-name">${b.employer_name}</span></p>
          <p><img class="company-log" alt= "Company Logo" src= ${b.employer_logo}>
          <p><strong class="">Day Posted:</strong> <span class="company-name">${Day_posted} Days</span></p>
          <p><strong class="">Location:</strong> <span class="job-location">${b.job_country}, ${b.job_city}    </span></p>
          <p><strong class="">Job Type:</strong> <span class="job-type">${b.job_employment_type}</span></p>
          <p><strong class="">Description: </strong>
          </p>
          <div class="arrange">
          <p class="description">${b.job_description}
          </p>
         <div class="apply-cont">
         <a href="${b.job_apply_link}" target="_blank">
         <button class="apply">Apply</button>
         </a>
          </div>
          </div>
          </div>
          `;
  });
};

// Function to save data to local storage
function saveDataToLocal(data) {
  try {
    localStorage.setItem("apiData", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to local storage:", error);
  }
}

// Function to filter jobs based on job type
const FilterJob = (arr) => {
  console.log(arr);
  displayJob = mapJob(arr);
  jobListing.innerHTML = displayJob;
  filterBtn.forEach((e) => {
    e.addEventListener("click", (b) => {
      const FilterJob = arr.filter(
        (d) => d.job_employment_type == b.target.textContent
      );
      if (b.target.textContent == "All") jobListing.innerHTML = mapJob(arr);
      else jobListing.innerHTML = mapJob(FilterJob);
    });
  });
};

// URL to fetch job data
let url = "https://jsearch.p.rapidapi.com/search?query=Web Developer";

// Function to fetch job data from API
const getJobs = async (url) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3e970bf840msha73d42b9a3cddf2p102bacjsn5c4967eec265",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    saveDataToLocal(result.data);
    FilterJob(result.data);
    return result.data;
  } catch (error) {
    const savedData = getDataFromLocal();
    if (savedData) {
      console.log("From local Storage");
      return savedData;
    } else {
      console.error(
        "Failed to fetch data from API and no local data available."
      );
      return null;
    }
  }
};

// Function to display jobs
const display = async (url) => {
  const jobbing = await getJobs(url);
  FilterJob(jobbing);
};

// Initial display of jobs
display(url);

// Event listener for scrolling to toggle header class
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.remove("header");
    header.classList.add("float");
  } else {
    header.classList.remove("float");
    header.classList.add("header");
  }
});

// Event listener to toggle login, language select, and navigation content
cancel.addEventListener("click", () => {
  login.classList.toggle("show");
  langSelect.classList.toggle("show");
  navContent.classList.toggle("show");
  hambuger.classList.toggle("add");
});

// Event listener for search button to fetch jobs based on search input
searchBtn.addEventListener("click", async () => {
 let  searchInputValue = searchInput.value;
  let url = `https://jsearch.p.rapidapi.com/search?query=${searchInputValue}`;
  display(url);
});

// Function to handle search on pressing Enter key
handleKeyPress = (event) => {
  if (event.key === 'Enter') {
      event.preventDefault(); 
      searchInputValue = searchInput.value;
      let url = `https://jsearch.p.rapidapi.com/search?query=${searchInputValue}`;
      display(url);
  }
}

// Event listener for Enter key press in search input
searchInput.addEventListener('keypress', handleKeyPress);

// Event listener to toggle login, language select, and navigation content
hambuger.addEventListener("click", () => {
  login.classList.toggle("show");
  langSelect.classList.toggle("show");
  navContent.classList.toggle("show");
  hambuger.classList.toggle("add");
});

// Functionality for carousel slider
let slideIndex = 1;

const next = () => {
  slideIndex++;
  if (slideIndex > document.querySelectorAll(".slide").length) {
    slideIndex = 1;
  }
  showSlide(slideIndex);
};

const prev = () => {
  slideIndex--;
  if (slideIndex < 1) {
    slideIndex = document.querySelectorAll(".slide").length;
  }
  showSlide(slideIndex);
};

// Event listener for next and previous buttons
document.querySelector(".next").addEventListener("click", () => {
  next();
});

document.querySelector(".prev").addEventListener("click", () => {
  prev();
});

// Auto slideshow
setInterval(() => {
  next();
}, 5000);

// Function to display current slide
function showSlide(n) {
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.style.display = "none";
  });
  document.querySelectorAll(".slide")[n - 1].style.display = "block";
}
