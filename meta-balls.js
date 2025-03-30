document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('meta-balls');
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
        console.error('WebGL not supported');
        return;
    }
    
    // Configuration
    const config = {
        color: [1.0, 1.0, 1.0],
        ballCount: 15,
        animationSize: 30,
        clumpFactor: 1.0,
        enableTransparency: true
    };
    
    // Resize canvas to fill window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Shader sources
    const vertexShaderSource = `
        attribute vec2 aPosition;
        void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `;
    
    const fragmentShaderSource = `
        precision highp float;
        uniform vec2 uResolution;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec3 uColor;
        uniform float uAnimationSize;
        uniform int uBallCount;
        uniform float uCursorBallSize;
        uniform float uClumpFactor;
        uniform bool uEnableTransparency;
        
        // Hash function for random values
        float hash(float n) {
            return fract(sin(n) * 43758.5453);
        }
        
        // Get metaball value
        float getMetaBallValue(vec2 center, float radius, vec2 pos) {
            vec2 d = pos - center;
            float dist2 = dot(d, d);
            return (radius * radius) / dist2;
        }
        
        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            uv = (uv - 0.5) * 2.0;
            uv.x *= uResolution.x / uResolution.y;
            
            float scale = uAnimationSize / uResolution.y;
            vec2 coord = uv * scale;
            vec2 mousePos = (uMouse / uResolution.xy - 0.5) * 2.0;
            mousePos.x *= uResolution.x / uResolution.y;
            mousePos *= scale;
            
            float total = 0.0;
            
            // Calculate metaballs
            for (int i = 0; i < 50; i++) {
                if (i >= uBallCount) break;
                
                float idx = float(i) + 1.0;
                float h1 = hash(idx);
                float h2 = hash(idx + 100.0);
                float h3 = hash(idx + 200.0);
                
                float st = h1 * 6.28;
                float radius = 0.5 + h3 * 1.5;
                float baseScale = 5.0 + h2 * 5.0;
                
                float x = cos(st + uTime * 0.3 * h1) * baseScale * uClumpFactor;
                float y = sin(st + uTime * 0.3 * h2) * baseScale * uClumpFactor;
                
                total += getMetaBallValue(vec2(x, y), radius, coord);
            }
            
            // Add cursor metaball
            total += getMetaBallValue(mousePos, uCursorBallSize, coord);
            
            // Apply smoothstep for clean edges
            float f = smoothstep(-1.0, 1.0, (total - 1.3) / 0.1);
            
            // Output color
            vec3 finalColor = uColor * f;
            float alpha = uEnableTransparency ? f : 1.0;
            gl_FragColor = vec4(finalColor, alpha);
        }
    `;
    
    // Compile shader
    function compileShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        
        return shader;
    }
    
    // Create program
    function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        
        return program;
    }
    
    // Compile shaders
    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    
    // Get attribute and uniform locations
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uColor = gl.getUniformLocation(program, 'uColor');
    const uAnimationSize = gl.getUniformLocation(program, 'uAnimationSize');
    const uBallCount = gl.getUniformLocation(program, 'uBallCount');
    const uCursorBallSize = gl.getUniformLocation(program, 'uCursorBallSize');
    const uClumpFactor = gl.getUniformLocation(program, 'uClumpFactor');
    const uEnableTransparency = gl.getUniformLocation(program, 'uEnableTransparency');
    
    // Create buffers
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    
    // Mouse tracking
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            targetX = e.touches[0].clientX;
            targetY = e.touches[0].clientY;
        }
    });
    
    // Animation loop
    const startTime = Date.now();
    
    // Enable transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Use program
    gl.useProgram(program);

    function render() {
        // Smooth mouse movement
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;
        
        // Clear canvas
        gl.clearColor(0, 0, 0, config.enableTransparency ? 0 : 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // Set uniforms
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, (Date.now() - startTime) * 0.001);
        gl.uniform2f(uMouse, mouseX, canvas.height - mouseY);
        gl.uniform3fv(uColor, config.color);
        gl.uniform1f(uAnimationSize, config.animationSize);
        gl.uniform1i(uBallCount, config.ballCount);
        gl.uniform1f(uCursorBallSize, 3.0);
        gl.uniform1f(uClumpFactor, config.clumpFactor);
        gl.uniform1i(uEnableTransparency, config.enableTransparency ? 1 : 0);
        
        // Set attributes
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        
        // Draw
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        
        // Request next frame
        requestAnimationFrame(render);
    }
    
    
    // Start animation
    render();
});