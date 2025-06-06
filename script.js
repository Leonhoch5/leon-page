// Terminal content to be typed out
const terminalContent = [
    {
        type: "command",
        text: "whoami",
        delay: 1000
    },
    {
        type: "output",
        html: `<h1>Leon Gohn</h1><p class="age-display">Age: <span id="age">14</span> years old</p>`,
        delay: 500
    },
    {
        type: "command",
        text: "skills",
        delay: 1500
    },
    {
        type: "output",
        html: `<ul class="skills-list">
                  <li>JavaScript/TypeScript</li>
                  <li>Python</li>
                  <li>Learning C++ and Java</li>
                  <li>Next.js</li>
                  <li>npm ecosystem</li>
               </ul>`,
        delay: 500
    },
    {
        type: "command",
        text: "interests",
        delay: 1500
    },
    {
        type: "output",
        html: `<ul>
                  <li>Biking</li>
                  <li>Swimming</li>
                  <li>Planning to complete a triathlon</li>
                  <li>Coding projects</li>
               </ul>`,
        delay: 500
    },
    {
        type: "command",
        text: "links",
        delay: 1500
    },
    {
        type: "output",
        html: `<a href="https://github.com/leonhoch5" target="_blank" class="cyber-link">GitHub</a>`,
        delay: 500
    },
    {
        type: "command",
        text: "",
        delay: 1000,
        cursor: true
    }
];

// Calculate precise age
function calculateAge() {
    const birthDate = new Date('2010-08-13');
    const now = new Date();

    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        age--;
    }

    // Calculate the fraction of the year that has passed since last birthday
    const lastBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (now < lastBirthday) {
        lastBirthday.setFullYear(now.getFullYear() - 1);
    }

    const nextBirthday = new Date(lastBirthday);
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);

    const yearFraction = (now - lastBirthday) / (nextBirthday - lastBirthday);

    return age + yearFraction;
}

// Update age display
function updateAge() {
    const age = calculateAge();
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = age.toFixed(8);
    }
}

// Type out text with animation
async function typeText(element, text, speed = 30) {
    return new Promise(resolve => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
                resolve();
            }
        }, speed);
    });
}

// Create terminal line
function createTerminalLine(content) {
    const line = document.createElement('div');
    line.className = 'terminal-line';

    const prompt = document.createElement('span');
    prompt.className = 'prompt';
    prompt.textContent = '>';
    line.appendChild(prompt);

    if (content.type === 'command') {
        const command = document.createElement('span');
        command.className = 'command';
        line.appendChild(command);

        if (content.cursor) {
            const cursor = document.createElement('span');
            cursor.className = 'blinking-cursor';
            cursor.textContent = '_';
            line.appendChild(cursor);
        }

        return { line, element: command };
    } else {
        const output = document.createElement('div');
        output.className = 'output';
        line.appendChild(output);
        return { line, element: output };
    }
}

// Process terminal content
async function processTerminalContent() {
    const terminal = document.getElementById('terminal-content');

    for (const content of terminalContent) {
        await new Promise(resolve => setTimeout(resolve, content.delay));

        const { line, element } = createTerminalLine(content);
        terminal.appendChild(line);

        if (content.type === 'command' && content.text) {
            await typeText(element, content.text);
        } else if (content.type === 'output' && content.html) {
            // For output, we'll just insert the HTML after a brief delay
            await new Promise(resolve => setTimeout(resolve, 200));
            element.innerHTML = content.html;

            // Start age counter if age element exists
            if (content.html.includes('id="age"')) {
                updateAge();
                setInterval(updateAge, 50);
            }
        }
    }
}
const easterEggs = {
    "matrix": () => {
        // Create matrix rain effect
        const matrix = document.createElement('div');
        matrix.className = 'matrix-rain';
        document.body.appendChild(matrix);

        // Create canvas for matrix effect
        const canvas = document.createElement('canvas');
        matrix.appendChild(canvas);
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext('2d');
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        const interval = setInterval(draw, 30);

        // Remove matrix after 10 seconds
        setTimeout(() => {
            clearInterval(interval);
            matrix.remove();
        }, 10000);

        return { html: '<span class="easter-egg">Entering the Matrix...</span>' };
    },
    "triathlon": () => {
        return { html: '<span class="easter-egg">My triathlon goal: Swim 1.5km, Bike 37km, Run 10km - coming soon! (one or two years)</span><br><br><span>Before that only relay, meaning only swimming and someone else does biking and a third person running</span>' };
    },
    "secret": () => {
        return { html: '<span class="easter-egg">You found my secret command!' };
    },
    "help": () => {
        return { html: 'Available commands:<br>Easter eggs: matrix, triathlon, secret' };
    },
    "clear": () => {
        const terminal = document.getElementById('terminal-content');
        terminal.innerHTML = '';
        return null; // No output needed
    }
};

// Handle command input
function setupCommandInput() {
    const input = document.getElementById('command-input');
    const terminal = document.getElementById('terminal-content');

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = '';

            // Add the command to terminal history
            const commandLine = document.createElement('div');
            commandLine.className = 'terminal-line';
            commandLine.innerHTML = `<span class="prompt">></span> <span class="command">${command}</span>`;
            terminal.appendChild(commandLine);

            // Process the command
            processCommand(command);

            // Scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

    // Focus input when clicking anywhere in terminal
    document.querySelector('.terminal').addEventListener('click', () => {
        input.focus();
    });
}

// Process user commands
function processCommand(command) {
    const terminal = document.getElementById('terminal-content');

    // Create output line
    const outputLine = document.createElement('div');
    outputLine.className = 'terminal-line output';
    terminal.appendChild(outputLine);

    // Check for easter eggs or known commands
    if (easterEggs[command]) {
        const result = easterEggs[command]();
        if (result && result.html) {
            outputLine.innerHTML = result.html;
        }
    } else if (command === '') {
        outputLine.innerHTML = '';
    } else {
        outputLine.innerHTML = `<span class="error-message">Command not found: ${command}. Type 'help' for available commands.</span>`;
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    processTerminalContent();
    setupCommandInput();
    document.getElementById('command-input').focus();
});