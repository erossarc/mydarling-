document.addEventListener('DOMContentLoaded', () => {
    const envelopeBtn = document.getElementById('envelope-btn');
    const screenLanding = document.getElementById('screen-landing');
    const screenLetter = document.getElementById('screen-letter');

    if (envelopeBtn) {
        envelopeBtn.addEventListener('click', () => {
            if (screenLanding) screenLanding.classList.add('hidden');
            if (screenLetter) screenLetter.classList.remove('hidden');
            startTypingEffect();
        });
    }

    const letterText = "My dearest,\n\nFrom the moment you walked into my life, everything changed. You bring light to my darkest days and a smile to my face just by existing. Every laugh we share, every quiet moment, means the world to me.\n\nForever yours,";
    
    function startTypingEffect() {
        const typingElement = document.getElementById('typing-text');
        const letterEnding = document.getElementById('letter-ending');
        const continueBtn = document.getElementById('continue-btn');
        
        if (!typingElement) return;
        
        let i = 0;
        typingElement.innerHTML = '';
        
        function typeWriter() {
            if (i < letterText.length) {
                if (letterText.charAt(i) === '\n') {
                    typingElement.innerHTML += '<br>';
                } else {
                    typingElement.innerHTML += letterText.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 40);
            } else {
                if (letterEnding) letterEnding.classList.remove('hidden');
                if (continueBtn) continueBtn.classList.remove('hidden');
            }
        }
        typeWriter();
    }

    const continueBtn = document.getElementById('continue-btn');
    const screenProposal = document.getElementById('screen-proposal');

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (screenLetter) screenLetter.classList.add('hidden');
            if (screenProposal) screenProposal.classList.remove('hidden');
        });
    }

    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const screenCelebration = document.getElementById('screen-celebration');

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            if (screenProposal) screenProposal.classList.add('hidden');
            if (screenCelebration) screenCelebration.classList.remove('hidden');
        });
    }

    if (noBtn) {
        const moveButton = () => {
            const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
            const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
            noBtn.style.position = 'fixed';
            noBtn.style.left = `${Math.max(20, x)}px`;
            noBtn.style.top = `${Math.max(20, y)}px`;
        };

        noBtn.addEventListener('mouseover', moveButton);
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            moveButton();
        });
    }
});
