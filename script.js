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
        // Autoplay music on first interaction if possible
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
            if(letterText.charAt(charIndex) === '\n') {
                typingContainer.innerHTML += "<br>";
            } else {
                typingContainer.innerHTML += letterText.charAt(charIndex);
            }
            charIndex++;
            setTimeout(startTyping, 40);
        } else {
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

    // --- NO Button Logic (Disappear & Reappear ON CLICK/TAP) ---
    const funnyMessages = [
        "Nice try 😂", 
        "Nope ❤️", 
        "Think again 😏", 
        "Are you sure? 🤭", 
        "Mission Failed 😆", 
        "You can't reject destiny 💖", 
        "The universe says YES 🌸"
    ];

    let isEvading = false;

    function evadeButton() {
        if (isEvading) return; // Prevent spamming while animating
        isEvading = true;

        // 1. Shrink & fade out the NO button when she clicks/taps it
        noBtn.classList.add("vanish");
        
        // 2. Wait 200ms for disappearance animation to complete
        setTimeout(() => {
            noBtn.style.position = "fixed";
            
            // Calculate random screen position within safe margins
            const btnWidth = noBtn.offsetWidth || 120; 
            const btnHeight = noBtn.offsetHeight || 50;
            
            const maxX = window.innerWidth - btnWidth - 30;
            const maxY = window.innerHeight - btnHeight - 30;
            
            const randomX = Math.max(30, Math.random() * maxX);
            const randomY = Math.max(30, Math.random() * maxY);

            // Move button to new location
            noBtn.style.left = `${randomX}px`;
            noBtn.style.top = `${randomY}px`;
            
            // Change message text
            const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
            noBtn.innerText = randomMsg;
            
            // 3. Make the button reappear in the new location
            noBtn.classList.remove("vanish");
            isEvading = false;
        }, 200);
    }

    // Trigger ONLY when she clicks (computer) or taps (phone)
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
        setInterval(createConfetti, 2000);
    });

    // --- Background Effects (Floating Hearts) ---
    const bgEffectsContainer = document.getElementById("bg-effects");
    
    function createFloatingHeart() {
        const heart = document.createElement("div");
        heart.innerHTML = ["🌸", "💖", "✨", "🤍"][Math.floor(Math.random() * 4)];
        heart.classList.add("floating-heart");
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
        
        bgEffectsContainer.appendChild(heart);
        
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
                
                if (Math.random() > 0.5) confetti.style.borderRadius = "50%";
                
                bgEffectsContainer.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }
    }

    // --- Cursor Trail (Tiny Hearts) ---
    const cursorTrailContainer = document.getElementById("cursor-trail");
    let lastMove = 0;
    document.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastMove < 50) return;
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
