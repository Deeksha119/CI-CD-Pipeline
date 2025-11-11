# BookHub - CI/CD Pipeline Demo

![CI/CD Pipeline](https://github.com/Deeksha119/ci-cd-pipeline/actions/workflows/ci-cd-pipeline.yml/badge.svg)
![GitHub Pages](https://img.shields.io/badge/deployed%20on-GitHub%20Pages-blue)

A complete demonstration of Application Lifecycle Management (ALM) with automated CI/CD pipeline for a library management web application.

 Features

- **Automated Testing**: Security audits, HTML validation, and test execution
- **Continuous Integration**: Automatic builds on every code change
- **Continuous Deployment**: Automated deployment to GitHub Pages
- **Version Control**: Git-based development workflow
- **Quality Gates**: Multiple validation steps before deployment

 Project Structure

 ci-cd-pipeline/  
│
├── .github/workflows/  
│ └── ci-cd-pipeline.yml # GitHub Actions CI/CD pipeline  
├── index.html # Main application  
├── styles.css # Styling  
├── script.js # Client-side logic  
├── package.json # Build configuration   
└── README.md # Documentation 


 CI/CD Pipeline Stages

1. **TEST** - Security audit, HTML validation, unit tests
2. **BUILD** - Application compilation and packaging
3. **DEPLOY** - Automatic deployment to production (GitHub Pages)

 Technologies Used

- **Version Control**: Git, GitHub
- **CI/CD**: GitHub Actions
- **Frontend**: HTML5, CSS3, JavaScript
- **Build Tool**: npm scripts
- **Hosting**: GitHub Pages

 Pipeline Status

| Stage | Status | Details |
|-------|--------|---------|
| Testing |  Passing | Security audit, validation, unit tests |
| Building |  Passing | Application packaging |
| Deployment |  Live | Automatic deployment to GitHub Pages |

 ALM Concepts Demonstrated

- **Application Lifecycle Management**
- **Continuous Integration/Continuous Deployment**
- **Automated Testing & Quality Assurance**
- **Version Control Best Practices**
- **Infrastructure as Code**
- **DevOps Principles**

 Live Demo

The application is automatically deployed and available at:
**https://deeksha119.github.io/CI-CD-Pipeline/**

 How to Use

1. Clone the repository
2. Make changes to the code
3. Push to main branch
4. Watch the automated pipeline:
   - Tests run automatically
   - Application builds if tests pass
   - Auto-deploys to production.

