document.addEventListener("DOMContentLoaded", () => {
    // --- Elements ---
    const loader = document.getElementById("loader");
    const screenLanding = document.getElementById("screen-landing");
    const screenLetter = document.getElementById("screen-letter");
    const screenProposal = document.getElementById("screen-proposal");
    const screenCelebration = document.getElementById("screen-celebration");
    
    const envelopeBtn = document.getElementById("envelope-btn");
    const continueBtn = document.getElementById("continue-btn");
    const yesBtn = document.getElementById("yes-btn");
    const noBtn = document.getElementById("no-btn");
    const musicToggle = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music");
    
    // --- Initial Setup ---
    // Remove loader after 2 seconds
    setTimeout(() => {
        loader.classList.remove("active");
        loader.classList.add("hidden");
        screenLanding.classList.remove("hidden");
        screenLanding.classList.add("active");
    }, 2000);

    // --- Music Toggle ---
    let isPlaying = false;
    musicToggle.addEventListener("click", () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerText = "🎵 Play Music";
        } else {
            bgMusic.play().catch(e => console.log("Audio play prevented by browser"));
            musicToggle.innerText = "🔇 Pause Music";
        }
        isPlaying = !isPlaying;
    });

    // --- Envelope Click (Go to Letter) ---
    envelopeBtn.addEventListener("click", () => {
        screenLanding.classList.remove("active");
        screenLanding.classList.add("hidden");
        
        screenLetter.classList.remove("hidden");
        screenLetter.classList.add("active");
        
        musicToggle.classList.remove("hidden");
        // Try to autoplay music on first interaction
        if(!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggle.innerText = "🔇 Pause Music";
            }).catch(e => console.log("Autoplay blocked"));
        }

        startTyping();
    });

    // --- Letter Typing Effect ---
    const letterText = "My dearest,\n\nFrom the moment you walked into my life, everything changed. You bring light to my darkest days and a smile to my face just by existing. Every laugh we share, every quiet moment, means the world to me.\n\nI can't imagine my future without you in it.";
    const typingContainer = document.getElementById("typing-text");
    const letterEnding = document.getElementById("letter-ending");
    let charIndex = 0;

    function startTyping() {
        if (charIndex < letterText.length) {
            // Handle line breaks
            if(letterText.charAt(charIndex) === '\n') {
                typingContainer.innerHTML += "<br>";
            } else {
                typingContainer.innerHTML += letterText.charAt(charIndex);
            }
            charIndex++;
            setTimeout(startTyping, 40); // Typing speed
        } else {
            // Finished typing
            setTimeout(() => {
                letterEnding.classList.remove("hidden");
                continueBtn.classList.remove("hidden");
            }, 500);
        }
    }

    // --- Continue to Proposal ---
    continueBtn.addEventListener("click", () => {
        screenLetter.classList.remove("active");
        screenLetter.classList.add("hidden");
        
        screenProposal.classList.remove("hidden");
        screenProposal.classList.add("active");
    });

    // --- NEW: NO Button Evasion Logic (Disappear & Reappear) ---
    const funnyMessages = [
        "Nice try 😂", 
        "Nope ❤️", 
        "Think again 😏", 
        "Are you sure? 🤭", 
        "Mission Failed 😆", 
        "You can't reject destiny 💖", 
        "The universe says YES 🌸"
    ];

    function evadeButton() {
        // 1. Make the button vanish (shrink and fade out)
        noBtn.classList.add("vanish");
        
        // 2. Wait 200ms (matching the CSS transition) before moving it
        setTimeout(() => {
            noBtn.style.position = "fixed";
            
            // Calculate safe boundaries
            const btnWidth = noBtn.offsetWidth || 120; 
            const btnHeight = noBtn.offsetHeight || 50;
            
            const maxX = window.innerWidth - btnWidth - 20;
            const maxY = window.innerHeight - btnHeight - 20;
            
            const randomX = Math.max(20, Math.random() * maxX);
            const randomY = Math.max(20, Math.random() * maxY);

            // Move the button to the new random coordinates
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
            
            // Change the text to a random funny message
            const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            noBtn.innerText = randomMsg;
            
            // 3. Make the button reappear (pop back in)
            noBtn.classList.remove("vanish");
            
        }, 200); // 200 milliseconds delay
    }

    noBtn.addEventListener("mouseover", evadeButton);
    noBtn.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent accidental clicking on touch
        evadeButton();
    });
    
    // Just in case they somehow click it super fast before it vanishes
    noBtn.addEventListener("click", (e) => {
        e.preventDefault();
        evadeButton();
    });

    // --- YES Button Logic (Celebration) ---
    yesBtn.addEventListener("click", () => {
        screenProposal.classList.remove("active");
        screenProposal.classList.add("hidden");
        
        screenCelebration.classList.remove("hidden");
        screenCelebration.classList.add("active");

        createConfetti();
        setInterval(createConfetti, 2000); // Keep raining confetti
    });

    // --- Background Effects (Floating Hearts) ---
    const bgEffectsContainer = document.getElementById("bg-effects");
    
    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.innerHTML = ["🌸", "💖", "✨", "🤍"][Math.floor(Math.random() * 4)];
        heart.classList.add("floating-heart");
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 3}s`; // 3s - 6s
        
        bgEffectsContainer.appendChild(heart);
        
        // Cleanup
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    setInterval(createFloatingHeart, 800);

    // --- Confetti Generator ---
    function createConfetti() {
        const colors = ['#F8D7E8', '#EBDCFF', '#FFFFFF', '#D4A373', '#ff6b6b'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement("div");
                confetti.classList.add("confetti");
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Randomize shape (some circles, some rectangles)
                if (Math.random() > 0.5) confetti.style.borderRadius = "50%";
                
                bgEffectsContainer.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50); // Stagger generation
        }
    }

    // --- Cursor Trail (Tiny Hearts) ---
    const cursorTrailContainer = document.getElementById("cursor-trail");
    
    // Throttling the mouse move to prevent DOM overload
    let lastMove = 0;
    document.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastMove < 50) return; // Only create a heart every 50ms
        lastMove = now;

        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.classList.add("cursor-heart");
        heart.style.left = `${e.pageX}px`;
        heart.style.top = `${e.pageY}px`;
        
        cursorTrailContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 800);
    });
});
