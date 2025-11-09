// Sample Events Data
const eventsData = [
  {
    title: "Sunday Worship Service",
    date: "Every Sunday",
    description:
      "Join us for our weekly worship service filled with inspiring music, prayer, and biblical teaching.",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400",
  },
];

// Load Events on Page Load
document.addEventListener("DOMContentLoaded", function () {
  loadEvents();
  setupDonationForm();
  setupSmoothScrolling();
  setupNavbarHighlight();
});

// Load Events Dynamically
function loadEvents() {
  const eventsContainer = document.getElementById("eventsContainer");

  eventsData.forEach((event) => {
    const eventCard = createEventCard(event);
    eventsContainer.appendChild(eventCard);
  });
}

// Create Event Card Element
function createEventCard(event) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 mb-4 fade-in-up";

  col.innerHTML = `
        <div class="card event-card">
            <img src="${event.image}" class="card-img-top event-image" alt="${event.title}">
            <div class="card-body">
                <span class="event-date">${event.date}</span>
                <h5 class="event-title">${event.title}</h5>
                <p class="event-description">${event.description}</p>
                <button class="btn btn-outline-primary btn-sm mt-2" onclick="window.open('https://meet.google.com/qqn-jvas-qki', '_blank')">
                    Join Meet
                </button>
            </div>
        </div>
    `;

  return col;
}

// Show Event Details (Can be enhanced with a modal)
function showEventDetails(eventTitle) {
  alert(
    `More details about "${eventTitle}" will be available soon. Please contact the church office for more information.`
  );
}

// Setup Donation Form
function setupDonationForm() {
  const donationForm = document.getElementById("donationForm");
  const amountButtons = document.querySelectorAll('input[name="amount"]');
  const customAmountInput = document.getElementById("customAmount");

  // Handle preset amount selection
  amountButtons.forEach((button) => {
    button.addEventListener("change", function () {
      if (this.value !== "custom") {
        customAmountInput.value = this.value;
        customAmountInput.disabled = true;
      } else {
        customAmountInput.disabled = false;
        customAmountInput.focus();
      }
    });
  });

  // Handle form submission
  donationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = customAmountInput.value;
    const name = document.getElementById("donorName").value;
    const email = document.getElementById("donorEmail").value;
    const purpose = document.getElementById("donationPurpose").value;

    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    // Here you would integrate with a payment gateway
    // For example: Stripe, PayPal, Razorpay, etc.
    console.log("Donation Details:", {
      amount: amount,
      name: name,
      email: email,
      purpose: purpose,
    });

    alert(
      `Thank you ${name} for your generous donation of $${amount}!\n\nIn a production environment, this would redirect to a secure payment gateway.\n\nPayment integration options:\n- Stripe\n- PayPal\n- Razorpay\n- Square`
    );

    // Reset form
    donationForm.reset();
    document.getElementById("amountCustom").checked = true;
    customAmountInput.disabled = false;
  });
}

// Setup Smooth Scrolling
function setupSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      }
    });
  });
}

// Setup Navbar Active Link Highlighting
function setupNavbarHighlight() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Payment Gateway Integration Template
// Uncomment and configure based on your chosen payment provider

/*
// Example: Stripe Integration
async function processStripePayment(amount, email) {
    const stripe = Stripe('your_publishable_key');
    
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100, email: email })
    });
    
    const { clientSecret } = await response.json();
    
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: {
                email: email
            }
        }
    });
    
    if (result.error) {
        console.error(result.error.message);
    } else {
        console.log('Payment successful!');
    }
}
*/

/*
// Example: PayPal Integration
function initPayPalButton() {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: document.getElementById('customAmount').value
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
}
*/

/*
// Example: Razorpay Integration (for Indian payments)
function processRazorpayPayment(amount, email, name) {
    const options = {
        key: 'your_razorpay_key',
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'All Saints Church',
        description: 'Donation',
        prefill: {
            email: email,
            name: name
        },
        handler: function(response) {
            alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        }
    };
    
    const razorpay = new Razorpay(options);
    razorpay.open();
}
*/
