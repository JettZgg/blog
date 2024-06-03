window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    }
};

// Function to detect if the device is a mobile device
function isMobileDevice() {
    const ua = navigator.userAgent.toLowerCase();
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua) || 
           (navigator.maxTouchPoints > 1 && /mobile|tablet/.test(ua));
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }

    if (isMobileDevice()) {
        document.body.classList.add('mobile-device');
    }
});

// Ensure MathJax processes any LaTeX in the loaded content after Marked.js parsing
function renderMathJax() {
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

// Function to parse the metadata from the markdown content
function parseMetadata(content) {
    const metadata = {};
    const metadataRegex = /^---\n([\s\S]+?)\n---/;
    const match = content.match(metadataRegex);

    if (match) {
        const metadataContent = match[1].trim().split('\n');
        metadataContent.forEach(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            metadata[key.toLowerCase()] = value.replace(/["']/g, ''); // Remove quotes if any
        });
        metadata.content = content.replace(metadataRegex, '').trim();
    } else {
        metadata.content = content;
    }

    return metadata;
}

// Load and parse Markdown file
document.addEventListener('DOMContentLoaded', function() {
    const contentElement = document.getElementById('content');
    const articleListElement = document.getElementById('article-list');
    const urlParams = new URLSearchParams(window.location.search);
    const article = urlParams.get('article');

    // Fetch the articles list from articles.json
    fetch('assets/json/articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(articles => {
            // Sort articles by date in descending order
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));

            if (articleListElement) {
                // Display article titles on the home page
                articles.forEach(article => {
                    const articleItem = document.createElement('div');
                    articleItem.innerHTML = `<h2><a href="template.html?article=${article.file.replace('.md', '')}">${article.title}</a></h2>`;
                    articleListElement.appendChild(articleItem);
                });
            }

            if (contentElement && article) {
                // Find the article file in the articles list
                const articleData = articles.find(a => a.file.replace('.md', '') === article);

                if (articleData) {
                    fetch(`https://raw.githubusercontent.com/JettZgg/blog/master/articles/${articleData.file}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                        .then(text => {
                            const metadata = parseMetadata(text);
                            contentElement.innerHTML = marked.parse(metadata.content); // Use metadata.content instead of raw text
                            Prism.highlightAll(); // Apply Prism.js highlighting
                            renderMathJax(); // Ensure MathJax processes the content
                        })
                        .catch(error => {
                            contentElement.innerHTML = '<p>Failed to load article. Please try again later.</p>';
                            console.error('Error fetching the Markdown file:', error);
                        });
                }
            }
        })
        .catch(error => {
            console.error('Error fetching articles list:', error);
        });
});


