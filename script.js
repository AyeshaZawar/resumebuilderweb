class ResumeBuilder {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.form = document.getElementById('resumeForm');
        this.experienceContainer = document.getElementById('experienceContainer');
        this.educationContainer = document.getElementById('educationContainer');
        this.previewSection = document.getElementById('resumePreview');
    }

    attachEventListeners() {
        document.getElementById('addExperience').addEventListener('click', () => this.addExperienceEntry());
        document.getElementById('addEducation').addEventListener('click', () => this.addEducationEntry());
        document.getElementById('generateBtn').addEventListener('click', () => this.generateResume());
        document.getElementById('printBtn').addEventListener('click', () => this.printResume());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadPDF());

        // Add real-time preview updates
        this.form.addEventListener('input', () => this.generateResume());
    }

    addExperienceEntry() {
        const entry = document.createElement('div');
        entry.className = 'experience-entry';
        entry.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="job-title" required>
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="company" required>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="duration" placeholder="e.g., Jan 2020 - Present" required>
            </div>
            <div class="form-group">
                <label>Responsibilities</label>
                <textarea class="responsibilities" rows="3" required></textarea>
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); resumeBuilder.generateResume();">
                Remove
            </button>
        `;
        this.experienceContainer.appendChild(entry);
    }

    addEducationEntry() {
        const entry = document.createElement('div');
        entry.className = 'education-entry';
        entry.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="degree" required>
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="institution" required>
            </div>
            <div class="form-group">
                <label>Year</label>
                <input type="text" class="year" required>
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); resumeBuilder.generateResume();">
                Remove
            </button>
        `;
        this.educationContainer.appendChild(entry);
    }

    generateResume() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const skills = document.getElementById('skills').value;

        // Collect experience entries
        const experiences = Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
            title: entry.querySelector('.job-title').value,
            company: entry.querySelector('.company').value,
            duration: entry.querySelector('.duration').value,
            responsibilities: entry.querySelector('.responsibilities').value
        }));

        // Collect education entries
        const education = Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
            degree: entry.querySelector('.degree').value,
            institution: entry.querySelector('.institution').value,
            year: entry.querySelector('.year').value
        }));

        // Generate preview HTML
        this.previewSection.innerHTML = `
            <div class="preview-header">
                <h1>${name || 'Your Name'}</h1>
                <p>${email || 'email@example.com'} | ${phone || 'Phone'}</p>
                <p>${address || 'Address'}</p>
            </div>

            <div class="preview-section">
                <h2>Professional Experience</h2>
                ${experiences.map(exp => `
                    <div class="experience-item">
                        <h3>${exp.title || 'Job Title'} - ${exp.company || 'Company'}</h3>
                        <p>${exp.duration || 'Duration'}</p>
                        <p>${exp.responsibilities || 'Responsibilities'}</p>
                    </div>
                `).join('')}
            </div>

            <div class="preview-section">
                <h2>Education</h2>
                ${education.map(edu => `
                    <div class="education-item">
                        <h3>${edu.degree || 'Degree'}</h3>
                        <p>${edu.institution || 'Institution'} - ${edu.year || 'Year'}</p>
                    </div>
                `).join('')}
            </div>

            <div class="preview-section">
                <h2>Skills</h2>
                <div class="skills-list">
                    ${skills.split(',').map(skill => `
                        <span class="skill-tag">${skill.trim()}</span>
                    `).join('')}
                </div>
            </div>
        `;
    }

    printResume() {
        window.print();
    }

    downloadPDF() {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>${document.getElementById('name').value || 'Resume'}</title>
                    <style>${document.querySelector('style').innerHTML}</style>
                </head>
                <body>
                    <div class="container">
                        <div class="right-panel">
                            ${this.previewSection.innerHTML}
                        </div>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    }
}

// Initialize the resume builder
const resumeBuilder = new ResumeBuilder();