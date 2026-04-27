document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calc-form');
    const cashInput = document.getElementById('cash');
    const burnInput = document.getElementById('burn');
    const card = document.querySelector('.figma-card');
    
    // SVG tracking
    const strokePath = document.getElementById('stroke-path');
    
    // View switching
    const resultView = document.getElementById('result-view');
    const resetBtn = document.getElementById('reset-btn');
    
    // Result elements
    const monthsVal = document.getElementById('months-val');
    const pgFill = document.getElementById('pg-fill');
    const quoteEl = document.getElementById('result-quote');
    
    const tiers = {
        safe: {
            threshold: 12,
            color: '#10B981', // Green
            quotes: [
                "You're in the safe zone. Build with confidence.",
                "Plenty of runway.",
                "Green lights ahead. Time to accelerate."
            ]
        },
        caution: {
            threshold: 6,
            color: '#F59E0B', // Amber
            quotes: [
                "You're doing okay, keep an eye on expenses.",
                "A healthy timeline, but don't get comfortable."
            ]
        },
        danger: {
            threshold: 3,
            color: '#F97316', // Orange
            quotes: [
                "Things are getting tight. Prioritize execution.",
                "Warning lights are flashing. Time to cut fluff."
            ]
        },
        critical: {
            threshold: 0,
            color: '#EF4444', // Red
            quotes: [
                "Code red. Emergency measures needed.",
                "Every dollar counts now. Survival mode."
            ]
        }
    };

    const formatCurrency = (val) => {
        if (!val) return '';
        const num = parseFloat(val.replace(/,/g, ''));
        if (isNaN(num)) return '';
        return num.toLocaleString('en-US');
    };

    const cleanNumber = (val) => {
        return parseFloat(val.replace(/,/g, ''));
    };

    cashInput.addEventListener('blur', (e) => e.target.value = formatCurrency(e.target.value));
    burnInput.addEventListener('blur', (e) => e.target.value = formatCurrency(e.target.value));
    
    const allowOnlyNumbers = (e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    };

    cashInput.addEventListener('input', allowOnlyNumbers);
    burnInput.addEventListener('input', allowOnlyNumbers);

    // Initialize stroke path exactly over the Figma shape
    let pathLength = strokePath.getTotalLength();
    strokePath.style.strokeDasharray = pathLength;
    strokePath.style.strokeDashoffset = pathLength;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const cash = cleanNumber(cashInput.value);
        const burn = cleanNumber(burnInput.value);

        if (isNaN(cash) || isNaN(burn) || burn <= 0) {
            alert("Please enter valid parameters.");
            return;
        }

        const exactMonths = cash / burn;
        const displayMonths = parseFloat(exactMonths.toFixed(1));
        
        let currentTier = tiers.critical;
        if (exactMonths >= tiers.safe.threshold) currentTier = tiers.safe;
        else if (exactMonths >= tiers.caution.threshold) currentTier = tiers.caution;
        else if (exactMonths >= tiers.danger.threshold) currentTier = tiers.danger;

        // Switch to result view mapped inside the same layout
        form.style.display = 'none';
        resultView.style.display = 'block';
        quoteEl.classList.remove('visible');
        
        // Remove old animations
        card.classList.remove('anim-shake');
        void card.offsetWidth; // trigger reflow

        if (currentTier === tiers.critical) {
            card.classList.add('anim-shake');
        }

        // Apply Stroke animation over #D9D9D9 background
        pathLength = strokePath.getTotalLength();
        strokePath.style.strokeDasharray = pathLength;
        strokePath.style.strokeDashoffset = pathLength; 
        strokePath.setAttribute('stroke', currentTier.color);
        
        setTimeout(() => {
            strokePath.style.strokeDashoffset = '0';
        }, 50);

        // Update Text & Colors
        monthsVal.style.color = currentTier.color;
        
        const fillPercentage = Math.min((exactMonths / 18) * 100, 100);
        pgFill.style.width = '0%'; // start at 0
        pgFill.style.backgroundColor = currentTier.color;
        
        setTimeout(() => {
            pgFill.style.width = `${fillPercentage}%`;
        }, 100);

        const randomQuote = currentTier.quotes[Math.floor(Math.random() * currentTier.quotes.length)];
        quoteEl.textContent = `"${randomQuote}"`;

        animateValue(monthsVal, 0, displayMonths, 1000);

        setTimeout(() => {
            quoteEl.classList.add('visible');
        }, 800);

        if (currentTier === tiers.safe) {
            setTimeout(fireConfetti, 400);
        }
    });

    // Option to quickly reset
    resetBtn.addEventListener('click', () => {
        form.style.display = 'block';
        resultView.style.display = 'none';
        strokePath.style.strokeDashoffset = pathLength; 
        cashInput.value = '';
        burnInput.value = '';
    });

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = (easeProgress * (end - start) + start);
            obj.innerHTML = currentVal.toFixed(1);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end.toFixed(1);
            }
        };
        window.requestAnimationFrame(step);
    }

    function fireConfetti() {
        if (typeof confetti !== 'undefined') {
            const count = 150;
            const defaults = { origin: { y: 0.7 }, zIndex: 100 };
            function fire(ratio, opts) {
                confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * ratio) }));
            }
            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }
    }
});
