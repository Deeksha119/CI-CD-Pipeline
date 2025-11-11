// Simple version display and interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Update version from environment or keep default
    const versionElement = document.getElementById('version');
    
    // Add interactive feature to CTA button
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        alert('Welcome to BookHub! This is a demo application deployed via CI/CD pipeline.');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log('BookHub Application Loaded Successfully');
});
