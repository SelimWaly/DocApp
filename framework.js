const { exec } = require('child_process');
const { existsSync } = require('fs');
const { createWriteStream } = require('fs');
const fs = require('fs');
const https = require('https');
const path = require('path');
let theme = document.getElementById('theme');
let os = document.getElementById('os');
let button = document.getElementById('button');

let title = document.getElementById('title');
let code = document.getElementById('code');

function process(markdown) {
  try {
    exec('node -v', (error, stdout, stderr) => {
      if (error) {
        console.log('Node.js is not installed.');
      }
      else {
        console.log(`Node.js version: ${stdout.trim()}`);
        var codeBlockPattern = /```([a-zA-Z]+)\n([\s\S]*?)```/g;

        markdown = markdown.replace(codeBlockPattern, function(match, language, code) {
            code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

            var codeBlockHTML = `<pre class="language-${language}"><code class="language-${language}">${code}</code></pre>`;
            return codeBlockHTML;
        });

        var detailsSummaryPattern = /<details>([\s\S]*?)<\/details>/g;

        markdown = markdown.replace(detailsSummaryPattern, function(match, content) {
            var customDetailsSummaryHTML = `
            <details>
                <summary><h3>Click to reveal</h3></summar>
                <pre>${content}</pre>
            </details>
            `;
            return customDetailsSummaryHTML;
        });

        var headingPatterns = [
            /###### (.*?)\n/g,
            /##### (.*?)\n/g, 
            /#### (.*?)\n/g, 
            /### (.*?)\n/g,    
            /## (.*?)\n/g,     
            /# (.*?)\n/g 
        ];

        for (var i = 0; i < headingPatterns.length; i++) {
            markdown = markdown.replace(headingPatterns[i], function(match, text) {
            var headingLevel = i + 1;
            return `<h${headingLevel}>${text.trim()}</h${headingLevel}>`;
            });
        }

        var linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g;
        markdown = markdown.replace(linkPattern, function(match, altText, url) {
            return `<img src="${url}" alt="${altText}" />`;
        });

        markdown = markdown.replace(/<!--([\s\S]*?)-->/g, '');
        if (theme == "light") {
        markdown = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documentation</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-markup.min.js"></script> <!-- HTML, XML, SVG, MathML -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-css.min.js"></script> <!-- CSS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-scss.min.js"></script> <!-- SCSS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-less.min.js"></script> <!-- LESS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-c.min.js"></script> <!-- C -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-cpp.min.js"></script> <!-- C++ -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-java.min.js"></script> <!-- Java -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-python.min.js"></script> <!-- Python -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-javascript.min.js"></script> <!-- JavaScript -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-typescript.min.js"></script> <!-- TypeScript -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-csharp.min.js"></script> <!-- C# -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-ruby.min.js"></script> <!-- Ruby -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-php.min.js"></script> <!-- PHP -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-swift.min.js"></script> <!-- Swift -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-go.min.js"></script> <!-- Go -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-rust.min.js"></script> <!-- Rust -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-kotlin.min.js"></script> <!-- Kotlin -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-haskell.min.js"></script> <!-- Haskell -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-perl.min.js"></script> <!-- Perl -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-lua.min.js"></script> <!-- Lua -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-scala.min.js"></script> <!-- Scala -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-clojure.min.js"></script> <!-- Clojure -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-r.min.js"></script> <!-- R -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-erlang.min.js"></script> <!-- Erlang -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-matlab.min.js"></script> <!-- MATLAB -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-json.min.js"></script> <!-- JSON -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-yaml.min.js"></script> <!-- YAML -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-sql.min.js"></script> <!-- SQL -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-shell.min.js"></script> <!-- Shell -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-matlab.min.js"></script> <!-- MATLAB -->
        </head>
        <body>
        <style>
            body {
                background-color: #ffffff;
                color: #333333;
                font-family: Arial, sans-serif;
            }

            h1, h2, h3 {
                color: #007acc;
            }

            a {
                color: #007acc;
            }

            hr {
                border-top: 1px solid #dddddd;
            }

            p {
                font-size: 16px;
                line-height: 1.5;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            pre {
                background-color: #f3f3f3;
                color: #333333;
                padding: 10px;
                border-radius: 6px;
                font-size: 14px;
                overflow-x: auto;
            }

            code {
                background-color: #f3f3f3;
                color: #007acc;
                padding: 2px 5px;
                border-radius: 3px;
                font-family: Consolas, monospace;
                font-size: 14px;
            }

            details {
                background-color: #f3f3f3;
                border-radius: 6px;
                padding: 10px;
            }

            summary {
                color: #007acc;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            th, td {
                border: 1px solid #dddddd;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #ffffff;
                color: #007acc;
            }

            ol {
                list-style-type: decimal;
                margin-left: 30px;
            }

            ul {
                list-style-type: disc;
                margin-left: 30px;
            }

        </style>
        ${markdown}
        <script>
        Prism.highlightAll();
        </script>
        </body>
        </html>
        `
        }
        else if (theme == "dark") {
        markdown = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documentation</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-markup.min.js"></script> <!-- HTML, XML, SVG, MathML -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-css.min.js"></script> <!-- CSS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-scss.min.js"></script> <!-- SCSS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-less.min.js"></script> <!-- LESS -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-c.min.js"></script> <!-- C -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-cpp.min.js"></script> <!-- C++ -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-java.min.js"></script> <!-- Java -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-python.min.js"></script> <!-- Python -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-javascript.min.js"></script> <!-- JavaScript -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-typescript.min.js"></script> <!-- TypeScript -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-csharp.min.js"></script> <!-- C# -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-ruby.min.js"></script> <!-- Ruby -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-php.min.js"></script> <!-- PHP -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-swift.min.js"></script> <!-- Swift -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-go.min.js"></script> <!-- Go -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-rust.min.js"></script> <!-- Rust -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-kotlin.min.js"></script> <!-- Kotlin -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-haskell.min.js"></script> <!-- Haskell -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-perl.min.js"></script> <!-- Perl -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-lua.min.js"></script> <!-- Lua -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-scala.min.js"></script> <!-- Scala -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-clojure.min.js"></script> <!-- Clojure -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-r.min.js"></script> <!-- R -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-erlang.min.js"></script> <!-- Erlang -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-matlab.min.js"></script> <!-- MATLAB -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-json.min.js"></script> <!-- JSON -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-yaml.min.js"></script> <!-- YAML -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-sql.min.js"></script> <!-- SQL -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-shell.min.js"></script> <!-- Shell -->
            <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.27.0/components/prism-matlab.min.js"></script> <!-- MATLAB -->
        </head>
        <body>
        <style>
            body {
                background-color: #0d1117;
                color: #c9d1d9;
                font-family: Arial, sans-serif;
            }

            h1, h2, h3 {
                color: #58a6ff;
            }

            a {
                color: #58a6ff;
            }

            hr {
                border-top: 1px solid #30363d;
            }

            p {
                font-size: 16px;
                line-height: 1.5;
            }

            img {
                max-width: 100%;
                height: auto;
            }

            pre {
                background-color: #161b22;
                color: #c9d1d9;
                padding: 10px;
                border-radius: 6px;
                font-size: 14px;
                overflow-x: auto;
            }

            code {
                background-color: #161b22;
                color: #58a6ff;
                padding: 2px 5px;
                border-radius: 3px;
                font-family: Consolas, monospace;
                font-size: 14px;
            }

            details {
                background-color: #161b22;
                border-radius: 6px;
                padding: 10px;
            }

            summary {
                color: #58a6ff;
            }

            table {
                border-collapse: collapse;
                width: 100%;
            }

            th, td {
                border: 1px solid #30363d;
                padding: 8px;
                text-align: left;
            }

            th {
                background-color: #0d1117;
                color: #58a6ff;
            }

            ol {
                list-style-type: decimal;
                margin-left: 30px;
            }

            ul {
                list-style-type: disc;
                margin-left: 30px;
            }

        </style>
        ${markdown}
        <script>
        Prism.highlightAll();
        </script>
        </body>
        </html>
        `
        }
        const folderPath = path.join(process.env.USERPROFILE, documentsFolder, folderName);
        if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const timestamp = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
        const filePath = path.join("DocApp", `${timestamp}-doc.html`);
        fs.writeFileSync(filePath, markdown, 'utf-8');
        return markdown;
      }
    });
  } catch (error) {
    console.log('Error checking Node.js installation:', error);
  }
}

button.onclick = function() {
    if (theme == "none" || os == "none") {
        alert("Select a theme and operating system.");
    }
    else if (title == "" || code == ""){
        alert("Inputs cannot be null.");
    }
    else {
        let output = process(code);
        console.log(output);
    }
};

