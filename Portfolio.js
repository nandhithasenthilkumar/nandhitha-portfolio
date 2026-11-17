// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for all portfolio-style cards
        const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');

            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });

                    portfolioObserver.unobserve(entry.target);
                }
            });
         }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSections = document.querySelectorAll('.portfolio-grid');

portfolioSections.forEach(section => {
    portfolioObserver.observe(section);
});
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });


// Contact Form - EmailJS
emailjs.init({
    publicKey: "XR5TEh-XlavPr01-F"
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            await emailjs.sendForm(
                'service_ii90i26',
                'template_itg1ojs',
                contactForm
            );

            alert('Your message has been sent successfully!');
            contactForm.reset();
            submitBtn.textContent = 'Message Sent ✓';

        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('Message could not be sent. Please try again.');
            submitBtn.textContent = 'Try Again';

        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);
        }
    });
}
        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        /* ==========================================
   Project Details Modal
========================================== */

const projectData = {

    crop: {
        title: "Crop Disease Prediction Using Deep Learning",

        image: "images/crop-disease.jpg",

        description:
            "An AI-powered crop disease detection system developed using YOLOv11 and Mistral Small 3.1. The application enables users to upload plant images and receive real-time disease predictions, supporting early disease detection and helping reduce crop losses.",

        technologies: [
            "ReactJS",
            "Tailwind CSS",
            "Python",
            "YOLOv11",
            "FastAPI",
            "Mistral Small 3.1"
        ]
    },

    vehicle: {
        title: "Vehicle Overload Weight Detection Using IoT",

        image: "images/vehicle-overload.jpg",

        description:
            "An IoT-based smart vehicle monitoring system designed to detect overloaded vehicles using Arduino and load cell sensors. The system displays real-time vehicle weight, stores weight data in MongoDB, and supports automated penalty calculation for overloaded vehicles.",

        technologies: [
            "Arduino",
            "Load Cell",
            "HX711",
            "HTML",
            "CSS",
            "JavaScript",
            "MongoDB",
            "IoT"
        ]
    },

    livestock: {
        title: "Digital Antimicrobial Usage & Residue Monitoring System for Livestock Farms",

        image: "images/livestock-health.jpg",

        description:
            "A digital livestock health management platform designed to manage animal records, consultations, prescriptions, treatment monitoring, withdrawal periods, compliance tracking, risk prediction, chatbot assistance, and digital health certification.",

        technologies: [
            "ReactJS",
            "Firebase Firestore",
            "Python",
            "Flask API",
            "Logistic Regression",
            "Machine Learning",
            "Android Studio",
            "WebView"
        ]
    }

};

const projectCards = document.querySelectorAll(".clickable-project");

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");

const modalProjectImage = document.getElementById("modalProjectImage");
const modalProjectTitle = document.getElementById("modalProjectTitle");
const modalProjectDescription =
    document.getElementById("modalProjectDescription");

const modalProjectTech =
    document.getElementById("modalProjectTech");


projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectId = card.dataset.project;

        const project = projectData[projectId];

        if (!project) return;

        modalProjectImage.src = project.image;

        modalProjectImage.alt = project.title;

        modalProjectTitle.textContent = project.title;

        modalProjectDescription.textContent =
            project.description;

        modalProjectTech.innerHTML = "";

        project.technologies.forEach(technology => {

            const tech = document.createElement("span");

            tech.textContent = technology;

            modalProjectTech.appendChild(tech);

        });

        projectModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


function closeProjectModal() {

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";

}


projectModalClose.addEventListener(
    "click",
    closeProjectModal
);


projectModal.addEventListener("click", (event) => {

    if (event.target === projectModal) {

        closeProjectModal();

    }

});


document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {

        closeProjectModal();

    }

});