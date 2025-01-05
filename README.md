# My Website

This project is a simple web application that serves a video from a local directory. It includes an HTML file for the structure, CSS for styling, and a Node.js server to serve the content.

## Project Structure

```
my-website
├── src
│   ├── index.html      # HTML structure of the website
│   └── styles
│       └── style.css   # CSS styles for the website
├── package.json        # npm configuration file
├── server.js           # Node.js server entry point
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd my-website
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the server**:
   ```
   node server.js
   ```

4. **Access the website**:
   Open your web browser and navigate to `http://localhost:3000` to view the website and watch the video.

## Usage

The website is designed to display a video located at `D:\fdm\Opruto.com_Nika 226-250 720p\1`. Ensure that the path is correctly referenced in the `src/index.html` file.

## License

This project is licensed under the MIT License.