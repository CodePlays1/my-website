//Header fixed

window.onscroll = function () {
  const docScrollTop = document.documentElement.scrollTop;

  if (window.innerWidth > 991) {
    if (docScrollTop > 100) {
      document.querySelector("header").classList.add("fixed");
    } else {
      document.querySelector("header").classList.remove("fixed");
    }
  }
}

//navbar links

const navbar = document.querySelector(".navbar");
a = navbar.querySelectorAll("a")

a.forEach(function (element) {
  element.addEventListener("click", function () {
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove("active")
    }
    this.classList.add("active");
    document.querySelector(".navbar").classList.toggle("show");
  })
})


//Portfolio Gallery

const filterBtn = document.querySelector("#filterBtn").children;
const item = document.querySelector(".gallery").children;

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    for (let j = 0; j < filterBtn.length; j++) {
      filterBtn[j].classList.remove("active");
    }
    this.classList.add("active");
    const target = this.getAttribute("data-target");
    for (let k = 0; k < item.length; k++) {
      item[k].style.display = "none";
      if (target == item[k].getAttribute("data-id")) {
        item[k].style.display = "block";
      }
      if (target == "all") {
        item[k].style.display = "block";
      }
    }
  });
}

const closeLightbox = document.querySelector(".close-lightbox");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = lightbox.querySelector("img");

lightbox.addEventListener("click", function (event) {
  if (event.target != lightboxImg) {
    lightbox.classList.remove("show");
    lightbox.classList.add("hide");
  }
});

closeLightbox.addEventListener("click", function () {
  lightbox.classList.remove("show");
  lightbox.classList.add("hide");
});

const gallery = document.querySelector(".gallery");

const galleryItem = document.querySelectorAll(".item");

galleryItem.forEach(function (element) {
  element.querySelector(".fa-plus").addEventListener("click", function () {
    lightbox.classList.remove("hide");
    lightbox.classList.add("show");
    lightboxImg.src = element.querySelector("img").getAttribute("src");
  });
});



//Footer Year 
var year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// DOM Elements
const sendButton = document.getElementById("send");
const popup = document.getElementById('popup');
const popupMessage = document.querySelector(".popup-content p");
const loader = document.querySelector(".loader");

// Function to send email using EmailJS
async function SendMail() {
    try {
        // Disable send button
        sendButton.style.cursor = "not-allowed";
        sendButton.style.opacity = "0.6"; // Make it look disabled

        // Get form values
        const params = {
            from_name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("text").value.trim(),
        };

        // Validate form fields
        if (!params.from_name || !params.email || !params.message) {
            alert("Please fill out all fields before sending.");
            sendButton.disabled = false; // Re-enable button
            sendButton.style.opacity = "1";
            return;
        }

        console.log("Sending email with params:", params);

        // Show Loader before sending the email
        loader.style.display = 'block';

        // Send email using EmailJS
        await emailjs.send("service_jhtml96", "template_3vo0dza", params);

        // Hide Loader when successful
        loader.style.display = 'none';

        // Show success popup
        popup.style.display = 'flex';
        popupMessage.textContent = "Your email has been received. Thank you!";

        // Reload page after 3 seconds
        setTimeout(() => {
            window.location.reload(true);
        }, 3000);
    } catch (error) {
        // Hide Loader on error
        loader.style.display = 'none';

        // Show error message
        popup.style.display = 'flex';
        popupMessage.textContent = "Something went wrong. Please try later.";
    } finally {
        // Re-enable the send button in case of success or error
        sendButton.disabled = false;
        sendButton.style.opacity = "1";
    }
}

// Event listener for the send button
sendButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    SendMail(); // Call the SendMail function
});

// Close the popup when the close button is clicked
document.querySelector(".close").addEventListener("click", function () {
    popup.style.display = 'none';
});

