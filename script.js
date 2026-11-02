document.addEventListener("DOMContentLoaded", function () {

    // Update the copyright year automatically.
    document.querySelectorAll(".current-year").forEach(function (item) {
        item.textContent = new Date().getFullYear();
    });

    // Mobile navigation menu.
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.textContent = isOpen ? "×" : "☰";
        });
    }

    // Dynamic plumbing services.
    const plumbingServices = [
        {
            title: "Repair and Maintenance",
            description: "We diagnose and repair leaking taps, blocked drains, damaged pipes and other plumbing problems.",
            keywords: "repair maintenance leaks taps drains pipes"
        },
        {
            title: "Installation and Replacement",
            description: "We install and replace taps, bathroom fixtures, water heaters and plumbing systems.",
            keywords: "installation replacement fixtures heaters bathrooms"
        },
        {
            title: "Emergency Plumbing",
            description: "Contact Gomez Plumbing when unexpected plumbing problems require urgent attention.",
            keywords: "emergency urgent burst pipes leaks"
        }
    ];

    const serviceContainer = document.getElementById("service-list");
    const serviceSearch = document.getElementById("service-search");
    const serviceSort = document.getElementById("service-sort");

    function displayServices(services) {
        if (!serviceContainer) return;
        serviceContainer.innerHTML = "";

        if (services.length === 0) {
            serviceContainer.innerHTML = "<p>No matching services found. Try another search.</p>";
            return;
        }

        services.forEach(function (service) {
            const card = document.createElement("article");
            card.className = "service-card";

            const button = document.createElement("button");
            button.className = "accordion-button";
            button.type = "button";
            button.textContent = service.title + " +";
            button.setAttribute("aria-expanded", "false");

            const content = document.createElement("div");
            content.className = "accordion-content";

            const paragraph = document.createElement("p");
            paragraph.textContent = service.description;
            content.appendChild(paragraph);

            button.addEventListener("click", function () {
                const wasOpen = content.classList.contains("active");

                serviceContainer.querySelectorAll(".accordion-content").forEach(function (panel) {
                    panel.classList.remove("active");
                });
                serviceContainer.querySelectorAll(".accordion-button").forEach(function (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                    otherButton.textContent = otherButton.textContent.replace(" −", " +");
                });

                if (!wasOpen) {
                    content.classList.add("active");
                    button.textContent = service.title + " −";
                    button.setAttribute("aria-expanded", "true");
                }
            });

            card.appendChild(button);
            card.appendChild(content);
            serviceContainer.appendChild(card);
        });
    }

    function filterServices() {
        if (!serviceContainer) return;

        const searchText = serviceSearch ? serviceSearch.value.toLowerCase().trim() : "";
        let results = plumbingServices.filter(function (service) {
            return service.title.toLowerCase().includes(searchText) ||
                service.description.toLowerCase().includes(searchText) ||
                service.keywords.toLowerCase().includes(searchText);
        });

        if (serviceSort && serviceSort.value === "az") {
            results.sort((a, b) => a.title.localeCompare(b.title));
        } else if (serviceSort && serviceSort.value === "za") {
            results.sort((a, b) => b.title.localeCompare(a.title));
        }

        displayServices(results);
    }

    if (serviceContainer) {
        displayServices(plumbingServices);
        if (serviceSearch) serviceSearch.addEventListener("input", filterServices);
        if (serviceSort) serviceSort.addEventListener("change", filterServices);
    }

    // Image gallery lightbox. Add class "plumbing-images" to a gallery container.
    const galleryImages = document.querySelectorAll(".plumbing-images img");

    if (galleryImages.length > 0) {
        const lightbox = document.createElement("div");
        lightbox.className = "lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");

        const closeButton = document.createElement("button");
        closeButton.className = "lightbox-close";
        closeButton.type = "button";
        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close image");

        const enlargedImage = document.createElement("img");
        lightbox.appendChild(closeButton);
        lightbox.appendChild(enlargedImage);
        document.body.appendChild(lightbox);

        function closeLightbox() {
            lightbox.classList.remove("show");
            enlargedImage.removeAttribute("src");
        }

        galleryImages.forEach(function (image) {
            image.style.cursor = "pointer";
            image.addEventListener("click", function () {
                enlargedImage.src = image.src;
                enlargedImage.alt = image.alt;
                lightbox.classList.add("show");
                closeButton.focus();
            });
        });

        closeButton.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) closeLightbox();
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") closeLightbox();
        });
    }

    // Helper for displaying form validation messages.
    function showError(id, message) {
        const element = document.getElementById(id);
        if (element) element.textContent = message;
    }

    function validEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Enquiry form validation.
    const enquiryForm = document.getElementById("enquiry-form");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let valid = true;
            const name = document.getElementById("customer-name").value.trim();
            const email = document.getElementById("customer-email").value.trim();
            const phone = document.getElementById("customer-phone").value.trim();
            const service = document.getElementById("service-type").value;
            const message = document.getElementById("enquiry-message").value.trim();

            document.querySelectorAll(".error").forEach(item => item.textContent = "");
            showError("enquiry-result", "");

            if (!name) { showError("name-error", "Please enter your full name."); valid = false; }
            if (!validEmail(email)) { showError("email-error", "Please enter a valid email address."); valid = false; }
            if (!phone) { showError("phone-error", "Please enter your phone number."); valid = false; }
            if (!service) { showError("service-error", "Please select a service."); valid = false; }
            if (!message) { showError("message-error", "Please describe your plumbing problem."); valid = false; }

            if (valid) {
                showError("enquiry-result", "Your details are valid. This demo form is not connected to an online submission service yet.");
            }
        });
    }

    // Contact form validation and email preparation.
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let valid = true;
            const name = document.getElementById("contact-name").value.trim();
            const email = document.getElementById("contact-email").value.trim();
            const phone = document.getElementById("contact-phone").value.trim();
            const subject = document.getElementById("contact-subject").value;
            const message = document.getElementById("contact-message").value.trim();

            document.querySelectorAll(".contact-error").forEach(item => item.textContent = "");
            showError("contact-result", "");

            if (!name) { showError("contact-name-error", "Please enter your name."); valid = false; }
            if (!validEmail(email)) { showError("contact-email-error", "Please enter a valid email address."); valid = false; }
            if (!phone) { showError("contact-phone-error", "Please enter your phone number."); valid = false; }
            if (!subject) { showError("contact-subject-error", "Please select a subject."); valid = false; }
            if (!message) { showError("contact-message-error", "Please enter your message."); valid = false; }

            if (valid) {
                const recipient = "Keetse77@gmail.com";
                const body = "Name: " + name + "\nEmail: " + email + "\nPhone: " + phone + "\n\nMessage:\n" + message;
                showError("contact-result", "Opening your email application to prepare the message.");

                window.location.href = "mailto:" + recipient +
                    "?subject=" + encodeURIComponent(subject) +
                    "&body=" + encodeURIComponent(body);
            }
        });
    }

    // Leaflet interactive map - only runs on contact.html.
    const mapElement = document.getElementById("map");

    if (mapElement) {
        if (typeof L === "undefined") {
            console.error("Leaflet did not load. Check your internet connection and the Leaflet script link.");
        } else if (!mapElement._leaflet_id) {
            const map = L.map(mapElement).setView([-25.9492, 28.0844], 14);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors"
            }).addTo(map);

            L.marker([-25.9492, 28.0844])
                .addTo(map)
                .bindPopup("Gomez Plumbing - approximate Blue Hills, Midrand location");

            setTimeout(function () {
                map.invalidateSize(true);
            }, 500);
        }
    }

    console.log("Gomez Plumbing website scripts loaded.");
});
