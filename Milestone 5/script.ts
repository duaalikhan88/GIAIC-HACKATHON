
// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement | null;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement | null;

const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement | null;

const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement | null;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement | null;

// Check if elements exist before proceeding
if (!form || !resumeDisplayElement || !shareableLinkContainer || !shareableLinkElement || !downloadPdfButton) {
    console.error("One or more elements not found!");
    // Optionally, return early or handle the error
} else {
    // Form handling logic goes here
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // prevent page reload
        // Form data collection
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        // Save data to localStorage
        const resumeData = {
            name,
            email,
            phone,
            education,
            experience,
            skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData));

        // Dynamically generate resume content
        const resumeHTML = `
            <h2>Editable Resume</h2>
            <h3>Personal Information</h3>
            <p><b>Name:</b> <span contenteditable="true" id="name">${name}</span></p>
            <p><b>Email:</b> <span contenteditable="true" id="email">${email}</span></p>
            <p><b>Phone:</b> <span contenteditable="true" id="phone">${phone}</span></p>
            <h3>Education</h3>
            <p contenteditable="true" id="education">${education}</p>
            <h3>Experience</h3>
            <p contenteditable="true" id="experience">${experience}</p>
            <h3>Skills</h3>
            <p contenteditable="true" id="skills">${skills}</p>
        `;
        
        // Display generated resume
        resumeDisplayElement.innerHTML = resumeHTML;

        // Generate shareable link
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
        
        // Display the link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    });

    // PDF download functionality
    downloadPdfButton.addEventListener('click', () => {
        window.print(); // Print dialog for saving as PDF
    });

    // Prefill form based on username from URL
    window.addEventListener('DOMContentLoaded', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        if (username) {
            // Autofill form if data is in localStorage
            const savedResumeData = localStorage.getItem(username);
            if (savedResumeData) {
                const resumeData = JSON.parse(savedResumeData);
                (document.getElementById('username') as HTMLInputElement).value = username;
                (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
                (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
                (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
                (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
                (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
                (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
            }
        }
    });
}
