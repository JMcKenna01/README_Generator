const fs = require('fs');
const inquirer = require('inquirer');

function getLicenseBadge(license) {
    const badges = {
        'MIT': '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)',
        'GPLv3': '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)',
        'Apache 2.0': '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)',
        'BSD': '![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)',
        'None': ''
    };
    return badges[license];
}

function generateReadme(answers) {
    const licenseBadge = getLicenseBadge(answers.license);

    return `
# ${answers.projectName}
${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Credits](#credits)
- [Roadmap](#roadmap)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions, please contact me at [${answers.email}](mailto:${answers.email}), or you can find more of my work at [${answers.github}](https://github.com/${answers.github}).

## Technologies Used
${answers.technologies}

## Screenshots
${answers.screenshots}

## Credits
${answers.credits}

## Roadmap
${answers.roadmap}
    `;
}

inquirer.prompt([
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a detailed description of your project:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project? Provide a step-by-step description:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How is your project used? Provide instructions and examples:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD', 'None']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can others contribute to your project? Provide guidelines:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Describe how to run tests for your project:'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username for questions:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address for additional questions:'
    },
    {
        type: 'input',
        name: 'technologies',
        message: 'What technologies were used in the creation of your project?'
    },
    {
        type: 'input',
        name: 'screenshots',
        message: 'Provide links to screenshots or demos of your project:'
    },
    {
        type: 'input',
        name: 'credits',
        message: 'List your collaborators, if any, with links to their GitHub profiles. Mention any third-party assets or tutorials used:'
    },
    {
        type: 'input',
        name: 'roadmap',
        message: 'Do you have any planned features or updates for your project? (Optional)'
    }
]).then(answers => {
    const readmeContent = generateReadme(answers);

    fs.writeFile('Generated-README.md', readmeContent, err => {
        if (err) {
            console.error('Error writing to README:', err);
            return;
        }
        console.log('README.md generated successfully!');
    });
})
.catch(error => {
    console.error('An error occurred:', error);
});