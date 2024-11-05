# Weather forcast App
A simple command-line application built with Node.js in typescript using express Js to get a5 day weather forcast for a given city.The app takes in the city name from the user in the webpage and generates the weather data by using Open weather api.
This command "npm run start:dev" will run the server and the client simultaneously and the app will be loaded in the local in the url http://localhost:3001/ .

Give the city name, it will provide the city name, date,temparature,wind speed, humidity and a small icon to depict the weather.Below the current date, the 5 days forcast will be displayed.

API used: {this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;

The latitude and longitude are fetched by uing the Geocode query
{this.baseURL}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}

When the user searches for a city the city is added to the file and that is being displayed in the history. the user will also be able to click the saved city to view the data again. The city can also be deleted by using the delete button.

## Table of Contents 
- [Weather forcast App](#weather-forcast-app)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Questions](#questions)

## Installation
1. Clone the repository:
    git clone git@github.com:gitkaviyarasi/weatherapp.git
2. Navigate to the project directory and create a branch.
3. Install the required dependencies :
    npm install  

## Usage
To generate weather forcast  run the command
npm run start:dev
Web page: ![Weather app webpage](./client/src/styles/Weather%20app%20screenShot.png)

## License
MIT

## Contributing
Contributions are welcome! To contribute:

Fork the repository
Create a new branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature/YourFeature)
Open a pull request

## Questions
If you have any questions about this project, feel free to reach out:

GitHub: gitkaviyarasi 
Email: kaviyarasikrishnannj@gmail.com
