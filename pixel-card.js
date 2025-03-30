document.addEventListener('DOMContentLoaded', function() {
    // Pixel class for animation
    class Pixel {
        constructor(canvas, context, x, y, color, speed, delay) {
            this.width = canvas.width;
            this.height = canvas.height;
            this.ctx = context;
            this.x = x;
            this.y = y;
            this.color = color;
            this.speed = this.getRandomValue(0.1, 0.9) * speed;
            this.size = 0;
            this.sizeStep = Math.random() * 0.4;
            this.minSize = 0.5;
            this.maxSizeInteger = 2;
            this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
            this.delay = delay;
            this.counter = 0;
            this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
            this.isIdle = false;
            this.isReverse = false;
            this.isShimmer = false;
        }

        getRandomValue(min, max) {
            return Math.random() * (max - min) + min;
        }

        draw() {
            const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(
                this.x + centerOffset,
                this.y + centerOffset,
                this.size,
                this.size
            );
        }

        appear() {
            this.isIdle = false;
            if (this.counter <= this.delay) {
                this.counter += this.counterStep;
                return;
            }
            if (this.size >= this.maxSize) {
                this.isShimmer = true;
            }
            if (this.isShimmer) {
                this.shimmer();
            } else {
                this.size += this.sizeStep;
            }
            this.draw();
        }

        disappear() {
            this.isShimmer = false;
            this.counter = 0;
            if (this.size <= 0) {
                this.isIdle = true;
                return;
            } else {
                this.size -= 0.1;
            }
            this.draw();
        }

        shimmer() {
            if (this.size >= this.maxSize) {
                this.isReverse = true;
            } else if (this.size <= this.minSize) {
                this.isReverse = false;
            }
            if (this.isReverse) {
                this.size -= this.speed;
            } else {
                this.size += this.speed;
            }
        }
    }

    // Initialize pixel cards
    function initPixelCards() {
        const pixelCards = document.querySelectorAll('.pixel-card');
        
        pixelCards.forEach(card => {
            // Create canvas for each card
            const canvas = document.createElement('canvas');
            canvas.classList.add('pixel-canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = '1';
            
            // Insert canvas before the first child
            card.insertBefore(canvas, card.firstChild);
            
            // Set card position to relative if not already
            if (getComputedStyle(card).position === 'static') {
                card.style.position = 'relative';
            }
            
            // Set canvas dimensions
            const rect = card.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Get context
            const ctx = canvas.getContext('2d');
            
            // Create pixels
            const pixels = [];
            const gap = 5;
            const colors = ['#f8fafc', '#f1f5f9', '#cbd5e1'];
            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            for (let x = 0; x < canvas.width; x += gap) {
                for (let y = 0; y < canvas.height; y += gap) {
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    const dx = x - canvas.width / 2;
                    const dy = y - canvas.height / 2;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const delay = reducedMotion ? 0 : distance;
                    
                    pixels.push(
                        new Pixel(
                            canvas,
                            ctx,
                            x,
                            y,
                            color,
                            0.035,
                            delay
                        )
                    );
                }
            }
            
            // Store pixels in card data
            card.pixels = pixels;
            card.pixelCanvas = canvas;
            card.animationFrame = null;
            
            // Add event listeners
            card.addEventListener('mouseenter', function() {
                animatePixels(card, 'appear');
            });
            
            card.addEventListener('mouseleave', function() {
                animatePixels(card, 'disappear');
            });
            
            card.addEventListener('focus', function(e) {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                animatePixels(card, 'appear');
            });
            
            card.addEventListener('blur', function(e) {
                if (e.currentTarget.contains(e.relatedTarget)) return;
                animatePixels(card, 'disappear');
            });
        });
    }
    
    // Animate pixels
    function animatePixels(card, action) {
        if (card.animationFrame) {
            cancelAnimationFrame(card.animationFrame);
        }
        
        const ctx = card.pixelCanvas.getContext('2d');
        const pixels = card.pixels;
        
        function animate() {
            ctx.clearRect(0, 0, card.pixelCanvas.width, card.pixelCanvas.height);
            
            let allIdle = true;
            for (let i = 0; i < pixels.length; i++) {
                const pixel = pixels[i];
                pixel[action]();
                if (!pixel.isIdle) {
                    allIdle = false;
                }
            }
            
            if (allIdle) {
                cancelAnimationFrame(card.animationFrame);
                card.animationFrame = null;
            } else {
                card.animationFrame = requestAnimationFrame(animate);
            }
        }
        
        card.animationFrame = requestAnimationFrame(animate);
    }
    
    // Handle window resize
    function handleResize() {
        const pixelCards = document.querySelectorAll('.pixel-card');
        
        pixelCards.forEach(card => {
            if (card.pixels && card.pixelCanvas) {
                // Cancel any ongoing animation
                if (card.animationFrame) {
                    cancelAnimationFrame(card.animationFrame);
                    card.animationFrame = null;
                }
                
                // Update canvas dimensions
                const rect = card.getBoundingClientRect();
                card.pixelCanvas.width = rect.width;
                card.pixelCanvas.height = rect.height;
                
                // Recreate pixels
                const ctx = card.pixelCanvas.getContext('2d');
                const pixels = [];
                const gap = 5;
                const colors = ['#f8fafc', '#f1f5f9', '#cbd5e1'];
                const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                
                for (let x = 0; x < card.pixelCanvas.width; x += gap) {
                    for (let y = 0; y < card.pixelCanvas.height; y += gap) {
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        
                        const dx = x - card.pixelCanvas.width / 2;
                        const dy = y - card.pixelCanvas.height / 2;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const delay = reducedMotion ? 0 : distance;
                        
                        pixels.push(
                            new Pixel(
                                card.pixelCanvas,
                                ctx,
                                x,
                                y,
                                color,
                                0.035,
                                delay
                            )
                        );
                    }
                }
                
                // Update pixels
                card.pixels = pixels;
            }
        });
    }
    
    // Initialize
    initPixelCards();
    
    // Add resize listener
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 200);
    });
    
    // Create custom cursor
    const customCursor = document.createElement('div');
    customCursor.classList.add('custom-cursor');
    document.body.appendChild(customCursor);
    
    // Update custom cursor position
    document.addEventListener('mousemove', function(e) {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
        
        // Check if over clickable elements
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element && (
            element.tagName === 'A' || 
            element.tagName === 'BUTTON' || 
            element.closest('a') || 
            element.closest('button') ||
            element.classList.contains('btn') ||
            element.classList.contains('btn-small')
        )) {
            customCursor.style.width = '30px';
            customCursor.style.height = '30px';
        } else {
            customCursor.style.width = '20px';
            customCursor.style.height = '20px';
        }
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        customCursor.style.display = 'none';
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        customCursor.style.display = 'block';
    });
});